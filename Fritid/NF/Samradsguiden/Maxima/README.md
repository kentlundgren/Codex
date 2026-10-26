# MAXIMA i Samrådsguiden: omröstningen om frågorna i skede 5

- **Live:** [https://kentlundgren.github.io/Codex/Fritid/NF/Samradsguiden/Maxima/rangordning.html](https://kentlundgren.github.io/Codex/Fritid/NF/Samradsguiden/Maxima/rangordning.html)
- **Utkasten (upplägg A, KL_261026 m.fl.):** [Fritid/NF/Maxima/Yttrande/Utkast](https://github.com/kentlundgren/Codex/tree/main/Fritid/NF/Maxima/Yttrande/Utkast). Obs: de ligger i mappen `Maxima` direkt under `NF`, inte i den här mappen.

*Utkast av Kent Lundgren, 2026-10-26. Omröstningen är ett underlag för samtal i gruppen och inte ett beslut av någon förening.*

Mappen innehåller bara omröstningen. Resten av MAXIMA-materialet finns på andra ställen:

| Vad | Var |
|---|---|
| Första sida för MAXIMA: förlopp, begrepp, lärdomar, läget just nu | [maxima.html](../maxima.html) ([live](https://kentlundgren.github.io/Codex/Fritid/NF/Samradsguiden/maxima.html)) |
| Dokumenten: föreningens texter, spårbarhet, ändringslogg | [Maxima/Struktur](https://github.com/kentlundgren/Codex/tree/main/Fritid/NF/Maxima/Struktur) ([live](https://kentlundgren.github.io/Codex/Fritid/NF/Maxima/Struktur/)) |
| Handlingarna (PDF) och utkasten, bland annat upplägg A och KL_261026 | [Maxima](https://github.com/kentlundgren/Codex/tree/main/Fritid/NF/Maxima) |
| Omröstningen om frågorna i skede 5 | [rangordning.html](rangordning.html) (den här mappen) |

Skript, form och databas finns utanför mappen, se nedan.

## Filer

| Fil | Vad den är |
|---|---|
| [rangordning.html](rangordning.html) | Omröstningen: gruppen rangordnar frågorna i yttrandet över VA SYD:s bemötande (skede 5). Innehåller Tabell 6 (frågorna) och Tabell 6A (var varje fråga finns i upplägg A, KL_261026 och tidigare skeden). |
| [rangordning_prototyp.html](rangordning_prototyp.html) | En tidig prototyp. Används inte av omröstningen. |

Skripten och formen ligger i [../rangordning/](../rangordning/) (`rangordning.js`, `rangordning.css`, `rangordning_config.js`). Databasen och hur den är uppsatt beskrivs i [../supabase.md](../supabase.md). Sidan använder också [../styles.css](../styles.css) och [../script.js](../script.js).

## Hur omröstningen fungerar

- Besökaren drar frågorna eller använder pilknapparna. Rösten sparas automatiskt, utan inloggning. Namn är frivilligt.
- Gruppens rangordning är medelplatsen av alla röster. Tabell 6 ordnas om efter den.
- Röstningen stänger efter sista dag, 6 november 2026 (`frist` i `rangordning_config.js`).

## Så ändrar du frågorna

Varje fråga är en rad i Tabell 6 i `rangordning.html` (`<tr data-id="f01" …>`). Raderna styr allt: listan, märkningen och hovringstexten.

- `data-id` får inte ändras. Rösterna i databasen lagras med id:t. Tas en rad bort räknas dess röster bort, och tillkommer en rad räknas den som sist för dem som röstade tidigare.
- `data-titel` är rubriken, `data-kort` den korta förklaringen som alltid syns, och `data-forklaring` texten vid hovring, fokus och tryck.
- `data-niva` är `huvud` eller `bilaga` och anger var frågan står i KL_261026. `data-a` är `ja` eller `nej` och anger om frågan finns i upplägg A.
- Håll Tabell 6 här och i [maxima.html](../maxima.html#tabell-6) lika, och uppdatera Tabell 6A.
- Är ändringarna stora kan en administratör nollställa rösterna med knappen på sidan. Det kräver en kod som inte står i repot.

## Publiceringskontroll

Sidan innehåller inga personnamn eller kontaktuppgifter. De som röstar kan skriva ett namn som då visas öppet. Kontrollera nya rubriker och texter innan de pushas.

## Lokal sökväg

`C:\Users\kentl\OneDrive\AI\Codex\Fritid\NF\Samradsguiden\Maxima`
