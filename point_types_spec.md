# Point Types & Required Fields (Schema v2.1)

This document defines **point types**, their **required fields**, and validation rules used by the itinerary schema (v2.1).

## Global Required Fields (all points)
- id (string, unique within itinerary)
- name (string)
- type (enum; see list below)
- coords (object)
  - lat (number)
  - lng (number)
- stay_duration_min (integer ≥ 0)
- description (string; short human-readable text)
- links (array of { label, url }, optional but recommended; if present must be non-empty and valid URLs)
- parking (object; **required** for all points, see details below)
  - kind (enum: street, garage, lot, rv_hookup, rv_boondock, onsite, none)
  - notes (string, optional)
- price_estimate (object; **required**; default estimates may be used if unknown)
  - currency (string ISO, e.g. USD)
  - amount_min (number ≥ 0)
  - amount_max (number ≥ amount_min)
- slug (string; kebab-case; used for image lookup & linking)

> Default price guidance when true prices are unknown:
> - National Park entry: $35/vehicle
> - City parking: $4/hour
> - Public lot: $15/day
> - RV hookup: $55/night
> - Museum adult ticket: $25

## Point Types (enum)
1. lodging_parking
   When a day ends near this point (RV park/campground/hotel/parking); includes where the van parks/sleeps.
   - Additional recommended fields:
     - checkin_time_local (string HH:mm)
     - checkout_time_local (string HH:mm)
     - amenities (array of strings; e.g. electric-30A, water, dump)
2. attraction_park
   National/State parks, museums, attractions, viewpoints, trailheads.
   - Recommended: opening_hours, reservation_required (boolean), notes_safety
3. rail_station
   Passenger rail stations used for rail segments.
   - Recommended: station_code (Amtrak/other), platform_info, last_mile_options (array: walk, bus, rideshare, etc.)
4. transfer
   Utility stops (gas, groceries, laundry, dump station) and mixed logistics hops.
   - Recommended: services (array: gas, ev, groceries, laundry, dump)
5. city_day (aka City day / No-route)
   City exploration days with no van route; marked as transit/walking in UI.
   - Required still: all global fields (use default price_estimate for parking if none, set parking.kind:"none")

> If a point type is not listed above, prefer the closest match and document nuances in description and parking.notes.

## Parking Object – Guidance
Use the closest real scenario:
- If parking is free street: kind:"street" + estimated $0 price range.
- If unknown yet: choose the most realistic default (e.g., lot for attractions, garage in dense downtowns) and use the notes.
