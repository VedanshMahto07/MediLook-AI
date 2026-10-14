import { Link } from "react-router-dom";
import {
  Pill,
  Activity,
  HeartPulse,
  Leaf,
  Bot,
  Scale,
  Flame,
  Droplets,
  Heart,
  TrendingUp,
  UserCheck,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Stethoscope
} from "lucide-react";

const clinicalModules = [
  {
    title: "Medicine Monograph Search",
    description: "Detailed therapeutic uses, clinical dosages, potential adverse side effects, drug interactions, and storage guidelines.",
    icon: Pill,
    path: "/medicine",
    badge: "Pharmacology",
    tagColor: "bg-emerald-50 text-emerald-800 border-emerald-200",
    iconBg: "bg-emerald-50 text-emerald-600",
  },
  {
    title: "Disease & Pathology Guide",
    description: "Understand disease symptoms, underlying causes, risk factors, clinical treatments, and preventive recommendations.",
    icon: Activity,
    path: "/disease",
    badge: "Pathology",
    tagColor: "bg-teal-50 text-teal-800 border-teal-200",
    iconBg: "bg-teal-50 text-teal-600",
  },
  {
    title: "AI Symptom Checker",
    description: "Triage multi-symptom presentations to uncover possible differential diagnoses, severity levels, and consultation advice.",
    icon: Stethoscope,
    path: "/symptoms",
    badge: "Triage & Diagnosis",
    tagColor: "bg-blue-50 text-blue-800 border-blue-200",
    iconBg: "bg-blue-50 text-blue-600",
  },
  {
    title: "Evidence-Based Remedies",
    description: "Explore natural, non-pharmacological home remedies, dietary guidelines, and holistic lifestyle optimizations.",
    icon: Leaf,
    path: "/remedies",
    badge: "Holistic Health",
    tagColor: "bg-green-50 text-green-800 border-green-200",
    iconBg: "bg-green-50 text-green-600",
  },
  {
    title: "24/7 AI Doctor Assistant",
    description: "Converse with our clinical healthcare assistant to resolve queries, analyze symptoms, and receive triage recommendations.",
    icon: Bot,
    path: "/doctor",
    badge: "Conversational AI",
    tagColor: "bg-indigo-50 text-indigo-800 border-indigo-200",
    iconBg: "bg-indigo-50 text-indigo-600",
  },
];

const healthCalculators = [
  {
    title: "BMI Calculator",
    description: "Quantify your Body Mass Index and assess your clinical weight status category.",
    icon: Scale,
    path: "/health-tools/bmi",
  },
  {
    title: "Calorie Needs (BMR & TDEE)",
    description: "Calculate your daily energy expenditure for maintenance, fat loss, or muscle gain.",
    icon: Flame,
    path: "/health-tools/calories",
  },
  {
    title: "Hydration Calculator",
    description: "Determine your optimal daily fluid intake customized to body weight and climate.",
    icon: Droplets,
    path: "/health-tools/water",
  },
  {
    title: "Body Fat Estimator",
    description: "Evaluate your body composition and lean-to-fat tissue ratio using anthropometric data.",
    icon: UserCheck,
    path: "/health-tools/body-fat",
  },
  {
    title: "Heart Rate Training Zones",
    description: "Target specific aerobic, fat-burning, and peak anaerobic cardiovascular training thresholds.",
    icon: Heart,
    path: "/health-tools/heart-rate",
  },
  {
    title: "Ideal Weight Calculator",
    description: "Discover your optimal biological weight window according to health authority formulas.",
    icon: TrendingUp,
    path: "/health-tools/ideal-weight",
  },
];

function Features() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-12 sm:pt-6 sm:pb-16 space-y-12">
      
      {/* Clinical Intelligence Section */}
      <div>
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-semibold mb-3">
            <Sparkles size={15} className="text-emerald-600" />
            <span>Clinical Intelligence Hub</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Comprehensive Medical Guidance, At Your Fingertips
          </h2>
          <p className="mt-2.5 text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed">
            Engineered to empower patients and health enthusiasts with transparent, validated, and readily accessible healthcare knowledge.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {clinicalModules.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Link
                key={idx}
                to={item.path}
                className="group relative bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-emerald-300 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-2xl ${item.iconBg} flex items-center justify-center transition-transform group-hover:scale-110 duration-200`}>
                      <Icon size={24} />
                    </div>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${item.tagColor}`}>
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center gap-2 text-sm sm:text-base font-semibold text-emerald-700 group-hover:gap-3 transition-all">
                  <span>Open Module</span>
                  <ArrowRight size={17} />
                </div>
              </Link>
            );
          })}

          {/* Quick Action Doctor Promo Card */}
          <div className="bg-gradient-to-br from-emerald-700 via-teal-800 to-slate-900 text-white rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-lg shadow-emerald-900/10">
            <div>
              <span className="inline-block text-xs font-bold px-3 py-1 rounded-full bg-white/15 text-emerald-200 mb-4">
                AI Consultation
              </span>
              <h3 className="text-xl sm:text-2xl font-bold">Have a Specific Health Question?</h3>
              <p className="mt-2.5 text-sm sm:text-base text-emerald-100/90 leading-relaxed">
                Describe your concern directly to our conversational AI assistant to receive structured insights and red-flag warning signs.
              </p>
            </div>
            <Link
              to="/doctor"
              className="mt-6 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-white text-emerald-900 font-bold text-sm sm:text-base hover:bg-emerald-50 active:scale-95 transition-all"
            >
              <Bot size={18} className="text-emerald-700" />
              <span>Launch Consultation</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Precision Health Calculators Section */}
      <div className="bg-slate-50/80 rounded-3xl border border-slate-200/90 p-6 sm:p-8 lg:p-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs sm:text-sm font-semibold mb-2">
              <Scale size={14} />
              <span>Biometric Tools</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Precision Health & Wellness Calculators
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-1 max-w-xl">
              Validated physiological calculators to track your fitness, body composition, and caloric intake.
            </p>
          </div>

          <Link
            to="/health-tools"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-emerald-700 hover:border-emerald-300 text-sm font-semibold shadow-xs transition-all self-start md:self-auto"
          >
            <span>View All Calculators</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {healthCalculators.map((calc, idx) => {
            const Icon = calc.icon;
            return (
              <Link
                key={idx}
                to={calc.path}
                className="group bg-white rounded-2xl p-5 border border-slate-200/90 hover:border-emerald-400 hover:shadow-md transition-all duration-200 flex items-start gap-4"
              >
                <div className="w-11 h-11 rounded-xl bg-slate-100 group-hover:bg-emerald-50 text-slate-700 group-hover:text-emerald-700 flex items-center justify-center shrink-0 transition-colors">
                  <Icon size={22} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 group-hover:text-emerald-700 transition-colors text-sm sm:text-base">
                    {calc.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-snug">
                    {calc.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Safety & Protocol Banner */}
      <div className="bg-emerald-50/80 border border-emerald-200/90 rounded-3xl p-5 sm:p-7 flex flex-col md:flex-row items-center gap-5 justify-between">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
            <ShieldCheck size={26} />
          </div>
          <div>
            <h4 className="text-base sm:text-lg font-bold text-emerald-950">
              Committed to Patient Safety & Transparent Medicine
            </h4>
            <p className="text-xs sm:text-sm md:text-base text-emerald-900/90 mt-1 max-w-2xl leading-relaxed">
              MediLook AI is designed to support, not replace, the relationship between patient and physician. Our algorithmic models apply safety filters to detect high-risk emergencies and advise timely clinical intervention.
            </p>
          </div>
        </div>

        <Link
          to="/doctor"
          className="shrink-0 px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs sm:text-sm shadow-xs transition-colors"
        >
          Explore Safety Protocols
        </Link>
      </div>

    </section>
  );
}

export default Features;
