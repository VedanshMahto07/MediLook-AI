function InfoCard({ title, value, icon: Icon }) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:border-emerald-300 transition-all">
      <div className="flex items-center gap-2 mb-2 text-slate-900 font-bold text-base">
        {Icon && <Icon size={18} className="text-emerald-600" />}
        <h3>{title}</h3>
      </div>
      <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
        {value || "No information available"}
      </p>
    </div>
  );
}

export default InfoCard;
