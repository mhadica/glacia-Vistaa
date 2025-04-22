import React, { useState } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

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

interface PhoneVerificationFormProps {
  onVerificationSuccess: (studentData: StudentData) => void;
}

export interface StudentData {
  name: string;
  fatherName: string;
  currentClass: string;
}

const phoneSchema = z.object({
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number is too long")
    .regex(/^\+?[0-9]+$/, "Please enter a valid phone number"),
});

type FormValues = z.infer<typeof phoneSchema>;

const PhoneVerificationForm = ({
  onVerificationSuccess = () => {},
}: PhoneVerificationFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(phoneSchema),
    defaultValues: {
      phone: "",
    },
  });

  // Student data mapping based on phone numbers
  const studentDataMap: Record<string, StudentData> = {
    "9946489692": {
      name: "Muhammed Aqib PF",
      currentClass: "UP School",
      fatherName: "Aneesa Faisal",
    },
    "9072111130": {
      name: "Mohammed Khalfan P",
      currentClass: "UP School",
      fatherName: "Hakkim",
    },
    "9349333639": {
      name: "Muhammed Sinan KA",
      currentClass: "High School",
      fatherName: "K. B. ABDUL LATHEEF",
    },
    "8943098181": {
      name: "Hubail Ahmed N",
      currentClass: "High School",
      fatherName: "Noushad pk",
    },
    "9947525389": {
      name: "Muhammed Shammas Karimbanakkal",
      currentClass: "High School",
      fatherName: "Jabir Karimbanakkal",
    },
    "9645888444": {
      name: "Muhammad Hazim",
      currentClass: "High School",
      fatherName: "Muneer pallichath",
    },
    "9947106704": {
      name: "Muhammed Salahudheen ",
      currentClass: "UP School",
      fatherName: "majeed",
    },
    "8157932838": {
      name: "Muhammed shahid",
      currentClass: "High School",
      fatherName: "Mujeeb rahman",
    },
    "9446643505": {
      name: "Razin Muhammad OK",
      currentClass: " High School",
      fatherName: "Muhammad ok",
    },
    "8891964063": {
      name: "Mohammed Sirajudheen K",
      currentClass: "High School",
      fatherName: "Kunhimoideen.k",
    },
    "9947476264": {
      name: "Muhammed Darwesh ",
      currentClass: "High School",
      fatherName: "Abdul gafoor",
    },
    "9072262980": {
      name: "Muhammad Ibrahim KP",
      currentClass: "High School",
      fatherName: "Hussain",
    },
    "9497551605": {
      name: "Muhammad Shammas Palakkal",
      currentClass: "High School",
      fatherName: "Faizal Palakkal",
    },
    "95625 22905": {
      name: "Bilal C",
      currentClass: "UP School",
      fatherName: "Saidalavi c",
    },
    "8606718388": {
      name: "Muhammad Murthala ",
      currentClass: "High School",
      fatherName: "Asharudheen ",
    },
    "9895494986": {
      name: "Thaha KP",
      currentClass: "UP School",
      fatherName: "Khalid kp",
    },
    "7034415193": {
      name: "Muhammed Sinan M",
      currentClass: "High School",
      fatherName: "Muhammed rafi",
    },
    "9995343327": {
      name: "Mohammed KA ",
      currentClass: "UP School",
      fatherName: "ABBAS. K. A",
    },
    "9447825308": {
      name: "Muhammad Shehin Mubarak ",
      currentClass: "UP School",
      fatherName: "SAFEER T T",
    },
    "9846417445": {
      name: "Muhammed Rabeeu",
      currentClass: "UP School",
      fatherName: "not Given",
    },
    "9846244787": {
      name: "Nezamuddin",
      currentClass: " High School",
      fatherName: "not Given",
    },
    "9645274778": {
      name: "Ahmad Saleeth KP ",
      currentClass: "UP School",
      fatherName: "not Given",
    },
    "9847812796": {
      name: "Hashir TJ",
      currentClass: "High School",
      fatherName: "not Given",
    },
    // Add more student data mappings here in the same format
    // "phoneNumber": { name: "Student Name", currentClass: "Class", fatherName: "Father Name" }
  };

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call to verify phone number
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Clean the phone number (remove any non-digit characters)
      const cleanPhone = values.phone.replace(/\D/g, "");

      // Check if the phone number exists in our mapping
      if (studentDataMap[cleanPhone]) {
        // Instead of calling onVerificationSuccess, navigate to the edit form
        // We'll still pass the student data to maintain compatibility
        onVerificationSuccess(studentDataMap[cleanPhone]);

        // Navigate directly to the edit form with the student data
        navigate("/edit-student", {
          state: { studentData: studentDataMap[cleanPhone] },
        });
      } else {
        setError(
          "No student found with this phone number. Please check and try again.",
        );
      }
    } catch (err) {
      setError("Failed to verify phone number. Please try again.");
      console.error("Verification error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-blue-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-6"
      >
        <h2 className="text-2xl font-bold text-blue-800 mb-2">
          Welcome to Glacia Vista
        </h2>
        <p className="text-blue-600">Please verify your registration</p>
      </motion.div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-blue-700 font-medium">
                  Phone Number
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your registered phone number"
                    className="border-blue-200 focus:border-blue-400 bg-white/70"
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-sm text-center"
            >
              {error}
            </motion.div>
          )}

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                <span>Verifying...</span>
              </>
            ) : (
              "Verify"
            )}
          </Button>
        </form>
      </Form>

      {isLoading && (
        <div className="mt-6 flex justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="text-blue-500"
          >
            <svg
              className="w-12 h-12"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 4.75L10.75 9.25L6.25 10.5L10.75 11.75L12 16.25L13.25 11.75L17.75 10.5L13.25 9.25L12 4.75Z"
                fill="currentColor"
              />
              <path
                d="M7 15L5.75 19.25L1.5 20.5L5.75 21.75L7 26L8.25 21.75L12.5 20.5L8.25 19.25L7 15Z"
                fill="currentColor"
                opacity="0.7"
              />
              <path
                d="M17 15L15.75 19.25L11.5 20.5L15.75 21.75L17 26L18.25 21.75L22.5 20.5L18.25 19.25L17 15Z"
                fill="currentColor"
                opacity="0.4"
              />
            </svg>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default PhoneVerificationForm;
