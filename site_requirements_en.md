
# Site Requirements (v2.1) — USA Van + Rail Itinerary

## Language & time
- UI: English-only
- Date Anchor: default `2026-08-27`
- Generation timezone: Asia/Jerusalem; **display local time per city**
- Automatic date shifts when the anchor changes

## Core concepts
- **Point (stop)**: any place you actually stop — *must have `stay_duration_min`*.
- **Segment (ride)**: direct move between two Points — *no embedded stops*.

## Day Cards
Each day renders as a chronological sequence:
`Point → Segment → Point → Segment … → Point (Accommodation)`

For each **Point**, show:
- Name, type (badge + icon), stay time, short description
- Price/parking when present
- Hike fields (distance, difficulty, elevation, loop/out&back)
- Transit Hub hints (arrival-lead/transfer-time)

For each **Segment**, show:
- Mode: `Van | Train | Walk | Transit | Shuttle | Ferry`
- Distance & duration (estimate)
- Scenic tag (if `true`)
- Route status: solid polyline if known; **dashed with warning** if `polyline` is empty
- For Train: label the ride with “Night train” if the day includes sleeper

## Map behavior
- **Van**: route via OSRM (dynamic). Scenic vs Fast toggle affects route choice.
- **Train**: fixed polyline (Amtrak line). No OSRM.
- **Walk / Transit / Shuttle**: simple/dashed line; no OSRM.
- **Hike**: not a Segment. If a trail polyline exists, draw a thin trail. Otherwise show trailhead pin and time.
- If any Segment `polyline` is empty → draw dashed line + popup “Route TBD”.

## Scenic policy
- Prefers Scenic when travel time delta is minor. Segments retain `scenic: true/false`.
- Train segments may have a **Scenic window** (e.g., 12:00–16:00) rendered as a note.

## Trains — required flow
1) **Arrival** to station (Point: Transit Hub with `arrival_lead_time_min`)  
2) **Wait/Connection** (Point: Transit Hub with `transfer_time_min`)  
3) **Ride** (Segment: Train)  
4) **Arrival** station (Point)  
5) **Local move** to lodging/attraction (Segment: Walk/Transit/Shuttle)

## Filters & toggles
- Filter by Segment mode (Van/Train/Walk/Transit/Shuttle/Ferry)
- Filter “Stops only / Rides only”
- Toggle Scenic (Van only)

## Error handling & UX
- Popup debounce to avoid open-then-close on single tap
- Legend must not cover the day list (mobile-safe layout)
- Missing data warnings (dashed polylines, absent fields) appear unobtrusively

## Pricing defaults (if not specified)
- National Park entry: $35/vehicle
- City parking: $4/hour
- Public lot: $15/day
- RV hookup: $55/night
- Museum adult: $25

## Maintenance workflow
- Update specs in `usa-van-rail-specs`, then copy `itinerary_spec.txt` to `usa-van-rail-site` and deploy.
- Commit messages:
  - `update specs` — any spec/docs change
  - `deploy update` — when pushing the live site
