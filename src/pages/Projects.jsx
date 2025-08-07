import PageWrapper from "../components/PageWrapper";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../utils/translations";

export default function Projects() {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);

  const inView1 = useInView(ref1, { once: true });
  const inView2 = useInView(ref2, { once: true });
  const inView3 = useInView(ref3, { once: true });

  const refs = [ref1, ref2, ref3];
  const inViews = [inView1, inView2, inView3];

  const [darkMode, setDarkMode] = useState(false);
  const { language } = useLanguage();
  const t = translations[language];

  // ✅ Create project list after t is defined
  const projects = [
    {
      title: t.title1,
      description: t.projectDesc1,
      link: "https://github.com/yourusername/telegram-bot",
    },
    {
      title: t.title2,
      description: t.projectDesc2,
      link: "https://github.com/yourusername/portfolio",
    },
    {
      title: t.title3,
      description: t.projectDesc3,
      link: "https://github.com/yourusername/weather-app",
    },
  ];

  return (
    <PageWrapper>
      <section className="min-h-screen bg-gray-100 dark:bg-gray-900 py-16 px-6 md:px-20 transition-colors duration-500">
        <h2 className="text-3xl font-bold text-center text-blue-600 dark:text-blue-400 mb-12">
          {t.myProjects}
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              ref={refs[index]}
              initial={{ opacity: 0, y: 40 }}
              animate={inViews[index] ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
            >
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                {project.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {project.description}
              </p>
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="text-blue-500 dark:text-blue-400 hover:underline"
              >
                View on GitHub →
              </a>
            </motion.div>
          ))}
        </div>
      </section>
    </PageWrapper>
  );
}
