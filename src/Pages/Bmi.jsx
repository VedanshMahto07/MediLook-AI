import { useState } from "react";
import { Scale, CheckCircle2, AlertCircle, RefreshCw, Info, HeartPulse } from "lucide-react";

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
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-semibold mb-3">
          <Scale size={14} className="text-emerald-600" />
          <span>WHO Anthropometric Metric</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          BMI Calculator
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-600">
          Calculate your Body Mass Index and identify whether your weight falls into a healthy clinical range.
        </p>
      </div>

      {/* Calculator Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 mb-8">
        <form onSubmit={calculateBMI} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            
            {/* Height input */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
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
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                  cm
                </span>
              </div>
            </div>

            {/* Weight input */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Weight (in Kilograms)
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="2"
                  max="500"
                  step="0.1"
                  placeholder="e.g., 70"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 text-base"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
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
          
          {/* Main Score Card */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Your Calculated Score
            </span>
            <div className="text-5xl sm:text-6xl font-extrabold text-slate-900 my-2 tracking-tight">
              {bmi} <span className="text-xl font-medium text-slate-400">kg/m²</span>
            </div>
            
            <div className="mt-3">
              <span className={`inline-flex px-4 py-1.5 rounded-full text-sm font-bold border ${getCategoryDetails().bg} ${getCategoryDetails().text}`}>
                {category}
              </span>
            </div>

            {/* Visual BMI Range Spectrum */}
            <div className="mt-8 max-w-lg mx-auto">
              <div className="h-3.5 rounded-full bg-slate-100 flex overflow-hidden p-0.5 border border-slate-200">
                <div className="w-[18.5%] bg-amber-400 rounded-l-full" title="Underweight (<18.5)"></div>
                <div className="w-[30%] bg-emerald-500" title="Normal (18.5 - 24.9)"></div>
                <div className="w-[25%] bg-orange-400" title="Overweight (25 - 29.9)"></div>
                <div className="w-[26.5%] bg-red-500 rounded-r-full" title="Obese (30+)"></div>
              </div>

              <div className="flex justify-between text-[11px] text-slate-400 mt-2 font-medium">
                <span>&lt; 18.5 (Under)</span>
                <span>18.5 - 24.9 (Normal)</span>
                <span>25 - 29.9 (Over)</span>
                <span>30+ (Obese)</span>
              </div>
            </div>
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

      {/* Clinical BMI Scale Reference */}
      <div className="mt-8 bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8">
        <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Info size={17} className="text-slate-400" />
          <span>WHO Body Mass Index Classification Scale</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200">
            <span className="font-bold text-amber-900 block">Underweight</span>
            <span className="text-amber-700 text-sm font-semibold">&lt; 18.5 kg/m²</span>
            <p className="text-[11px] text-amber-800/80 mt-1">Increased risk of nutritional deficiency.</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200">
            <span className="font-bold text-emerald-900 block">Normal Weight</span>
            <span className="text-emerald-700 text-sm font-semibold">18.5 – 24.9 kg/m²</span>
            <p className="text-[11px] text-emerald-800/80 mt-1">Lowest statistical disease mortality risk.</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-orange-50/70 border border-orange-200">
            <span className="font-bold text-orange-900 block">Overweight</span>
            <span className="text-orange-700 text-sm font-semibold">25.0 – 29.9 kg/m²</span>
            <p className="text-[11px] text-orange-800/80 mt-1">Elevated risk for hypertension and lipids.</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-red-50/70 border border-red-200">
            <span className="font-bold text-red-900 block">Obese Class</span>
            <span className="text-red-700 text-sm font-semibold">≥ 30.0 kg/m²</span>
            <p className="text-[11px] text-red-800/80 mt-1">High cardiovascular & metabolic risk.</p>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Bmi;