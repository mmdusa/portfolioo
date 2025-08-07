import PageWrapper from "../components/PageWrapper";
import { motion } from "framer-motion";
import HeroParticles from "../components/HeroParticles";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../utils/translations";

export default function Home() {
  const { language } = useLanguage();
  const t = translations[language];
  return (
    <PageWrapper>
      <section className="w-full h-screen bg-blue-100 dark:bg-gray-900 text-gray-800 dark:text-white relative overflow-hidden">
        {/* Particle background */}
        <HeroParticles />

        {/* Content */}
        <div className="absolute inset-0 z-10 flex flex-col md:flex-row items-center justify-center px-6 md:px-20">
          {/* Left Side - Text */}
          <motion.div
            className="md:w-1/2 text-center md:text-left mb-10 md:mb-0"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-blue-800 dark:text-blue-300 mb-4">
              {t.heroTitle}
            </h1>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              {t.heroSubtitle}
            </p>
            <a
              href="/contact"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              {t.heroCTA}
            </a>
          </motion.div>

          {/* Right Side - Image/Illustration */}
          <motion.div
            className="md:w-1/2 flex justify-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <img
              src="https://cdn.dribbble.com/users/1162077/screenshots/3848914/programmer.gif"
              alt="Developer Illustration"
              className="rounded-xl shadow-md max-w-[90%] max-h-[70vh] object-contain"
            />
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  );
}
