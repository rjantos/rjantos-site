# Tracking (GTM + GA4)

## Container and IDs

- **GTM container:** GTM-W4WBD6BP (rjantos.com)
- **GA4:** Loaded via GA4.astro. Can be moved into GTM as a GA4 Configuration tag when ready.

## dataLayer events

- **cta_click** – Fired when user clicks a tracked CTA. Parameters: cta_type, cta_location, cta_href. CTA types: book-call, email (from data-track on links/buttons).
- **gtm.js** – Built-in when GTM container loads.

## How to test

1. GTM Preview: In GTM UI, open Preview, enter rjantos.com. Confirm container loads.
2. GA4 DebugView: In GA4, enable DebugView. Check page_view and events.
3. dataLayer: In DevTools console run `window.dataLayer`. After a CTA click you should see an object with `event: cta_click`.

## Release checklist

- GTM container published if you changed tags/triggers.
- npm run build passes locally.
- After deploy: GTM Preview on production URL shows container.
- Click a Book a call or email CTA and confirm cta_click appears in dataLayer.

## Consent

Consent Mode defaults are denied in GTM.astro. When you add a banner/CMP, call `window.__setAnalyticsConsent(true)` after the user accepts.
