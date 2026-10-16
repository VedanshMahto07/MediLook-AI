import { useState } from "react";
import { Heart, Activity, AlertCircle, RefreshCw, Info, Flame, ShieldAlert, BarChart3, Timer, Sparkles, TrendingUp } from "lucide-react";

function HeartRateZone() {
  const [age, setAge] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [selectedZone, setSelectedZone] = useState(null);

  const calculateHeartRate = (e) => {
    if (e) e.preventDefault();
    const a = parseInt(age, 10);

    if (!a || a < 1 || a > 120) {
      setError("Please enter a valid age (1 - 120).");
      return;
    }

    setError(null);

    // Standard Fox Formula: 220 - age
    const maxHR = 220 - a;

    setResult({
      maxHR,
      zone1: { min: Math.round(maxHR * 0.50), max: Math.round(maxHR * 0.60), name: "Active Recovery", desc: "Gentle warm-up, active tissue recovery and stress reduction." },
      zone2: { min: Math.round(maxHR * 0.60), max: Math.round(maxHR * 0.70), name: "Aerobic Base / Fat Burn", desc: "Builds mitochondrial density, improves capillary network and optimizes fat oxidation." },
      zone3: { min: Math.round(maxHR * 0.70), max: Math.round(maxHR * 0.80), name: "Aerobic Endurance", desc: "Enhances pulmonary efficiency, cardiovascular stroke volume and endurance." },
      zone4: { min: Math.round(maxHR * 0.80), max: Math.round(maxHR * 0.90), name: "Anaerobic Threshold", desc: "Improves lactate tolerance, speed endurance and high-intensity stamina." },
      zone5: { min: Math.round(maxHR * 0.90), max: maxHR, name: "Peak / Neuromuscular", desc: "Maximal sprint intervals, VO2 max enhancement for athletic conditioning." },
    });
  };

  const resetForm = () => {
    setAge("");
    setResult(null);
    setError(null);
  };

  return (
    <div className="max-w-4xl mx-auto py-6">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-200/80 text-rose-800 text-xs font-semibold mb-3">
          <Heart size={14} className="text-rose-600" />
          <span>Cardiopulmonary Thresholds</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Target Heart Rate Training Zones
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-600">
          Compute your maximal heart rate (HRmax) and target 5-zone cardiovascular training thresholds.
        </p>
      </div>

      {/* Input Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 mb-8">
        <form onSubmit={calculateHeartRate} className="space-y-6">
          
          <div className="max-w-md mx-auto">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 text-center">
              Enter Your Age
            </label>
            <div className="relative">
              <input
                type="number"
                min="1"
                max="120"
                placeholder="e.g., 32"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full px-4 py-3.5 text-center rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/30 focus:border-rose-500 text-lg font-bold"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                years
              </span>
            </div>
          </div>

          {error && (
            <div className="flex items-center justify-center gap-2 text-xs text-red-600 bg-red-50 p-3 rounded-xl border border-red-200">
              <AlertCircle size={15} />
              <span>{error}</span>
            </div>
          )}

          <div className="flex items-center justify-center gap-3 max-w-md mx-auto">
            <button
              type="submit"
              className="flex-1 py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-700 active:scale-98 text-white font-semibold text-sm sm:text-base shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Heart size={18} />
              <span>Calculate Heart Rate Zones</span>
            </button>
            {result && (
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
      {result && (
        <div className="space-y-6 animate-in fade-in duration-300">
          
          {/* Max HR Banner */}
          <div className="bg-white rounded-3xl border border-rose-200 shadow-sm p-6 sm:p-8 text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-800 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
              Estimated Maximum Heart Rate (HRmax)
            </span>
            <div className="text-5xl sm:text-6xl font-extrabold text-slate-900 my-2 tracking-tight">
              {result.maxHR} <span className="text-xl font-medium text-slate-400">BPM</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Beats per minute upper ceiling according to standard Fox formula (220 - age).
            </p>
          </div>

          {/* Cardiovascular Training Spectrum Chart */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                  <BarChart3 size={20} className="text-rose-600" />
                  <span>Continuous Cardiovascular Training Spectrum</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Click any zone segment to inspect physiological fuel sources, breathing pace, and weekly targets.
                </p>
              </div>
              <span className="text-xs font-semibold text-rose-700 bg-rose-50 px-3 py-1 rounded-full border border-rose-200 self-start sm:self-auto">
                Fox Protocol
              </span>
            </div>

            {/* Continuous Spectrum Bar */}
            <div className="space-y-3">
              <div className="grid grid-cols-5 gap-1.5 h-12 sm:h-14 rounded-2xl p-1 bg-slate-100/90 border border-slate-200">
                
                {/* Z1 */}
                <button
                  type="button"
                  onClick={() => setSelectedZone(selectedZone === "z1" ? null : "z1")}
                  className={`h-full rounded-xl transition-all cursor-pointer flex flex-col items-center justify-center text-white ${
                    selectedZone === "z1" || !selectedZone ? "bg-sky-500 shadow-sm ring-2 ring-sky-400" : "bg-sky-400/50"
                  }`}
                  title="Zone 1: Active Recovery"
                >
                  <span className="text-xs font-extrabold">Z1</span>
                  <span className="text-[10px] hidden sm:inline opacity-90">50-60%</span>
                </button>

                {/* Z2 */}
                <button
                  type="button"
                  onClick={() => setSelectedZone(selectedZone === "z2" ? null : "z2")}
                  className={`h-full rounded-xl transition-all cursor-pointer flex flex-col items-center justify-center text-white ${
                    selectedZone === "z2" || !selectedZone ? "bg-emerald-500 shadow-sm ring-2 ring-emerald-400" : "bg-emerald-400/50"
                  }`}
                  title="Zone 2: Aerobic Base / Fat Burn"
                >
                  <span className="text-xs font-extrabold">Z2</span>
                  <span className="text-[10px] hidden sm:inline opacity-90">60-70%</span>
                </button>

                {/* Z3 */}
                <button
                  type="button"
                  onClick={() => setSelectedZone(selectedZone === "z3" ? null : "z3")}
                  className={`h-full rounded-xl transition-all cursor-pointer flex flex-col items-center justify-center text-white ${
                    selectedZone === "z3" || !selectedZone ? "bg-teal-500 shadow-sm ring-2 ring-teal-400" : "bg-teal-400/50"
                  }`}
                  title="Zone 3: Aerobic Endurance"
                >
                  <span className="text-xs font-extrabold">Z3</span>
                  <span className="text-[10px] hidden sm:inline opacity-90">70-80%</span>
                </button>

                {/* Z4 */}
                <button
                  type="button"
                  onClick={() => setSelectedZone(selectedZone === "z4" ? null : "z4")}
                  className={`h-full rounded-xl transition-all cursor-pointer flex flex-col items-center justify-center text-white ${
                    selectedZone === "z4" || !selectedZone ? "bg-amber-500 shadow-sm ring-2 ring-amber-400" : "bg-amber-400/50"
                  }`}
                  title="Zone 4: Anaerobic Threshold"
                >
                  <span className="text-xs font-extrabold">Z4</span>
                  <span className="text-[10px] hidden sm:inline opacity-90">80-90%</span>
                </button>

                {/* Z5 */}
                <button
                  type="button"
                  onClick={() => setSelectedZone(selectedZone === "z5" ? null : "z5")}
                  className={`h-full rounded-xl transition-all cursor-pointer flex flex-col items-center justify-center text-white ${
                    selectedZone === "z5" || !selectedZone ? "bg-rose-500 shadow-sm ring-2 ring-rose-400" : "bg-rose-400/50"
                  }`}
                  title="Zone 5: Peak / VO2 Max"
                >
                  <span className="text-xs font-extrabold">Z5</span>
                  <span className="text-[10px] hidden sm:inline opacity-90">90-100%</span>
                </button>

              </div>

              {/* Spectrum Range Ticks */}
              <div className="grid grid-cols-5 text-center text-[11px] sm:text-xs font-bold text-slate-500 px-1">
                <div>{result.zone1.min}–{result.zone1.max} <span className="font-normal text-[10px]">bpm</span></div>
                <div>{result.zone2.min}–{result.zone2.max} <span className="font-normal text-[10px]">bpm</span></div>
                <div>{result.zone3.min}–{result.zone3.max} <span className="font-normal text-[10px]">bpm</span></div>
                <div>{result.zone4.min}–{result.zone4.max} <span className="font-normal text-[10px]">bpm</span></div>
                <div>{result.zone5.min}–{result.zone5.max} <span className="font-normal text-[10px]">bpm</span></div>
              </div>
            </div>

            {/* Weekly Target Recommendations (AHA Guidelines) */}
            <div className="mt-8 pt-6 border-t border-slate-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-4 flex items-center gap-1.5">
                <Timer size={15} className="text-slate-400" />
                <span>Cardiologist Weekly Dose Guideline (American Heart Association)</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-800">Zone 2 Base Cardio</span>
                    <span className="text-xs font-bold text-emerald-700 bg-white px-2 py-0.5 rounded-full border border-emerald-200">
                      150–180 min/wk
                    </span>
                  </div>
                  <p className="text-xs text-emerald-950/80 mt-2">
                    Mitochondrial biogenesis & high fat-oxidation rate. Talk test: Easy conversation.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-200">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-teal-800">Zone 3–4 Threshold</span>
                    <span className="text-xs font-bold text-teal-700 bg-white px-2 py-0.5 rounded-full border border-teal-200">
                      45–75 min/wk
                    </span>
                  </div>
                  <p className="text-xs text-teal-950/80 mt-2">
                    Elevates stroke volume and lactate clearing threshold. Talk test: Broken sentences.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-rose-800">Zone 5 Peak Intervals</span>
                    <span className="text-xs font-bold text-rose-700 bg-white px-2 py-0.5 rounded-full border border-rose-200">
                      10–15 min/wk
                    </span>
                  </div>
                  <p className="text-xs text-rose-950/80 mt-2">
                    Maximal VO2 capacity & heart chamber elasticity. Talk test: Cannot speak.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* 5 Zones Grid */}
          <div className="space-y-3.5">
            
            {/* Zone 1 */}
            <div 
              onClick={() => setSelectedZone(selectedZone === "z1" ? null : "z1")}
              className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                selectedZone === "z1"
                  ? "bg-sky-50 border-sky-400 ring-2 ring-sky-400/30 shadow-xs"
                  : "bg-white border-slate-200/90 hover:border-slate-300 shadow-xs"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-sky-100 text-sky-800 font-bold text-xs flex items-center justify-center">
                  Z1
                </span>
                <div>
                  <h4 className="font-bold text-sm text-slate-900">{result.zone1.name} (50% - 60%)</h4>
                  <p className="text-xs text-slate-500">{result.zone1.desc}</p>
                </div>
              </div>
              <div className="text-lg font-bold text-slate-800 whitespace-nowrap bg-slate-50 px-4 py-1.5 rounded-xl border border-slate-100">
                {result.zone1.min} – {result.zone1.max} <span className="text-xs font-normal text-slate-400">bpm</span>
              </div>
            </div>

            {/* Zone 2 */}
            <div 
              onClick={() => setSelectedZone(selectedZone === "z2" ? null : "z2")}
              className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                selectedZone === "z2"
                  ? "bg-emerald-100/70 border-emerald-400 ring-2 ring-emerald-400/30 shadow-xs"
                  : "bg-emerald-50/40 border-emerald-200 hover:border-emerald-300 shadow-xs"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center">
                  Z2
                </span>
                <div>
                  <h4 className="font-bold text-sm text-emerald-950">{result.zone2.name} (60% - 70%)</h4>
                  <p className="text-xs text-slate-600">{result.zone2.desc}</p>
                </div>
              </div>
              <div className="text-lg font-bold text-emerald-800 whitespace-nowrap bg-emerald-100/70 px-4 py-1.5 rounded-xl border border-emerald-200">
                {result.zone2.min} – {result.zone2.max} <span className="text-xs font-normal text-emerald-600">bpm</span>
              </div>
            </div>

            {/* Zone 3 */}
            <div 
              onClick={() => setSelectedZone(selectedZone === "z3" ? null : "z3")}
              className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                selectedZone === "z3"
                  ? "bg-teal-100/70 border-teal-400 ring-2 ring-teal-400/30 shadow-xs"
                  : "bg-teal-50/40 border-teal-200 hover:border-teal-300 shadow-xs"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-teal-100 text-teal-800 font-bold text-xs flex items-center justify-center">
                  Z3
                </span>
                <div>
                  <h4 className="font-bold text-sm text-teal-950">{result.zone3.name} (70% - 80%)</h4>
                  <p className="text-xs text-slate-600">{result.zone3.desc}</p>
                </div>
              </div>
              <div className="text-lg font-bold text-teal-800 whitespace-nowrap bg-teal-100/70 px-4 py-1.5 rounded-xl border border-teal-200">
                {result.zone3.min} – {result.zone3.max} <span className="text-xs font-normal text-teal-600">bpm</span>
              </div>
            </div>

            {/* Zone 4 */}
            <div 
              onClick={() => setSelectedZone(selectedZone === "z4" ? null : "z4")}
              className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                selectedZone === "z4"
                  ? "bg-amber-100/70 border-amber-400 ring-2 ring-amber-400/30 shadow-xs"
                  : "bg-amber-50/40 border-amber-200 hover:border-amber-300 shadow-xs"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-orange-100 text-orange-800 font-bold text-xs flex items-center justify-center">
                  Z4
                </span>
                <div>
                  <h4 className="font-bold text-sm text-orange-950">{result.zone4.name} (80% - 90%)</h4>
                  <p className="text-xs text-slate-600">{result.zone4.desc}</p>
                </div>
              </div>
              <div className="text-lg font-bold text-orange-800 whitespace-nowrap bg-orange-100/70 px-4 py-1.5 rounded-xl border border-orange-200">
                {result.zone4.min} – {result.zone4.max} <span className="text-xs font-normal text-orange-600">bpm</span>
              </div>
            </div>

            {/* Zone 5 */}
            <div 
              onClick={() => setSelectedZone(selectedZone === "z5" ? null : "z5")}
              className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                selectedZone === "z5"
                  ? "bg-rose-100/70 border-rose-400 ring-2 ring-rose-400/30 shadow-xs"
                  : "bg-rose-50/40 border-rose-200 hover:border-rose-300 shadow-xs"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-rose-100 text-rose-800 font-bold text-xs flex items-center justify-center">
                  Z5
                </span>
                <div>
                  <h4 className="font-bold text-sm text-rose-950">{result.zone5.name} (90% - 100%)</h4>
                  <p className="text-xs text-slate-600">{result.zone5.desc}</p>
                </div>
              </div>
              <div className="text-lg font-bold text-rose-800 whitespace-nowrap bg-rose-100/70 px-4 py-1.5 rounded-xl border border-rose-200">
                {result.zone5.min} – {result.zone5.max} <span className="text-xs font-normal text-rose-600">bpm</span>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* Safety Note */}
      <div className="mt-8 bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 text-xs text-slate-600 space-y-2">
        <h4 className="font-bold text-slate-900 flex items-center gap-2 text-sm">
          <ShieldAlert size={16} className="text-amber-500" />
          <span>Cardiovascular Safety Advisory</span>
        </h4>
        <p className="leading-relaxed">
          If you experience dizziness, retrosternal chest pain, unusual dyspnea (shortness of breath), or heart palpitations during physical exertion, discontinue immediately and consult your cardiologist. Individuals on beta-blockers or antiarrhythmics will exhibit artificially blunted heart rates.
        </p>
      </div>

    </div>
  );
}

export default HeartRateZone;