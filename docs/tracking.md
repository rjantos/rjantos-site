# Tracking setup (GTM + GA4 funnel model)

## 1) IDs and environment variables

Create a `.env` file from `.env.example`:

```bash
PUBLIC_GTM_ID=GTM-W4WBD6BP
PUBLIC_GA4_ID=G-91S7J11B9J
PUBLIC_ASYNC_FORM_ENDPOINT=
PUBLIC_CONTACT_EMAIL=hi@rjantos.com
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
- `book_call_click`
  - params: `cta_type`, `cta_label`, `cta_href`, `page_path`, `page_title`
- `outbound_click`
  - params: `link_url`, `link_domain`, `link_text`
- `scroll_depth`
  - params: `scroll_percent` (25, 50, 75, 90)
- `file_download`
  - params: `file_url`
- `lead_form_start`
  - params: `form_name`, `form_source`
- `lead_form_submit_attempt`
  - params: `form_name`, `lead_source`
- `lead_form_submit`
  - params: `form_name`, `lead_source`
- `lead_form_error`
  - params: `form_name`, `lead_source`
- `attribution_capture`
  - params: `attribution_keys`

### CTA instrumentation

Any link or button with `data-track="<type>"` will fire `cta_click`.

Forms marked with `data-track-form` and `data-attribution-form` will:

- emit form events (`lead_form_start`, `lead_form_submit_attempt`, etc.)
- receive persisted attribution fields (UTMs, click IDs, landing/referrer context)

Current common values:

- `book-call`
- `email`
- `offer`
- `lead-magnet`

## 3) GTM configuration (recommended baseline)

### Tags

1. **GA4 Configuration**
   - Measurement ID: `G-91S7J11B9J`
   - Trigger: All Pages
2. **GA4 Event - cta_click**
   - Event name: `cta_click`
   - Trigger: Custom Event `cta_click`
3. **GA4 Event - book_call_click**
   - Event name: `book_call_click`
   - Trigger: Custom Event `book_call_click`
4. **GA4 Event - funnel_stage_view**
   - Event name: `funnel_stage_view`
   - Trigger: Custom Event `funnel_stage_view`
5. **GA4 Event - scroll_depth**
   - Event name: `scroll_depth`
   - Trigger: Custom Event `scroll_depth`
6. **GA4 Event - outbound_click**
   - Event name: `outbound_click`
   - Trigger: Custom Event `outbound_click`
7. **GA4 Event - lead_form_submit**
   - Event name: `lead_form_submit`
   - Trigger: Custom Event `lead_form_submit`
8. **GA4 Event - lead_form_submit_attempt**
   - Event name: `lead_form_submit_attempt`
   - Trigger: Custom Event `lead_form_submit_attempt`

### Variables (Data Layer)

- `cta_type`
- `cta_label`
- `cta_href`
- `funnel_stage`
- `scroll_percent`
- `page_path`
- `form_name`
- `lead_source`
- `utm_source`
- `utm_medium`
- `utm_campaign`
- `gclid`

## 4) GA4 key events for funnel reporting

In GA4 Admin, mark key events:

- `book_call_click` (recommended dedicated key event)
- `lead_form_submit`
- optionally `cta_click` filtered to `cta_type = lead-magnet` as supporting metric

Keep key events strict. Do not promote low-intent engagement events.

## 5) Testing checklist

1. Open GTM Preview for production URL.
2. Visit homepage, resources page, and offer page.
3. Confirm `funnel_stage_view` fires with expected stage value.
4. Click book-call and email CTAs; confirm `cta_click` and `book_call_click`.
5. Submit an async form; confirm `lead_form_submit_attempt` and `lead_form_submit`.
6. In GA4 DebugView, verify events and parameters.

## 6) Consent

When you add a cookie banner/CMP, call:

```js
window.__setAnalyticsConsent(true);
```

to grant analytics/ad consent after user acceptance.

## 7) Fast go-live checklist (15-20 minutes)

### A) Set async form endpoint in `.env`

1. Create endpoint in Formspree (or your webhook provider).
2. Copy endpoint URL (example: `https://formspree.io/f/xxxxabcd`).
3. Set in `.env`:

```bash
PUBLIC_ASYNC_FORM_ENDPOINT=https://formspree.io/f/xxxxabcd
```

4. Deploy with updated env vars.

### B) Publish GTM tags for new conversion events

In GTM (Container `GTM-W4WBD6BP`):

1. Create Trigger: Custom Event `book_call_click`
2. Create Trigger: Custom Event `lead_form_submit`
3. Create GA4 Event Tag `book_call_click` with trigger `book_call_click`
4. Create GA4 Event Tag `lead_form_submit` with trigger `lead_form_submit`
5. Save -> Preview -> verify events fire -> Submit/Publish container.

### C) Mark GA4 key events

In GA4 Admin -> Data display -> Events:

1. Locate `book_call_click` and toggle **Mark as key event**
2. Locate `lead_form_submit` and toggle **Mark as key event**

Optional:

- Keep `cta_click` as a diagnostic/supporting event.
- Use `lead_form_submit_attempt` to monitor friction vs completed submissions.
