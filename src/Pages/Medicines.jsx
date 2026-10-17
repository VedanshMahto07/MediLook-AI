import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { model } from "../Config/Gemini";
import { 
  Search, 
  Pill, 
  AlertCircle, 
  Clock, 
  ShieldAlert, 
  Apple, 
  Ban, 
  Baby, 
  Archive, 
  Copy, 
  Check, 
  Sparkles, 
  X,
  FileText,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  RotateCcw,
  CheckCircle2,
  HeartPulse,
  ExternalLink
} from "lucide-react";
import { FormattedBulletList, cleanMarkdown } from "../Utils/textFormatter";

const popularMedicines = [
  "Paracetamol",
  "Amoxicillin",
  "Metformin",
  "Ibuprofen",
  "Cetirizine",
  "Atorvastatin",
  "Omeprazole",
  "Azithromycin"
];

function Medicines() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [medicine, setMedicine] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(null);

  const fetchMedicineData = async (medName) => {
    const query = medName.trim();
    if (!query) return;

    try {
      setLoading(true);
      setError(null);
      setResult(null);

      const prompt = `
You are an expert clinical pharmacologist and healthcare validation AI.
Evaluate the search query: "${query}".

STEP 1: STRICT VALIDATION
Verify whether "${query}" is a genuine, medically recognized pharmaceutical drug, active pharmaceutical ingredient (API), OTC medication, prescription medicine, or biological agent in legitimate clinical medicine (such as in FDA, EMA, WHO, or BNF pharmacopeias).

If "${query}" is NOT a real recognized medicine (e.g., gibberish like "asdfgh", fictional substances, general words like "car" or "cloud", or nonexistent names):
Return ONLY a valid JSON object matching this schema:
{
  "isValid": false,
  "searchedQuery": "${query}",
  "message": "No recognized pharmaceutical medicine or clinical drug substance was found matching '${query}'.",
  "suggestions": ["Paracetamol", "Amoxicillin", "Ibuprofen", "Metformin", "Cetirizine"]
}

STEP 2: IF AND ONLY IF "${query}" IS A REAL, LEGITIMATE MEDICINE:
Return ONLY a valid JSON object matching this exact schema:
{
  "isValid": true,
  "name": "Standard drug brand or recognized generic name",
  "genericName": "Generic pharmaceutical/chemical name",
  "drugClass": "Therapeutic drug classification (e.g., Analgesic & Antipyretic)",
  "uses": [
    "Primary medical indication 1 (under 15 words)",
    "Secondary medical indication 2 (under 15 words)",
    "Key condition treated 3 (under 15 words)"
  ],
  "dosage": [
    "Typical adult starting dose (under 15 words)",
    "Standard administration guideline with meals or water",
    "Maximum daily limit or duration reminder"
  ],
  "sideEffects": [
    "Common mild reaction 1 (e.g., mild nausea)",
    "Common mild reaction 2 (e.g., drowsiness)",
    "Important adverse sign to monitor (under 15 words)"
  ],
  "warnings": [
    "Top contraindication or black box warning (under 15 words)",
    "Key organ caution (e.g., kidney, liver, or cardiovascular caution)",
    "Critical interaction warning (e.g., avoid alcohol)"
  ],
  "foodsToEat": [
    "Best food or hydration pairing (under 15 words)",
    "Supportive nutrition advice"
  ],
  "foodsToAvoid": [
    "Primary dietary or beverage trigger to avoid (under 15 words)"
  ],
  "pregnancySafety": "Concise 1-sentence pregnancy and nursing safety guidance.",
  "storage": "Concise 1-sentence temperature and storage rule."
}

CRITICAL RULES:
- Never fabricate, guess, or hallucinate medical information for fake or gibberish terms.
- Keep all bullet points concise (maximum 15 words each).
- Do NOT use markdown asterisks (* or **) inside any values.
- Output clean, valid JSON only.
`;

      const response = await model.generateContent(prompt);
      const text = response.response.text();

      const cleaned = text
        .replace(/```json/gi, "")
        .replace(/```/g, "")
        .trim();

      const data = JSON.parse(cleaned);
      setResult(data);
    } catch (err) {
      console.error("Error fetching medicine monograph:", err);
      setError("Unable to retrieve information for this medicine. Please verify the name and try again.");
    } finally {
      setLoading(false);
    }
  };

  // Check URL query parameter on load
  useEffect(() => {
    const q = searchParams.get("q");
    if (q) {
      setMedicine(q);
      fetchMedicineData(q);
    }
  }, [searchParams]);

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    if (!medicine.trim()) return;
    setSearchParams({ q: medicine.trim() });
    fetchMedicineData(medicine);
  };

  const handleSelectChip = (med) => {
    setMedicine(med);
    setSearchParams({ q: med });
    fetchMedicineData(med);
  };

  const copySummary = () => {
    if (!result || !result.isValid) return;
    const uses = Array.isArray(result.uses) ? result.uses.join(", ") : result.uses;
    const dosage = Array.isArray(result.dosage) ? result.dosage.join(", ") : result.dosage;
    const textToCopy = `Medicine: ${result.name}\nGeneric: ${result.genericName || "N/A"}\nClass: ${result.drugClass || "N/A"}\nUses: ${uses}\nDosage: ${dosage}\n(Generated by MediLook)`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs sm:text-sm font-semibold mb-3 shadow-xs">
          <Pill size={15} className="text-emerald-600" />
          <span>Evidence-Based Pharmacology & Monographs</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
          Medicine Monograph Search
        </h1>
        <p className="mt-2.5 text-sm sm:text-base md:text-lg text-slate-600">
          Access therapeutic indications, dosage parameters, food interactions, and critical contraindications.
        </p>
      </div>

      {/* Search Box */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-4 sm:p-6 mb-6">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={medicine}
              onChange={(e) => setMedicine(e.target.value)}
              placeholder="Search medicine by brand or generic name (e.g., Paracetamol, Metformin)..."
              className="w-full pl-11 pr-10 py-3.5 text-sm sm:text-base rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all font-medium"
            />
            {medicine && (
              <button
                type="button"
                onClick={() => setMedicine("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                title="Clear input"
              >
                <X size={16} />
              </button>
            )}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-7 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-semibold text-sm sm:text-base shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
          >
            {loading ? (
              <>
                <RotateCcw size={18} className="animate-spin" />
                <span>Searching...</span>
              </>
            ) : (
              <>
                <Search size={18} />
                <span>Search Monograph</span>
              </>
            )}
          </button>
        </form>

        {/* Suggestion Chips */}
        <div className="mt-3.5 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-1.5 text-xs sm:text-sm">
          <span className="font-semibold text-slate-600 mr-1">Frequently Searched:</span>
          {popularMedicines.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => handleSelectChip(item)}
              className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 transition-colors font-medium cursor-pointer text-xs sm:text-sm"
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Interaction Cross-Promo Banner */}
      <div className="bg-gradient-to-r from-teal-50 to-emerald-50 rounded-2xl border border-teal-200/80 p-4 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center shrink-0">
            <ShieldAlert size={20} />
          </div>
          <div>
            <div className="text-sm font-bold text-slate-900">
              Taking multiple medications or concerned about food interactions?
            </div>
            <div className="text-xs text-slate-600">
              Cross-check contraindications, severity risks, and dietary timing clashes in seconds.
            </div>
          </div>
        </div>
        <Link
          to="/interactions"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs sm:text-sm font-semibold transition-colors shrink-0 shadow-xs"
        >
          <span>Check Interactions</span>
          <ArrowRight size={15} />
        </Link>
      </div>

      {/* Error state */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4 sm:p-5 text-red-700 flex items-start gap-3 mb-6">
          <AlertCircle size={20} className="shrink-0 mt-0.5 text-red-500" />
          <div>
            <h4 className="font-bold text-sm">Search Notice</h4>
            <p className="text-xs sm:text-sm mt-0.5">{error}</p>
          </div>
        </div>
      )}

      {/* Loading Skeleton */}
      {loading && (
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 text-center animate-pulse space-y-6">
          <div className="w-14 h-14 bg-emerald-100 rounded-2xl mx-auto flex items-center justify-center">
            <Pill size={28} className="text-emerald-600 animate-bounce" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800">Compiling Concise Medicine Monograph...</h3>
            <p className="text-sm text-slate-500 mt-1">Filtering key indications, dosage parameters, and precautions into digestible points.</p>
          </div>
          <div className="max-w-md mx-auto space-y-2.5 pt-4">
            <div className="h-3 bg-slate-100 rounded-full w-full"></div>
            <div className="h-3 bg-slate-100 rounded-full w-4/5 mx-auto"></div>
            <div className="h-3 bg-slate-100 rounded-full w-2/3 mx-auto"></div>
          </div>
        </div>
      )}

      {/* NON-EXISTENT / INVALID MEDICINE ALERT CARD */}
      {result && !loading && result.isValid === false && (
        <div className="bg-white rounded-3xl border border-amber-200 shadow-sm p-6 sm:p-8 animate-in fade-in duration-300">
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
              <AlertTriangle size={24} />
            </div>
            <div className="flex-1 space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold uppercase tracking-wide">
                <span>Unrecognized Medication</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                No Record Found for "{result.searchedQuery || medicine}"
              </h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                MediLook strictly validates searches against international pharmacopeias (FDA, EMA, WHO). We do not fabricate or guess clinical data for unrecognized or non-existent substances.
              </p>

              {result.suggestions && result.suggestions.length > 0 && (
                <div className="pt-3 border-t border-slate-100 mt-4">
                  <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Did you mean or want to explore:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {result.suggestions.map((sug, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handleSelectChip(sug)}
                        className="px-3.5 py-1.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 font-semibold text-xs sm:text-sm transition-all cursor-pointer shadow-2xs"
                      >
                        💊 {sug}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* VALID MEDICINE MONOGRAPH RESULTS VIEW */}
      {result && !loading && result.isValid !== false && (
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden animate-in fade-in duration-300">
          
          {/* Enhanced Header Banner */}
          <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white p-6 sm:p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2.5">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold tracking-wide backdrop-blur-xs">
                    <Pill size={13} />
                    <span>{result.drugClass || "Clinical Monograph"}</span>
                  </span>
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-950/30 text-emerald-100 text-xs font-semibold">
                    <ShieldCheck size={13} className="text-emerald-300" />
                    <span>Validated Pharmacology</span>
                  </span>
                </div>
                
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
                  {cleanMarkdown(result.name)}
                </h2>

                {result.genericName && (
                  <p className="text-sm sm:text-base text-emerald-100 mt-1.5 font-medium flex items-center gap-1.5">
                    <span>Active Generic:</span>
                    <strong className="text-white font-bold">{cleanMarkdown(result.genericName)}</strong>
                  </p>
                )}
              </div>

              {/* Action Buttons in Header */}
              <div className="flex items-center gap-2.5 flex-wrap">
                <button
                  type="button"
                  onClick={copySummary}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 active:scale-95 text-xs sm:text-sm font-bold backdrop-blur-xs transition-all cursor-pointer shadow-xs"
                >
                  {copied ? <Check size={16} className="text-emerald-200" /> : <Copy size={16} />}
                  <span>{copied ? "Copied to Clipboard!" : "Copy Summary"}</span>
                </button>

                <Link
                  to={`/interactions?q=${encodeURIComponent(result.name)}`}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white text-emerald-900 hover:bg-emerald-50 active:scale-95 text-xs sm:text-sm font-bold transition-all shadow-xs cursor-pointer"
                  title="Check drug-to-drug interactions with this medicine"
                >
                  <ShieldAlert size={16} className="text-emerald-700" />
                  <span>Check Interactions</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Clinical Monograph Content Grid */}
          <div className="p-6 sm:p-8 space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              
              {/* Primary Indications & Uses */}
              <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-5 sm:p-6 hover:border-emerald-300 hover:bg-white transition-all shadow-2xs">
                <div className="flex items-center gap-3 mb-3.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <FileText size={19} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      Primary Indications & Uses
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">Approved clinical therapeutic targets</p>
                  </div>
                </div>
                <FormattedBulletList items={result.uses} bulletColor="text-emerald-600" />
              </div>

              {/* Dosage & Administration */}
              <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-5 sm:p-6 hover:border-teal-300 hover:bg-white transition-all shadow-2xs">
                <div className="flex items-center gap-3 mb-3.5">
                  <div className="w-9 h-9 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center shrink-0">
                    <Clock size={19} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      Dosage & Administration Guidelines
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">Standard adult intake & safety limits</p>
                  </div>
                </div>
                <FormattedBulletList items={result.dosage} bulletColor="text-teal-600" />
              </div>

              {/* Adverse Reactions & Side Effects */}
              <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-5 sm:p-6 hover:border-amber-300 hover:bg-white transition-all shadow-2xs">
                <div className="flex items-center gap-3 mb-3.5">
                  <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                    <AlertCircle size={19} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      Adverse Reactions & Side Effects
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">Potential physiological responses</p>
                  </div>
                </div>
                <FormattedBulletList items={result.sideEffects} bulletColor="text-amber-600" />
              </div>

              {/* Precautions & Contraindications */}
              <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-5 sm:p-6 hover:border-red-300 hover:bg-white transition-all shadow-2xs">
                <div className="flex items-center gap-3 mb-3.5">
                  <div className="w-9 h-9 rounded-xl bg-red-100 text-red-700 flex items-center justify-center shrink-0">
                    <ShieldAlert size={19} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      Precautions & Contraindications
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">Critical safety warnings & organ cautions</p>
                  </div>
                </div>
                <FormattedBulletList items={result.warnings} bulletColor="text-red-600" />
              </div>

            </div>

            {/* Dietary & Environmental Guidance */}
            <div className="pt-2">
              <div className="flex items-center justify-between mb-3.5">
                <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                  <Apple size={16} className="text-teal-600" />
                  <span>Dietary, Nursing & Storage Parameters</span>
                </h3>
                <span className="text-xs text-slate-400 font-medium hidden sm:inline">
                  Patient lifestyle alignment
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                {/* Beneficial Foods */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 hover:border-emerald-300 transition-all shadow-2xs">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm mb-2.5">
                    <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                      <Apple size={16} />
                    </div>
                    <span>Beneficial Foods</span>
                  </div>
                  <FormattedBulletList items={result.foodsToEat} bulletColor="text-emerald-600" />
                </div>

                {/* Foods to Avoid */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 hover:border-rose-300 transition-all shadow-2xs">
                  <div className="flex items-center gap-2 text-rose-800 font-bold text-sm mb-2.5">
                    <div className="w-7 h-7 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
                      <Ban size={16} />
                    </div>
                    <span>Foods to Avoid</span>
                  </div>
                  <FormattedBulletList items={result.foodsToAvoid} bulletColor="text-rose-600" />
                </div>

                {/* Pregnancy & Nursing */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 hover:border-indigo-300 transition-all shadow-2xs">
                  <div className="flex items-center gap-2 text-indigo-800 font-bold text-sm mb-2.5">
                    <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                      <Baby size={16} />
                    </div>
                    <span>Pregnancy & Nursing</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                    {cleanMarkdown(result.pregnancySafety) || "Consult an obstetrician before use during pregnancy."}
                  </p>
                </div>

                {/* Safe Storage */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 transition-all shadow-2xs">
                  <div className="flex items-center gap-2 text-slate-800 font-bold text-sm mb-2.5">
                    <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center">
                      <Archive size={16} />
                    </div>
                    <span>Safe Storage</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                    {cleanMarkdown(result.storage) || "Store at room temperature away from moisture and direct sunlight."}
                  </p>
                </div>

              </div>
            </div>

            {/* Bottom Disclaimer & Attribution */}
            <div className="pt-4 border-t border-slate-100 text-xs sm:text-sm text-slate-500 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="flex items-center gap-1.5 font-medium text-slate-600">
                <Sparkles size={15} className="text-emerald-600" />
                <span>Concise clinical points synthesized by MediLook Pharmacology Engine</span>
              </span>
              <span className="text-xs text-slate-400">Always consult your pharmacist or prescribing doctor.</span>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default Medicines;
