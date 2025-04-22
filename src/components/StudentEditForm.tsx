import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import { google } from "googleapis";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";

export interface StudentData {
  name: string;
  fatherName: string;
  currentClass: string;
}

const studentSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  fatherName: z.string().min(2, "Father's name must be at least 2 characters"),
  currentClass: z.string().min(2, "Class must be at least 2 characters"),
});

type FormValues = z.infer<typeof studentSchema>;

const StudentEditForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sheetError, setSheetError] = useState<string | null>(null);
  const { toast } = useToast();

  // Get student data directly from location state
  const studentData = location.state?.studentData as StudentData;

  // If no student data is found, redirect to home
  if (!studentData) {
    // Use useEffect to avoid React errors with navigate during render
    useEffect(() => {
      navigate("/");
    }, [navigate]);

    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-blue-100 to-blue-200 flex flex-col items-center justify-center">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-blue-100 max-w-md w-full text-center">
          <p className="text-blue-700">No student data found. Redirecting...</p>
        </div>
      </div>
    );
  }

  const form = useForm<FormValues>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      name: studentData.name,
      fatherName: studentData.fatherName,
      currentClass: studentData.currentClass,
    },
  });

  // Function to send data to Google Sheets
  const sendToGoogleSheet = async (data: StudentData) => {
    try {
      const response = await fetch("https://script.google.com/macros/s/AKfycbylPlk4ZM4aI90zG23hMppQckiDNaqpOMBNl1N17wbE0GJaGUBE_qDwVLf5-7tnkImf/exec", {
      method: "POST",
      mode: "no-cors", // required if access is public and no response is needed
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
      // In a real implementation, we would use the Google Sheets API
      // For now, we'll log the data that would be sent to Google Sheets
      console.log("Data to be sent to Google Sheets:", data);

      

      return true;
    } catch (error) {
      console.error("Error sending data to Google Sheet:", error);
      throw error;
    }
  };

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    setSheetError(null);

    try {
      // Create the updated student data
      const updatedStudentData: StudentData = {
        name: values.name,
        fatherName: values.fatherName,
        currentClass: values.currentClass,
      };

      // Send data to Google Sheets
      await sendToGoogleSheet(updatedStudentData);

      toast({
        title: "Check-in successful",
        description: "Your information has been recorded.",
        duration: 3000,
      });

      // Navigate to confirmation page with updated data
      navigate("/confirmation", { state: { studentData: updatedStudentData } });
    } catch (error) {
      console.error("Error during check-in:", error);
      setSheetError("Failed to record your check-in. Please try again.");
      toast({
        title: "Check-in failed",
        description:
          "There was an error recording your information. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
            Edit Your Details
          </h1>
        </div>
      </motion.div>

      <motion.div
        className="w-full max-w-md px-4 mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-blue-100">
          <h2 className="text-2xl font-semibold text-blue-800 mb-6 text-center">
            Update Your Information
          </h2>
          <p className="text-blue-700 mb-6 text-center">
            Please verify and update your details below
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-blue-700 font-medium">
                      Your Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your name"
                        className="border-blue-200 focus:border-blue-400 bg-white/70"
                        {...field}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="fatherName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-blue-700 font-medium">
                      Father's Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your father's name"
                        className="border-blue-200 focus:border-blue-400 bg-white/70"
                        {...field}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="currentClass"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-blue-700 font-medium">
                      Current Class
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your current class"
                        className="border-blue-200 focus:border-blue-400 bg-white/70"
                        {...field}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              {sheetError && (
                <p className="text-red-500 text-sm mb-4">{sheetError}</p>
              )}

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Recording check-in..." : "Check-in"}
              </Button>
            </form>
          </Form>
        </div>
      </motion.div>

      <div className="mt-auto pt-8 text-center text-blue-600 text-sm">
        <p>© 2025 Glacia Vista Vacation Camp</p>
        <p className="mt-1">For support, call: +91 96336 87336</p>
      </div>
    </div>
  );
};

export default StudentEditForm;
