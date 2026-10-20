-- Samrådsguiden: gemensam rangordning av frågorna i Tabell 6 (maxima.html)
-- Kör hela filen en gång i Supabase: Dashboard > SQL Editor > New query > klistra in > Run.
-- Filen går att köra om (den ändrar inte befintliga röster). Förklaring steg för steg: supabase.md.
--
-- Idé: ingen inloggning. Webbläsaren har en hemlig slumpnyckel (token) och skickar bara den till
-- funktionen spara_rost(). Databasen lagrar en kontrollsumma av nyckeln, aldrig själva nyckeln.
-- Tabellerna är låsta för anonyma besökare: all läsning och skrivning går via funktionerna nedan.

-- 1. Tabell för röster (en rad per webbläsare) -----------------------------------------------
create table if not exists public.rangordning_roster (
  token_hash text primary key,                 -- kontrollsumma (sha256) av webbläsarens hemliga nyckel
  namn       text,                             -- frivilligt, null = anonym
  ordning    jsonb not null,                   -- lista med fråge-id i vald ordning, t.ex. ["f02","f01",...]
  skapad     timestamptz not null default now(),
  andrad     timestamptz not null default now(),
  constraint rangordning_namn_langd check (namn is null or char_length(namn) <= 40),
  constraint rangordning_ordning_lista check (
    jsonb_typeof(ordning) = 'array' and jsonb_array_length(ordning) between 1 and 50
  )
);

-- 2. Inställningar: sista dag och möjlighet att stänga röstningen manuellt -------------------
create table if not exists public.rangordning_installning (
  id     int primary key default 1 check (id = 1),    -- bara en rad
  frist  timestamptz not null default '2026-11-06 23:59:59+01',
  stangd boolean     not null default false
);
insert into public.rangordning_installning (id) values (1) on conflict (id) do nothing;

-- 3. Lås tabellerna: Row Level Security på och inga öppna regler för anonyma ---------------
alter table public.rangordning_roster      enable row level security;
alter table public.rangordning_installning enable row level security;
revoke all on public.rangordning_roster      from anon, authenticated;
revoke all on public.rangordning_installning from anon, authenticated;

-- 4. Funktioner som sidan får anropa ---------------------------------------------------------
-- 4a. Hämta alla röster (utan nycklar). "id" är en kort, offentlig beteckning.
create or replace function public.hamta_roster()
returns table (id text, namn text, ordning jsonb, andrad timestamptz)
language sql
security definer
set search_path = public
stable
as $$
  select left(r.token_hash, 10), r.namn, r.ordning, r.andrad
  from public.rangordning_roster r
  order by r.andrad desc;
$$;

-- 4b. Hämta status: sista dag, om röstningen är stängd, och antal röster.
create or replace function public.hamta_status()
returns table (frist timestamptz, stangd boolean, antal bigint)
language sql
security definer
set search_path = public
stable
as $$
  select i.frist,
         (i.stangd or now() > i.frist),
         (select count(*) from public.rangordning_roster)
  from public.rangordning_installning i
  where i.id = 1;
$$;

-- 4c. Spara (eller uppdatera) sin röst. Returnerar den offentliga beteckningen.
create or replace function public.spara_rost(p_token uuid, p_namn text, p_ordning jsonb)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  v_inst  public.rangordning_installning%rowtype;
  v_hash  text;
  v_namn  text;
  v_antal bigint;
begin
  select * into v_inst from public.rangordning_installning where id = 1;
  if v_inst.stangd or now() > v_inst.frist then
    raise exception 'Röstningen är stängd';
  end if;

  if p_token is null then
    raise exception 'Nyckel saknas';
  end if;

  if p_ordning is null or jsonb_typeof(p_ordning) <> 'array'
     or jsonb_array_length(p_ordning) not between 1 and 50 then
    raise exception 'Ogiltig ordning';
  end if;

  -- Varje post ska vara en kort text med bokstäver, siffror, - eller _
  if exists (
    select 1 from jsonb_array_elements(p_ordning) e
    where jsonb_typeof(e) <> 'string' or (e #>> '{}') !~ '^[A-Za-z0-9_-]{1,20}$'
  ) then
    raise exception 'Ogiltigt fråge-id';
  end if;

  -- Inga dubbletter
  if (select count(distinct (e #>> '{}')) from jsonb_array_elements(p_ordning) e)
     <> jsonb_array_length(p_ordning) then
    raise exception 'Dubbletter i ordningen';
  end if;

  -- Namn: rensa styrtecken, klipp vid 40 tecken, tomt blir anonymt
  v_namn := nullif(btrim(regexp_replace(coalesce(p_namn, ''), '[[:cntrl:]]', '', 'g')), '');
  if v_namn is not null then
    v_namn := left(v_namn, 40);
  end if;

  v_hash := encode(sha256(convert_to(p_token::text, 'UTF8')), 'hex');

  -- Skydd mot översvämning med nya röster
  if not exists (select 1 from public.rangordning_roster where token_hash = v_hash) then
    select count(*) into v_antal from public.rangordning_roster;
    if v_antal >= 500 then
      raise exception 'För många röster';
    end if;
  end if;

  insert into public.rangordning_roster (token_hash, namn, ordning)
  values (v_hash, v_namn, p_ordning)
  on conflict (token_hash)
  do update set namn = excluded.namn, ordning = excluded.ordning, andrad = now();

  return left(v_hash, 10);
end;
$$;

-- 4d. Ta bort sin egen röst (den som har nyckeln kan radera sin rad).
create or replace function public.radera_min_rost(p_token uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  delete from public.rangordning_roster
  where token_hash = encode(sha256(convert_to(p_token::text, 'UTF8')), 'hex');
end;
$$;

-- 5. Vem får anropa funktionerna: bara de fyra, och bara via API:et ---------------------------
revoke all on function public.hamta_roster()                         from public;
revoke all on function public.hamta_status()                         from public;
revoke all on function public.spara_rost(uuid, text, jsonb)          from public;
revoke all on function public.radera_min_rost(uuid)                  from public;
grant execute on function public.hamta_roster()                      to anon, authenticated;
grant execute on function public.hamta_status()                      to anon, authenticated;
grant execute on function public.spara_rost(uuid, text, jsonb)       to anon, authenticated;
grant execute on function public.radera_min_rost(uuid)               to anon, authenticated;

-- Nyttiga kommandon senare (kör i SQL Editor när du behöver dem):
--   Stäng röstningen nu:        update public.rangordning_installning set stangd = true  where id = 1;
--   Öppna igen:                 update public.rangordning_installning set stangd = false where id = 1;
--   Flytta sista dag:           update public.rangordning_installning set frist = '2026-11-07 12:00+01' where id = 1;
--   Se alla röster:             select namn, ordning, andrad from public.rangordning_roster order by andrad desc;
--   Ta bort en enstaka röst:    delete from public.rangordning_roster where namn = 'Namn att ta bort';
--   Töm alla röster:            truncate public.rangordning_roster;
