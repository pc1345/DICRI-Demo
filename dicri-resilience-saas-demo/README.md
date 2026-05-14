# Equinox Telecom Resilience Backend Demo

Standalone React + Vite demo for an Equinox Telecom owner/client backend with DICRI positioned as the independent review and certification authority.

## Setup

```bash
npm install
npm run dev
```

Selected port: `8097`

Local URL:

```text
http://localhost:8097
```

## Demo Narrative

Equinox Telecom manages owner-side infrastructure resilience workflows: segment governance, field evidence, equipment registry visibility, exception review, lifecycle risk trends, and worker/team quality insights.

DICRI appears only as the independent review/certification authority. Equinox can send evidence packets to DICRI Review, view review status, respond to evidence requests, and view returned certified records. The client UI does not issue certificates.

## Pages Included

- Executive Dashboard
- Trust Gate Workflow
- Locate Governance Audit Log
- OEM / Equipment Registry
- Exception Review Queue
- Segment Risk Trends
- Field Quality Insights
- DICRI Review

## Local Data

All data is synthetic and local to the React app:

- 10 governed segments / locate notice audit records
- 8 registered devices
- 6 trusted workers
- 5 DICRI review packets
- Region, equipment, status, team, worker, and risk filters

## Product Framing

The client backend focuses on owner-side governance and operational intelligence. DICRI remains independent and is not represented as a client-controlled certificate issuer.
