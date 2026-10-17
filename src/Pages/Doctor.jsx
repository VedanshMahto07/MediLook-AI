import { useState, useRef, useEffect } from "react";
import { model } from "../Config/Gemini";
import { 
  Bot, 
  Send, 
  ShieldAlert, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  User, 
  Copy, 
  Check, 
  RefreshCw,
  PhoneCall,
  Stethoscope
} from "lucide-react";
import { cleanMarkdown, FormattedBulletList } from "../Utils/textFormatter";

const promptSuggestions = [
  "What is the difference between a cold and the flu?",
  "Can I take Paracetamol and Ibuprofen together?",
  "What are natural lifestyle strategies to lower blood pressure?",
  "I have a sore throat for 3 days with swollen glands. What should I do?",
  "What causes morning stiffness and joint pain?"
];

function Doctor() {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: "ai",
      isWelcome: true,
      data: {
        answer: "Hello, I am your MediLook Clinical Assistant. You can ask me any health-related question, discuss symptoms, or seek general medical guidance. How may I assist you today?",
        recommendations: [
          "Be specific about symptom duration, severity, and triggers.",
          "Note any known existing conditions or medications."
        ],
        emergency: false
      }
    }
  ]);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const askDoctor = async (inputQuery) => {
    const textToSend = (inputQuery || question).trim();
    if (!textToSend || loading) return;

    const userMessage = {
      type: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setQuestion("");

    try {
      setLoading(true);

      const prompt = `
You are MediLook, a thoughtful, evidence-based, compassionate clinical health assistant.
The patient asks:
"${textToSend}"

Return ONLY a valid JSON object matching this schema:
{
  "answer": "Empathetic, clear, and medically accurate summary under 50 words.",
  "possibleCauses": [
    "Cause 1 (under 12 words)",
    "Cause 2 (under 12 words)"
  ],
  "recommendations": [
    "Actionable clinical recommendation 1 (under 12 words)",
    "Actionable clinical recommendation 2 (under 12 words)"
  ],
  "warningSigns": [
    "Red flag sign 1 that mandates in-person medical care (under 12 words)",
    "Red flag sign 2 (under 12 words)"
  ],
  "emergency": false
}

Rules:
- Keep all explanations concise, bite-sized, and easily skimmable for patients. Max 2-3 bullet items per section.
- DO NOT use markdown bold asterisks (no ** or *) in any string. Plain text only.
- If the patient mentions suicide, self-harm, crushing retrosternal chest pain with dyspnea, facial droop/stroke symptoms, or severe uncontrolled hemorrhage, set "emergency": true.
- Do NOT output any markdown backticks, code blocks, or text outside the JSON.
`;

      const response = await model.generateContent(prompt);
      const text = response.response.text();

      const cleaned = text
        .replace(/```json/gi, "")
        .replace(/```/g, "")
        .trim();

      const data = JSON.parse(cleaned);

      const aiMessage = {
        type: "ai",
        data,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("AI Doctor consultation error:", error);
      const errorMessage = {
        type: "ai",
        data: {
          answer: "I apologize, but I encountered an issue processing your medical query. Please check your network connection or try rephrasing your inquiry.",
          emergency: false
        },
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      askDoctor();
    }
  };

  const copyMessage = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const resetChat = () => {
    setMessages([
      {
        type: "ai",
        isWelcome: true,
        data: {
          answer: "Hello, I am your MediLook Clinical Assistant. You can ask me any health-related question, discuss symptoms, or seek general medical guidance. How may I assist you today?",
          recommendations: [
            "Be specific about symptom duration, severity, and triggers.",
            "Note any known existing conditions or medications."
          ],
          emergency: false
        }
      }
    ]);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-8">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-6">
        {/* <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs sm:text-sm font-semibold mb-2.5">
          <Bot size={15} className="text-emerald-600" />
          <span>24/7 Clinical AI Health Consultation</span>
        </div> */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          AI Doctor Assistant
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-600">
          Ask clinical questions, explore health concerns, and receive structured guidance with emergency guardrails.
        </p>
      </div>

      {/* Main Chat Interface */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col h-[650px] sm:h-[700px]">
        
        {/* Top Control Bar */}
        <div className="px-6 py-3.5 bg-slate-50/80 border-b border-slate-200/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white shadow-xs">
              <Stethoscope size={20} />
            </div>
            <h3 className="font-bold text-base text-slate-900">Dr. MediLook</h3>
          </div>

          <button
            type="button"
            onClick={resetChat}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-600 text-xs font-medium transition-colors cursor-pointer"
            title="Reset conversation"
          >
            <RefreshCw size={13} />
            <span>New Chat</span>
          </button>
        </div>

        {/* Chat Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {messages.map((message, index) => (
            <div key={index} className="space-y-2">
              {message.type === "user" ? (
                <div className="flex justify-end items-end gap-2.5">
                  <div className="max-w-xl bg-emerald-600 text-white rounded-2xl rounded-br-xs px-5 py-3.5 text-sm shadow-xs leading-relaxed">
                    <p>{message.text}</p>
                    {message.timestamp && (
                      <span className="block text-[10px] text-emerald-200 text-right mt-1.5">
                        {message.timestamp}
                      </span>
                    )}
                  </div>
                  <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-bold shrink-0">
                    <User size={15} />
                  </div>
                </div>
              ) : (
                <div className="flex justify-start items-start gap-3">
                  <div className="w-9 h-9 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-100 flex items-center justify-center shrink-0 mt-1">
                    <Bot size={20} />
                  </div>

                  <div className="max-w-2xl w-full bg-slate-50/80 border border-slate-200/80 rounded-2xl rounded-tl-xs p-5 text-sm space-y-4">
                    
                    {/* Emergency Alert Banner */}
                    {message.data?.emergency && (
                      <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-xl flex items-start gap-3 text-xs leading-relaxed">
                        <ShieldAlert size={20} className="text-red-600 shrink-0 mt-0.5" />
                        <div>
                          <strong className="block font-bold text-red-900 text-sm mb-0.5">
                            Critical Health Alert
                          </strong>
                          This inquiry describes symptoms or thoughts that require immediate emergency evaluation. Please dial <strong>911</strong> (US/CA) or <strong>112</strong> (EU/IN) immediately, or visit the nearest emergency department.
                        </div>
                      </div>
                    )}

                    {/* Answer text */}
                    <div className="text-slate-800 leading-relaxed text-sm sm:text-base font-medium">
                      {cleanMarkdown(message.data?.answer)}
                    </div>

                    {/* Possible Causes */}
                    {message.data?.possibleCauses?.length > 0 && (
                      <div className="pt-2.5 border-t border-slate-200/60">
                        <h4 className="text-xs sm:text-sm font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                          <Sparkles size={15} className="text-emerald-600" />
                          <span>Potential Causes & Factors</span>
                        </h4>
                        <FormattedBulletList 
                          items={message.data.possibleCauses} 
                          bulletColor="text-emerald-600" 
                          bulletIcon="•"
                        />
                      </div>
                    )}

                    {/* Clinical Recommendations */}
                    {message.data?.recommendations?.length > 0 && (
                      <div className="pt-2.5 border-t border-slate-200/60">
                        <h4 className="text-xs sm:text-sm font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                          <CheckCircle2 size={15} className="text-teal-600" />
                          <span>Actionable Recommendations</span>
                        </h4>
                        <FormattedBulletList 
                          items={message.data.recommendations} 
                          bulletColor="text-teal-600" 
                          bulletIcon="✓"
                        />
                      </div>
                    )}

                    {/* Warning Signs */}
                    {message.data?.warningSigns?.length > 0 && (
                      <div className="pt-2.5 border-t border-slate-200/60">
                        <h4 className="text-xs sm:text-sm font-bold text-red-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                          <AlertTriangle size={15} className="text-red-500" />
                          <span>Warning Signs to Watch For</span>
                        </h4>
                        <FormattedBulletList 
                          items={message.data.warningSigns} 
                          bulletColor="text-red-500" 
                          bulletIcon="⚠️"
                          className="text-red-800"
                        />
                      </div>
                    )}

                    {/* Copy and Timestamp */}
                    <div className="pt-2 flex items-center justify-between text-xs text-slate-400">
                      <span>{message.timestamp || "MediLook Clinical Assistant"}</span>
                      <button
                        type="button"
                        onClick={() => copyMessage(cleanMarkdown(message.data?.answer || ""), index)}
                        className="hover:text-slate-700 flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        {copiedIndex === index ? (
                          <>
                            <Check size={14} className="text-emerald-600" />
                            <span className="text-emerald-600 font-medium">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy size={14} />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>

                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Loading Indicator */}
          {loading && (
            <div className="flex justify-start items-start gap-3">
              <div className="w-9 h-9 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-100 flex items-center justify-center shrink-0 mt-1">
                <Bot size={20} />
              </div>
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl rounded-tl-xs p-4 flex items-center gap-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce"></div>
                </div>
                <span className="text-xs text-slate-500 font-medium">Reviewing clinical literature and formulating response...</span>
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Suggestion Starter Chips */}
        {messages.length <= 2 && (
          <div className="px-6 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center gap-2 overflow-x-auto scrollbar-none text-xs">
            <span className="text-slate-400 font-semibold shrink-0">Try asking:</span>
            {promptSuggestions.map((prompt, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => askDoctor(prompt)}
                className="px-3 py-1 rounded-full bg-white border border-slate-200 hover:border-emerald-300 hover:text-emerald-700 text-slate-600 whitespace-nowrap transition-colors cursor-pointer"
              >
                {prompt}
              </button>
            ))}
          </div>
        )}

        {/* Message Input Bar */}
        <div className="p-4 sm:p-5 bg-white border-t border-slate-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              askDoctor();
            }}
            className="flex items-center gap-2 sm:gap-3"
          >
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask a health question (e.g., 'What can help with tension headaches?')..."
              className="flex-1 px-4 py-3.5 text-sm sm:text-base rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
            />
            <button
              type="submit"
              disabled={loading || !question.trim()}
              className="p-3.5 sm:px-6 sm:py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 disabled:opacity-50 text-white font-semibold text-sm shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
              aria-label="Send query"
            >
              <Send size={18} />
              <span className="hidden sm:inline">Ask AI</span>
            </button>
          </form>
          <p className="text-[11px] text-slate-400 text-center mt-2">
            Informational tool only. In emergencies, call 911 or your local emergency line immediately.
          </p>
        </div>

      </div>

    </div>
  );
}

export default Doctor;
