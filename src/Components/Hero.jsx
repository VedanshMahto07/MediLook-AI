import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Search, 
  Pill, 
  Activity, 
  Stethoscope, 
  Leaf, 
  Calculator, 
  Bot, 
  ArrowRight,
  ShieldCheck, 
  ShieldAlert,
  Sparkles,
  Lock,
  HeartPulse
} from "lucide-react";

function Hero() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("medicine");
  const [searchQuery, setSearchQuery] = useState("");

  const searchTabs = [
    { id: "medicine", label: "Medicines", icon: Pill, path: "/medicine", placeholder: "Search medicine (e.g., Paracetamol, Amoxicillin, Metformin)..." },
    { id: "interactions", label: "Interactions", icon: ShieldAlert, path: "/interactions", placeholder: "Check drug or food combinations (e.g., Warfarin + Ibuprofen, Metformin + Alcohol)..." },
    { id: "disease", label: "Diseases", icon: Activity, path: "/disease", placeholder: "Search disease (e.g., Type 2 Diabetes, Hypertension, Asthma)..." },
    { id: "symptoms", label: "Symptoms", icon: Stethoscope, path: "/symptoms", placeholder: "Describe symptoms (e.g., fever, dry cough, severe headache)..." },
    { id: "remedies", label: "Remedies", icon: Leaf, path: "/remedies", placeholder: "Search health condition for natural home remedies..." },
    { id: "tools", label: "Calculators", icon: Calculator, path: "/health-tools", placeholder: "Explore BMI, Calorie, Body Fat, and Water calculators..." },
  ];

  const currentTab = searchTabs.find(tab => tab.id === activeTab) || searchTabs[0];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim() && activeTab !== "tools") {
      navigate(currentTab.path);
      return;
    }
    navigate(`${currentTab.path}?q=${encodeURIComponent(searchQuery.trim())}`);
  };

  const handleChipClick = (tabId, query) => {
    setActiveTab(tabId);
    setSearchQuery(query);
    const target = searchTabs.find(t => t.id === tabId);
    if (target) {
      navigate(`${target.path}?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <section className="relative overflow-hidden pt-6 pb-6 md:pt-10 md:pb-8">
      {/* Background Soft Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-72 bg-gradient-to-b from-emerald-100/50 via-teal-50/20 to-transparent -z-10 blur-2xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Top Badge */}
        {/* <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-semibold shadow-xs mb-4">
          <Sparkles size={15} className="text-emerald-600" />
          <span>Evidence-Based Healthcare Intelligence & Wellness Tools</span>
        </div> */}

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
          Your Trusted Companion for{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700">
            Clinical Health Insights
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-3.5 text-sm sm:text-base md:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
          Search comprehensive medicine monographs, research diseases, triage symptoms, and calculate your metabolic health metrics with AI-guided precision.
        </p>

        {/* Unified Search Hub Card */}
        <div className="mt-7 max-w-3xl mx-auto bg-white rounded-3xl border border-slate-200/90 shadow-lg shadow-slate-200/40 p-4 sm:p-5 text-left transition-all">
          
          {/* Tab Selection */}
          <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto pb-2 scrollbar-none border-b border-slate-100 mb-3.5 w-full justify-start sm:justify-between">
            {searchTabs.map((tab) => {
              const Icon = tab.icon;
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(tab.id);
                    setSearchQuery("");
                  }}
                  className={`flex items-center justify-center gap-1.5 px-2 sm:px-2.5 md:px-3 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer flex-1 text-center shrink-0 sm:shrink ${
                    isSelected
                      ? "bg-emerald-600 text-white shadow-xs shadow-emerald-500/20"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
                  }`}
                >
                  <Icon size={15} className="shrink-0" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search Input Box */}
          <form onSubmit={handleSearchSubmit} className="relative flex flex-col sm:flex-row items-center gap-2.5">
            <div className="relative flex-1 w-full">
              <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={currentTab.placeholder}
                className="w-full pl-11 pr-4 py-3.5 text-sm sm:text-base rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all font-medium"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-semibold text-sm sm:text-base flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer whitespace-nowrap"
            >
              <span>Explore</span>
              <ArrowRight size={17} />
            </button>
          </form>

          {/* Quick Suggestion Chips */}
          <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs sm:text-sm text-slate-500">
            <span className="font-semibold text-slate-700">Suggested:</span>
            <button
              type="button"
              onClick={() => handleChipClick("medicine", "Paracetamol")}
              className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 font-medium transition-colors cursor-pointer text-xs sm:text-sm"
            >
              💊 Paracetamol
            </button>
            <button
              type="button"
              onClick={() => handleChipClick("interactions", "Warfarin, Ibuprofen")}
              className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 font-medium transition-colors cursor-pointer text-xs sm:text-sm"
            >
              ⚠️ Drug Interactions
            </button>
            <button
              type="button"
              onClick={() => handleChipClick("disease", "Type 2 Diabetes")}
              className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 font-medium transition-colors cursor-pointer text-xs sm:text-sm"
            >
              🔬 Type 2 Diabetes
            </button>
            <button
              type="button"
              onClick={() => handleChipClick("symptoms", "Fever and headache")}
              className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 font-medium transition-colors cursor-pointer text-xs sm:text-sm"
            >
              🩺 Fever & Headache
            </button>
            <button
              type="button"
              onClick={() => handleChipClick("tools", "")}
              className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 font-medium transition-colors cursor-pointer text-xs sm:text-sm"
            >
              ⚖️ BMI Calculator
            </button>
          </div>

        </div>

        {/* Trust & Clinical Feature Indicators - Significantly larger font sizes and balanced padding */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto text-left">
          
          <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:border-emerald-300 transition-all">
            <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700 shrink-0 mt-0.5">
              <ShieldCheck size={22} />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold text-slate-900">Safety Guardrails</h4>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-snug">Emergency alerts & dosage warnings</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:border-teal-300 transition-all">
            <div className="p-2.5 rounded-xl bg-teal-50 text-teal-700 shrink-0 mt-0.5">
              <Bot size={22} />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold text-slate-900">Clinical AI Assistant</h4>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-snug">Instant 24/7 symptom triaging</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:border-blue-300 transition-all">
            <div className="p-2.5 rounded-xl bg-blue-50 text-blue-700 shrink-0 mt-0.5">
              <Calculator size={22} />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold text-slate-900">Precision Calculators</h4>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-snug">BMI, BMR, Body Fat & Hydration</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:border-indigo-300 transition-all">
            <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-700 shrink-0 mt-0.5">
              <Lock size={22} />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold text-slate-900">Privacy First</h4>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-snug">No login or tracking required</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

export default Hero;