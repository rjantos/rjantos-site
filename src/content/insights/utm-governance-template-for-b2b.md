---
title: UTM Governance Template for B2B Teams
description: Use this UTM governance template to reduce unassigned traffic, improve attribution quality, and keep campaign reporting consistent.
pubDate: 2026-02-13
tags:
  - utm
  - attribution
  - b2b
draft: false
---

Attribution quality starts with disciplined campaign tagging.

If your team uses ad platforms, email tools, sales outreach, and partner links,
you need one shared UTM standard.

## Minimum UTM schema

Required:

- `utm_source`
- `utm_medium`
- `utm_campaign`

Optional:

- `utm_content`
- `utm_term`

## Naming rules

- lowercase only
- underscores instead of spaces
- no ad-hoc mediums
- no local language variants for core medium values

## Example values

### Source

- google
- linkedin
- newsletter
- partnername

### Medium

- cpc
- paid_social
- email
- referral

### Campaign

- q1_demand_gen
- ga4_migration_offer
- revops_webinar

## Governance process

1. One owner approves medium taxonomy
2. Teams use a shared link builder
3. QA check before campaign launch
4. Monthly audit for malformed or missing UTMs

## What to monitor in GA4

- growth in Unassigned and Direct
- appearance of malformed mediums (for example `Paid-Social`, `paidsocial`, `socialpaid`)
- campaign names that violate naming rules

---

If your channels already disagree, start with the [offer page](/offer/) and fix tracking in priority order.
