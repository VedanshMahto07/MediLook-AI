import { useState } from "react";
import { Droplets, CheckCircle2, AlertCircle, RefreshCw, Info, Sun, Activity, Clock, Plus, RotateCcw, BarChart3, Sparkles } from "lucide-react";

function WaterIntake() {
  const [weight, setWeight] = useState("");
  const [activityLevel, setActivityLevel] = useState("normal");
  const [climate, setClimate] = useState("temperate");
  const [water, setWater] = useState(null);
  const [glasses, setGlasses] = useState(null);
  const [consumedCups, setConsumedCups] = useState(0);
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
    setConsumedCups(0);
    setTips([]);
    setError(null);
  };

  return (
    <div className="max-w-4xl mx-auto py-6">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
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
              <label className="block text-sm font-semibold text-slate-700 mb-2">
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
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-400">
                  kg
                </span>
              </div>
            </div>

            {/* Activity Level */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
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
              <label className="block text-sm font-semibold text-slate-700 mb-2">
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
          
          {/* Main Hydration Target Card */}
          <div className="bg-white rounded-3xl border border-cyan-200/90 shadow-sm p-6 sm:p-8 text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-800 bg-cyan-50 px-3.5 py-1 rounded-full border border-cyan-200">
              Recommended Daily Fluid Intake
            </span>
            <div className="text-5xl sm:text-6xl font-extrabold text-slate-900 my-3 tracking-tight">
              {water} <span className="text-2xl font-medium text-slate-400">Liters</span>
            </div>
            <p className="text-base font-semibold text-cyan-800">
              Equivalent to approximately ~{glasses} standard glasses (250 ml each)
            </p>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Total volumetric goal: <strong className="text-slate-800">{(parseFloat(water) * 1000).toLocaleString()} ml</strong> of cellular hydration.
            </p>
          </div>

          {/* Interactive Tap-to-Drink Glass Tracker Card */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Droplets size={20} className="text-cyan-600" />
                  <span>Interactive Daily Glass Tracker</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  Tap glasses throughout your day to record and visualize your hydration progress.
                </p>
              </div>

              {/* Quick Actions */}
              <div className="flex items-center gap-2 self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => setConsumedCups((prev) => Math.min(glasses || 8, prev + 1))}
                  className="px-3.5 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Plus size={14} />
                  <span>Drink 1 Glass</span>
                </button>
                {consumedCups > 0 && (
                  <button
                    type="button"
                    onClick={() => setConsumedCups(0)}
                    className="p-1.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-500 text-xs transition-colors cursor-pointer"
                    title="Reset tracker"
                  >
                    <RotateCcw size={15} />
                  </button>
                )}
              </div>
            </div>

            {/* Overall Progress Bar */}
            <div className="space-y-2 mb-6">
              <div className="flex items-center justify-between text-xs sm:text-sm font-semibold">
                <span className="text-slate-700">
                  {consumedCups} of {glasses} glasses completed
                </span>
                <span className="text-cyan-700 font-bold">
                  {Math.min(100, Math.round((consumedCups / (glasses || 8)) * 100))}% Goal
                </span>
              </div>
              <div className="w-full h-3.5 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${Math.min(100, Math.round((consumedCups / (glasses || 8)) * 100))}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-[11px] text-slate-400 font-medium">
                <span>0 ml</span>
                <span>Consumed: {consumedCups * 250} ml</span>
                <span>Target: {Math.round(water * 1000)} ml</span>
              </div>
            </div>

            {/* Interactive Glasses Grid */}
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3 pt-2">
              {Array.from({ length: Math.min(glasses || 8, 16) }).map((_, i) => {
                const isDrank = i < consumedCups;
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setConsumedCups(isDrank && i === consumedCups - 1 ? i : i + 1)}
                    className={`relative p-3 rounded-2xl border transition-all duration-300 flex flex-col items-center justify-center gap-1.5 cursor-pointer ${
                      isDrank
                        ? "bg-cyan-50 border-cyan-400 ring-2 ring-cyan-400/30 shadow-xs"
                        : "bg-slate-50 border-slate-200 hover:bg-white hover:border-cyan-300"
                    }`}
                    title={`Glass ${i + 1} (250 ml)`}
                  >
                    <span className="text-xl">{isDrank ? "💧" : "🥛"}</span>
                    <span className={`text-[11px] font-bold ${isDrank ? "text-cyan-800" : "text-slate-500"}`}>
                      #{i + 1}
                    </span>
                    <span className="text-[9px] text-slate-400 font-medium">250ml</span>
                  </button>
                );
              })}
            </div>

            {consumedCups >= glasses && (
              <div className="mt-5 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm flex items-center gap-2 font-semibold animate-in fade-in">
                <Sparkles size={18} className="text-emerald-600 shrink-0" />
                <span>Congratulations! You have fulfilled 100% of your recommended daily physiological hydration target.</span>
              </div>
            )}
          </div>

          {/* 24-Hour Hydration Schedule Bar Chart */}
          {(() => {
            const total = glasses || 8;
            const morning = Math.max(1, Math.round(total * 0.25));
            const midday = Math.max(2, Math.round(total * 0.30));
            const afternoon = Math.max(2, Math.round(total * 0.30));
            const evening = Math.max(1, total - morning - midday - afternoon);

            const scheduleBlocks = [
              {
                time: "7:00 AM – 10:00 AM",
                title: "Morning Metabolic Kickstart",
                cups: morning,
                ml: morning * 250,
                pct: Math.round((morning / total) * 100),
                color: "bg-amber-400",
                badge: "bg-amber-50 text-amber-900 border-amber-200",
                desc: "Rehydrates organ tissues, jumpstarts cellular metabolism, and stimulates digestion after nocturnal fasting."
              },
              {
                time: "11:00 AM – 2:00 PM",
                title: "Midday Cognitive Focus",
                cups: midday,
                ml: midday * 250,
                pct: Math.round((midday / total) * 100),
                color: "bg-cyan-500",
                badge: "bg-cyan-50 text-cyan-900 border-cyan-200",
                desc: "Maintains optimal cerebral blood flow, counteracts midday fatigue, and aids digestive enzyme hydrolysis."
              },
              {
                time: "3:00 PM – 6:00 PM",
                title: "Afternoon & Physical Activity",
                cups: afternoon,
                ml: afternoon * 250,
                pct: Math.round((afternoon / total) * 100),
                color: "bg-teal-500",
                badge: "bg-teal-50 text-teal-900 border-teal-200",
                desc: "Prevents energy crashes, lubricates articular joint cartilage, and offsets physical sweat dissipation."
              },
              {
                time: "7:00 PM – 9:30 PM",
                title: "Evening Wind-Down",
                cups: evening,
                ml: evening * 250,
                pct: Math.round((evening / total) * 100),
                color: "bg-indigo-500",
                badge: "bg-indigo-50 text-indigo-900 border-indigo-200",
                desc: "Sustains nighttime kidney filtration. Taper fluid intake 1 hour prior to sleep to safeguard continuous REM cycles."
              }
            ];

            return (
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                      <BarChart3 size={20} className="text-cyan-600" />
                      <span>24-Hour Paced Hydration Schedule</span>
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                      Distribute fluids steadily throughout the day to optimize cellular absorption without overburdening kidneys.
                    </p>
                  </div>
                  <span className="text-xs font-bold text-cyan-800 bg-cyan-50 px-3 py-1 rounded-full border border-cyan-200 self-start sm:self-auto">
                    Paced Protocol
                  </span>
                </div>

                <div className="space-y-4">
                  {scheduleBlocks.map((block, idx) => (
                    <div key={idx} className="p-4 sm:p-5 rounded-2xl bg-slate-50/70 border border-slate-200/80 space-y-2.5">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                        <div className="flex items-center gap-2.5">
                          <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${block.badge}`}>
                            {block.time}
                          </span>
                          <h4 className="font-bold text-slate-900 text-sm sm:text-base">{block.title}</h4>
                        </div>
                        <div className="text-xs sm:text-sm font-extrabold text-cyan-800 bg-white px-3 py-1 rounded-xl border border-slate-200 self-start sm:self-auto">
                          {block.cups} Glasses ({block.ml} ml) • {block.pct}%
                        </div>
                      </div>

                      {/* Schedule Bar */}
                      <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-700 ease-out ${block.color}`}
                          style={{ width: `${block.pct}%` }}
                        ></div>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {block.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}

          {/* Tips Card */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <CheckCircle2 size={19} className="text-cyan-600" />
              <span>Optimal Hydration Strategies</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {tips.map((tip, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-cyan-50/50 border border-cyan-100 flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                  <span className="text-cyan-600 font-bold mt-0.5">✓</span>
                  <span className="leading-relaxed font-medium">{tip}</span>
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