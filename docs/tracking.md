# Tracking setup (GTM + GA4 funnel model)

## 1) IDs and environment variables

Create a `.env` file from `.env.example`:

```bash
PUBLIC_GTM_ID=GTM-W4WBD6BP
PUBLIC_GA4_ID=G-91S7J11B9J
```

Implementation notes:

- GTM is the primary loader.
- Direct GA4 script is loaded only when GTM ID is missing (to avoid duplicate tracking).
- Consent Mode defaults are denied until user consent is granted.

## 2) Event model implemented in the site

### Automatically pushed events

- `funnel_stage_view`
  - params: `funnel_stage`
  - values from page layout: `awareness`, `consideration`, `decision`, `conversion`
- `cta_click`
  - params: `cta_type`, `cta_label`, `cta_href`, `page_path`, `page_title`
- `outbound_click`
  - params: `link_url`, `link_domain`, `link_text`
- `scroll_depth`
  - params: `scroll_percent` (25, 50, 75, 90)
- `file_download`
  - params: `file_url`

### CTA instrumentation

Any link or button with `data-track="<type>"` will fire `cta_click`.

Current common values:

- `book-call`
- `email`
- `offer`

## 3) GTM configuration (recommended baseline)

### Tags

1. **GA4 Configuration**
   - Measurement ID: `G-91S7J11B9J`
   - Trigger: All Pages
2. **GA4 Event - cta_click**
   - Event name: `cta_click`
   - Trigger: Custom Event `cta_click`
3. **GA4 Event - funnel_stage_view**
   - Event name: `funnel_stage_view`
   - Trigger: Custom Event `funnel_stage_view`
4. **GA4 Event - scroll_depth**
   - Event name: `scroll_depth`
   - Trigger: Custom Event `scroll_depth`
5. **GA4 Event - outbound_click**
   - Event name: `outbound_click`
   - Trigger: Custom Event `outbound_click`

### Variables (Data Layer)

- `cta_type`
- `cta_label`
- `cta_href`
- `funnel_stage`
- `scroll_percent`
- `page_path`

## 4) GA4 key events for funnel reporting

In GA4 Admin, mark key events:

- `cta_click` filtered to `cta_type = book-call`
- any validated lead-submit event (when forms are implemented)

Keep key events strict. Do not promote low-intent engagement events.

## 5) Testing checklist

1. Open GTM Preview for production URL.
2. Visit homepage, resources page, and offer page.
3. Confirm `funnel_stage_view` fires with expected stage value.
4. Click book-call and email CTAs; confirm `cta_click`.
5. In GA4 DebugView, verify events and parameters.

## 6) Consent

When you add a cookie banner/CMP, call:

```js
window.__setAnalyticsConsent(true);
```

to grant analytics/ad consent after user acceptance.
