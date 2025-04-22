import React from "react";
import { motion } from "framer-motion";

interface WelcomeHeaderProps {
  title?: string;
}

const WelcomeHeader = ({ title = "Glacia Vista" }: WelcomeHeaderProps) => {
  return (
    <div className="relative w-full bg-gradient-to-b from-blue-900 via-blue-700 to-blue-500 overflow-hidden">
      {/* Mountain backdrop */}
      <div className="absolute inset-0 z-0">
        <div className="absolute bottom-0 left-0 w-full h-3/4">
          <svg
            viewBox="0 0 1440 320"
            className="w-full h-full"
            preserveAspectRatio="none"
          >
            <path
              fill="#ffffff"
              fillOpacity="0.8"
              d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,202.7C672,203,768,181,864,181.3C960,181,1056,203,1152,208C1248,213,1344,203,1392,197.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
            <path
              fill="#ffffff"
              fillOpacity="0.5"
              d="M0,160L48,176C96,192,192,224,288,224C384,224,480,192,576,176C672,160,768,160,864,176C960,192,1056,224,1152,213.3C1248,203,1344,149,1392,122.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </div>

      {/* Animated snowflakes */}
      <div className="absolute inset-0 z-0 opacity-40">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 8 + 2,
              height: Math.random() * 8 + 2,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, 100],
              opacity: [0, 1, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: Math.random() * 10 + 10,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Header content */}
      <div className="relative z-10 flex flex-col items-center justify-center py-12 px-4 md:py-20">
        <motion.h1
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white text-center tracking-wider"
          style={{
            textShadow: "0 4px 6px rgba(0, 0, 0, 0.5)",
            fontFamily: '"Playfair Display", serif',
          }}
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {title}
        </motion.h1>

        <motion.div
          className="mt-4 text-xl md:text-2xl text-blue-100 text-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          A Vacation Camp
        </motion.div>

        <motion.div
          className="w-24 h-1 bg-white mt-6 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: 96 }}
          transition={{ duration: 1, delay: 0.6 }}
        />
      </div>
    </div>
  );
};

export default WelcomeHeader;
