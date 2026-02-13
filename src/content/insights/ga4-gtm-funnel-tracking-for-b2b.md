---
title: GA4 + GTM Funnel Tracking for B2B (Simple Event Model)
description: Set up a practical GA4 and GTM funnel model for B2B teams so you can measure awareness, intent, and conversion without overtracking.
pubDate: 2026-02-13
tags:
  - ga4
  - gtm
  - funnel-tracking
draft: false
---

Most B2B teams either track too little or track everything.
Both approaches create bad decisions.

A better approach is a **small event model tied to funnel intent**.

## Funnel stage model

Use four macro stages:

1. Awareness
2. Consideration
3. Decision
4. Conversion

Then map pages and actions to those stages.

## Core events to track first

Start with these events in GTM:

- `funnel_stage_view` (page-level stage marker)
- `cta_click` (book call, contact, offer CTA)
- `scroll_depth` (25, 50, 75, 90)
- `outbound_click` (off-site click)
- `file_download` (if you use lead assets)

This baseline is enough for directional funnel reporting.

## Recommended GA4 key events

Do not mark everything as a conversion.
In B2B, mark only clear intent milestones, for example:

- `cta_click` with `cta_type = book-call`
- high-intent form submit events
- qualified demo booking events

Keep newsletter clicks or shallow engagement out of your primary conversion set.

## GTM implementation tips

- Push events into `dataLayer` with stable parameter names.
- Keep naming immutable after launch.
- Use GTM variables for `page_path`, `funnel_stage`, and `cta_type`.
- Test every event in GTM Preview before publishing.

## Governance checklist

- Maintain one event dictionary document.
- Review events quarterly.
- Remove dead tags and triggers.
- Verify event quality in GA4 DebugView after each release.

---

If your current setup is noisy, use this [audit entry point](/b2b-marketing-audit/) to prioritize fixes.
