import { useState } from "react";
import { Flame, Activity, AlertCircle, RefreshCw, CheckCircle2, Info } from "lucide-react";

function Calories() {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [activity, setActivity] = useState("1.375");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const calculateCalories = (e) => {
    if (e) e.preventDefault();
    const a = parseInt(age, 10);
    const h = parseFloat(height);
    const w = parseFloat(weight);

    if (!a || !h || !w || a < 1 || a > 120 || h < 50 || h > 300 || w < 2 || w > 500) {
      setError("Please enter valid age (1-120), height (50-300 cm), and weight (2-500 kg).");
      return;
    }

    setError(null);

    // Mifflin-St Jeor Formula
    let bmr;
    if (gender === "male") {
      bmr = 10 * w + 6.25 * h - 5 * a + 5;
    } else {
      bmr = 10 * w + 6.25 * h - 5 * a - 161;
    }

    const maintenance = Math.round(bmr * parseFloat(activity));
    const mildLoss = Math.round(maintenance - 250);
    const fatLoss = Math.round(maintenance - 500);
    const extremeLoss = Math.round(maintenance - 750);
    const weightGain = Math.round(maintenance + 400);

    setResult({
      bmr: Math.round(bmr),
      maintenance,
      mildLoss,
      fatLoss,
      extremeLoss: Math.max(extremeLoss, 1200),
      weightGain,
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
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200/80 text-orange-800 text-xs font-semibold mb-3">
          <Flame size={14} className="text-orange-600" />
          <span>Mifflin-St Jeor Energy Expenditure Model</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Daily Calorie & TDEE Calculator
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-600">
          Determine your Basal Metabolic Rate (BMR) and Total Daily Energy Expenditure (TDEE) to align your nutrition goals.
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 mb-8">
        <form onSubmit={calculateCalories} className="space-y-6">
          
          {/* Gender Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Biological Sex
            </label>
            <div className="grid grid-cols-2 gap-3 max-w-sm">
              <button
                type="button"
                onClick={() => setGender("male")}
                className={`py-3 rounded-2xl text-sm font-semibold border transition-all cursor-pointer ${
                  gender === "male"
                    ? "bg-emerald-600 text-white border-emerald-600 shadow-xs"
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
                    ? "bg-emerald-600 text-white border-emerald-600 shadow-xs"
                    : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                }`}
              >
                Female
              </button>
            </div>
          </div>

          {/* Measurements Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Age
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="1"
                  max="120"
                  placeholder="e.g., 28"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 text-base"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                  yrs
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Height
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="50"
                  max="300"
                  placeholder="e.g., 175"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 text-base"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                  cm
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Weight
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="2"
                  max="500"
                  placeholder="e.g., 72"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 text-base"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                  kg
                </span>
              </div>
            </div>
          </div>

          {/* Activity Level */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Physical Activity Level
            </label>
            <select
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
              className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 text-sm sm:text-base cursor-pointer"
            >
              <option value="1.2">Sedentary (Little or no physical exercise, desk job)</option>
              <option value="1.375">Light Exercise (Workout or sport 1-3 days/week)</option>
              <option value="1.55">Moderate Exercise (Workout or sport 3-5 days/week)</option>
              <option value="1.725">Heavy Exercise (Hard exercise or training 6-7 days/week)</option>
              <option value="1.9">Athlete / Extreme (Intense training twice daily)</option>
            </select>
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
              className="flex-1 py-3.5 rounded-2xl bg-orange-600 hover:bg-orange-700 active:scale-98 text-white font-semibold text-sm sm:text-base shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Flame size={18} />
              <span>Calculate Daily Calorie Needs</span>
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
          
          {/* Main Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            
            {/* Maintenance */}
            <div className="bg-white rounded-3xl border border-emerald-200 p-6 sm:p-7 shadow-xs">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                Daily Maintenance Energy (TDEE)
              </span>
              <div className="text-4xl sm:text-5xl font-extrabold text-slate-900 mt-4">
                {result.maintenance} <span className="text-lg font-medium text-slate-400">kcal/day</span>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                The exact caloric intake required to maintain your current biological weight.
              </p>
            </div>

            {/* BMR */}
            <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-xs">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200">
                Basal Metabolic Rate (BMR)
              </span>
              <div className="text-4xl sm:text-5xl font-extrabold text-slate-900 mt-4">
                {result.bmr} <span className="text-lg font-medium text-slate-400">kcal/day</span>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                Calories burned completely at physical rest to support involuntary vital organ functions.
              </p>
            </div>

          </div>

          {/* Goal-Driven Caloric Targets */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs">
            <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Activity size={18} className="text-orange-600" />
              <span>Target Caloric Windows by Health Goal</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              
              <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                  Mild Weight Loss (-0.25 kg/wk)
                </span>
                <div className="text-3xl font-bold text-slate-900 my-2">
                  {result.mildLoss} <span className="text-sm font-normal text-slate-500">kcal</span>
                </div>
                <p className="text-[11px] text-amber-900/80">Sustainable deficit without metabolic fatigue.</p>
              </div>

              <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                  Standard Fat Loss (-0.5 kg/wk)
                </span>
                <div className="text-3xl font-bold text-slate-900 my-2">
                  {result.fatLoss} <span className="text-sm font-normal text-slate-500">kcal</span>
                </div>
                <p className="text-[11px] text-emerald-900/80">Clinically recommended gold-standard deficit.</p>
              </div>

              <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-800">
                  Muscle & Weight Gain (+0.25 kg/wk)
                </span>
                <div className="text-3xl font-bold text-slate-900 my-2">
                  {result.weightGain} <span className="text-sm font-normal text-slate-500">kcal</span>
                </div>
                <p className="text-[11px] text-blue-900/80">Surplus paired with resistance training.</p>
              </div>

            </div>
          </div>

        </div>
      )}

      {/* Educational Note */}
      <div className="mt-8 bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 text-xs text-slate-600 space-y-2">
        <h4 className="font-bold text-slate-900 flex items-center gap-2 text-sm">
          <Info size={16} className="text-slate-400" />
          <span>Clinical Nutrition Guidance</span>
        </h4>
        <p className="leading-relaxed">
          Calorie intake represents an estimate. Daily metabolic variability, thyroid health, and muscle mass introduce subtle variations. Never sustain an intake below 1,200 kcal/day (women) or 1,500 kcal/day (men) without clinical supervision.
        </p>
      </div>

    </div>
  );
}

export default Calories;