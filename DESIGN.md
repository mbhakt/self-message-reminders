# Design Brief

## Direction
Familiar, intimate chat paradigm for reflective self-messaging. WhatsApp-inspired visual language with clean teal/green accents and refined typography.

## Tone
Approachable, efficient, contemplative. The interface recedes; content is foreground.

## Differentiation
User-sent messages bubble right with vibrant accent fill. System/template notes bubble left with muted backgrounds. Template library presented as clean card grid with icon clarity. Rounded, soft edges throughout reduce visual harshness.

## Color Palette

| Semantic         | Light (L C H)     | Dark (L C H)      | Usage                           |
|:-----------------|:------------------|:------------------|:--------------------------------|
| Primary (teal)   | 0.6 0.15 150      | 0.68 0.16 145     | User messages, CTAs, accents    |
| Secondary        | 0.55 0.12 155     | 0.62 0.13 150     | Alternative actions, emphasis   |
| Muted (neutral)  | 0.92 0 0          | 0.2 0 0           | System messages, disabled states|
| Destructive (red)| 0.55 0.22 25      | 0.65 0.19 22      | Delete actions, alerts          |
| Background       | 0.98 0 0          | 0.12 0 0          | Canvas, body                    |
| Foreground       | 0.15 0 0          | 0.94 0 0          | Text, content                   |
| Border           | 0.88 0 0          | 0.24 0 0          | Dividers, card outlines         |

## Typography
- **Display**: General Sans (400) — header, navigation labels, template titles
- **Body**: DM Sans (400) — messages, input fields, template descriptions
- **Mono**: Geist Mono (400) — timestamps, optional code snippets in messages

## Elevation & Depth
- **Card shadow**: `0 1px 3px rgba(0,0,0,0.08)` — template cards, compose box
- **Message shadows**: None (bubbles integrate with background)
- **Borders**: Subtle 1px dividers between messages or sections at `border` token

## Structural Zones

| Zone          | Background    | Border              | Elevation | Purpose                        |
|:--------------|:--------------|:-------------------|:----------|:-------------------------------|
| Header        | `bg-card`     | `border-b` subtle   | 2         | App title, branding            |
| Navigation    | `bg-background` | None              | 0         | Tab navigation (Inbox/Templ.)  |
| Chat canvas   | `bg-background` | None              | 0         | Chronological message thread   |
| Compose box   | `bg-card`     | `border-t` subtle   | 1         | Text input, send button        |
| Template grid | `bg-background` | None              | 0         | Card-based template library    |

## Spacing & Rhythm
- **Message spacing**: 12px vertical gap between bubbles
- **Gutter margins**: 16px left/right on mobile, 24px on desktop
- **Line height**: 1.5 for body text, 1.3 for headers
- **Card padding**: 16px interior; 12px gap between cards

## Component Patterns
- **Message bubbles**: `rounded-2xl` (24px radius), max-width 80% of viewport, soft drop shadow
- **Input field**: `rounded-full` (28px radius), 48px height, active state uses `ring-2 ring-primary`
- **Template cards**: `rounded-lg` (12px radius), minimal border, hover lift effect
- **Buttons**: Primary uses `bg-primary text-primary-foreground`, secondary uses `bg-muted`

## Motion
- **Message entrance**: Fade-in over 200ms, stagger 50ms between messages
- **Compose focus**: Input expands slightly, subtle scale 1.02
- **Button press**: Quick 100ms scale 0.98, then back to 1
- **Tab change**: Cross-fade 150ms

## Constraints
- Maintain AA+ contrast in both light and dark modes
- No generic blue; only use teal/green accent tokens
- Message bubbles constrain to 80% width max, stack vertically if text exceeds
- Template cards display as grid: 1 col mobile, 2 col tablet, 3 col desktop

## Signature Detail
Message bubble sharp corner on sender side (bottom-left for sent, bottom-right for received) creates asymmetry and distinguishes sender direction at a glance. Combined with directional color (accent right, muted left), this creates immediate spatial clarity in the conversation thread.
