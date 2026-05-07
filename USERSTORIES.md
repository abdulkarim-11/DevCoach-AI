
# Epic 1: Dagelijkse invoervelden en Taken beheren
## Userstory 1:
Als student
Wil ik per dag mijn gewerkte uren en de uitgevoerde taken kunnen invoeren
Zodat ik een accuraat logboek heb van mijn werkzaamheden.

    Acceptatiecriteria:

        Er is een invulformulier met velden voor datum, aantal uren (numeriek), en een tekstveld voor de concrete taak.

        De student kan meerdere taken per dag toevoegen.

        Ingevoerde data wordt veilig opgeslagen in de database.

## Userstory 2: 
Als applicatie
Wil ik de ingevoerde taken automatisch via AI laten controleren op specificiteit
Zodat de student gedwongen wordt om concrete en duidelijke omschrijvingen te gebruiken.

    Acceptatiecriteria:

        De applicatie stuurt de taakomschrijving naar de AI-component.

        Als de AI de taak als "te algemeen" markeert (bijv. "Aan de app gewerkt"), krijgt de student direct constructieve feedback in de UI.

        De taak kan pas definitief worden opgeslagen of gemarkeerd als 'voltooid' wanneer deze de AI-check passeert of door de student specifiek genoeg is herschreven.

## Userstory 3:
Als student
Wil ik aan het einde van mijn dag reflecteren op wat er goed ging en wat beter kon
Zodat ik bewust bezig ben met mijn leerproces.

    Acceptatiecriteria:

        Er zijn twee verplichte tekstvelden per dag: "Wat ging er goed?" en "Wat kan er beter?".

        De dagelijkse invoer kan niet worden afgesloten zonder deze velden in te vullen.

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/f7f4ba5a-0c7e-4757-bd5f-0c2822c49f85

# Epic 2: Bewijs kunnen inleveren
## Userstory 4:
Als student
Wil ik bewijsmateriaal kunnen toevoegen aan elke specifieke taak
Zodat ik kan aantonen dat ik het werk daadwerkelijk heb uitgevoerd.

    Acceptatiecriteria:

        Per taak is er een optie om bewijs toe te voegen in de vorm van: bestandsupload (screenshot, ontwerp, testverslag), een URL (GitHub link) of een codefragment (tekstvak).

        Er is een verplicht tekstveld voor een "korte toelichting" op het geleverde bewijs.

        Een taak krijgt de status "Incompleet" zolang er geen geldig bewijs is gekoppeld.

# Epic 3: Werkprocessen koppelen
## Userstory 5:
Als student
Wil ik dat de App automatisch werkprocessen aanbeveeld op basis van mijn taakomschrijving
Zodat ik geholpen word bij het koppelen van de praktijk en de theorie.

    Acceptatiecriteria:
    De AI analyseert de goedgekeurde taakomschrijving en stelt 1 of meerdere werkprocessen voor (bijv. B1-K1-W3).

    De suggesties worden overzichtelijk getoond in de UI.

    De student kan met één klik een voorstel accepteren of afwijzen.

## Userstory 6:
Als student
Wil ik zelfstandig werkprocessen kunnen toevoegen, bewerken of verwijderen bij een taak
Zodat ik altijd de volledige controle en eindverantwoordelijkheid behoud.

    Acceptatiecriteria:

        De student kan zoeken in een dropdown/lijst van alle beschikbare werkprocessen.

        Het is mogelijk om meerdere werkprocessen aan één enkele taak te koppelen.

        Gekoppelde werkprocessen kunnen eenvoudig met een 'x' icoon worden verwijderd.

# Epic 4: AI interacties
## Userstory 7:
Als student
Wil ik persoonlijke feedback ontvangen van de AI op mijn ingevulde reflectie
Zodat ik dieper kan nadenken over mijn ontwikkeling als software developer.

    Acceptatiecriteria:

        Nadat de dagelijkse reflectie is opgeslagen, genereert de AI een korte, bemoedigende en kritische reactie.

        De feedback is direct zichtbaar onder de reflectie van de student.
## Userstory 8:
Als student
Wil ik gerichte vragen kunnen stellen aan de AI-coach (bijv. "Hoe schrijf ik dit beter?")
Zodat ik direct hulp krijg wanneer ik vastloop met mijn logboek.

    Acceptatiecriteria:

        Er is een chat-interface of help-knop beschikbaar tijdens het invullen van het logboek.

        De AI heeft context van de huidige invoer van de student, zodat het gerichte antwoorden kan geven op vragen over taakomschrijvingen of werkprocessen.

# Epic 5: AI Weekoverzicht
## Userstory 9:
Als student
Wil ik aan het einde van de week een door AI gegenereerd overzicht ontvangen
Zodat ik de grote lijn van mijn leerproces en prestaties kan zien.

    Acceptatiecriteria:

        De AI genereert wekelijks een rapport op basis van de dagelijkse invoer.

        Het rapport bevat: een analyse van de ontwikkeling, een lijst van behandelde werkprocessen, een lijst van ontbrekende werkprocessen binnen de module/periode, en concrete tips voor de komende week.

## Userstory 10:
Als Student
Wil ik het wekelijkse AI Overzicht kunnen exporteren naar PDF
Zodat ik het overzicht nooit kwijt kan raken en kan inleveren.

    Acceptatiecriteria:
    Er is een "Export naar PDF" knop aanwezig op het wekelijkse overzicht.

    De PDF is netjes opgemaakt en bevat: datum, gewerkte uren, specifieke taken inclusief toelichting, links naar bewijsmateriaal, reflecties en de Weekly AI Review.

# Epic 6: Notificaties
## Userstory 11:
Als student
Wil ik een notificatie als herrinering als ik het logboek nog niet heb ingevuld
Zodat ik het niet vergeet.

    Acceptatiecriteria:

        Het systeem controleert dagelijks op een ingesteld tijdstip (bijv. 16:00 uur) of er een logboek-entry is voor die dag.

        Indien dit ontbreekt, wordt er een reminder gestuurd (bijvoorbeeld via e-mail of pushnotificatie, afhankelijk van de architectuur).
**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
