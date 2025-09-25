
/**
 * Lightweight validator for itinerary JSON according to v2.1 rules.
 * Usage: paste in console or integrate into build.
 */
function validateItinerary(itin) {
  const errors = [];
  const pointIds = new Set();

  // 1) Validate points
  (itin.points || []).forEach((p, idx) => {
    if (!p.id) errors.push(`Point[${idx}] missing id`);
    if (!p.name) errors.push(`Point[${p.id||idx}] missing name`);
    if (!p.type) errors.push(`Point[${p.id||idx}] missing type`);
    if (!p.coords || typeof p.coords.lat !== 'number' || typeof p.coords.lng !== 'number') {
      errors.push(`Point[${p.id||idx}] invalid coords`);
    }
    if (typeof p.stay_duration_min !== 'number') {
      errors.push(`Point[${p.id||idx}] missing stay_duration_min`);
    }
    if (pointIds.has(p.id)) errors.push(`Duplicate Point id: ${p.id}`);
    pointIds.add(p.id);

    if (p.type === 'hike' && (p.distance_km == null || p.difficulty == null)) {
      errors.push(`Hike Point[${p.id}] missing distance_km or difficulty`);
    }
  });

  // 2) Validate segments
  (itin.segments || []).forEach((s, idx) => {
    if (!s.id) errors.push(`Segment[${idx}] missing id`);
    if (!s.from_id || !pointIds.has(s.from_id)) errors.push(`Segment[${s.id||idx}] invalid from_id`);
    if (!s.to_id || !pointIds.has(s.to_id)) errors.push(`Segment[${s.id||idx}] invalid to_id`);
    if (!s.mode) errors.push(`Segment[${s.id||idx}] missing mode`);

    if (s.mode === 'van' && s.polyline == null) {
      // allowed but warn
      errors.push(`WARN Segment[${s.id||idx}] van route missing polyline (dashed TBD)`);
    }
    if (s.mode === 'train' && !s.polyline) {
      errors.push(`Segment[${s.id||idx}] train requires fixed polyline`);
    }
  });

  // 3) High-level rules (optional heuristics)
  // Ensure all days end with an Accommodation point (if day grouping exists)
  (itin.days || []).forEach((day, dIdx) => {
    if (!Array.isArray(day.items)) return;
    const last = day.items[day.items.length - 1];
    if (!last || last.type !== 'point') return;
    const p = (itin.points || []).find(pp => pp.id === last.id);
    if (!p || p.category !== 'accommodation') {
      // Soft warning only
      errors.push(`WARN Day[${dIdx+1}] does not end with Accommodation point`);
    }
  });

  return errors;
}
