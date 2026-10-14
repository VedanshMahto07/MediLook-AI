import { useNavigate, useLocation, Outlet, NavLink, Link } from "react-router-dom";
import { 
  Scale, 
  Flame, 
  Droplets, 
  UserCheck, 
  Heart, 
  TrendingUp, 
  ArrowRight, 
  Sparkles,
  ArrowLeft,
  Calculator
} from "lucide-react";

const tools = [
  {
    title: "BMI Calculator",
    description: "Quantify your Body Mass Index and evaluate your clinical weight category.",
    icon: Scale,
    path: "/health-tools/bmi",
    category: "Body Composition",
    tagColor: "bg-emerald-50 text-emerald-800 border-emerald-200"
  },
  {
    title: "Calorie Needs (TDEE & BMR)",
    description: "Calculate your basal metabolic rate and daily calorie targets for maintenance or fat loss.",
    icon: Flame,
    path: "/health-tools/calories",
    category: "Metabolism",
    tagColor: "bg-orange-50 text-orange-800 border-orange-200"
  },
  {
    title: "Daily Hydration Calculator",
    description: "Estimate your optimal fluid requirements calibrated to your body mass.",
    icon: Droplets,
    path: "/health-tools/water",
    category: "Hydration",
    tagColor: "bg-cyan-50 text-cyan-800 border-cyan-200"
  },
  {
    title: "Body Fat Estimator",
    description: "Determine your body fat percentage and biological tissue classification.",
    icon: UserCheck,
    path: "/health-tools/body-fat",
    category: "Composition",
    tagColor: "bg-purple-50 text-purple-800 border-purple-200"
  },
  {
    title: "Heart Rate Training Zones",
    description: "Identify target cardiovascular thresholds for aerobic conditioning and fat burn.",
    icon: Heart,
    path: "/health-tools/heart-rate",
    category: "Cardio",
    tagColor: "bg-rose-50 text-rose-800 border-rose-200"
  },
  {
    title: "Ideal Body Weight Window",
    description: "Discover your healthy biological weight range based on height formulas.",
    icon: TrendingUp,
    path: "/health-tools/ideal-weight",
    category: "Assessment",
    tagColor: "bg-teal-50 text-teal-800 border-teal-200"
  }
];

function HealthTools() {
  const navigate = useNavigate();
  const location = useLocation();

  const isRootToolsPage = location.pathname === "/health-tools" || location.pathname === "/health-tools/";

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      
      {/* Sub-navigation bar when a tool is active */}
      {!isRootToolsPage && (
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <Link
              to="/health-tools"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-emerald-700 transition-colors"
            >
              <ArrowLeft size={16} />
              <span>Back to Health Tools Hub</span>
            </Link>

            {/* Quick Switcher Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {tools.map((t) => {
                const Icon = t.icon;
                const isActive = location.pathname === t.path;
                return (
                  <NavLink
                    key={t.path}
                    to={t.path}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                      isActive
                        ? "bg-emerald-600 text-white shadow-xs"
                        : "bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                    }`}
                  >
                    <Icon size={14} />
                    <span>{t.title.split(" ")[0]}</span>
                  </NavLink>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Hub Overview when on /health-tools */}
      {isRootToolsPage && (
        <>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
              Clinical Health Calculators
            </h1>
            <p className="mt-3.5 text-base sm:text-lg text-slate-600">
              Validated physiological tools to calculate body mass, caloric targets, body fat %, hydration, and target training zones.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool, index) => {
              const Icon = tool.icon;
              return (
                <div
                  key={index}
                  onClick={() => navigate(tool.path)}
                  className="group bg-white rounded-3xl p-7 border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-emerald-300 hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Icon size={24} />
                      </div>
                      <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${tool.tagColor}`}>
                        {tool.category}
                      </span>
                    </div>

                    <h2 className="text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                      {tool.title}
                    </h2>

                    <p className="mt-2.5 text-sm text-slate-600 leading-relaxed">
                      {tool.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-sm font-semibold text-emerald-700">
                    <span>Calculate Now</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>

        </>
      )}

      {/* Render child calculator */}
      <Outlet />

    </div>
  );
}

export default HealthTools;