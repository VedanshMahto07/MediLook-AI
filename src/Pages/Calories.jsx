import { useState } from "react";
import { Flame, Activity, AlertCircle, RefreshCw, CheckCircle2, Info, PieChart, BarChart3, Target, Utensils, Zap } from "lucide-react";

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

  const [goal, setGoal] = useState("maintenance");
  const [macroDiet, setMacroDiet] = useState("balanced");

  const getTargetCalories = () => {
    if (!result) return 2000;
    if (goal === "fatLoss") return result.fatLoss;
    if (goal === "mildLoss") return result.mildLoss;
    if (goal === "weightGain") return result.weightGain;
    return result.maintenance;
  };

  const getMacroBreakdown = () => {
    const target = getTargetCalories();
    let pRatio = 0.30;
    let cRatio = 0.40;
    let fRatio = 0.30;

    if (macroDiet === "highProtein") {
      pRatio = 0.40;
      cRatio = 0.35;
      fRatio = 0.25;
    } else if (macroDiet === "lowCarb") {
      pRatio = 0.35;
      cRatio = 0.15;
      fRatio = 0.50;
    }

    const pCal = Math.round(target * pRatio);
    const cCal = Math.round(target * cRatio);
    const fCal = Math.round(target * fRatio);

    return {
      target,
      pRatio: Math.round(pRatio * 100),
      cRatio: Math.round(cRatio * 100),
      fRatio: Math.round(fRatio * 100),
      pGrams: Math.round(pCal / 4),
      cGrams: Math.round(cCal / 4),
      fGrams: Math.round(fCal / 9),
      pCal,
      cCal,
      fCal
    };
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
            <label className="block text-sm font-semibold text-slate-700 mb-2">
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
              <label className="block text-sm font-semibold text-slate-700 mb-2">
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
                  placeholder="e.g., 175"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 text-base"
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
                  placeholder="e.g., 72"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 text-base"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-400">
                  kg
                </span>
              </div>
            </div>
          </div>

          {/* Activity Level */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
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
            <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Activity size={18} className="text-orange-600" />
                <span>Target Caloric Windows by Health Goal</span>
              </span>
              <span className="text-xs text-slate-400 font-normal">Click a goal to update macro chart</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              
              <button
                type="button"
                onClick={() => setGoal("mildLoss")}
                className={`p-5 rounded-2xl border text-left transition-all cursor-pointer ${
                  goal === "mildLoss"
                    ? "bg-amber-100/70 border-amber-400 ring-2 ring-amber-400/30"
                    : "bg-amber-50/70 border-amber-200 hover:bg-amber-100/50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                    Mild Weight Loss (-0.25 kg/wk)
                  </span>
                  {goal === "mildLoss" && <CheckCircle2 size={16} className="text-amber-600 shrink-0" />}
                </div>
                <div className="text-3xl font-bold text-slate-900 my-2">
                  {result.mildLoss} <span className="text-sm font-normal text-slate-500">kcal</span>
                </div>
                <p className="text-xs text-amber-900/80">Sustainable deficit without metabolic fatigue.</p>
              </button>

              <button
                type="button"
                onClick={() => setGoal("fatLoss")}
                className={`p-5 rounded-2xl border text-left transition-all cursor-pointer ${
                  goal === "fatLoss"
                    ? "bg-emerald-100/70 border-emerald-400 ring-2 ring-emerald-400/30"
                    : "bg-emerald-50/70 border-emerald-200 hover:bg-emerald-100/50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                    Standard Fat Loss (-0.5 kg/wk)
                  </span>
                  {goal === "fatLoss" && <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />}
                </div>
                <div className="text-3xl font-bold text-slate-900 my-2">
                  {result.fatLoss} <span className="text-sm font-normal text-slate-500">kcal</span>
                </div>
                <p className="text-xs text-emerald-900/80">Clinically recommended gold-standard deficit.</p>
              </button>

              <button
                type="button"
                onClick={() => setGoal("weightGain")}
                className={`p-5 rounded-2xl border text-left transition-all cursor-pointer ${
                  goal === "weightGain"
                    ? "bg-blue-100/70 border-blue-400 ring-2 ring-blue-400/30"
                    : "bg-blue-50/70 border-blue-200 hover:bg-blue-100/50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-800">
                    Muscle Gain (+0.25 kg/wk)
                  </span>
                  {goal === "weightGain" && <CheckCircle2 size={16} className="text-blue-600 shrink-0" />}
                </div>
                <div className="text-3xl font-bold text-slate-900 my-2">
                  {result.weightGain} <span className="text-sm font-normal text-slate-500">kcal</span>
                </div>
                <p className="text-xs text-blue-900/80">Surplus paired with resistance training.</p>
              </button>

            </div>
          </div>

          {/* Interactive Macronutrient Donut Chart Section */}
          {(() => {
            const macros = getMacroBreakdown();
            const radius = 54;
            const circumference = 2 * Math.PI * radius; // ~339.29
            
            // Calculate stroke segments
            const pLength = (macros.pRatio / 100) * circumference;
            const cLength = (macros.cRatio / 100) * circumference;
            const fLength = (macros.fRatio / 100) * circumference;

            const pOffset = 0;
            const cOffset = pLength;
            const fOffset = pLength + cLength;

            return (
              <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs">
                
                {/* Header & Controls */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                      <PieChart size={20} className="text-emerald-600" />
                      <span>Target Macronutrient Distribution Chart</span>
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Computed for <strong className="text-slate-800 capitalize">{goal.replace(/([A-Z])/g, " $1")}</strong> ({macros.target} kcal/day)
                    </p>
                  </div>

                  {/* Ratio Preset Switcher */}
                  <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-2xl text-xs font-semibold">
                    <button
                      type="button"
                      onClick={() => setMacroDiet("balanced")}
                      className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                        macroDiet === "balanced"
                          ? "bg-white text-emerald-800 shadow-xs"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      Balanced
                    </button>
                    <button
                      type="button"
                      onClick={() => setMacroDiet("highProtein")}
                      className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                        macroDiet === "highProtein"
                          ? "bg-white text-emerald-800 shadow-xs"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      High Protein
                    </button>
                    <button
                      type="button"
                      onClick={() => setMacroDiet("lowCarb")}
                      className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                        macroDiet === "lowCarb"
                          ? "bg-white text-emerald-800 shadow-xs"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      Low Carb
                    </button>
                  </div>
                </div>

                {/* Donut & Stats Layout */}
                <div className="pt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  
                  {/* Vector SVG Donut Chart */}
                  <div className="lg:col-span-5 flex flex-col items-center justify-center">
                    <div className="relative w-48 h-48 sm:w-52 sm:h-52">
                      <svg viewBox="0 0 140 140" className="w-full h-full -rotate-90">
                        {/* Background Track */}
                        <circle
                          cx="70"
                          cy="70"
                          r={radius}
                          fill="none"
                          stroke="#f1f5f9"
                          strokeWidth="15"
                        />
                        {/* Protein Segment */}
                        <circle
                          cx="70"
                          cy="70"
                          r={radius}
                          fill="none"
                          stroke="#10b981"
                          strokeWidth="15"
                          strokeDasharray={`${pLength} ${circumference - pLength}`}
                          strokeDashoffset={-pOffset}
                          className="transition-all duration-700 ease-out"
                        />
                        {/* Carbs Segment */}
                        <circle
                          cx="70"
                          cy="70"
                          r={radius}
                          fill="none"
                          stroke="#f59e0b"
                          strokeWidth="15"
                          strokeDasharray={`${cLength} ${circumference - cLength}`}
                          strokeDashoffset={-cOffset}
                          className="transition-all duration-700 ease-out"
                        />
                        {/* Fats Segment */}
                        <circle
                          cx="70"
                          cy="70"
                          r={radius}
                          fill="none"
                          stroke="#6366f1"
                          strokeWidth="15"
                          strokeDasharray={`${fLength} ${circumference - fLength}`}
                          strokeDashoffset={-fOffset}
                          className="transition-all duration-700 ease-out"
                        />
                      </svg>

                      {/* Center Label */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                        <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                          {macros.target}
                        </span>
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                          kcal / day
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 mt-3 text-xs font-semibold text-slate-600">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                        Protein ({macros.pRatio}%)
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                        Carbs ({macros.cRatio}%)
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
                        Fats ({macros.fRatio}%)
                      </span>
                    </div>
                  </div>

                  {/* Macro Cards */}
                  <div className="lg:col-span-7 space-y-3.5">
                    
                    {/* Protein */}
                    <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200/80 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">
                          🥩
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-slate-900">Protein</h4>
                          <p className="text-xs text-slate-500">{macros.pCal} kcal • Muscle repair & satiety</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-extrabold text-emerald-800">{macros.pGrams}g</span>
                        <span className="block text-[11px] font-semibold text-emerald-600">{macros.pRatio}% of intake</span>
                      </div>
                    </div>

                    {/* Carbs */}
                    <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200/80 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-sm">
                          🌾
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-slate-900">Complex Carbohydrates</h4>
                          <p className="text-xs text-slate-500">{macros.cCal} kcal • Glycogen & mental energy</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-extrabold text-amber-800">{macros.cGrams}g</span>
                        <span className="block text-[11px] font-semibold text-amber-600">{macros.cRatio}% of intake</span>
                      </div>
                    </div>

                    {/* Healthy Fats */}
                    <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-200/80 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm">
                          🥑
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-slate-900">Healthy Fats</h4>
                          <p className="text-xs text-slate-500">{macros.fCal} kcal • Hormones & organ support</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-extrabold text-indigo-800">{macros.fGrams}g</span>
                        <span className="block text-[11px] font-semibold text-indigo-600">{macros.fRatio}% of intake</span>
                      </div>
                    </div>

                  </div>

                </div>

              </div>
            );
          })()}

          {/* Caloric Intake Spectrum Bar Chart */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
              <BarChart3 size={20} className="text-orange-600" />
              <span>Comparative Calorie Spectrum Chart</span>
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Compare your metabolic baseline against all deficit and surplus caloric tiers.
            </p>

            {(() => {
              const maxScale = Math.max(result.weightGain, result.maintenance) + 400;
              const tiers = [
                { label: "Basal Metabolic Rate (BMR)", kcal: result.bmr, color: "bg-slate-400", desc: "Complete physical rest" },
                { label: "Extreme Deficit", kcal: result.extremeLoss, color: "bg-rose-500", desc: "-750 kcal/day" },
                { label: "Standard Fat Loss", kcal: result.fatLoss, color: "bg-emerald-500", desc: "-500 kcal/day" },
                { label: "Mild Deficit", kcal: result.mildLoss, color: "bg-amber-500", desc: "-250 kcal/day" },
                { label: "Daily Maintenance (TDEE)", kcal: result.maintenance, color: "bg-teal-600", desc: "Energy equilibrium" },
                { label: "Muscle & Weight Gain", kcal: result.weightGain, color: "bg-blue-600", desc: "+400 kcal/day" },
              ];

              return (
                <div className="space-y-4">
                  {tiers.map((tier, idx) => {
                    const widthPercent = Math.min(Math.round((tier.kcal / maxScale) * 100), 100);
                    return (
                      <div key={idx} className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs sm:text-sm font-semibold">
                          <span className="text-slate-800 flex items-center gap-2">
                            <span>{tier.label}</span>
                            <span className="text-[11px] font-normal text-slate-400">({tier.desc})</span>
                          </span>
                          <span className="text-slate-900 font-bold">{tier.kcal} kcal</span>
                        </div>
                        <div className="w-full h-3.5 bg-slate-100 rounded-full overflow-hidden p-0.5">
                          <div
                            className={`h-full rounded-full transition-all duration-700 ease-out ${tier.color}`}
                            style={{ width: `${widthPercent}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })()}
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