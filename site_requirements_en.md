# Site Requirements (Updated 2025-09-25)

## General
- Website is single HTML file with Tailwind + Leaflet via CDN.
- Mobile-first design, responsive, dark/light friendly.

## Map Behavior
- Road (Van): Routed live via OSRM. Default: tolls allowed. If `alt_routes.no_tolls` exists, allow toggle.
- Rail/Hike: Fixed polyline (encoded or raw coords). If polyline missing: dashed straight line + warning.
- Scenic preference: default to scenic when travel time difference is minor. User can toggle Scenic/Fastest.

## Day Cards
- Each day shows: title, list of points (with calculated arrival/departure times), segments, and sleep location.
- City days with no van available marked as Transit/Walking.

## UI / UX Fixes
- Legend and filters fixed to corner, never overlapping day list.
- Map popups: smooth open, do not close immediately on first click.
- Ensure all points render correctly on map with consistent iconography.

## Images
- Lazy-load, responsive sizes, WebP format, loaded by point `slug`.

## Pricing Defaults
- National Park entry: $35/vehicle
- City parking: $4/hour
- Public lot: $15/day
- RV hookup: $55/night
- Museum adult ticket: $25

## Workflow
- Edit in specs repo.
- Validate with `validate_spec.js`.
- Copy updated `itinerary_spec.txt` into deploy repo `data/` folder.
- Commit with message: `deploy update`.
