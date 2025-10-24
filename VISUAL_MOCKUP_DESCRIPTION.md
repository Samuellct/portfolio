# About Section - Visual Mockup Description

This document provides a detailed visual description of the redesigned About section to help understand the layout and interactions without viewing the live site.

---

## Desktop View (1920px)

### Section Header
```
┌────────────────────────────────────────────────────────────┐
│                                                            │
│                    About me                                │
│        From particle collisions to data patterns           │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

**Visual Details:**
- Large, bold title centered (48px font size)
- Subtitle in lighter gray below (18px)
- Generous spacing (80px margin bottom)

---

### Hero Section (Main Story + Quick Stats)

```
┌─────────────────────────────────┬──────────────────┐
│                                 │                  │
│  ⚡ From particle collisions... │  ┌──────────┐   │
│                                 │  │  🔬  2   │   │
│  My journey started with a      │  │ LHC Exp  │   │
│  simple question: What makes    │  └──────────┘   │
│  the universe tick? That        │                  │
│  curiosity led me from          │  ┌──────────┐   │
│  studying B meson decays...     │  │  💻 6+   │   │
│                                 │  │Languages │   │
│  Now I'm at a crossroads—       │  └──────────┘   │
│  PhD in experimental physics    │                  │
│  or diving into data            │  ┌──────────┐   │
│  engineering. Either way,       │  │  ✨  ∞   │   │
│  I'm all in.                    │  │Curiosity │   │
│                                 │  └──────────┘   │
└─────────────────────────────────┴──────────────────┘
```

**Visual Details:**

Left Card (2/3 width):
- Dark slate background with subtle transparency
- Blue gradient accent on hover
- Zap icon in gradient box (top left)
- Large, readable text (18px body copy)
- Orange highlight box around key statement
- Hover: Card lifts 4px with enhanced shadow

Right Column (1/3 width):
- Three stacked stat cards
- Each card has:
  - Gradient icon background
  - Large number (36px bold)
  - Small label below (14px)
- Hover: Individual cards scale 1.05x and lift

**Color Scheme:**
- Background: rgba(15, 23, 42, 0.5) [Dark slate with transparency]
- Border: #334155 [Slate 700]
- Accent: Blue to Cyan gradient
- Text: #f8fafc [Slate 50]

---

### Values Section (What Drives Me)

```
              What Drives Me

┌──────────────┬──────────────┬──────────────┐
│              │              │              │
│      🔬      │      🚀      │      🤝      │
│              │              │              │
│  Scientific  │  Continuous  │     Team     │
│    Rigor     │   Learning   │   Science    │
│              │              │              │
│ [HOVER TO    │ [HOVER TO    │ [HOVER TO    │
│  FLIP CARD]  │  FLIP CARD]  │  FLIP CARD]  │
│              │              │              │
└──────────────┴──────────────┴──────────────┘
```

**Card Front (Before Flip):**
- Large emoji icon (72px) centered
- Title below in blue (#60a5fa)
- Subtle border and background
- Height: 200px

**Card Back (After Flip - 180° Y-axis rotation):**
```
┌──────────────────────────────┐
│                              │
│  Every conclusion needs      │
│  evidence. Every analysis    │
│  needs validation.           │
│  No shortcuts.               │
│                              │
└──────────────────────────────┘
```
- Orange-tinted gradient background
- White text centered
- Descriptive paragraph
- Border changes to orange (#f97316)

**Interaction:**
- Desktop: Hover triggers flip
- Mobile: Tap toggles flip
- Animation: 0.6s smooth 3D rotation
- Backface hidden for clean effect

---

### Goals and Other Skills Row

```
┌───────────────────────────────┬───────────────────────────┐
│                               │                           │
│  🚀 Professional Goals        │  👥 Other Skills          │
│                               │                           │
│  Today, two paths are open    │  • Data analysis          │
│  to me: pursuing a PhD in     │  • Scientific comm.       │
│  experimental physics or      │  • French (native)        │
│  joining a data science /     │  • English (fluent)       │
│  data engineering project.    │                           │
│  Both represent exciting      │  [Dots pulse on hover]    │
│  challenges...                │                           │
│                               │                           │
└───────────────────────────────┴───────────────────────────┘
```

**Visual Details:**

Left Card:
- Rocket icon with orange color
- Orange-accented title
- Paragraph text in readable gray
- Border highlights on hover

Right Card:
- Users icon with green color
- Two-column grid of skills
- Green dot bullets (scale 1.5x on hover)
- Text transitions to white on hover

---

### Technical Skills (Preserved Original Design)

```
                Technical Skills

┌────┐  ┌────┐  ┌────┐  ┌────┐  ┌────┐  ┌────┐  ┌────┐  ┌────┐  ┌────┐
│ 🟦 │  │ 🔵 │  │ 🟨 │  │ 🔷 │  │ 🔵 │  │ 🟧 │  │ 🟩 │  │ 🟠 │  │ 🔵 │
│    │  │    │  │    │  │    │  │    │  │    │  │    │  │    │  │    │
│ARD │  │C++ │  │PYT │  │ R  │  │TS  │  │HTM │  │TEX │  │GIT │  │DOC │
│UIN │  │    │  │HON │  │    │  │    │  │L5  │  │    │  │    │  │KER │
│O   │  │    │  │    │  │    │  │    │  │    │  │    │  │    │  │    │
└────┘  └────┘  └────┘  └────┘  └────┘  └────┘  └────┘  └────┘  └────┘
```

**Interaction:**
- Cards lift 8px on hover
- Icon scales 1.1x
- Gradient background fades in
- Glow effect appears
- Border color changes to match gradient
- Staggered entrance animation (0.1s delay between each)

---

### CV Download Button

```
                 ┌─────────────────────────┐
                 │  📥  Resume ↗          │
                 └─────────────────────────┘
```

**Visual Details:**
- Centered at bottom
- Blue to purple gradient background
- Download icon on left
- White bold text
- Hover: Scale 1.05x + enhanced glow
- Click: Scale 0.95x (tactile feedback)

---

## Mobile View (375px)

### Stacked Layout
```
┌─────────────────────────┐
│                         │
│      About me           │
│  From particle...       │
│                         │
├─────────────────────────┤
│                         │
│  ⚡ Story Card          │
│                         │
│  My journey started...  │
│                         │
├─────────────────────────┤
│  🔬  2                 │
│  LHC Experiments        │
├─────────────────────────┤
│  💻 6+                 │
│  Programming Languages  │
├─────────────────────────┤
│  ✨  ∞                 │
│  Curiosity Level        │
├─────────────────────────┤
│    What Drives Me       │
│                         │
│  ┌───────────────────┐ │
│  │   🔬 Scientific   │ │
│  │      Rigor        │ │
│  └───────────────────┘ │
│                         │
│  ┌───────────────────┐ │
│  │   🚀 Continuous   │ │
│  │     Learning      │ │
│  └───────────────────┘ │
│                         │
│  ┌───────────────────┐ │
│  │   🤝 Team Science │ │
│  └───────────────────┘ │
│                         │
├─────────────────────────┤
│  🚀 Goals              │
│  [Text content]         │
├─────────────────────────┤
│  👥 Skills             │
│  • Item                 │
│  • Item                 │
├─────────────────────────┤
│  [Tech Skills Grid]     │
│  Wraps to 2-3 columns   │
├─────────────────────────┤
│  [Download CV Button]   │
│                         │
└─────────────────────────┘
```

**Mobile Optimizations:**
- Single column layout
- Reduced padding (1rem vs 2rem)
- Smaller font sizes (clamp function)
- Touch-optimized hit areas (min 44px)
- Tap to flip cards (not hover)
- Reduced motion for better performance

---

## Animation Sequences

### Page Load Animation
```
Timeline (sequential):
0.0s - Section header fades in + moves up
0.2s - Hero story card slides in from left
0.4s - Quick stats slide in from right
0.6s - "What Drives Me" title appears
0.7s - First value card appears
0.8s - Second value card appears
0.9s - Third value card appears
1.0s - Goals section slides in from left
1.2s - Skills section slides in from right
1.4s - Technical skills grid appears
1.4s+ - Each tech skill card staggers in (0.1s apart)
```

**Performance:** All animations use GPU-accelerated properties (transform, opacity only)

### Scroll Trigger Animation
```
User scrolls → Card enters viewport (20% visible) →
Wait 100ms → Fade in + slide up →
Complete in 0.8s with custom easing
```

### Hover/Interaction Animations
```
Card Hover:
- Lift: translateY(-4px) in 0.3s
- Shadow: Enhance in 0.3s
- Gradient: Fade in opacity 0.4s

Flip Card:
- Rotate: 0deg → 180deg in 0.6s
- Easing: cubic-bezier(0.4, 0, 0.2, 1)
- Preserve 3D perspective

Stat Card Hover:
- Scale: 1.0 → 1.05 in 0.2s
- Lift: translateY(-4px)
- Icon scale: 1.0 → 1.1
```

---

## Color Palette Reference

### Primary Colors
```
Blue Scale:
#eff6ff  - Primary 50  (Backgrounds)
#60a5fa  - Primary 400 (Accents)
#2563eb  - Primary 600 (Hover states)
#1d4ed8  - Primary 700 (Active states)
```

### Accent Colors
```
Orange Scale:
#fb923c  - Accent 400 (Secondary accents)
#f97316  - Accent 500 (Call-to-action)
#ea580c  - Accent 600 (Hover)
```

### Neutral Scale
```
Slate Scale:
#f8fafc  - Slate 50  (Primary text)
#e2e8f0  - Slate 200 (Borders light)
#cbd5e1  - Slate 300 (Secondary text)
#475569  - Slate 600 (Tertiary text)
#334155  - Slate 700 (Border default)
#1e293b  - Slate 800 (Card background)
#0f172a  - Slate 900 (Page background)
```

### Gradients
```
Blue-Cyan:   from-blue-500 to-cyan-500
Orange-Red:  from-orange-500 to-red-500
Yellow-Orange: from-yellow-400 to-orange-500
Green-Emerald: from-green-500 to-emerald-500
Blue-Purple: from-blue-600 to-purple-600
```

---

## Typography Scale

### Font Family
```
Primary: 'Inter', system-ui, -apple-system, sans-serif
Fallback: System font stack for performance
```

### Size Scale
```
Hero Title:     clamp(2rem, 5vw, 3.5rem)    - 32-56px
Section Title:  clamp(1.75rem, 4vw, 2.5rem) - 28-40px
Subsection:     1.5rem (24px)
Body Large:     1.125rem (18px)
Body:           1rem (16px)
Caption:        0.875rem (14px)
Small:          0.75rem (12px)
```

### Font Weights
```
Bold:    700 - Titles
Semibold: 600 - Section headers
Medium:   500 - Labels
Regular:  400 - Body text
```

### Line Heights
```
Titles:  1.2  (tight for impact)
Headers: 1.3  (balanced)
Body:    1.65 (comfortable reading)
Large:   1.7  (extra comfortable)
```

---

## Spacing System (8px Base)

```
1  = 0.5rem  = 8px   - Tiny gaps
2  = 1rem    = 16px  - Small gaps
3  = 1.5rem  = 24px  - Medium gaps
4  = 2rem    = 32px  - Large gaps
6  = 3rem    = 48px  - XL gaps
8  = 4rem    = 64px  - Section spacing
12 = 6rem    = 96px  - Major sections
```

**Usage:**
- Card padding: 2rem (32px)
- Card gaps: 1.5rem (24px) mobile, 2rem (32px) desktop
- Section margins: 4rem (64px)
- Title margins: 3rem (48px)

---

## Shadow System

```
Small:  0 1px 3px rgba(0, 0, 0, 0.3)
Medium: 0 4px 6px rgba(0, 0, 0, 0.3)
Large:  0 10px 40px rgba(0, 0, 0, 0.4)
XL:     0 20px 50px rgba(0, 0, 0, 0.5)

Colored Glow:
Blue:   0 10px 40px rgba(59, 130, 246, 0.3)
Orange: 0 10px 40px rgba(249, 115, 22, 0.3)
Green:  0 10px 40px rgba(34, 197, 94, 0.3)
```

---

## Border Radius Scale

```
Small:  0.5rem  (8px)  - Buttons, badges
Medium: 0.75rem (12px) - Small cards
Large:  1rem    (16px) - Standard cards
XL:     1.5rem  (24px) - Hero cards
Full:   9999px         - Pills, dots
```

---

## Accessibility Features

### Focus Indicators
- Visible 2px outline
- Blue color (#60a5fa)
- 4px offset for clarity
- Transitions smoothly

### Contrast Ratios
- Title text on dark: 15:1 (AAA)
- Body text on dark: 12:1 (AAA)
- Secondary text: 7:1 (AA)
- Accent text: 4.5:1 minimum (AA)

### Keyboard Navigation
- Tab order follows visual order
- Focus trap in modals (if added)
- Skip links available
- All interactive elements focusable

### Screen Reader Support
- Semantic HTML structure
- ARIA labels on icons
- Descriptive alt text
- Status announcements for state changes

---

## Performance Metrics

### Target Scores
- Lighthouse Performance: 95+
- First Contentful Paint: <1.5s
- Largest Contentful Paint: <2.5s
- Time to Interactive: <3.5s
- Cumulative Layout Shift: <0.1

### Optimization Techniques
- Lazy load images
- Code splitting
- Tree shaking
- Minification
- Gzip compression
- GPU-accelerated animations
- Debounced scroll handlers
- IntersectionObserver (not scroll events)

---

## Component State Diagram

```
[Page Load]
    ↓
[Animations Queue]
    ↓
[User Scrolls] → [IntersectionObserver] → [Trigger Animations]
    ↓
[User Hovers Card]
    ↓
├─ [Lift Card]
├─ [Show Gradient]
├─ [Scale Icon]
└─ [Enhance Shadow]
    ↓
[User Clicks Flip Card]
    ↓
├─ [Check Current State]
├─ [Toggle Flip State]
├─ [Rotate 180° / 0°]
└─ [Update ARIA State]
    ↓
[User Clicks CV Button]
    ↓
├─ [Scale Down (Tactile)]
├─ [Open PDF in New Tab]
└─ [Log Event (Optional)]
```

---

This visual mockup description provides a comprehensive overview of the redesigned About section's appearance and behavior across different viewports and interaction states.
