import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface StudentDetailsProps {
  studentData?: {
    name: string;
    fatherName: string;
    currentClass: string;
  };
  isLoading?: boolean;
  isVisible?: boolean;
}

const StudentDetailsReveal = ({
  studentData = {
    name: "John Doe",
    fatherName: "Richard Doe",
    currentClass: "10th Grade",
  },
  isLoading = false,
  isVisible = false,
}: StudentDetailsProps) => {
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    if (isVisible) {
      // Reset animation state when visibility changes
      setAnimationComplete(false);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const snowflakeVariants = {
    initial: { y: -20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: 20, opacity: 0 },
  };

  return (
    <div className="w-full max-w-md mx-auto mt-8 bg-background">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        onAnimationComplete={() => setAnimationComplete(true)}
        className="relative"
      >
        {/* Snowflake decorations */}
        <div className="absolute -top-10 -left-10 w-full h-full pointer-events-none">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-blue-100"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                fontSize: `${Math.random() * 20 + 10}px`,
              }}
              variants={snowflakeVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{
                delay: i * 0.1,
                duration: 0.5,
                repeat: Infinity,
                repeatType: "reverse",
                repeatDelay: Math.random() * 2,
              }}
            >
              ❄
            </motion.div>
          ))}
        </div>

        <Card className="overflow-hidden border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white shadow-lg">
          <CardContent className="p-6">
            {isLoading ? (
              <div className="space-y-4 py-4">
                <Skeleton className="h-8 w-3/4 bg-blue-100" />
                <Skeleton className="h-8 w-full bg-blue-100" />
                <Skeleton className="h-8 w-2/3 bg-blue-100" />
              </div>
            ) : (
              <div className="space-y-6">
                <motion.div variants={itemVariants} className="space-y-2">
                  <h3 className="text-sm font-medium text-blue-500">
                    STUDENT NAME
                  </h3>
                  <p className="text-2xl font-bold text-blue-900">
                    {studentData.name}
                  </p>
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-2">
                  <h3 className="text-sm font-medium text-blue-500">
                    FATHER'S NAME
                  </h3>
                  <p className="text-xl font-semibold text-blue-800">
                    {studentData.fatherName}
                  </p>
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-2">
                  <h3 className="text-sm font-medium text-blue-500">
                    CURRENT CLASS
                  </h3>
                  <p className="text-lg font-medium text-blue-700">
                    {studentData.currentClass}
                  </p>
                </motion.div>

                {animationComplete && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-6 pt-4 border-t border-blue-100"
                  >
                    <p className="text-center text-blue-600 font-medium">
                      Welcome to Glacia Vista! We're excited to have you join
                      us.
                    </p>
                  </motion.div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default StudentDetailsReveal;
