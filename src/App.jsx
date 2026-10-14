import Home from "./Pages/Home.jsx";
import Disease from "./Pages/Disease.jsx";
import Doctor from "./Pages/Doctor.jsx";
import Medicines from "./Pages/Medicines.jsx";
import Remedies from "./Pages/Remedies.jsx";
import Symptoms from "./Pages/Symptoms.jsx";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar.jsx";
import Footer from "./Components/Footer.jsx";
import HealthTools from "./Pages/HealthTools.jsx";
import Bmi from "./Pages/Bmi.jsx";
import BodyFat from "./Pages/BodyFat.jsx";
import Calories from "./Pages/Calories.jsx";
import HeartRateZone from "./Pages/HeartRateZone.jsx";
import IdealWeight from "./Pages/IdealWeight.jsx";
import WaterIntake from "./Pages/WaterIntake.jsx";
import ScrollToTop from "./Components/ScrollToTop.jsx";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased">
      <ScrollToTop />
      <Navbar />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/medicine" element={<Medicines />} />
          <Route path="/disease" element={<Disease />} />
          <Route path="/symptoms" element={<Symptoms />} />
          <Route path="/remedies" element={<Remedies />} />
          <Route path="/doctor" element={<Doctor />} />
          <Route path="/health-tools" element={<HealthTools />}>
            <Route path="bmi" element={<Bmi />} />
            <Route path="body-fat" element={<BodyFat />} />
            <Route path="calories" element={<Calories />} />
            <Route path="heart-rate" element={<HeartRateZone />} />
            <Route path="ideal-weight" element={<IdealWeight />} />
            <Route path="water" element={<WaterIntake />} />
          </Route>
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;