
# Point Types Spec (v2.1)

This spec defines ALL allowed **Point (stop)** types and the required/optional fields for each.
A **Segment** is always a direct move between **two Points**. Stops *during* a segment must be modeled as separate Points.

## Shared schema (required for ALL points)
- `id` (string, unique)
- `name` (string)
- `type` (enum from the table below)
- `coords` (object: `{ "lat": number, "lng": number }`)
- `stay_duration_min` (integer ≥ 0) — time spent at this stop
- `description` (string, short, ≤ 300 chars)
- `links` (array of `{ title, url }`), can be empty
- `parking` (string; "onsite", "street", "paid lot", "no parking", details; can be empty for non-driving contexts)
- `price_estimate` (number; USD unless otherwise stated)
- `slug` (string, lower-kebab-case, used for image lookup and anchors)

> Notes
> - Even very short stops (scenic/photo/fuel) MUST have `stay_duration_min` (e.g., 10–30).
> - Hikes are Points (not segments). Trailhead must be the same place you return to when the van does not move.

---

## Point types

### 1) Accommodation
**Subtypes**: `rv_campground`, `rv_park`, `campground`, `hotel`, `hostel`, `motel`, `sleeper_train`
**Extra fields**
- `facilities` (array: `["wifi","showers","electric","water","sewer","laundry"]`)
- `checkin_window` (string, e.g., "15:00–20:00")
- `vehicle_notes` (string; city hotel RV parking instructions)
**Typical stay**: 8–12 hours (overnight)

### 2) Food
**Subtypes**: `fast`, `experience`, `coffee`
**Extra fields**
- `avg_price_per_person` (number)
- `cuisine` (string)
- `reservation_needed` (boolean)
**Typical stay**: 45–60 (fast), 60–90 (experience)

### 3) Attraction
**Subtypes**: `museum`, `park_urban`, `landmark`, `viewpoint_built`
**Extra fields**
- `opening_hours` (string)
- `tickets_required` (boolean)
**Typical stay**: 90–240

### 4) Hike
**Subtypes**: `loop`, `out_and_back`
**Extra fields**
- `distance_km` (number)
- `elevation_gain_m` (number)
- `difficulty` (enum: `easy` | `moderate` | `hard`)
**Typical stay**: derived from distance & difficulty

### 5) Scenic Stop (Roadside/Viewpoint/Natural Lookout)
**Subtypes**: `roadside`, `overlook`, `waterfall_spot`, `beach_spot`
**Extra fields**
- `safety_notes` (string)
**Typical stay**: 10–30

### 6) Shopping
**Subtypes**: `grocery`, `outlet`, `souvenirs`, `outdoor_gear`
**Extra fields**
- `avg_spend` (number)
**Typical stay**: 45–90

### 7) Functional Stop
**Subtypes**: `fuel`, `restroom`, `rest`
**Extra fields**
- `fuel_grade` (string, optional)
- `services` (array: `["toilets","dump","water"]`)
**Typical stay**: 20–45

### 8) Transit Hub
**Subtypes**: `train_station`, `bus_terminal`, `ferry_terminal`, `airport`
**Extra fields**
- `arrival_lead_time_min` (integer; suggested early arrival)
- `transfer_time_min` (integer; minimum interchange time)
**Typical stay**: arrival lead time or connection time

---

## Defaults & smart ranges (guidance only)
- `Functional Stop`: 20–45 min
- `Scenic Stop`: 10–30 min
- `Food`: 45–60 (fast) / 60–90 (experience)
- `Shopping`: 45–90
- `Hike`: ~ 30–45 min per 1.5–2 km easy; adjust by difficulty/elevation
- `Accommodation`: 8–12 hours

---

## Validation rules
1. Every Point must include `stay_duration_min` (≥ 0).
2. Hikes are Points, not Segments.
3. If a Segment claims a mid-way stop, split it into: `Point → Segment → Point → Segment`.
4. A `Transit Hub` is required at both ends of any Train Segment (arrival & departure handling).
