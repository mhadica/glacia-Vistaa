import React from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, CheckCircle } from "lucide-react";

import { StudentData } from "./StudentEditForm";

const ConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const studentData = location.state?.studentData as StudentData;

  // Use the student data directly from location state
  const displayData = studentData;

  if (!displayData) {
    navigate("/");
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-blue-100 to-blue-200 flex flex-col items-center justify-start pb-10">
      <motion.div
        className="w-full bg-blue-800 py-6 px-4 shadow-lg"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-5xl mx-auto flex items-center justify-center">
          <h1 className="text-3xl font-bold text-white text-center">
            Glacia Vista
          </h1>
        </div>
      </motion.div>

      <motion.div
        className="w-full max-w-md px-4 mt-12"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-8 border border-blue-100 text-center">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="flex justify-center mb-6"
          >
            <CheckCircle size={80} className="text-green-500" />
          </motion.div>

          <h2 className="text-3xl font-bold text-blue-800 mb-4">
            Welcome to the Camp!
          </h2>

          <p className="text-xl text-blue-700 mb-6">
            Congratulations, {displayData.name}!
          </p>

          <p className="text-blue-600 mb-8">
            Your check-in is complete. We're excited to have you join us at
            Glacia Vista Vacation Camp. All your details have been updated
            successfully.
          </p>

          <div className="mt-8">
            <Button
              onClick={() => navigate("/")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full flex items-center justify-center gap-2"
            >
              <Home size={18} />
              Return Home
            </Button>
          </div>
        </div>
      </motion.div>

      <div className="mt-auto pt-8 text-center text-blue-600 text-sm"></div>
    </div>
  );
};

export default ConfirmationPage;
