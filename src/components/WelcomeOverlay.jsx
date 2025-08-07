import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function WelcomeOverlay() {
  const [visible, setVisible] = useState(true);

  const techSymbols = useMemo(
    () =>
      Array.from({ length: 25 }, () => ({
        icon: getRandomTech(),
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        duration: 4 + Math.random() * 3,
        delay: Math.random() * 2,
      })),
    []
  );

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 3500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2 }}
        >
          {/* Floating tech symbols */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {techSymbols.map((symbol, i) => (
              <motion.span
                key={i}
                className="absolute text-blue-400 dark:text-green-400 text-xs md:text-base font-mono"
                style={{ left: symbol.left, top: symbol.top }}
                animate={{ y: [-100, 800] }}
                transition={{
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: symbol.duration,
                  delay: symbol.delay,
                }}
              >
                {symbol.icon}
              </motion.span>
            ))}
          </div>

          {/* Message box */}
          <motion.div
            className="relative text-center text-white px-6 py-8 rounded-xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Welcome to My Portfolio
            </h1>
            <p className="text-lg md:text-xl mt-4">
              I'm Mohammad Rajabi – Web Developer & Problem Solver
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Helper to randomize tech tags/icons
function getRandomTech() {
  const tech = [
    "<HTML>",
    "<CSS>",
    "<JS>",
    "<REACT>",
    "<NODE>",
    "<TAILWIND>",
    "<GIT>",
    "<SQL>",
    "<FLUTTER>",
    "<FIREBASE>",
    "<API>",
    "<UI/UX>",
    "<SASS>",
    "<MONGO>",
    "<NEXT>",
    "<TYPESCRIPT>",
  ];
  return tech[Math.floor(Math.random() * tech.length)];
}
