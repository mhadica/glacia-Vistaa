import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import StudentDetailsPage from "./components/StudentDetailsPage";
import StudentEditForm from "./components/StudentEditForm";
import ConfirmationPage from "./components/ConfirmationPage";
import routes from "tempo-routes";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>} className="from-[#fff0fb]">
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/student-details" element={<StudentDetailsPage />} />
          <Route path="/edit-student" element={<StudentEditForm />} />
          <Route path="/confirmation" element={<ConfirmationPage />} />
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
