# Publiceringskontroll

Använd denna kontroll för den publika versionen av ett samrådsunderlag, samrådsyttrande eller Samrådsguidens eget innehåll.

## Håll isär versioner

- Intern version: arbetsanteckningar, namn, diskussion, osäkra idéer och utkast till personliga mejl.
- Publik version: saklig sammanställning utan personuppgifter eller information som identifierar en intern grupp om anonymitet efterfrågas.
- Bevara lokala interna filer utanför versionshanteringen och blockera dem i `.gitignore` och Git-hooks.

## Kontrollera före delning

- Ta bort namn, e-postadresser, telefonnummer, personnummer, privata kommentarer och spårbara interna filnamn.
- Granska även URL:er, GitHub-sökvägar, sidfot, README och tekniköversikter: en neutral brödtext räcker inte om sökvägen identifierar avsändaren.
- Kontrollera att länkar leder till avsedda och offentliga källor.
- Beskriv material som inte är beslutat eller kvalitetssäkrat som ett utkast eller ett bidrag till fortsatt diskussion. Ange inte i det färdiga materialet att det är AI-assisterat eller AI-genererat.
- Gör inte anspråk på att representera en grupp utan uttryckligt mandat.

## Publik kopia av ett yttrande (Word, Markdown och PDF)

Namn finns på fler ställen än i signaturen. Dessa tre kontrolleras alltid:

- **Texten:** signaturraden och meningar om vem som får eller inte får företräda föreningen.
- **Word-filens egenskaper:** författare, senast sparad av och företag. De följer med från den som skapade filen.
- **Mallänken i Word-filen**, som kan visa en dators mappnamn med ett personnamn.

PDF-filen ärver egenskaperna och innehåller texten, så den kontrolleras också.

Skapa kopian med skriptet (kräver Python, och Word för PDF-filen). Originalet ändras aldrig:

```text
python scripts/skapa_namnlos_kopia.py KÄLLA.docx UT_BAS --namn "Förnamn Efternamn" "Förnamn Efternamn" --stryk-stycke "Början på meningen som ska bort" --not "*Version ÅÅMMDD, utan namn på de som undertecknar.*"
```

- Namnen byts mot `[undertecknare 1]`, `[undertecknare 2]` i den ordning de anges. Stycken som börjar med `--stryk-stycke` byts mot en mening om att texten är utelämnad.
- `UT_BAS` är sökvägen utan filändelse, till exempel `.../Maxima/Yttrande/Utkast/<namn>_ÅÅMMDD_utan_namn`. Filnamnet har alltid `utan_namn`, eftersom de automatiska spärrarna letar efter det.
- Skriptet skriver ut ord med bindestreck mitt i ("renings-verk"). Är det radslutsavstavning från originalet, skriv ihop dem i Markdown-filen med `--foga`.
- Kontrollera valfria filer med `python scripts/kontrollera_namnlos.py fil1.docx fil2.pdf`. Avslutskod 1 betyder fynd.
- Namnlistan ligger utanför repot: `~/.claude/nf_privata_namn.txt`, ett efternamn eller fullständigt namn per rad. Föreningens allmänna adress i brevmallens sidfot är tillåten, personliga adresser inte.
- Äldre versioner av samma yttrande flyttas till `Utkast/old/`, så att mappen bara visar den gällande versionen.

Automatiska spärrar finns i `.githooks/check-public-documents.ps1` (före commit och push) och i Claude Code-hookarna `publik_kontroll_hook.py` (text som skrivs) och `namnlos_bash_hook.py` (Word- och PDF-filer som skapas av skript). Spärrarna gäller filer med `utan_namn` i namnet i `Maxima/Yttrande/Utkast/`.

## Innan Git-publicering

- Granska exakt vilka filer som är stageade.
- Kontrollera särskilt publika huvuddokument manuellt utöver automatiska känslighetskontroller.
- Publicera bara efter uttrycklig begäran från användaren. Kent committar och pushar själv via Cursor som huvudregel.
