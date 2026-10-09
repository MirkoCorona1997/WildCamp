# Mettere WildCamp su iPhone

L'app è una pagina web. iOS non apre un file HTML come app: va messa online in HTTPS, poi scelta una delle due strade.

## 1. App sulla Home, senza App Store

È la strada giusta per usarla subito, da solo o con pochi amici.

1. Carica la cartella `camping-libera` su un sito HTTPS. Vanno bene Netlify, Cloudflare Pages o GitHub Pages. Non aprirla come file dal telefono.
2. Su iPhone, apri Safari e vai all'indirizzo del sito. Chrome non aggiunge bene le app alla Home.
3. Tocca Condividi, poi Aggiungi alla schermata Home.
4. Si apre a tutto schermo, con icona WildCamp. I punti che salvi restano in quel telefono.

La posizione va consentita quando Safari la chiede. Senza rete non scarica mappa, sterrate OSM e meteo.

## 2. App Store, con Capacitor

Serve un Mac, Xcode e un account Apple Developer (99 USD l'anno). Senza Mac non si firma né si pubblica su App Store.

Sul Mac, nella cartella dell'app:

```bash
npm install @capacitor/core @capacitor/cli @capacitor/ios
npx cap init WildCamp app.wildcamp.libera --web-dir .
npx cap add ios
npx cap open ios
```

In Xcode, nel target WildCamp, Info, aggiungi:

- Privacy - Location When In Use Usage Description: `Serve a mostrare la distanza dai punti tenda, acqua e sterrate.`
- Imposta un Bundle ID tuo, firma con il team Apple e scegli il tuo iPhone come destinazione.

Poi Run. Per l'App Store: Product, Archive, poi Distribute.

Apple può rifiutare un involucro che è solo un sito. Conviene tenere posizione, punti salvati sul telefono e uso offline della lista. Non promettere mappe offline se le tessere arrivano da internet.

Dopo ogni modifica al file HTML:

```bash
npx cap copy ios
```

Poi ricompila da Xcode.
