# Plangruppskalender

Möten i plangruppen, Lunds Naturskyddsförening. En liten statisk sida med möteslista, månadsvy och en ICS-fil som går att lägga till i Google Kalender.

**Live-sida:** https://kentlundgren.github.io/Codex/Fritid/NF/Plangruppen/Plangruppskalender/

Överordnade mappar: [Fritid](https://kentlundgren.github.io/Codex/Fritid/) · [NF](https://kentlundgren.github.io/Codex/Fritid/NF/) · [Plangruppen](https://kentlundgren.github.io/Codex/Fritid/NF/Plangruppen/)

## Lokalt repo

Repo-rot lokalt:

`C:\Users\kentl\OneDrive\AI\Codex`

Den här mappen lokalt:

`C:\Users\kentl\OneDrive\AI\Codex\Fritid\NF\Plangruppen\Plangruppskalender`

På GitHub: <https://github.com/kentlundgren/Codex/tree/main/Fritid/NF/Plangruppen/Plangruppskalender>

## Innehåll

- `index.html` / `styles.css` / `script.js` — sidan.
- `moten.js` — möteslistan. Lägg till nya möten här.
- `plangrupp.ics` — samma möten i kalenderformat, för prenumeration i Google Kalender.
- `.gitignore` — bara lokala OS-filer. Kalendern ska med till GitHub.

## Google Kalender

Sidan synkar inte tvåvägs med Google. Den kan inte skriva i Kents Google-konto.

Efter publicering: klicka Kopiera vid ICS-adressen på sidan. I Google Kalender: plus vid Andra kalendrar → Från URL, klistra in adressen. Lämna rutan Gör kalendern tillgänglig för alla avkryssad. Adressen är:

https://kentlundgren.github.io/Codex/Fritid/NF/Plangruppen/Plangruppskalender/plangrupp.ics

När ett möte läggs till: uppdatera både `moten.js` och `plangrupp.ics`.

Första posten är plangruppmötet onsdagen den 9 september 2026, kl. 17–19, Lunds stadsbibliotek.

## Djuplänkar

| Ankare | URL |
|---|---|
| `#moten` | https://kentlundgren.github.io/Codex/Fritid/NF/Plangruppen/Plangruppskalender/#moten |
| `#manad` | https://kentlundgren.github.io/Codex/Fritid/NF/Plangruppen/Plangruppskalender/#manad |
| `#google` | https://kentlundgren.github.io/Codex/Fritid/NF/Plangruppen/Plangruppskalender/#google |
| `#lagg-till-google` | https://kentlundgren.github.io/Codex/Fritid/NF/Plangruppen/Plangruppskalender/#lagg-till-google |
| `#prenumerera` | https://kentlundgren.github.io/Codex/Fritid/NF/Plangruppen/Plangruppskalender/#prenumerera |

## Publicering

Kent committar och pushar den här sidan själv via Cursor. En tom mapp syns inte på GitHub. Därför fanns inte `Plangruppskalender` där förrän de här filerna fanns.
