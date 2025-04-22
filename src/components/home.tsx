import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import WelcomeHeader from "./WelcomeHeader";
import PhoneVerificationForm from "./PhoneVerificationForm";

interface StudentData {
  name: string;
  fatherName: string;
  currentClass: string;
}

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleVerificationSuccess = (studentData: StudentData) => {
    // Navigate to the edit student form with the student data
    navigate("/edit-student", { state: { studentData } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex flex-col items-center justify-start pb-10">
      <WelcomeHeader />
      <motion.div
        className="w-full max-w-md px-4 mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-blue-100">
          <h2 className="text-2xl font-semibold text-blue-800 mb-6 text-center">
            Welcome to Glacia Vista
          </h2>
          <p className="text-blue-700 mb-6 text-center">
            Please enter your registered phone number
          </p>

          <PhoneVerificationForm
            onVerificationSuccess={handleVerificationSuccess}
          />
        </div>
      </motion.div>
      <div className="mt-auto pt-8 text-center text-blue-600 text-sm"></div>
    </div>
  );
};

export default Home;
