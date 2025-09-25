
# Itinerary Migration Checklist (to v2.1)

- [ ] Every Point has `stay_duration_min`
- [ ] All hikes converted to Point type `hike` with distance/difficulty/elevation
- [ ] No "mid-ride" content inside a Segment
- [ ] Train flows modeled with station arrival, wait, ride, arrival
- [ ] Van-only OSRM usage; no OSRM for Train/Walk/Transit
- [ ] Scenic segments tagged `scenic: true` with optional scenic window note
- [ ] Dashed warning for missing polylines
- [ ] Pricing defaults applied where actual prices unknown
