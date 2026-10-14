import { useState } from "react";
import { Droplets, CheckCircle2, AlertCircle, RefreshCw, Info, Sun, Activity } from "lucide-react";

function WaterIntake() {
  const [weight, setWeight] = useState("");
  const [activityLevel, setActivityLevel] = useState("normal");
  const [climate, setClimate] = useState("temperate");
  const [water, setWater] = useState(null);
  const [glasses, setGlasses] = useState(null);
  const [tips, setTips] = useState([]);
  const [error, setError] = useState(null);

  const calculateWater = (e) => {
    if (e) e.preventDefault();
    const w = parseFloat(weight);

    if (!w || w < 2 || w > 500) {
      setError("Please enter a valid weight (2 - 500 kg).");
      return;
    }

    setError(null);

    // Baseline: 35 ml per kg
    let baselineMl = w * 35;

    // Activity adjustments
    if (activityLevel === "active") baselineMl += 350;
    if (activityLevel === "athlete") baselineMl += 700;

    // Climate adjustments
    if (climate === "hot") baselineMl += 400;

    const totalLitres = (baselineMl / 1000).toFixed(2);
    const totalGlasses = Math.round(baselineMl / 250);

    setWater(totalLitres);
    setGlasses(totalGlasses);

    const hydrationAdvice = [
      "Drink 1-2 glasses of water upon waking to kickstart organ perfusion and metabolism.",
      "Consume water 20-30 minutes before meals to optimize gastric enzyme dilution.",
      "Replenish 250-500 ml for every 30 minutes of vigorous perspiration or exercise.",
      "Check urine color: pale straw yellow signifies optimal physiological hydration."
    ];

    if (w > 85 || activityLevel === "athlete") {
      hydrationAdvice.push("Consider adding a pinch of unrefined sea salt or electrolytes during long workouts.");
    }

    setTips(hydrationAdvice);
  };

  const resetForm = () => {
    setWeight("");
    setWater(null);
    setGlasses(null);
    setTips([]);
    setError(null);
  };

  return (
    <div className="max-w-4xl mx-auto py-6">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 border border-cyan-200/80 text-cyan-800 text-xs font-semibold mb-3">
          <Droplets size={14} className="text-cyan-600" />
          <span>Physiological Fluid Balance</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Daily Hydration Calculator
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-600">
          Compute your personalized daily water requirement adjusted for body mass, workout intensity, and climate.
        </p>
      </div>

      {/* Input Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 mb-8">
        <form onSubmit={calculateWater} className="space-y-6">
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            
            {/* Weight */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Body Weight
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="2"
                  max="500"
                  step="0.1"
                  placeholder="e.g., 68"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500 text-base"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                  kg
                </span>
              </div>
            </div>

            {/* Activity Level */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Daily Physical Activity
              </label>
              <select
                value={activityLevel}
                onChange={(e) => setActivityLevel(e.target.value)}
                className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500 text-sm sm:text-base cursor-pointer"
              >
                <option value="sedentary">Sedentary (Minimal sweat)</option>
                <option value="normal">Moderate (30-45m daily activity)</option>
                <option value="active">Active (1 hour rigorous workout)</option>
                <option value="athlete">Intense Athlete (Heavy sweating)</option>
              </select>
            </div>

            {/* Climate */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Current Climate
              </label>
              <select
                value={climate}
                onChange={(e) => setClimate(e.target.value)}
                className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500 text-sm sm:text-base cursor-pointer"
              >
                <option value="temperate">Temperate / Air-Conditioned</option>
                <option value="hot">Hot, Humid, or Arid Environment</option>
              </select>
            </div>

          </div>

          {error && (
            <div className="flex items-center gap-2 text-xs text-red-600 bg-red-50 p-3 rounded-xl border border-red-200">
              <AlertCircle size={15} />
              <span>{error}</span>
            </div>
          )}

          <div className="flex items-center gap-3">
            <button
              type="submit"
              className="flex-1 py-3.5 rounded-2xl bg-cyan-600 hover:bg-cyan-700 active:scale-98 text-white font-semibold text-sm sm:text-base shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Droplets size={18} />
              <span>Calculate Daily Hydration Intake</span>
            </button>
            {water && (
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-3.5 rounded-2xl border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors cursor-pointer"
                title="Reset calculator"
              >
                <RefreshCw size={17} />
              </button>
            )}
          </div>

        </form>
      </div>

      {/* Results View */}
      {water && (
        <div className="space-y-6 animate-in fade-in duration-300">
          
          {/* Main Card */}
          <div className="bg-white rounded-3xl border border-cyan-200/90 shadow-sm p-6 sm:p-8 text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-800 bg-cyan-50 px-3 py-1 rounded-full border border-cyan-200">
              Recommended Daily Fluid Intake
            </span>
            <div className="text-5xl sm:text-6xl font-extrabold text-slate-900 my-3 tracking-tight">
              {water} <span className="text-2xl font-medium text-slate-400">Liters</span>
            </div>
            <p className="text-sm font-semibold text-cyan-700">
              Equivalent to approximately ~{glasses} standard cups (250 ml each)
            </p>

            {/* Visual Glass Tracker preview */}
            <div className="mt-6 pt-6 border-t border-slate-100 flex items-center justify-center gap-2 flex-wrap max-w-md mx-auto">
              {Array.from({ length: Math.min(glasses || 8, 14) }).map((_, i) => (
                <div
                  key={i}
                  className="w-8 h-10 rounded-lg bg-cyan-100 border border-cyan-300 text-cyan-700 flex items-center justify-center text-xs font-bold"
                  title={`Cup ${i + 1} (250ml)`}
                >
                  💧
                </div>
              ))}
            </div>
          </div>

          {/* Tips Card */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8">
            <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
              <CheckCircle2 size={18} className="text-cyan-600" />
              <span>Optimal Hydration Strategies</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {tips.map((tip, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-cyan-50/50 border border-cyan-100 flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                  <span className="text-cyan-600 font-bold mt-0.5">✓</span>
                  <span className="leading-relaxed">{tip}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* Guidelines Note */}
      <div className="mt-8 bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 text-xs text-slate-600 space-y-2">
        <h4 className="font-bold text-slate-900 flex items-center gap-2 text-sm">
          <Info size={16} className="text-slate-400" />
          <span>Clinical Hydration Considerations</span>
        </h4>
        <p className="leading-relaxed">
          Fluid needs comprise plain water, unsweetened tea, and water-rich whole produce (cucumbers, melons). Individuals with congestive heart failure, chronic kidney disease (CKD), or on specific diuretics should adhere strictly to their nephrologist's customized fluid restriction guidelines.
        </p>
      </div>

    </div>
  );
}

export default WaterIntake;