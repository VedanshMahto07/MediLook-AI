import { useState } from "react";
import { Heart, Activity, AlertCircle, RefreshCw, Info, Flame, ShieldAlert } from "lucide-react";

function HeartRateZone() {
  const [age, setAge] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

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

          {/* 5 Zones Grid */}
          <div className="space-y-3.5">
            
            {/* Zone 1 */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center">
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
            <div className="p-5 rounded-2xl bg-emerald-50/40 border border-emerald-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
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
            <div className="p-5 rounded-2xl bg-blue-50/40 border border-blue-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-blue-100 text-blue-800 font-bold text-xs flex items-center justify-center">
                  Z3
                </span>
                <div>
                  <h4 className="font-bold text-sm text-blue-950">{result.zone3.name} (70% - 80%)</h4>
                  <p className="text-xs text-slate-600">{result.zone3.desc}</p>
                </div>
              </div>
              <div className="text-lg font-bold text-blue-800 whitespace-nowrap bg-blue-100/70 px-4 py-1.5 rounded-xl border border-blue-200">
                {result.zone3.min} – {result.zone3.max} <span className="text-xs font-normal text-blue-600">bpm</span>
              </div>
            </div>

            {/* Zone 4 */}
            <div className="p-5 rounded-2xl bg-orange-50/40 border border-orange-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
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
            <div className="p-5 rounded-2xl bg-rose-50/40 border border-rose-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
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