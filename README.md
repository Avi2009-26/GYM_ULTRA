# 🏋️‍♂️ Training Tracker

Ein super einfacher, digitaler Notizzettel für dein tägliches Fitness-Programm! Du kannst eintragen, was du trainiert hast und ob du danach duschen oder in lauter Saunagänge gehüpft bist.

## 🌟 Was macht diese App?

Wenn du auf **"Posten"** klickst, wird dein Eintrag sofort unten auf dem Bildschirm angezeigt – genau wie bei einem Social-Media-Feed! 

⚠️ **Wichtig für Nicht-Techies:** Diese App nutzt **keine** Datenbank und speichert absolut nichts im Hintergrund ab. Das bedeutet:
* Es ist absolut **privat** – niemand außer dir kann sehen, was du eintippst.
* Das Ganze läuft komplett im flüchtigen "Kurzzeitgedächtnis" deines Internet-Browsers.
* Sobald du die Seite **aktualisierst (Refresh klickst) oder den Tab schließt**, wird alles komplett gelöscht und startet wieder blitzblank sauber. Perfekt für einen schnellen, anonymen Check deines Tages-Workouts!

---

## 🛠️ Wie es hinter den Kulissen funktioniert (Für Neugierige)

Für die Programmierer unter uns: Das Projekt verzichtet komplett auf externe Datenbanken (wie Firebase) oder dauerhafte Browser-Speicher (wie `localStorage`). Stattdessen nutzt es einfache, flüchtige Logik:

* **In-Memory-Speicher:** Alle Beiträge landen in einer simplen JavaScript-Liste (`[]`) direkt im Arbeitsspeicher des Browsers.
* **Statische UI-Aktualisierung:** Jedes Mal, wenn du postest, löscht eine Funktion (`renderPosts()`) kurz das alte Sichtfenster und baut die Liste aus dem Speicher blitzschnell neu auf dem Bildschirm auf.
* **Automatischer Reset:** Da Variablen im Browser bei einem Seiten-Reload komplett neu initialisiert werden, leert sich die Liste beim Aktualisieren von ganz alleine.
