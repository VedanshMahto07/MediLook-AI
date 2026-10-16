import { useState } from "react";
import { UserCheck, CheckCircle2, AlertCircle, RefreshCw, Info, BarChart3 } from "lucide-react";

function BodyFat() {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const calculateBodyFat = (e) => {
    if (e) e.preventDefault();
    const a = parseInt(age, 10);
    const h = parseFloat(height);
    const w = parseFloat(weight);

    if (!a || !h || !w || a < 1 || a > 120 || h < 50 || h > 300 || w < 2 || w > 500) {
      setError("Please enter valid age (1-120), height (50-300 cm), and weight (2-500 kg).");
      return;
    }

    setError(null);

    const bmi = w / ((h / 100) * (h / 100));
    let fatPercentage;

    // Deurenberg Adult Body Fat Formula
    if (gender === "male") {
      fatPercentage = 1.20 * bmi + 0.23 * a - 16.2;
    } else {
      fatPercentage = 1.20 * bmi + 0.23 * a - 5.4;
    }

    fatPercentage = Math.max(2, Math.min(fatPercentage, 70)).toFixed(1);

    let category = "";
    let statusColor = "";

    if (gender === "male") {
      if (fatPercentage < 6) {
        category = "Essential Fat";
        statusColor = "text-amber-700 bg-amber-50 border-amber-200";
      } else if (fatPercentage <= 13) {
        category = "Athletic";
        statusColor = "text-emerald-700 bg-emerald-50 border-emerald-200";
      } else if (fatPercentage <= 17) {
        category = "Fitness";
        statusColor = "text-emerald-700 bg-emerald-50 border-emerald-200";
      } else if (fatPercentage <= 24) {
        category = "Average / Acceptable";
        statusColor = "text-blue-700 bg-blue-50 border-blue-200";
      } else {
        category = "Elevated Body Fat";
        statusColor = "text-rose-700 bg-rose-50 border-rose-200";
      }
    } else {
      if (fatPercentage < 14) {
        category = "Essential Fat";
        statusColor = "text-amber-700 bg-amber-50 border-amber-200";
      } else if (fatPercentage <= 20) {
        category = "Athletic";
        statusColor = "text-emerald-700 bg-emerald-50 border-emerald-200";
      } else if (fatPercentage <= 24) {
        category = "Fitness";
        statusColor = "text-emerald-700 bg-emerald-50 border-emerald-200";
      } else if (fatPercentage <= 31) {
        category = "Average / Acceptable";
        statusColor = "text-blue-700 bg-blue-50 border-blue-200";
      } else {
        category = "Elevated Body Fat";
        statusColor = "text-rose-700 bg-rose-50 border-rose-200";
      }
    }

    setResult({
      percentage: fatPercentage,
      category,
      statusColor,
      fatMass: ((w * parseFloat(fatPercentage)) / 100).toFixed(1),
      leanMass: (w - (w * parseFloat(fatPercentage)) / 100).toFixed(1)
    });
  };

  const resetForm = () => {
    setAge("");
    setHeight("");
    setWeight("");
    setResult(null);
    setError(null);
  };

  return (
    <div className="max-w-4xl mx-auto py-6">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Body Fat Percentage Calculator
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-600">
          Estimate your biological body composition, fat mass, and functional lean tissue ratio.
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 mb-8">
        <form onSubmit={calculateBodyFat} className="space-y-6">
          
          {/* Gender Selector */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Biological Sex
            </label>
            <div className="grid grid-cols-2 gap-3 max-w-sm">
              <button
                type="button"
                onClick={() => setGender("male")}
                className={`py-3 rounded-2xl text-sm font-semibold border transition-all cursor-pointer ${
                  gender === "male"
                    ? "bg-purple-600 text-white border-purple-600 shadow-xs"
                    : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                }`}
              >
                Male
              </button>
              <button
                type="button"
                onClick={() => setGender("female")}
                className={`py-3 rounded-2xl text-sm font-semibold border transition-all cursor-pointer ${
                  gender === "female"
                    ? "bg-purple-600 text-white border-purple-600 shadow-xs"
                    : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                }`}
              >
                Female
              </button>
            </div>
          </div>

          {/* Measurements */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Age
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="1"
                  max="120"
                  placeholder="e.g., 26"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500 text-base"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-400">
                  yrs
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Height
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="50"
                  max="300"
                  placeholder="e.g., 178"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500 text-base"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-400">
                  cm
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Weight
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="2"
                  max="500"
                  placeholder="e.g., 74"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500 text-base"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-400">
                  kg
                </span>
              </div>
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
              className="flex-1 py-3.5 rounded-2xl bg-purple-600 hover:bg-purple-700 active:scale-98 text-white font-semibold text-sm sm:text-base shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <UserCheck size={18} />
              <span>Calculate Body Composition</span>
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
          
          {/* Main Card */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Estimated Body Fat Ratio
            </span>
            <div className="text-5xl sm:text-6xl font-extrabold text-slate-900 my-2 tracking-tight">
              {result.percentage}%
            </div>
            
            <div className="mt-3">
              <span className={`inline-flex px-4 py-1.5 rounded-full text-sm font-bold border ${result.statusColor}`}>
                {result.category}
              </span>
            </div>

            {/* Mass Breakdown */}
            <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-slate-100 max-w-md mx-auto text-center">
              <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-100">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-800">
                  Estimated Fat Mass
                </span>
                <div className="text-2xl font-bold text-slate-900 mt-1">
                  {result.fatMass} <span className="text-sm font-normal text-slate-500">kg</span>
                </div>
                <span className="text-[11px] font-semibold text-purple-600 mt-0.5 block">{result.percentage}% Total</span>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                  Lean Body Mass
                </span>
                <div className="text-2xl font-bold text-slate-900 mt-1">
                  {result.leanMass} <span className="text-sm font-normal text-slate-500">kg</span>
                </div>
                <span className="text-[11px] font-semibold text-emerald-600 mt-0.5 block">{(100 - parseFloat(result.percentage)).toFixed(1)}% Total</span>
              </div>
            </div>
          </div>

          {/* Visual Body Composition Split Bar */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
              <BarChart3 size={20} className="text-purple-600" />
              <span>Body Tissue Composition Spectrum</span>
            </h3>
            <p className="text-xs text-slate-500 mb-5">
              Proportion of metabolically active lean mass versus adipose lipid storage.
            </p>

            {(() => {
              const fatPct = Math.min(Math.max(parseFloat(result.percentage), 2), 65);
              const leanPct = 100 - fatPct;

              return (
                <div className="space-y-4">
                  {/* Visual Bar */}
                  <div className="w-full h-8 rounded-2xl bg-slate-100 overflow-hidden flex p-1 border border-slate-200">
                    <div
                      className="h-full bg-emerald-500 rounded-l-xl transition-all duration-700 ease-out flex items-center justify-center text-white text-xs font-extrabold"
                      style={{ width: `${leanPct}%` }}
                      title={`Lean Mass: ${leanPct.toFixed(1)}%`}
                    >
                      {leanPct > 18 ? `${leanPct.toFixed(1)}% Lean` : ""}
                    </div>
                    <div
                      className="h-full bg-purple-500 rounded-r-xl transition-all duration-700 ease-out flex items-center justify-center text-white text-xs font-extrabold"
                      style={{ width: `${fatPct}%` }}
                      title={`Fat Mass: ${fatPct.toFixed(1)}%`}
                    >
                      {fatPct > 15 ? `${fatPct.toFixed(1)}% Fat` : ""}
                    </div>
                  </div>

                  {/* Legend & Descriptions */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                    <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-100 flex items-start gap-2.5">
                      <span className="w-3 h-3 rounded-full bg-emerald-500 shrink-0 mt-0.5"></span>
                      <div>
                        <strong className="text-emerald-950 block font-bold">Lean Body Mass ({result.leanMass} kg)</strong>
                        <span className="text-emerald-900/80">Includes skeletal muscle, organ tissue, bone density, and intracellular water.</span>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-purple-50/70 border border-purple-100 flex items-start gap-2.5">
                      <span className="w-3 h-3 rounded-full bg-purple-500 shrink-0 mt-0.5"></span>
                      <div>
                        <strong className="text-purple-950 block font-bold">Adipose Fat Mass ({result.fatMass} kg)</strong>
                        <span className="text-purple-900/80">Essential physiological lipids and visceral/subcutaneous energy stores.</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>

        </div>
      )}

      {/* American Council on Exercise (ACE) Standards */}
      <div className="mt-8 bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 text-xs">
        <h4 className="font-bold text-slate-900 flex items-center gap-2 text-sm mb-4">
          <Info size={16} className="text-slate-400" />
          <span>American Council on Exercise (ACE) Body Fat Categorization</span>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="font-bold text-slate-800 block">Men's Standards</span>
            <div className="flex justify-between text-slate-600"><span>Essential Fat:</span> <strong className="text-slate-900">2 - 5%</strong></div>
            <div className="flex justify-between text-slate-600"><span>Athletes:</span> <strong className="text-slate-900">6 - 13%</strong></div>
            <div className="flex justify-between text-slate-600"><span>Fitness:</span> <strong className="text-slate-900">14 - 17%</strong></div>
            <div className="flex justify-between text-slate-600"><span>Average:</span> <strong className="text-slate-900">18 - 24%</strong></div>
            <div className="flex justify-between text-slate-600"><span>Elevated:</span> <strong className="text-slate-900">25%+</strong></div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="font-bold text-slate-800 block">Women's Standards</span>
            <div className="flex justify-between text-slate-600"><span>Essential Fat:</span> <strong className="text-slate-900">10 - 13%</strong></div>
            <div className="flex justify-between text-slate-600"><span>Athletes:</span> <strong className="text-slate-900">14 - 20%</strong></div>
            <div className="flex justify-between text-slate-600"><span>Fitness:</span> <strong className="text-slate-900">21 - 24%</strong></div>
            <div className="flex justify-between text-slate-600"><span>Average:</span> <strong className="text-slate-900">25 - 31%</strong></div>
            <div className="flex justify-between text-slate-600"><span>Elevated:</span> <strong className="text-slate-900">32%+</strong></div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default BodyFat;