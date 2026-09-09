# Publiceringskontroll

Använd denna kontroll för den publika versionen av ett samrådsunderlag.

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

## Innan Git-publicering

- Granska exakt vilka filer som är stageade.
- Kontrollera särskilt publika huvuddokument manuellt utöver automatiska känslighetskontroller.
- Publicera bara efter uttrycklig begäran från användaren.
