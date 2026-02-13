---
title: "GA4 vs CRM Attribution: Why Numbers Don’t Match (and What to Do)"
description: Understand why GA4 and CRM attribution disagree in B2B and how to reconcile channel reporting with pipeline and revenue outcomes.
pubDate: 2026-02-13
tags:
  - ga4
  - crm
  - attribution
draft: false
---

If GA4 and CRM disagree, both systems might be partially right.
They are measuring different parts of reality.

## Why numbers diverge

- GA4 captures observable web behavior, not full sales context
- CRM includes sales interventions, offline context, and manual edits
- Attribution windows and models differ by platform
- Source fields are often overwritten during lifecycle workflows

## Reconciliation framework

### 1) Standardize definitions

Define exactly what counts as:

- lead
- qualified lead
- opportunity
- closed-won revenue

### 2) Capture source at conversion time

Store in CRM:

- original landing page
- UTM fields
- first touch and last touch logic

### 3) Validate with closed-won sampling

Manually trace 5-10 recent wins.
If these cannot be reconciled, strategic reporting is not reliable yet.

### 4) Use each system for its strength

- GA4: behavior and directional channel signals
- CRM: pipeline and revenue truth

---

For a practical reconciliation plan across GA4, GTM, and CRM, start at [Offer](/offer/).
