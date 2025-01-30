"use client";

import { motion } from "framer-motion";

export default function RegisterPage() {
  return (
    <div className="flex justify-center items-center h-screen bg-black text-white">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl font-bold text-center"
      >
        SORRY, THERE IS NO REGISTER PAGE FOR YOU.
      </motion.h1>

      <motion.h2
        className="absolute bottom-10 text-lg font-semibold text-gray-300"
        animate={{
          scale: [1, 1.1, 1, 1.1, 1], // Pulsing effect
          rotate: [0, -2, 2, -2, 0], // Slight rotation
          color: ["#fff", "#ff5733", "#33ff57", "#5733ff", "#fff"], // Color cycle
        }}
        transition={{ repeat: Infinity, duration: 3 }}
      >
        THIS APP IS FOR ONE PERSON ONLY.
      </motion.h2>

      <motion.div
        className="absolute top-10 text-xl font-bold"
        animate={{ x: [-10, 10, -10] }} // Side-to-side shaking
        transition={{ repeat: Infinity, duration: 0.5 }}
      >
        🚀
      </motion.div>
    </div>
  );
}
