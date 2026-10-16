import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { model } from "../Config/Gemini";
import {
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  AlertCircle,
  Pill,
  Apple,
  Clock,
  Plus,
  X,
  Sparkles,
  RefreshCw,
  Copy,
  Check,
  Info,
  ShieldCheck,
  Utensils,
  ArrowRight,
  Activity,
  Zap,
  HelpCircle,
  Bot
} from "lucide-react";

const popularPresets = [
  {
    label: "Blood Thinner & Painkiller",
    badge: "High Risk",
    badgeColor: "bg-rose-50 text-rose-700 border-rose-200",
    meds: ["Warfarin", "Ibuprofen"],
    foods: ["Alcohol"]
  },
  {
    label: "Diabetes & Alcohol",
    badge: "Metabolic Risk",
    badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
    meds: ["Metformin"],
    foods: ["Alcohol"]
  },
  {
    label: "Cholesterol & Grapefruit",
    badge: "Food-Drug",
    badgeColor: "bg-purple-50 text-purple-700 border-purple-200",
    meds: ["Atorvastatin"],
    foods: ["Grapefruit Juice"]
  },
  {
    label: "Thyroid & Dairy / Coffee",
    badge: "Absorption",
    badgeColor: "bg-sky-50 text-sky-700 border-sky-200",
    meds: ["Levothyroxine"],
    foods: ["Coffee", "Dairy Milk"]
  },
  {
    label: "Antibiotic & Dairy / Antacid",
    badge: "Chelation",
    badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
    meds: ["Ciprofloxacin"],
    foods: ["Calcium Milk"]
  },
  {
    label: "Standard Fever & Antibiotic",
    badge: "Common Combo",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    meds: ["Paracetamol", "Amoxicillin"],
    foods: []
  }
];

function DrugInteractions() {
  const [searchParams] = useSearchParams();
  const [medInput, setMedInput] = useState("");
  const [foodInput, setFoodInput] = useState("");
  const [medicines, setMedicines] = useState(["Warfarin", "Ibuprofen"]);
  const [foods, setFoods] = useState(["Alcohol"]);
  
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const q = searchParams.get("q");
    if (q) {
      const parts = q
        .split(/[,+]|\band\b/i)
        .map((p) => p.trim())
        .filter(Boolean);
      if (parts.length > 0) {
        setMedicines(parts);
        setFoods([]);
        setResult(null);
      }
    }
  }, [searchParams]);

  const addMedicine = (e) => {
    if (e) e.preventDefault();
    const trimmed = medInput.trim();
    if (!trimmed) return;
    if (medicines.some((m) => m.toLowerCase() === trimmed.toLowerCase())) {
      setError(`"${trimmed}" is already added to medications.`);
      return;
    }
    setMedicines([...medicines, trimmed]);
    setMedInput("");
    setError(null);
  };

  const removeMedicine = (index) => {
    setMedicines(medicines.filter((_, i) => i !== index));
  };

  const addFood = (e) => {
    if (e) e.preventDefault();
    const trimmed = foodInput.trim();
    if (!trimmed) return;
    if (foods.some((f) => f.toLowerCase() === trimmed.toLowerCase())) {
      setError(`"${trimmed}" is already added to dietary items.`);
      return;
    }
    setFoods([...foods, trimmed]);
    setFoodInput("");
    setError(null);
  };

  const removeFood = (index) => {
    setFoods(foods.filter((_, i) => i !== index));
  };

  const loadPreset = (preset) => {
    setMedicines(preset.meds);
    setFoods(preset.foods);
    setResult(null);
    setError(null);
  };

  const resetAll = () => {
    setMedicines([]);
    setFoods([]);
    setMedInput("");
    setFoodInput("");
    setResult(null);
    setError(null);
  };

  const analyzeInteractions = async () => {
    if (medicines.length === 0 && foods.length === 0) {
      setError("Please add at least one medication or food item to analyze.");
      return;
    }

    if (medicines.length === 1 && foods.length === 0) {
      setError("Please add at least two items (e.g. 2 medications, or 1 medication + 1 food) to check for interactions.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setResult(null);

      const prompt = `
You are an expert clinical pharmacist and pharmacology AI.
Analyze potential drug-to-drug and drug-to-food interactions for the following patient intake:

MEDICATIONS: ${medicines.join(", ") || "None"}
FOODS / BEVERAGES / SUPPLEMENTS: ${foods.join(", ") || "None"}

Evaluate clinical pharmacokinetic and pharmacodynamic interactions.
Return ONLY a valid JSON object matching this exact schema:

{
  "overallRisk": "High", // Options: "Severe", "High", "Moderate", "Low", "None"
  "summary": "1-2 sentence concise clinical summary of the interaction profile.",
  "interactions": [
    {
      "itemA": "Name of first drug or food",
      "itemB": "Name of second drug or food",
      "type": "Drug-to-Drug", // Options: "Drug-to-Drug" or "Drug-to-Food"
      "severity": "High", // Options: "Severe", "High", "Moderate", "Minor"
      "effect": "Direct plain-language biological outcome (under 20 words)",
      "mechanism": "Pharmacological mechanism explained simply (under 25 words)",
      "actionPlan": "Actionable step patient or prescriber must take (under 25 words)",
      "redFlagSymptoms": [
        "Symptom to watch out for 1",
        "Symptom to watch out for 2"
      ]
    }
  ],
  "dietaryRules": [
    {
      "substance": "Specific food/drink/nutrient",
      "recommendation": "Clear instruction (e.g., Avoid completely / Take 2 hours apart / Eat with food)",
      "explanation": "Why this dietary rule matters (under 20 words)"
    }
  ],
  "suggestedSchedule": [
    {
      "timeSlot": "Morning (e.g. 8:00 AM)",
      "action": "What to take and how (with water, food, or empty stomach)"
    },
    {
      "timeSlot": "Midday / Afternoon",
      "action": "What to take and how"
    },
    {
      "timeSlot": "Evening / Night",
      "action": "What to take and how"
    }
  ],
  "emergencyWarnings": [
    "Critical sign requiring immediate emergency room or 911 care"
  ]
}

RULES:
- If no clinically significant interactions exist, set overallRisk to "None" or "Low" and interactions array can be empty or list a harmless interaction.
- Keep all explanations direct, patient-accessible, and strictly free of asterisks or markdown formatting inside JSON string values.
- Output clean, valid JSON only.
`;

      const response = await model.generateContent(prompt);
      const text = response.response.text();
      const cleaned = text
        .replace(/```json/gi, "")
        .replace(/```/g, "")
        .trim();

      const parsed = JSON.parse(cleaned);
      setResult(parsed);
    } catch (err) {
      console.error("Interaction analysis error:", err);
      setError("Unable to complete interaction analysis. Please verify your inputs and try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyReport = () => {
    if (!result) return;
    const textToCopy = `
MEDILOOK AI - DRUG & FOOD INTERACTION REPORT
--------------------------------------------
Overall Risk: ${result.overallRisk}
Summary: ${result.summary}

Items Evaluated:
- Medications: ${medicines.join(", ") || "None"}
- Foods/Beverages: ${foods.join(", ") || "None"}

Key Interactions Detected:
${result.interactions?.map((it, idx) => `
${idx + 1}. [${it.severity.toUpperCase()} RISK] ${it.itemA} + ${it.itemB} (${it.type})
- Effect: ${it.effect}
- Action: ${it.actionPlan}
`).join("\n") || "No adverse interactions identified."}

Generated by MediLook AI (For educational purposes; consult your physician/pharmacist).
    `.trim();

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const getRiskBadge = (risk) => {
    switch (risk?.toLowerCase()) {
      case "severe":
      case "high":
        return {
          level: "High Risk",
          pct: 88,
          bg: "bg-gradient-to-r from-rose-600 to-red-600 text-white shadow-md shadow-rose-500/25",
          cardBg: "border-rose-300/90 bg-gradient-to-br from-rose-50/90 via-white to-red-50/50",
          textColor: "text-rose-700",
          accentColor: "text-rose-600",
          borderAccent: "border-l-rose-500",
          icon: AlertTriangle,
          label: "High / Severe Interaction Risk",
          headline: "Critical Interaction Hazard Detected",
          subheadline: "Significant pharmacokinetic clashes detected that require immediate medical caution.",
        };
      case "moderate":
        return {
          level: "Moderate Risk",
          pct: 50,
          bg: "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md shadow-amber-500/25",
          cardBg: "border-amber-300/90 bg-gradient-to-br from-amber-50/90 via-white to-orange-50/50",
          textColor: "text-amber-700",
          accentColor: "text-amber-600",
          borderAccent: "border-l-amber-500",
          icon: AlertCircle,
          label: "Moderate Interaction Risk",
          headline: "Moderate Caution & Monitoring Required",
          subheadline: "Potential interaction exists; proper timing spacing and symptom tracking advised.",
        };
      case "low":
      case "none":
      default:
        return {
          level: "Safe / Low",
          pct: 16,
          bg: "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-500/25",
          cardBg: "border-emerald-300/90 bg-gradient-to-br from-emerald-50/90 via-white to-teal-50/50",
          textColor: "text-emerald-700",
          accentColor: "text-emerald-600",
          borderAccent: "border-l-emerald-500",
          icon: ShieldCheck,
          label: "Low / No Critical Interactions",
          headline: "Favorable Safety Profile",
          subheadline: "No severe pharmacological clashes identified between these items.",
        };
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
          Drug & Food Interaction Checker
        </h1>
        <p className="mt-3 text-base sm:text-lg text-slate-600">
          Check potential contraindications, adverse reactions, and dietary timing clashes between multiple medications and foods.
        </p>
      </div>

      {/* Preset Quick-Fill Chips */}
      <div className="mb-8">
        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <Zap size={14} className="text-teal-600" />
          <span>Quick Example Scenarios:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {popularPresets.map((preset, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => loadPreset(preset)}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-medium bg-white border border-slate-200 hover:border-teal-400 hover:bg-teal-50/40 text-slate-700 transition-all cursor-pointer shadow-xs active:scale-98"
            >
              <span>{preset.label}</span>
              <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${preset.badgeColor}`}>
                {preset.badge}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Input Builder Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Medications Column */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <Pill size={17} className="text-teal-600" />
                <span>Prescription & OTC Medications</span>
              </label>
              <span className="text-xs font-semibold text-slate-400">
                {medicines.length} added
              </span>
            </div>

            <form onSubmit={addMedicine} className="flex gap-2 mb-3">
              <input
                type="text"
                placeholder="e.g. Aspirin, Warfarin, Metformin..."
                value={medInput}
                onChange={(e) => setMedInput(e.target.value)}
                className="flex-1 px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 text-sm sm:text-base font-medium"
              />
              <button
                type="submit"
                className="px-4 py-3 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm transition-all cursor-pointer flex items-center gap-1 shrink-0"
              >
                <Plus size={16} />
                <span>Add</span>
              </button>
            </form>

            {/* Medicine Tags */}
            <div className="min-h-[50px] p-2.5 rounded-2xl bg-slate-50 border border-slate-100 flex flex-wrap gap-2">
              {medicines.length === 0 ? (
                <span className="text-xs text-slate-400 italic p-1.5">
                  No medications added yet. Type above and press Add.
                </span>
              ) : (
                medicines.map((med, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-50 border border-teal-200 text-teal-900 font-semibold text-xs sm:text-sm shadow-2xs"
                  >
                    <Pill size={14} className="text-teal-600 shrink-0" />
                    <span>{med}</span>
                    <button
                      type="button"
                      onClick={() => removeMedicine(index)}
                      className="text-teal-700 hover:text-rose-600 transition-colors p-0.5 cursor-pointer ml-1"
                      title="Remove"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))
              )}
            </div>
          </div>

          {/* Foods & Beverages Column */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <Apple size={17} className="text-emerald-600" />
                <span>Foods, Beverages & Supplements</span>
              </label>
              <span className="text-xs font-semibold text-slate-400">
                {foods.length} added
              </span>
            </div>

            <form onSubmit={addFood} className="flex gap-2 mb-3">
              <input
                type="text"
                placeholder="e.g. Grapefruit, Alcohol, Dairy, Coffee..."
                value={foodInput}
                onChange={(e) => setFoodInput(e.target.value)}
                className="flex-1 px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 text-sm sm:text-base font-medium"
              />
              <button
                type="submit"
                className="px-4 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-all cursor-pointer flex items-center gap-1 shrink-0"
              >
                <Plus size={16} />
                <span>Add</span>
              </button>
            </form>

            {/* Food Tags */}
            <div className="min-h-[50px] p-2.5 rounded-2xl bg-slate-50 border border-slate-100 flex flex-wrap gap-2">
              {foods.length === 0 ? (
                <span className="text-xs text-slate-400 italic p-1.5">
                  No dietary items added yet (optional, or type above).
                </span>
              ) : (
                foods.map((food, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 font-semibold text-xs sm:text-sm shadow-2xs"
                  >
                    <Apple size={14} className="text-emerald-600 shrink-0" />
                    <span>{food}</span>
                    <button
                      type="button"
                      onClick={() => removeFood(index)}
                      className="text-emerald-700 hover:text-rose-600 transition-colors p-0.5 cursor-pointer ml-1"
                      title="Remove"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))
              )}
            </div>
          </div>

        </div>

        {error && (
          <div className="mt-5 flex items-center gap-2 text-sm text-red-600 bg-red-50 p-3.5 rounded-xl border border-red-200 font-medium">
            <AlertCircle size={17} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-6 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-3">
          <button
            type="button"
            onClick={analyzeInteractions}
            disabled={loading}
            className={`w-full sm:flex-1 py-4 px-6 rounded-2xl text-white font-bold text-base shadow-md transition-all cursor-pointer flex items-center justify-center gap-2.5 ${
              loading
                ? "bg-teal-400 cursor-not-allowed"
                : "bg-teal-600 hover:bg-teal-700 active:scale-[0.99] shadow-teal-600/20"
            }`}
          >
            {loading ? (
              <>
                <RefreshCw size={19} className="animate-spin" />
                <span>Analyzing Pharmacological Interactions...</span>
              </>
            ) : (
              <>
                <Sparkles size={19} />
                <span>Check Interactions Now</span>
              </>
            )}
          </button>

          {(medicines.length > 0 || foods.length > 0 || result) && (
            <button
              type="button"
              onClick={resetAll}
              disabled={loading}
              className="w-full sm:w-auto px-5 py-4 rounded-2xl border border-slate-200 hover:bg-slate-50 text-slate-600 font-semibold text-sm transition-colors cursor-pointer"
            >
              Clear All
            </button>
          )}
        </div>

      </div>

      {/* Loading Skeleton */}
      {loading && (
        <div className="bg-white rounded-3xl border border-teal-200 shadow-sm p-8 text-center space-y-4 animate-pulse">
          <div className="w-14 h-14 bg-teal-100 rounded-2xl mx-auto flex items-center justify-center text-teal-600">
            <RefreshCw size={26} className="animate-spin" />
          </div>
          <h3 className="text-xl font-bold text-slate-800">
            Cross-Referencing Clinical Drug Databases...
          </h3>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            Checking CYP450 enzyme pathways, plasma protein binding, absorption conflicts, and synergistic physiological effects.
          </p>
        </div>
      )}

      {/* Results View */}
      {result && !loading && (
        <div className="space-y-8 animate-in fade-in duration-300">
          
          {/* Executive Risk Banner */}
          {(() => {
            const riskConfig = getRiskBadge(result.overallRisk);
            const RiskIcon = riskConfig.icon;
            const interactionCount = result.interactions?.length || 0;

            return (
              <div className={`rounded-3xl border ${riskConfig.cardBg} p-6 sm:p-8 relative overflow-hidden shadow-sm transition-all`}>
                {/* Background soft ambient blur */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-white/40 rounded-full blur-3xl -z-10 pointer-events-none" />

                {/* Top Row: Severity Indicator & Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200/70">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className={`px-4 py-2 rounded-2xl font-extrabold text-xs sm:text-sm flex items-center gap-2 ${riskConfig.bg}`}>
                      <RiskIcon size={18} className="shrink-0" />
                      <span>{riskConfig.label}</span>
                    </span>

                    <span className="text-xs font-bold text-slate-600 uppercase tracking-wider bg-white/90 px-3.5 py-1.5 rounded-xl border border-slate-200/80 shadow-2xs">
                      {interactionCount} Conflict{interactionCount !== 1 ? "s" : ""} Identified
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <button
                      type="button"
                      onClick={copyReport}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs sm:text-sm font-semibold hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
                    >
                      {copied ? (
                        <>
                          <Check size={16} className="text-emerald-600" />
                          <span className="text-emerald-700 font-bold">Report Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy size={16} />
                          <span>Copy Report</span>
                        </>
                      )}
                    </button>

                    <Link
                      to="/doctor"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs sm:text-sm font-bold transition-all shadow-xs"
                      title="Ask AI Doctor about alternatives"
                    >
                      <Bot size={16} />
                      <span className="hidden sm:inline">Ask AI Doctor</span>
                    </Link>
                  </div>
                </div>

                {/* Headline & Clinical Narrative */}
                <div className="mt-5 space-y-3">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                      {riskConfig.headline}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
                      {riskConfig.subheadline}
                    </p>
                  </div>

                  <div className={`p-4 sm:p-5 rounded-2xl bg-white/95 border border-slate-200/90 shadow-xs border-l-4 ${riskConfig.borderAccent}`}>
                    <p className="text-base sm:text-lg font-medium text-slate-800 leading-relaxed">
                      {result.summary}
                    </p>
                  </div>
                </div>

                {/* 3-Tier Risk Spectrum Meter */}
                <div className="mt-6 pt-5 border-t border-slate-200/70">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
                      <Activity size={14} className="text-teal-600" />
                      <span>Pharmacological Risk Spectrum</span>
                    </span>
                    <span className="text-xs font-bold text-slate-800">
                      Calculated Severity: <strong className={riskConfig.accentColor}>{riskConfig.level}</strong>
                    </span>
                  </div>

                  <div className="relative h-4 rounded-full overflow-hidden bg-slate-200/60 flex items-center shadow-inner">
                    <div className="h-full w-1/3 bg-emerald-400 flex items-center justify-center text-[9px] font-bold text-white uppercase tracking-wider">
                      Low
                    </div>
                    <div className="h-full w-1/3 bg-amber-400 flex items-center justify-center text-[9px] font-bold text-white uppercase tracking-wider">
                      Moderate
                    </div>
                    <div className="h-full w-1/3 bg-rose-500 flex items-center justify-center text-[9px] font-bold text-white uppercase tracking-wider">
                      High / Severe
                    </div>

                    {/* Active Severity Pin */}
                    <div
                      className="absolute top-0 bottom-0 w-2.5 bg-slate-950 rounded-full shadow-md transition-all duration-700 -translate-x-1/2 border border-white"
                      style={{ left: `${riskConfig.pct}%` }}
                    />
                  </div>
                </div>

                {/* Items Screened Tag Strip */}
                <div className="mt-5 flex flex-wrap items-center gap-2 text-xs">
                  <span className="font-bold text-slate-500 uppercase tracking-wider">Screened Compounds:</span>
                  {medicines.map((m, i) => (
                    <span key={i} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-teal-50 text-teal-800 font-semibold border border-teal-200/80">
                      <Pill size={12} className="text-teal-600" />
                      <span>{m}</span>
                    </span>
                  ))}
                  {foods.map((f, i) => (
                    <span key={i} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200/80">
                      <Apple size={12} className="text-emerald-600" />
                      <span>{f}</span>
                    </span>
                  ))}
                </div>

              </div>
            );
          })()}

          {/* Interaction Cards List */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                <AlertTriangle size={20} className="text-amber-600" />
                <span>Identified Interaction Details</span>
              </h2>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                {result.interactions?.length || 0} pair(s) analyzed
              </span>
            </div>

            {(!result.interactions || result.interactions.length === 0) ? (
              <div className="bg-white rounded-3xl border border-emerald-200 p-8 text-center space-y-2">
                <ShieldCheck size={36} className="text-emerald-600 mx-auto" />
                <h3 className="text-lg font-bold text-slate-900">
                  No Direct Interactions Detected
                </h3>
                <p className="text-sm text-slate-600 max-w-lg mx-auto">
                  The current combination of medications and dietary items shows no major pharmacological clashes in standard databases. Continue taking as prescribed.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {result.interactions.map((item, idx) => {
                  const isHigh = ["severe", "high"].includes(item.severity?.toLowerCase());
                  const isModerate = item.severity?.toLowerCase() === "moderate";

                  const badgeStyle = isHigh
                    ? "bg-rose-100 text-rose-800 border-rose-300"
                    : isModerate
                    ? "bg-amber-100 text-amber-800 border-amber-300"
                    : "bg-slate-100 text-slate-700 border-slate-200";

                  return (
                    <div
                      key={idx}
                      className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-7 hover:border-slate-300 transition-all"
                    >
                      {/* Top Row: Items & Badges */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-base sm:text-lg font-bold text-slate-900">
                            {item.itemA}
                          </span>
                          <span className="text-slate-400 font-bold px-1">↔</span>
                          <span className="text-base sm:text-lg font-bold text-slate-900">
                            {item.itemB}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 border border-slate-200">
                            {item.type}
                          </span>
                          <span className={`text-xs font-extrabold px-3 py-1 rounded-lg border ${badgeStyle}`}>
                            {item.severity} Severity
                          </span>
                        </div>
                      </div>

                      {/* Mechanism & Effect */}
                      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                          <div className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">
                            Biological Consequence
                          </div>
                          <p className="text-sm font-semibold text-slate-800 leading-snug">
                            {item.effect}
                          </p>
                        </div>
                        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                          <div className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">
                            Actionable Guidance
                          </div>
                          <p className="text-sm font-semibold text-teal-800 leading-snug">
                            {item.actionPlan}
                          </p>
                        </div>
                      </div>

                      {/* Mechanism explanation */}
                      <div className="mt-3 text-xs text-slate-600 font-medium">
                        <span className="font-bold text-slate-700">How it works: </span>
                        {item.mechanism}
                      </div>

                      {/* Red Flag Symptoms */}
                      {item.redFlagSymptoms && item.redFlagSymptoms.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-slate-100">
                          <div className="text-xs font-bold text-rose-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                            <AlertCircle size={14} />
                            <span>Adverse Symptoms to Monitor:</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {item.redFlagSymptoms.map((symp, sIdx) => (
                              <span
                                key={sIdx}
                                className="text-xs font-medium px-2.5 py-1 rounded-lg bg-rose-50 text-rose-800 border border-rose-200"
                              >
                                {symp}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Food & Dietary Precautions Grid */}
          {result.dietaryRules && result.dietaryRules.length > 0 && (
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8">
              <h3 className="text-lg font-bold text-slate-900 mb-1 flex items-center gap-2">
                <Utensils size={18} className="text-emerald-600" />
                <span>Dietary Precautions & Food Timing</span>
              </h3>
              <p className="text-sm text-slate-500 mb-6 font-medium">
                Specific nutritional interactions and safe spacing rules for your ingested items.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {result.dietaryRules.map((rule, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-bold text-sm text-slate-900">
                        {rule.substance}
                      </span>
                      <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                        {rule.recommendation}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {rule.explanation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Timing & Administration Timetable */}
          {result.suggestedSchedule && result.suggestedSchedule.length > 0 && (
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8">
              <h3 className="text-lg font-bold text-slate-900 mb-1 flex items-center gap-2">
                <Clock size={18} className="text-teal-600" />
                <span>Suggested Safe Administration Schedule</span>
              </h3>
              <p className="text-sm text-slate-500 mb-6 font-medium">
                Spacing out interacting compounds across the day helps mitigate absorption blocks and side effects.
              </p>

              <div className="space-y-3">
                {result.suggestedSchedule.map((slot, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-xs shrink-0">
                        {idx + 1}
                      </div>
                      <span className="font-bold text-sm text-slate-900">
                        {slot.timeSlot}
                      </span>
                    </div>
                    <div className="text-sm text-slate-700 font-medium pl-11 sm:pl-0">
                      {slot.action}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Emergency Warning */}
          {result.emergencyWarnings && result.emergencyWarnings.length > 0 && (
            <div className="bg-rose-50 border border-rose-200 rounded-3xl p-6 sm:p-7 text-rose-950 space-y-2">
              <h4 className="font-bold text-base flex items-center gap-2 text-rose-800">
                <AlertTriangle size={18} />
                <span>Immediate Emergency Medical Attention</span>
              </h4>
              <p className="text-sm leading-relaxed text-rose-900">
                {result.emergencyWarnings.join(" ")}
              </p>
            </div>
          )}

        </div>
      )}

      {/* Educational Disclaimer */}
      <div className="mt-8 bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 text-xs text-slate-600 space-y-2">
        <h4 className="font-bold text-slate-900 flex items-center gap-2 text-sm">
          <Info size={16} className="text-teal-600" />
          <span>Clinical & Safety Disclaimer</span>
        </h4>
        <p className="leading-relaxed">
          MediLook AI interaction checks are powered by generative clinical knowledge bases for preliminary risk screening. Never discontinue, adjust, or start prescription medications without direct consultation with your licensed prescribing physician or pharmacist.
        </p>
      </div>

    </div>
  );
}

export default DrugInteractions;

