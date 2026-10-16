import { useState } from "react";
import {
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Info,
  Scale,
  BarChart3,
  Target,
  ArrowRight,
  ShieldCheck,
  Activity,
  Layers,
  Sparkles
} from "lucide-react";

function IdealWeight() {
  const [height, setHeight] = useState("");
  const [currentWeight, setCurrentWeight] = useState("");
  const [gender, setGender] = useState("male");
  const [frameSize, setFrameSize] = useState("medium"); // small, medium, large
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const calculateIdealWeight = (e) => {
    if (e) e.preventDefault();
    const h = parseFloat(height);
    const w = currentWeight ? parseFloat(currentWeight) : null;

    if (!h || h < 100 || h > 250) {
      setError("Please enter a valid height between 100 cm and 250 cm.");
      return;
    }

    if (w !== null && (w < 20 || w > 350)) {
      setError("If entering current weight, please enter a realistic value between 20 kg and 350 kg.");
      return;
    }

    setError(null);
    const heightM = h / 100;
    const totalInches = h / 2.54;
    // Inches relative to 5 feet (60 inches)
    const inchesOver5Ft = totalInches - 60;

    // 1. Healthy BMI Window (18.5 - 24.9 kg/m²)
    const minBmiWeight = parseFloat((18.5 * heightM * heightM).toFixed(1));
    const maxBmiWeight = parseFloat((24.9 * heightM * heightM).toFixed(1));
    const midBmiWeight = parseFloat((21.7 * heightM * heightM).toFixed(1));

    // 2. Robinson Formula (1983)
    const robinson = parseFloat(
      (gender === "male"
        ? 52 + 1.9 * inchesOver5Ft
        : 49 + 1.7 * inchesOver5Ft
      ).toFixed(1)
    );

    // 3. Miller Formula (1983)
    const miller = parseFloat(
      (gender === "male"
        ? 56.2 + 1.41 * inchesOver5Ft
        : 53.1 + 1.36 * inchesOver5Ft
      ).toFixed(1)
    );

    // 4. Devine Formula (1974)
    const devine = parseFloat(
      (gender === "male"
        ? 50.0 + 2.3 * inchesOver5Ft
        : 45.5 + 2.3 * inchesOver5Ft
      ).toFixed(1)
    );

    // 5. Hamwi Formula (1964)
    const hamwi = parseFloat(
      (gender === "male"
        ? 48.0 + 2.7 * inchesOver5Ft
        : 45.5 + 2.2 * inchesOver5Ft
      ).toFixed(1)
    );

    // Baseline consensus average across formulas
    const avgTarget = parseFloat(
      ((robinson + miller + devine + hamwi) / 4).toFixed(1)
    );

    // Frame size adjustments (+/- 10%)
    const frameMultiplier = frameSize === "small" ? 0.9 : frameSize === "large" ? 1.1 : 1.0;
    const recommendedTarget = parseFloat((avgTarget * frameMultiplier).toFixed(1));

    // Current weight analysis (if provided)
    let weightDiff = null;
    let weightStatus = null;
    if (w !== null) {
      weightDiff = parseFloat((w - recommendedTarget).toFixed(1));
      if (w < minBmiWeight) {
        weightStatus = {
          label: "Below Healthy Range",
          color: "text-sky-700 bg-sky-50 border-sky-200",
          desc: `${(minBmiWeight - w).toFixed(1)} kg below the healthy BMI baseline`,
        };
      } else if (w > maxBmiWeight) {
        weightStatus = {
          label: "Above Healthy Range",
          color: "text-amber-700 bg-amber-50 border-amber-200",
          desc: `${(w - maxBmiWeight).toFixed(1)} kg above the healthy BMI window`,
        };
      } else {
        weightStatus = {
          label: "Within Healthy Range",
          color: "text-emerald-700 bg-emerald-50 border-emerald-200",
          desc: "Your current weight aligns inside the healthy biological window",
        };
      }
    }

    setResult({
      heightCm: h,
      currentWeight: w,
      minBmiWeight,
      maxBmiWeight,
      midBmiWeight,
      robinson,
      miller,
      devine,
      hamwi,
      avgTarget,
      recommendedTarget,
      weightDiff,
      weightStatus,
      smallFrameTarget: parseFloat((avgTarget * 0.9).toFixed(1)),
      mediumFrameTarget: avgTarget,
      largeFrameTarget: parseFloat((avgTarget * 1.1).toFixed(1)),
    });
  };

  const resetForm = () => {
    setHeight("");
    setCurrentWeight("");
    setResult(null);
    setError(null);
    setFrameSize("medium");
  };

  const toLbs = (kg) => (kg * 2.20462).toFixed(1);

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Ideal Body Weight Calculator
        </h1>
        <p className="mt-2 text-base text-slate-600">
          Find your optimal healthy weight range and compare recognized clinical formulas tailored to your height and frame size.
        </p>
      </div>

      {/* Input Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 mb-8">
        <form onSubmit={calculateIdealWeight} className="space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Gender Selector */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Biological Sex
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setGender("male")}
                  className={`py-3 px-4 rounded-2xl text-sm font-semibold border transition-all cursor-pointer ${
                    gender === "male"
                      ? "bg-teal-600 text-white border-teal-600 shadow-sm"
                      : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  Male
                </button>
                <button
                  type="button"
                  onClick={() => setGender("female")}
                  className={`py-3 px-4 rounded-2xl text-sm font-semibold border transition-all cursor-pointer ${
                    gender === "female"
                      ? "bg-teal-600 text-white border-teal-600 shadow-sm"
                      : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  Female
                </button>
              </div>
            </div>

            {/* Frame Size Selector */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Body Frame Size
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "small", label: "Small", sub: "Slender bone" },
                  { id: "medium", label: "Medium", sub: "Average" },
                  { id: "large", label: "Large", sub: "Broad frame" }
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setFrameSize(item.id)}
                    className={`py-2 px-2 rounded-2xl text-center border transition-all cursor-pointer ${
                      frameSize === item.id
                        ? "bg-teal-600 text-white border-teal-600 shadow-sm"
                        : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    <span className="block text-sm font-semibold">{item.label}</span>
                    <span className={`block text-[11px] ${frameSize === item.id ? "text-teal-100" : "text-slate-400"}`}>
                      {item.sub}
                    </span>
                  </button>
                ))}
              </div>
            </div>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Height Input */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Height <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="100"
                  max="250"
                  step="0.1"
                  placeholder="e.g. 175"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  required
                  className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 text-base"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-400">
                  cm
                </span>
              </div>
            </div>

            {/* Current Weight (Optional) */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-semibold text-slate-700">
                  Current Weight
                </label>
                <span className="text-xs text-slate-400 font-medium">Optional</span>
              </div>
              <div className="relative">
                <input
                  type="number"
                  min="20"
                  max="350"
                  step="0.1"
                  placeholder="e.g. 72"
                  value={currentWeight}
                  onChange={(e) => setCurrentWeight(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 text-base"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-400">
                  kg
                </span>
              </div>
            </div>

          </div>

          {error && (
            <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-3.5 rounded-xl border border-red-200 font-medium">
              <AlertCircle size={17} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 py-3.5 rounded-2xl bg-teal-600 hover:bg-teal-700 active:scale-[0.99] text-white font-semibold text-base shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <TrendingUp size={18} />
              <span>Calculate Ideal Weight</span>
            </button>
            {result && (
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-3.5 rounded-2xl border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors cursor-pointer"
                title="Reset form"
              >
                <RefreshCw size={18} />
              </button>
            )}
          </div>

        </form>
      </div>

      {/* Results View */}
      {result && (
        <div className="space-y-8 animate-in fade-in duration-300">
          
          {/* Main Recommended Target Hero Card */}
          <div className="bg-white rounded-3xl border border-teal-200/90 shadow-sm p-6 sm:p-8 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-teal-50/60 rounded-full blur-3xl -z-10 pointer-events-none" />
            
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-teal-800 bg-teal-50 px-3.5 py-1.5 rounded-full border border-teal-200/80 mb-3">
              <Sparkles size={14} className="text-teal-600" />
              Recommended Target Weight
            </span>

            <div className="text-5xl sm:text-6xl font-extrabold text-slate-900 tracking-tight my-2">
              {result.recommendedTarget} <span className="text-2xl font-medium text-slate-400">kg</span>
            </div>
            <div className="text-base text-slate-500 font-medium">
              ≈ {toLbs(result.recommendedTarget)} lbs (calibrated for {frameSize} frame)
            </div>

            {/* Quick Target Details Strip */}
            <div className="mt-6 pt-6 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
              
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 flex items-start gap-3">
                <ShieldCheck size={20} className="text-emerald-600 mt-0.5 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wide">Healthy Weight Window</div>
                  <div className="text-lg font-bold text-slate-900 mt-0.5">
                    {result.minBmiWeight} – {result.maxBmiWeight} kg
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    {toLbs(result.minBmiWeight)} – {toLbs(result.maxBmiWeight)} lbs (Healthy BMI Range)
                  </div>
                </div>
              </div>

              {result.currentWeight ? (
                <div className={`rounded-2xl p-4 border flex items-start gap-3 ${result.weightStatus.color}`}>
                  <Activity size={20} className="mt-0.5 shrink-0" />
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wide">
                      {result.weightStatus.label}
                    </div>
                    <div className="text-lg font-bold mt-0.5">
                      {result.weightDiff === 0
                        ? "Exactly on target!"
                        : result.weightDiff > 0
                        ? `+${result.weightDiff} kg above target`
                        : `${Math.abs(result.weightDiff)} kg below target`}
                    </div>
                    <div className="text-xs opacity-90 mt-0.5">
                      Current weight: {result.currentWeight} kg ({toLbs(result.currentWeight)} lbs)
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 flex items-start gap-3">
                  <Target size={20} className="text-teal-600 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wide">Average Clinical Consensus</div>
                    <div className="text-lg font-bold text-slate-900 mt-0.5">
                      {result.avgTarget} kg
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      Average of Robinson, Miller, Devine & Hamwi
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Visual Spectrum / Weight Position Bar */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8">
            <h3 className="text-base font-bold text-slate-900 mb-1 flex items-center gap-2">
              <Activity size={18} className="text-teal-600" />
              <span>Weight Spectrum Analysis</span>
            </h3>
            <p className="text-sm text-slate-500 mb-6 font-medium">
              How your targets sit along the healthy weight spectrum for a height of {result.heightCm} cm.
            </p>

            {/* Spectrum Range Bar */}
            {(() => {
              // Scale range from minBmiWeight - 15 to maxBmiWeight + 20
              const rangeMin = Math.max(30, Math.floor(result.minBmiWeight - 12));
              const rangeMax = Math.ceil(result.maxBmiWeight + 16);
              const totalSpan = rangeMax - rangeMin;

              const getPercent = (val) => {
                const clamped = Math.max(rangeMin, Math.min(val, rangeMax));
                return ((clamped - rangeMin) / totalSpan) * 100;
              };

              const healthyStartPct = getPercent(result.minBmiWeight);
              const healthyEndPct = getPercent(result.maxBmiWeight);
              const healthyWidth = healthyEndPct - healthyStartPct;
              const targetPct = getPercent(result.recommendedTarget);
              const currentPct = result.currentWeight ? getPercent(result.currentWeight) : null;

              return (
                <div className="pt-6 pb-4">
                  {/* Marker Row */}
                  <div className="relative h-6 mb-2">
                    {/* Target Pin */}
                    <div
                      className="absolute top-0 -translate-x-1/2 flex flex-col items-center z-10 transition-all duration-500"
                      style={{ left: `${targetPct}%` }}
                    >
                      <span className="text-[11px] font-bold text-teal-800 bg-teal-100 px-2 py-0.5 rounded-full border border-teal-300 shadow-xs whitespace-nowrap">
                        Target {result.recommendedTarget} kg
                      </span>
                      <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[5px] border-t-teal-700" />
                    </div>

                    {/* Current Weight Pin (if provided) */}
                    {currentPct !== null && (
                      <div
                        className="absolute top-0 -translate-x-1/2 flex flex-col items-center z-20 transition-all duration-500"
                        style={{ left: `${currentPct}%` }}
                      >
                        <span className="text-[11px] font-bold text-slate-900 bg-white px-2 py-0.5 rounded-full border border-slate-400 shadow-xs whitespace-nowrap">
                          You {result.currentWeight} kg
                        </span>
                        <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[5px] border-t-slate-800" />
                      </div>
                    )}
                  </div>

                  {/* Gradient Spectrum Bar */}
                  <div className="relative h-5 rounded-full overflow-hidden bg-slate-100 flex items-center shadow-inner">
                    {/* Underweight zone */}
                    <div
                      style={{ width: `${healthyStartPct}%` }}
                      className="h-full bg-sky-200"
                      title="Lower weight zone"
                    />
                    {/* Healthy zone */}
                    <div
                      style={{ width: `${healthyWidth}%` }}
                      className="h-full bg-emerald-500 relative flex items-center justify-center text-[10px] font-bold text-white tracking-wider uppercase"
                    >
                      Healthy Window
                    </div>
                    {/* Overweight zone */}
                    <div
                      className="h-full flex-1 bg-amber-200"
                      title="Higher weight zone"
                    />

                    {/* Target weight line indicator */}
                    <div
                      className="absolute top-0 bottom-0 w-1 bg-teal-900 z-10"
                      style={{ left: `${targetPct}%` }}
                    />
                  </div>

                  {/* Labels below spectrum */}
                  <div className="flex justify-between items-center text-xs font-semibold text-slate-500 mt-2">
                    <span>{rangeMin} kg</span>
                    <span className="text-emerald-700 font-bold">
                      {result.minBmiWeight} kg (Min Healthy)
                    </span>
                    <span className="text-emerald-700 font-bold">
                      {result.maxBmiWeight} kg (Max Healthy)
                    </span>
                    <span>{rangeMax} kg</span>
                  </div>
                </div>
              );
            })()}
          </div>

          {/* Formula Comparison Horizontal Bar Chart */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <BarChart3 size={18} className="text-teal-600" />
                  <span>Clinical Formula Comparison</span>
                </h3>
                <p className="text-sm text-slate-500 font-medium">
                  Side-by-side comparison across recognized ideal weight formulas.
                </p>
              </div>
              <span className="text-xs font-bold text-teal-800 bg-teal-50 border border-teal-200 px-3 py-1 rounded-full self-start sm:self-auto">
                Consensus Avg: {result.avgTarget} kg
              </span>
            </div>

            {(() => {
              const formulas = [
                {
                  name: "Robinson Formula",
                  year: "1983",
                  target: result.robinson,
                  role: "Popular standard for general fitness and health monitoring",
                },
                {
                  name: "Miller Formula",
                  year: "1983",
                  target: result.miller,
                  role: "Calibrated for moderate frames with balanced muscularity",
                },
                {
                  name: "Devine Formula",
                  year: "1974",
                  target: result.devine,
                  role: "Primary clinical benchmark used in hospitals and pharmacology",
                },
                {
                  name: "Hamwi Formula",
                  year: "1964",
                  target: result.hamwi,
                  role: "Traditional clinical guideline for optimal metabolic health",
                },
                {
                  name: "Healthy BMI Median",
                  year: "21.7 BMI",
                  target: result.midBmiWeight,
                  role: "Center-point of the recommended biological BMI window",
                },
              ];

              const allValues = formulas.map((f) => f.target);
              const minVal = Math.min(...allValues) - 4;
              const maxVal = Math.max(...allValues) + 4;
              const span = maxVal - minVal;

              return (
                <div className="space-y-4">
                  {formulas.map((item, idx) => {
                    const widthPct = Math.max(15, Math.min(100, ((item.target - minVal) / span) * 100));
                    const isClosestToTarget = item.target === result.avgTarget;

                    return (
                      <div
                        key={idx}
                        className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-teal-200 transition-colors"
                      >
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <div>
                            <span className="text-sm font-bold text-slate-800">
                              {item.name}
                            </span>
                            <span className="text-xs text-slate-400 ml-2 font-medium">
                              ({item.year})
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="text-sm sm:text-base font-extrabold text-slate-900">
                              {item.target} kg
                            </span>
                            <span className="text-xs text-slate-400 ml-1.5 font-medium">
                              / {toLbs(item.target)} lbs
                            </span>
                          </div>
                        </div>

                        {/* Relative Progress Bar */}
                        <div className="h-2.5 rounded-full bg-slate-200 overflow-hidden relative">
                          <div
                            className={`h-full rounded-full transition-all duration-700 ${
                              isClosestToTarget ? "bg-teal-600" : "bg-teal-500"
                            }`}
                            style={{ width: `${widthPct}%` }}
                          />
                        </div>

                        <div className="text-xs text-slate-500 mt-1.5">
                          {item.role}
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })()}
          </div>

          {/* Frame Size Calibration Card */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8">
            <h3 className="text-base font-bold text-slate-900 mb-1 flex items-center gap-2">
              <Layers size={18} className="text-teal-600" />
              <span>Frame Size Target Adjustments</span>
            </h3>
            <p className="text-sm text-slate-500 mb-5 font-medium">
              Skeletal frame circumference adjusts your target by ±10% around the baseline consensus.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div
                className={`p-4 rounded-2xl border transition-all ${
                  frameSize === "small"
                    ? "bg-teal-50/70 border-teal-300 shadow-xs"
                    : "bg-slate-50 border-slate-100"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-600">Small Frame (-10%)</span>
                  {frameSize === "small" && (
                    <span className="text-[11px] font-bold text-teal-700 bg-teal-100 px-2 py-0.5 rounded-full">
                      Selected
                    </span>
                  )}
                </div>
                <div className="text-2xl font-extrabold text-slate-900">
                  {result.smallFrameTarget} <span className="text-sm font-medium text-slate-400">kg</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Slender wrists & smaller bone structure
                </p>
              </div>

              <div
                className={`p-4 rounded-2xl border transition-all ${
                  frameSize === "medium"
                    ? "bg-teal-50/70 border-teal-300 shadow-xs"
                    : "bg-slate-50 border-slate-100"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-600">Medium Frame (Baseline)</span>
                  {frameSize === "medium" && (
                    <span className="text-[11px] font-bold text-teal-700 bg-teal-100 px-2 py-0.5 rounded-full">
                      Selected
                    </span>
                  )}
                </div>
                <div className="text-2xl font-extrabold text-teal-700">
                  {result.mediumFrameTarget} <span className="text-sm font-medium text-slate-400">kg</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Average build & standard clinical baseline
                </p>
              </div>

              <div
                className={`p-4 rounded-2xl border transition-all ${
                  frameSize === "large"
                    ? "bg-teal-50/70 border-teal-300 shadow-xs"
                    : "bg-slate-50 border-slate-100"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-600">Large Frame (+10%)</span>
                  {frameSize === "large" && (
                    <span className="text-[11px] font-bold text-teal-700 bg-teal-100 px-2 py-0.5 rounded-full">
                      Selected
                    </span>
                  )}
                </div>
                <div className="text-2xl font-extrabold text-slate-900">
                  {result.largeFrameTarget} <span className="text-sm font-medium text-slate-400">kg</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Broad shoulders & denser bone structure
                </p>
              </div>
            </div>
          </div>

          {/* Practical Guidelines & Health Tips */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-4">
            <h4 className="font-bold text-slate-900 flex items-center gap-2 text-base">
              <CheckCircle2 size={18} className="text-emerald-600" />
              <span>Key Clinical Takeaways</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-600">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <strong className="text-slate-900 block mb-1">Muscle vs. Fat Composition</strong>
                Athletes and strength-trained individuals naturally carry more dense lean muscle. Weighing in the upper boundary of your healthy range or slightly above is normal and healthy when body fat is low.
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <strong className="text-slate-900 block mb-1">Safe Pace of Progression</strong>
                If adjusting your weight toward your ideal target, aim for a gradual, sustainable change of approximately 0.5 kg (1 lb) per week to preserve metabolic rate and muscle tissue.
              </div>
            </div>
          </div>

        </div>
      )}

      {/* Frame Size Guidance Footer */}
      {!result && (
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 text-sm text-slate-600 space-y-2">
          <h4 className="font-bold text-slate-900 flex items-center gap-2 text-base">
            <Info size={18} className="text-teal-600" />
            <span>Understanding Ideal Body Weight</span>
          </h4>
          <p className="leading-relaxed">
            Ideal weight formulas provide valuable statistical benchmarks used in medicine and pharmacology. Because human bodies naturally vary in bone density, muscle distribution, and frame proportions, the healthy weight range is a flexible window rather than a single rigid number.
          </p>
        </div>
      )}

    </div>
  );
}

export default IdealWeight;