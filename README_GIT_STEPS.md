
# Git — Step-by-step (two repos)

## Repos
- **Specs repo**: `usa-van-rail-specs`
- **Deploy repo** (live site, GitHub Pages): `usa-van-rail-site`

## 1) Update the specs
1. In `usa-van-rail-specs`, add/replace:
   - `point_types_spec.md` (v2.1) — NEW
   - `site_requirements_en.md` (v2.1) — UPDATE
   - `resources.md` (v2.1) — UPDATE
   - (optional) `validate_spec.js` — helper
2. Commit with message: `update specs`
3. Push.

## 2) Align the itinerary file
1. Open your working `itinerary_spec.txt` or JSON.
2. Ensure every **Point** has `stay_duration_min` (even 10–30 for quick stops).
3. Convert any mid-ride stop into a **Point**, splitting the **Segment** accordingly.
4. Ensure **Hikes are Points**, not Segments (add hike fields).
5. For **Train days**, model: Arrival Hub → Wait Hub → Segment: Train → Arrival Hub → Local Segment (Walk/Transit).
6. Save and commit with: `update specs`.

## 3) Update the site repo
1. In `usa-van-rail-site`, make sure the parser/renderer assumes:
   - Segments only between Points; no embedded stops.
   - Van uses OSRM; Train uses fixed polylines; Walk/Transit are simple lines.
   - Hike is a Point (trail line optional).
   - Dashed line + warning when `polyline` is empty.
2. If you use the validator, drop `validate_spec.js` into your build or dev tools.
3. Commit with: `deploy update` and push. GitHub Pages will auto-refresh.

## Troubleshooting
- If the map shows straight dashed lines, add or fix `polyline`.
- If a Point doesn't appear, check `coords` and `slug`.
- If a Train is missing, ensure its polyline exists and that the day has station Points.
