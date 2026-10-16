import { useState } from "react";
import { TrendingUp, CheckCircle2, AlertCircle, RefreshCw, Info, Scale } from "lucide-react";

function IdealWeight() {
  const [height, setHeight] = useState("");
  const [gender, setGender] = useState("male");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const calculateIdealWeight = (e) => {
    if (e) e.preventDefault();
    const h = parseFloat(height);

    if (!h || h < 50 || h > 300) {
      setError("Please enter a valid height between 50 and 300 cm.");
      return;
    }

    setError(null);
    const heightM = h / 100;

    // WHO Healthy BMI Window: 18.5 to 24.9 kg/m²
    const minBmiWeight = (18.5 * heightM * heightM).toFixed(1);
    const maxBmiWeight = (24.9 * heightM * heightM).toFixed(1);

    // Devine Formula (Clinical standard for heights over 5 feet / 152.4 cm)
    let devineTarget;
    const totalInches = h / 2.54;
    const inchesOver5Ft = Math.max(0, totalInches - 60);

    if (gender === "male") {
      devineTarget = (50 + 2.3 * inchesOver5Ft).toFixed(1);
    } else {
      devineTarget = (45.5 + 2.3 * inchesOver5Ft).toFixed(1);
    }

    setResult({
      minWeight: minBmiWeight,
      maxWeight: maxBmiWeight,
      devineWeight: devineTarget,
    });
  };

  const resetForm = () => {
    setHeight("");
    setResult(null);
    setError(null);
  };

  return (
    <div className="max-w-4xl mx-auto py-6">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Ideal Body Weight (IBW) Calculator
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-600">
          Discover your optimal biological target weight and healthy BMI window according to clinical pharmacokinetics.
        </p>
      </div>

      {/* Input Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 mb-8">
        <form onSubmit={calculateIdealWeight} className="space-y-6">
          
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
                    ? "bg-teal-600 text-white border-teal-600 shadow-xs"
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
                    ? "bg-teal-600 text-white border-teal-600 shadow-xs"
                    : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                }`}
              >
                Female
              </button>
            </div>
          </div>

          {/* Height Input */}
          <div className="max-w-md">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Your Height
            </label>
            <div className="relative">
              <input
                type="number"
                min="50"
                max="300"
                step="0.1"
                placeholder="e.g., 172"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 text-base"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-400">
                cm
              </span>
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
              className="flex-1 py-3.5 rounded-2xl bg-teal-600 hover:bg-teal-700 active:scale-98 text-white font-semibold text-sm sm:text-base shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <TrendingUp size={18} />
              <span>Calculate Ideal Weight Range</span>
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
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            
            {/* Healthy Range Card */}
            <div className="bg-white rounded-3xl border border-teal-200 shadow-sm p-6 sm:p-8 text-center">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-800 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
                Healthy Biological Weight Range
              </span>
              <div className="text-4xl sm:text-5xl font-extrabold text-slate-900 my-3 tracking-tight">
                {result.minWeight} – {result.maxWeight} <span className="text-xl font-medium text-slate-400">kg</span>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                Equivalent to an optimal BMI window of 18.5 – 24.9 kg/m² for your stature.
              </p>
            </div>

            {/* Devine Clinical Target */}
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 text-center">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                Devine Pharmacological Target
              </span>
              <div className="text-4xl sm:text-5xl font-extrabold text-teal-700 my-3 tracking-tight">
                ~{result.devineWeight} <span className="text-xl font-medium text-slate-400">kg</span>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                Standard clinical formula utilized in medicine for calculating drug dosages.
              </p>
            </div>

          </div>

        </div>
      )}

      {/* Frame Size Guidance */}
      <div className="mt-8 bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 text-xs text-slate-600 space-y-2">
        <h4 className="font-bold text-slate-900 flex items-center gap-2 text-sm">
          <Info size={16} className="text-slate-400" />
          <span>Skeletal Frame & Muscle Nuance</span>
        </h4>
        <p className="leading-relaxed">
          Ideal weight formulas provide statistical approximations. Individuals with high bone mineral density or substantial athletic muscle development naturally calibrate toward the upper boundary of the healthy range without elevated cardiovascular risk.
        </p>
      </div>

    </div>
  );
}

export default IdealWeight;