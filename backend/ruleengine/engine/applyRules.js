const rules = require('./ruleCatalog_v3.json');

/**
 * @typedef {import('../../types').Position} Position
 * @typedef {import('../../types').EvaluationResult} EvaluationResult
 */

/**
 * Applies rule catalog to offer positions.
 * @param {Position[]} positions
 * @param {number} [regionId]
 * @returns {EvaluationResult[]}
 */
function applyRules(positions, regionId) {
  const results = [];
  positions.forEach(pos => {
    const applicableRules = rules.filter(r =>
      r.gewerk_id === pos.gewerk_id &&
      r.einheit === pos.einheit &&
      pos.gesamtpreis > r.alert_threshold
    );
    let bewertung = "grün";
    let kommentare = [];
    applicableRules.forEach(rule => {
      if (pos.gesamtpreis > rule.max_threshold) {
        bewertung = "rot";
        kommentare.push(rule.message);
      } else if (bewertung !== "rot") {
        bewertung = "gelb";
        kommentare.push(rule.message);
      }
    });
    results.push({ position_id: pos.id, bewertung, kommentare });
  });
  return results;
}

module.exports = { applyRules };
