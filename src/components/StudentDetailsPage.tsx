import React from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import StudentDetailsReveal from "./StudentDetailsReveal";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";

interface StudentData {
  name: string;
  fatherName: string;
  currentClass: string;
}

const StudentDetailsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const studentData = location.state?.studentData as StudentData;

  if (!studentData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex flex-col items-center justify-center p-4">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-blue-100 max-w-md w-full">
          <h2 className="text-xl font-semibold text-blue-800 mb-4 text-center">
            No student data found
          </h2>
          <Button
            onClick={() => navigate("/")}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-blue-100 to-blue-200 flex flex-col items-center justify-start pb-10">
      <motion.div
        className="w-full bg-blue-800 py-6 px-4 shadow-lg"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-5xl mx-auto flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/")}
            className="mr-4 text-white hover:bg-blue-700"
          >
            <ArrowLeft size={24} />
          </Button>
          <h1 className="text-3xl font-bold text-white text-center flex-1 mr-10">
            Glacia Vista
          </h1>
        </div>
      </motion.div>

      <motion.div
        className="w-full max-w-4xl px-4 mt-8 flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <motion.div
          className="w-full max-w-md"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <StudentDetailsReveal studentData={studentData} isVisible={true} />
        </motion.div>

        <motion.div
          className="mt-12 max-w-2xl w-full bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-blue-100"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h2 className="text-xl font-semibold text-blue-800 mb-4">
            Welcome to Glacia Vista Vacation Camp!
          </h2>
          <p className="text-blue-700 mb-4">
            We're thrilled to have you join us for an unforgettable winter
            adventure. Your registration has been confirmed and all details are
            now available in your student profile.
          </p>
          <p className="text-blue-700 mb-4">
            Please make sure to arrive at the camp location by 9:00 AM on the
            first day. Don't forget to bring warm clothes, a water bottle, and
            your excitement for fun activities!
          </p>
          <div className="mt-6 pt-4 border-t border-blue-100">
            <p className="text-blue-600 font-medium">
              If you have any questions, please contact our support team at +91
              96336 87336.
            </p>
          </div>
        </motion.div>
      </motion.div>

      <div className="mt-auto pt-8 text-center text-blue-600 text-sm"></div>
    </div>
  );
};

export default StudentDetailsPage;
