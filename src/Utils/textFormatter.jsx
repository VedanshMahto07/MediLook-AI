// Text and Markdown cleaner utility for Gemini AI responses

export function cleanMarkdown(text) {
  if (!text) return "";
  if (typeof text !== "string") return String(text);
  return text
    .replace(/\*\*\*(.*?)\*\*\*/g, "$1")
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")
    .replace(/^[\*\-\•\#]+\s*/gm, "")
    .replace(/\*+/g, "")
    .replace(/`+/g, "")
    .replace(/:\s*$/, "")
    .trim();
}

export function toCleanList(input) {
  if (!input) return [];
  if (Array.isArray(input)) {
    return input
      .map(item => cleanMarkdown(item))
      .filter(item => item && item.length > 0);
  }
  if (typeof input === "string") {
    // If input has newlines or bullet markers, split into separate items
    const lines = input
      .split(/\n+|\r+/)
      .map(line => cleanMarkdown(line))
      .filter(line => line && line.length > 0);
    return lines.length > 0 ? lines : [cleanMarkdown(input)];
  }
  return [cleanMarkdown(String(input))];
}

export function FormattedBulletList({ items, bulletColor = "text-emerald-600", bulletIcon = "•", className = "text-slate-700" }) {
  const cleanItems = toCleanList(items);

  if (!cleanItems || cleanItems.length === 0) {
    return <p className="text-sm text-slate-500 font-medium">Standard clinical guidance applies.</p>;
  }

  return (
    <ul className={`space-y-2 text-sm sm:text-base ${className}`}>
      {cleanItems.map((item, idx) => (
        <li key={idx} className="flex items-start gap-2.5">
          <span className={`font-bold shrink-0 mt-0.5 ${bulletColor}`}>{bulletIcon}</span>
          <span className="leading-relaxed font-medium">{item}</span>
        </li>
      ))}
    </ul>
  );
}
