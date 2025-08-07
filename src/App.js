import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";
import WelcomeOverlay from "./components/WelcomeOverlay";

function App() {
  const [overlayVisible, setOverlayVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setOverlayVisible(false), 3500); // same as overlay animation time
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      {/* Stack both overlays using z-index and position */}
      <div className="relative min-h-screen overflow-hidden">
        {/* Main site (visible from the start, but transparent) */}
        <motion.div
          className="absolute inset-0 z-10 bg-white dark:bg-black text-black dark:text-white flex flex-col"
          initial={{ opacity: 0 }}
          animate={{ opacity: overlayVisible ? 0 : 1 }}
          transition={{ duration: 1.5 }}
        >
          <Navbar />
          <main className="flex-grow w-full overflow-x-hidden">
            <AnimatedRoutes />
          </main>
          <Footer />
        </motion.div>

        {/* Welcome overlay on top */}
        <AnimatePresence>
          {overlayVisible && (
            <motion.div
              className="absolute inset-0 z-20"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
            >
              <WelcomeOverlay />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Router>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
