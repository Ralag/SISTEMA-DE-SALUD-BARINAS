---
name: Sistema Salas
colors:
  primary: "#1c557a"
  secondary: "#64748b"
  success: "#10b981"
  alert: "#f43f5e"
  warning: "#f59e0b"
  background: "#f8fafc"
  surface: "#ffffff"
typography:
  display:
    fontFamily: Space Grotesk
  body:
    fontFamily: Inter
  mono:
    fontFamily: JetBrains Mono
rounded:
  sm: 4px
  md: 8px
  lg: 12px
  xl: 16px
  2xl: 24px
spacing:
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
---
## Overview
**Sistema Salas** is an enterprise/institutional epidemiological platform. 
The aesthetic is clean, clinical, and authoritative, matching the doctrines of Enterprise SaaS with Bento Grid layouts.

## Typography
- **Space Grotesk** is used for display elements, main headings, and large metrics. It adds a technical, modern feel.
- **Inter** is the foundation for all body copy and user interfaces, prioritizing ultimate legibility.
- **JetBrains Mono** is reserved for raw data, ID tags, dates, and mathematical numbers where alignment is crucial.

## Colors
The color palette avoids overly saturated tones typical of older government software, favoring semantic clarity.
- **Primary (Blue/Indigo):** Used for primary actions, navigation, and branding. It represents security, institution, and trust.
- **Success (Emerald):** Represents optimal operational metrics, successfully saved data, or completed tasks.
- **Neutral (Slate):** The foundational scale. `slate-50` for background to reduce eye strain, `slate-900` for anchoring sidebar elements, and `slate-500` for secondary text.
- **Alert (Rose/Red):** Exclusive for epidemiological alerts (E.N.O) and system errors.
- **Warning (Amber):** Used for preventive warnings (delayed reports).

## Layout and Architecture
- **Bento Grid:** The interface relies heavily on compartmentalized rectangular cards with highly rounded borders (`rounded-2xl`).
- **Depth:** Instead of harsh borders, soft drop shadows (`shadow-sm`) and ultra-fine borders (`border-slate-200` in light mode, `border-slate-800` in dark mode) create hierarchy.
- **Dark Mode:** A core feature, seamlessly switching the palette to deep grays (`slate-900`/`slate-950`) to reduce glare in clinical environments.
