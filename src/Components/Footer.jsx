import { Link } from "react-router-dom";
import { 
  HeartPulse, 
  ShieldAlert, 
  Mail, 
  PhoneCall, 
  CheckCircle2 
} from "lucide-react";

function Footer() {
  return (
    <footer className="mt-10 sm:mt-14 border-t border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10">

          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-3.5">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white shadow-sm">
                <HeartPulse size={22} />
              </div>
              <span className="text-xl font-bold text-slate-900 tracking-tight">
                MediLook <span className="text-emerald-600">AI</span>
              </span>
            </Link>

            <p className="text-sm text-slate-600 leading-relaxed max-w-sm">
              Empowering individuals with reliable, evidence-informed medical intelligence, symptom triage, and biometric calculators. Accessible anywhere, anytime.
            </p>

            <div className="pt-1 flex items-center gap-3">
              <a
                href="https://github.com/VedanshMahto07"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl border border-slate-200 text-slate-700 hover:text-emerald-700 hover:border-emerald-300 flex items-center justify-center transition-colors"
                aria-label="GitHub"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/vedansh-mahto-948658366/"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl border border-slate-200 text-slate-700 hover:text-emerald-700 hover:border-emerald-300 flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.77v8.37H6.46v-8.37M7.85 6.45a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28" />
                </svg>
              </a>
              <a
                href="mailto:vedanshmahto07@gmail.com"
                className="w-10 h-10 rounded-xl border border-slate-200 text-slate-700 hover:text-emerald-700 hover:border-emerald-300 flex items-center justify-center transition-colors"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Clinical Modules */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3.5">
              Clinical Intelligence
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-600 font-medium">
              <li>
                <Link to="/medicine" className="hover:text-emerald-700 transition-colors">
                  Medicine Search
                </Link>
              </li>
              <li>
                <Link to="/interactions" className="hover:text-emerald-700 transition-colors">
                  Drug & Food Interactions
                </Link>
              </li>
              <li>
                <Link to="/disease" className="hover:text-emerald-700 transition-colors">
                  Disease Database
                </Link>
              </li>
              <li>
                <Link to="/symptoms" className="hover:text-emerald-700 transition-colors">
                  Symptom Checker
                </Link>
              </li>
              <li>
                <Link to="/remedies" className="hover:text-emerald-700 transition-colors">
                  Home Remedies
                </Link>
              </li>
              <li>
                <Link to="/doctor" className="hover:text-emerald-700 transition-colors flex items-center gap-1.5">
                  <span>AI Doctor</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Precision Calculators */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3.5">
              Health Calculators
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-600 font-medium">
              <li>
                <Link to="/health-tools/bmi" className="hover:text-emerald-700 transition-colors">
                  BMI Calculator
                </Link>
              </li>
              <li>
                <Link to="/health-tools/calories" className="hover:text-emerald-700 transition-colors">
                  Calorie & TDEE
                </Link>
              </li>
              <li>
                <Link to="/health-tools/water" className="hover:text-emerald-700 transition-colors">
                  Daily Water Intake
                </Link>
              </li>
              <li>
                <Link to="/health-tools/body-fat" className="hover:text-emerald-700 transition-colors">
                  Body Fat Percentage
                </Link>
              </li>
              <li>
                <Link to="/health-tools/heart-rate" className="hover:text-emerald-700 transition-colors">
                  Heart Rate Zones
                </Link>
              </li>
              <li>
                <Link to="/health-tools/ideal-weight" className="hover:text-emerald-700 transition-colors">
                  Ideal Body Weight
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3.5">
              Get In Touch
            </h3>
            <ul className="space-y-3 text-sm text-slate-600 font-medium">
              <li>
                <a
                  href="mailto:vedanshmahto07@gmail.com"
                  className="hover:text-emerald-700 transition-colors flex items-center gap-2"
                >
                  <span className="truncate">vedanshmahto07@gmail.com</span>
                </a>
              </li>
              <li className="text-xs text-slate-500 pt-1">
                Developer & Maintainer: 
                <span className="block font-semibold text-slate-800 text-sm mt-0.5">Vedansh Mahto</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-slate-500">
          <p>© {new Date().getFullYear()} MediLook AI. All rights reserved.</p>
          <p className="text-center md:text-right max-w-xl text-xs text-slate-500">
            MediLook does not provide clinical medical diagnosis or write prescriptions. Always seek advice from licensed physicians for clinical decisions.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
