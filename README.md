# MediLook AI — Clinical Health & Pharmacology Intelligence Platform

[![React](https://img.shields.io/badge/React-19.0.0-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Gemini AI](https://img.shields.io/badge/Google_Gemini-2.5_Flash-8E75B2?logo=google&logoColor=white)](https://deepmind.google/technologies/gemini/)

MediLook AI is a clinical-grade, modern healthcare and medical intelligence web platform. It pairs Google Gemini's generative AI models with evidence-based schemas to provide structured, bite-sized health insights, medicine monographs, symptom triage, natural remedy guidance, and interactive biometric calculators.

---

## 🌟 Key Features

### 1. 🔍 Unified Clinical Search Hub
* Multi-category quick-access search (Medicines, Diseases, Symptoms, Home Remedies, and Biometric Calculators).
* Curated popular suggestion chips for instant lookup.

### 2. 💊 Medicine Monograph Explorer
* Deep pharmacological profiles: Indications, dosage guidelines, food interactions, adverse side effects, contraindications, pregnancy warnings, and safe storage instructions.
* AI responses are cleaned, structured, and presented as concise, readable bullet points.

### 3. 🩺 Symptom Triage Assessment
* Severity classification: *Mild*, *Moderate*, *High*, and *Emergency*.
* Evidence-based guidance on potential conditions, immediate self-care actions, and critical red-flag symptoms that mandate an in-person medical visit.

### 4. 🧬 Comprehensive Disease Directory
* Clinical disease overviews, hallmark symptoms, root causes, risk factors, modern treatments, prevention protocols, and nutritional dietary recommendations.

### 5. 🌿 Holistic & Supportive Home Remedies
* Science-backed home remedies, supportive nutrition, foods/beverages to avoid, and lifestyle ergonomics for common ailments.

### 6. 🤖 24/7 AI Doctor Consultation
* Structured conversational clinical guidance with automatic emergency triage detection for critical symptoms.

### 7. ⚖️ Biometric & Wellness Calculators
* **BMI Calculator**: Body Mass Index with interactive WHO category classification.
* **Calorie Needs**: Mifflin-St Jeor daily caloric expenditure estimator.
* **Daily Hydration**: Customized daily water intake calculations based on weight and activity level.
* **Body Fat Estimator**: US Navy circumference-based body fat percentage formula.
* **Target Heart Rate Zones**: 5 cardiovascular training zones based on age and resting HR.
* **Ideal Body Weight**: Robinson, Miller, Devine, and Hamwi formula averages.

---

## 🛠️ Tech Stack

* **Frontend Framework**: React 19 + Vite
* **Styling & Design System**: Tailwind CSS v4, Plus Jakarta Sans typography
* **Icons**: Lucide React
* **Routing**: React Router v7
* **AI Engine**: Google Gemini API (`@google/generative-ai`, `gemini-2.5-flash`)

---

## 🚀 Getting Started

### Prerequisites
* [Node.js](https://nodejs.org/) (version 18+ recommended)
* A Google Gemini API key from [Google AI Studio](https://aistudio.google.com/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/VedanshMahto07/MediLook-AI.git
   cd MediLook-AI
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory (refer to `.env.example`):
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Build for production:**
   ```bash
   npm run build
   ```

---

## ⚠️ Medical Disclaimer

MediLook AI is an educational and informational tool intended to assist users in understanding medical information and wellness metrics. It is **not** a substitute for professional medical advice, clinical diagnosis, or treatment. Always consult a qualified healthcare provider for any medical concerns. In an emergency, immediately call **911** (US/CA), **112** (EU/IN), or your local emergency response hotline.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
