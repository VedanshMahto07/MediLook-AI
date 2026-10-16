import { useState } from "react";
import { Scale, CheckCircle2, AlertCircle, RefreshCw, Info, HeartPulse, Gauge, ShieldCheck, Activity, AlertTriangle } from "lucide-react";

function Bmi() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState(null);

  const calculateBMI = (e) => {
    if (e) e.preventDefault();
    const h = parseFloat(height);
    const w = parseFloat(weight);

    if (!h || !w || h < 50 || h > 300 || w < 2 || w > 500) {
      setError("Please enter valid height (50 - 300 cm) and weight (2 - 500 kg).");
      return;
    }

    setError(null);
    const value = w / ((h / 100) * (h / 100));
    const finalBMI = value.toFixed(1);

    let result = "";
    let tips = [];

    if (value < 18.5) {
      result = "Underweight";
      tips = [
        "Incorporate nutrient-dense, calorie-rich whole foods like nuts, avocados, and whole grains.",
        "Include quality protein with each meal to support lean muscle accretion.",
        "Consider resistance training exercises to build functional muscle mass.",
        "Consult a clinical dietitian to ensure adequate micronutrient coverage."
      ];
    } else if (value < 25) {
      result = "Normal Weight";
      tips = [
        "Maintain your balanced dietary regimen rich in diverse fiber and lean proteins.",
        "Engage in at least 150 minutes of moderate cardiovascular activity weekly.",
        "Prioritize consistent 7-9 hours of restorative sleep.",
        "Schedule periodic preventative wellness checkups."
      ];
    } else if (value < 30) {
      result = "Overweight";
      tips = [
        "Create a moderate caloric deficit by reducing refined carbohydrates and added sugars.",
        "Aim for 30-45 minutes of daily brisk walking or structured aerobic activity.",
        "Track daily portion sizes and maintain mindful hydration before meals.",
        "Focus on steady, gradual weight reduction (0.5 - 1 kg per week)."
      ];
    } else {
      result = "Obese";
      tips = [
        "Consult a healthcare professional for a personalized cardiovascular & metabolic workup.",
        "Implement a structured nutritional program with balanced macronutrient ratios.",
        "Introduce low-impact cardiovascular movement (e.g., swimming, cycling) to safeguard joints.",
        "Monitor blood pressure, fasting glucose, and lipid profiles regularly."
      ];
    }

    setBmi(finalBMI);
    setCategory(result);
    setSuggestions(tips);
  };

  const resetForm = () => {
    setHeight("");
    setWeight("");
    setBmi(null);
    setCategory("");
    setSuggestions([]);
    setError(null);
  };

  const getCategoryDetails = () => {
    if (category === "Underweight") {
      return { text: "text-amber-700", bg: "bg-amber-50 border-amber-200", bar: "w-[20%] bg-amber-500" };
    }
    if (category === "Normal Weight") {
      return { text: "text-emerald-700", bg: "bg-emerald-50 border-emerald-200", bar: "w-[50%] bg-emerald-500" };
    }
    if (category === "Overweight") {
      return { text: "text-orange-700", bg: "bg-orange-50 border-orange-200", bar: "w-[75%] bg-orange-500" };
    }
    return { text: "text-red-700", bg: "bg-red-50 border-red-200", bar: "w-[95%] bg-red-500" };
  };

  return (
    <div className="max-w-4xl mx-auto py-6">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          BMI Calculator
        </h1>
        <p className="mt-2 text-base sm:text-lg text-slate-600">
          Calculate your Body Mass Index and identify whether your weight falls into a healthy clinical range.
        </p>
      </div>

      {/* Calculator Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 mb-8">
        <form onSubmit={calculateBMI} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            
            {/* Height input */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Height (in Centimeters)
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="50"
                  max="300"
                  step="0.1"
                  placeholder="e.g., 175"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 text-base"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-400">
                  cm
                </span>
              </div>
            </div>

            {/* Weight input */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Weight (in Kilograms)
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
                  className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 text-base"
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
              className="flex-1 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-semibold text-sm sm:text-base shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Scale size={18} />
              <span>Calculate Body Mass Index</span>
            </button>
            {bmi && (
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

      {/* Result Display */}
      {bmi && (
        <div className="space-y-6 animate-in fade-in duration-300">
          
          {/* Main Speedometer Gauge Score Card */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Your Calculated Body Mass Index
            </span>

            {/* SVG Speedometer Gauge */}
            {(() => {
              const val = parseFloat(bmi) || 22;
              const clampedBmi = Math.max(12, Math.min(val, 38));
              // The needle path points straight UP (at 25.0).
              // Angle ranges from -90 deg (left tick 12) to +90 deg (right tick 38).
              const needleRotation = -90 + ((clampedBmi - 12) / (38 - 12)) * 180;
              
              const r = 85;
              const circumference = 2 * Math.PI * r; // ~534.07
              const halfCirc = Math.PI * r; // ~267.04
              
              const lenU = (6.5 / 26) * halfCirc; // Underweight: ~66.76
              const lenN = (6.5 / 26) * halfCirc; // Normal: ~66.76
              const lenO = (5.0 / 26) * halfCirc; // Overweight: ~51.35
              const lenOb = (8.0 / 26) * halfCirc; // Obese: ~82.17

              const offU = 0;
              const offN = lenU;
              const offO = lenU + lenN;
              const offOb = lenU + lenN + lenO;

              return (
                <div className="relative max-w-xs mx-auto my-2">
                  <svg viewBox="0 0 240 145" className="w-full h-auto overflow-visible">
                    {/* Background Track */}
                    <path
                      d="M 35 125 A 85 85 0 0 1 205 125"
                      fill="none"
                      stroke="#f1f5f9"
                      strokeWidth="16"
                      strokeLinecap="round"
                    />

                    {/* Underweight Segment (Sky Blue) */}
                    <circle
                      cx="120"
                      cy="125"
                      r={r}
                      fill="none"
                      stroke="#38bdf8"
                      strokeWidth="16"
                      strokeDasharray={`${lenU} ${circumference - lenU}`}
                      strokeDashoffset={-offU}
                      className="-rotate-180 origin-[120px_125px]"
                    />

                    {/* Normal Weight Segment (Emerald) */}
                    <circle
                      cx="120"
                      cy="125"
                      r={r}
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="16"
                      strokeDasharray={`${lenN} ${circumference - lenN}`}
                      strokeDashoffset={-offN}
                      className="-rotate-180 origin-[120px_125px]"
                    />

                    {/* Overweight Segment (Amber) */}
                    <circle
                      cx="120"
                      cy="125"
                      r={r}
                      fill="none"
                      stroke="#f59e0b"
                      strokeWidth="16"
                      strokeDasharray={`${lenO} ${circumference - lenO}`}
                      strokeDashoffset={-offO}
                      className="-rotate-180 origin-[120px_125px]"
                    />

                    {/* Obese Segment (Rose) */}
                    <circle
                      cx="120"
                      cy="125"
                      r={r}
                      fill="none"
                      stroke="#f43f5e"
                      strokeWidth="16"
                      strokeDasharray={`${lenOb} ${circumference - lenOb}`}
                      strokeDashoffset={-offOb}
                      className="-rotate-180 origin-[120px_125px]"
                    />

                    {/* Ticks & Labels */}
                    <text x="35" y="142" textAnchor="middle" className="text-[10px] fill-slate-400 font-bold">12</text>
                    <text x="78" y="50" textAnchor="middle" className="text-[10px] fill-slate-400 font-bold">18.5</text>
                    <text x="120" y="30" textAnchor="middle" className="text-[10px] fill-emerald-600 font-bold">25.0</text>
                    <text x="165" y="50" textAnchor="middle" className="text-[10px] fill-slate-400 font-bold">30.0</text>
                    <text x="205" y="142" textAnchor="middle" className="text-[10px] fill-slate-400 font-bold">38+</text>

                    {/* Needle Indicator */}
                    <g
                      transform={`rotate(${needleRotation} 120 125)`}
                      style={{
                        transition: "transform 1s cubic-bezier(0.34, 1.56, 0.64, 1)"
                      }}
                    >
                      <path
                        d="M 118 125 L 119.5 45 L 120.5 45 L 122 125 Z"
                        fill="#0f172a"
                      />
                      <circle cx="120" cy="125" r="7" fill="#0f172a" stroke="#ffffff" strokeWidth="2.5" />
                      <circle cx="120" cy="125" r="2.5" fill="#ffffff" />
                    </g>
                  </svg>
                </div>
              );
            })()}

            {/* Score & Category Display */}
            <div className="text-5xl sm:text-6xl font-extrabold text-slate-900 tracking-tight mt-1">
              {bmi} <span className="text-xl font-medium text-slate-400">kg/m²</span>
            </div>

            <div className="mt-3 flex items-center justify-center gap-2">
              <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-bold border shadow-xs ${getCategoryDetails().bg} ${getCategoryDetails().text}`}>
                <HeartPulse size={16} />
                <span>{category}</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-500 mt-2 font-medium">
              Healthy Target Window: <strong className="text-emerald-700">18.5 – 24.9 kg/m²</strong>
            </p>
          </div>

          {/* Recommendations Card */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8">
            <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
              <CheckCircle2 size={18} className="text-emerald-600" />
              <span>Tailored Lifestyle Recommendations</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {suggestions.map((tip, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100 flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                  <span className="text-emerald-600 font-bold mt-0.5">✓</span>
                  <span className="leading-relaxed">{tip}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* Clinical BMI Scale Reference - Revamped UI */}
      <div className="mt-8 bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Gauge size={20} className="text-emerald-600" />
              <span>Body Mass Index (BMI) Reference Scale</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Standard clinical thresholds used by epidemiologists and preventive physicians.
            </p>
          </div>
          {category && (
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 self-start sm:self-auto">
              Active: {category}
            </span>
          )}
        </div>

        {/* Continuous Color Indicator Bar */}
        <div className="mb-6 space-y-1.5">
          <div className="h-3 w-full rounded-full bg-slate-100 overflow-hidden flex p-0.5 border border-slate-200">
            <div className="w-[25%] bg-sky-400 rounded-l-full" title="Underweight (<18.5)"></div>
            <div className="w-[25%] bg-emerald-500" title="Normal (18.5 - 24.9)"></div>
            <div className="w-[19.2%] bg-amber-400" title="Overweight (25 - 29.9)"></div>
            <div className="w-[30.8%] bg-rose-500 rounded-r-full" title="Obese (≥30.0)"></div>
          </div>
          <div className="flex justify-between text-[11px] font-bold text-slate-400 px-1">
            <span>&lt; 18.5</span>
            <span>18.5 – 24.9</span>
            <span>25.0 – 29.9</span>
            <span>≥ 30.0</span>
          </div>
        </div>

        {/* 4 Interactive Category Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Underweight */}
          <div className={`p-4 sm:p-5 rounded-2xl border transition-all duration-300 ${
            category === "Underweight"
              ? "bg-sky-50/90 border-sky-400 ring-2 ring-sky-400/30 shadow-md"
              : "bg-slate-50/60 border-slate-200/90 hover:bg-white hover:border-slate-300"
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className="w-8 h-8 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center font-bold text-sm">
                <Scale size={16} />
              </span>
              {category === "Underweight" && (
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-sky-600 text-white shadow-xs">
                  Your Score
                </span>
              )}
            </div>
            <h4 className="font-bold text-slate-900 text-base">Underweight</h4>
            <div className="text-sky-700 font-extrabold text-sm sm:text-base my-1">
              &lt; 18.5 <span className="text-xs font-normal text-slate-500">kg/m²</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-2">
              Higher risk of micronutrient deficiencies, weakened immune function, and bone density loss.
            </p>
          </div>

          {/* Normal Weight */}
          <div className={`p-4 sm:p-5 rounded-2xl border transition-all duration-300 ${
            category === "Normal Weight"
              ? "bg-emerald-50/90 border-emerald-400 ring-2 ring-emerald-400/30 shadow-md"
              : "bg-slate-50/60 border-slate-200/90 hover:bg-white hover:border-slate-300"
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">
                <ShieldCheck size={16} />
              </span>
              {category === "Normal Weight" && (
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-600 text-white shadow-xs">
                  Your Score ✓
                </span>
              )}
            </div>
            <h4 className="font-bold text-slate-900 text-base">Normal Weight</h4>
            <div className="text-emerald-700 font-extrabold text-sm sm:text-base my-1">
              18.5 – 24.9 <span className="text-xs font-normal text-slate-500">kg/m²</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-2">
              Lowest statistical disease incidence and optimal cardiovascular health longevity.
            </p>
          </div>

          {/* Overweight */}
          <div className={`p-4 sm:p-5 rounded-2xl border transition-all duration-300 ${
            category === "Overweight"
              ? "bg-amber-50/90 border-amber-400 ring-2 ring-amber-400/30 shadow-md"
              : "bg-slate-50/60 border-slate-200/90 hover:bg-white hover:border-slate-300"
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-sm">
                <Activity size={16} />
              </span>
              {category === "Overweight" && (
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-600 text-white shadow-xs">
                  Your Score
                </span>
              )}
            </div>
            <h4 className="font-bold text-slate-900 text-base">Overweight</h4>
            <div className="text-amber-700 font-extrabold text-sm sm:text-base my-1">
              25.0 – 29.9 <span className="text-xs font-normal text-slate-500">kg/m²</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-2">
              Elevated strain on joints and early indicators for hypertension or lipid variations.
            </p>
          </div>

          {/* Obese Class */}
          <div className={`p-4 sm:p-5 rounded-2xl border transition-all duration-300 ${
            category === "Obese"
              ? "bg-rose-50/90 border-rose-400 ring-2 ring-rose-400/30 shadow-md"
              : "bg-slate-50/60 border-slate-200/90 hover:bg-white hover:border-slate-300"
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className="w-8 h-8 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-sm">
                <AlertTriangle size={16} />
              </span>
              {category === "Obese" && (
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-rose-600 text-white shadow-xs">
                  Your Score
                </span>
              )}
            </div>
            <h4 className="font-bold text-slate-900 text-base">Obese Class</h4>
            <div className="text-rose-700 font-extrabold text-sm sm:text-base my-1">
              ≥ 30.0 <span className="text-xs font-normal text-slate-500">kg/m²</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-2">
              Substantially higher risks for type 2 diabetes, sleep apnea, and vascular conditions.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}

export default Bmi;