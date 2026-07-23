/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import OffcanvasMenu from "./components/OffcanvasMenu";
import Chatbot from "./components/Chatbot";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Industries from "./pages/Industries";
import BlogIndex from "./pages/BlogIndex";
import BlogDetail from "./pages/BlogDetail";
import Contact from "./pages/Contact";
import TeamDetail from "./pages/TeamDetail";
import ProjectDetail from "./pages/ProjectDetail";
import ServiceDetail from "./pages/ServiceDetail";

export default function App() {
  // Start path resolution based on browser address parameters
  const [currentPath, setCurrentPath] = useState(window.location.pathname || "/");
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname || "/");
    };

    window.addEventListener("popstate", handleLocationChange);
    return () => {
      window.removeEventListener("popstate", handleLocationChange);
    };
  }, []);

  const navigateTo = (path: string) => {
    window.history.pushState(null, "", path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Dedicated page router
  const renderPage = () => {
    // Exact paths
    if (currentPath === "/" || currentPath === "" || currentPath === "/index.html") {
      return <Home onNavigate={navigateTo} />;
    }
    if (currentPath === "/about" || currentPath === "/about/") {
      return <About onNavigate={navigateTo} />;
    }
    if (currentPath === "/our-services" || currentPath === "/our-services/") {
      return <Services onNavigate={navigateTo} />;
    }
    if (currentPath === "/industries" || currentPath === "/industries/") {
      return <Industries onNavigate={navigateTo} />;
    }
    if (currentPath === "/blog" || currentPath === "/blog/") {
      return <BlogIndex onNavigate={navigateTo} />;
    }
    if (currentPath === "/contact-2" || currentPath === "/contact-2/") {
      return <Contact onNavigate={navigateTo} />;
    }

    // Dynamic routes
    if (currentPath.startsWith("/blog/")) {
      const slug = currentPath.substring(6).replace(/\/$/, "");
      return <BlogDetail slug={slug} onNavigate={navigateTo} />;
    }
    if (currentPath.startsWith("/all-team/")) {
      const slug = currentPath.substring(10).replace(/\/$/, "");
      return <TeamDetail slug={slug} onNavigate={navigateTo} />;
    }
    if (currentPath.startsWith("/all-project/")) {
      const slug = currentPath.substring(13).replace(/\/$/, "");
      return <ProjectDetail slug={slug} onNavigate={navigateTo} />;
    }
    if (currentPath.startsWith("/all-service/")) {
      const slug = currentPath.substring(13).replace(/\/$/, "");
      return <ServiceDetail slug={slug} onNavigate={navigateTo} />;
    }

    // 404 Fallback page
    return (
      <div className="py-24 text-center max-w-xl mx-auto space-y-6 text-left px-4">
        <h2 className="text-3xl font-extrabold text-primary-navy">404 - Page Not Found</h2>
        <p className="text-sm text-muted-text">The requested resource directory is not active in our archives.</p>
        <button
          onClick={() => navigateTo("/")}
          className="py-3 px-6 bg-gradient-brand text-white font-bold rounded-xl shadow-md cursor-pointer"
        >
          Return Home
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white font-sans text-text-dark flex flex-col justify-between antialiased selection:bg-light-blue selection:text-primary-navy">
      <div>
        {/* Dynamic header navigation */}
        <Header
          currentPath={currentPath}
          onNavigate={navigateTo}
          onToggleOffcanvas={() => setIsOffcanvasOpen(true)}
        />

        {/* Slid-out Offcanvas Side Drawer */}
        <OffcanvasMenu
          isOpen={isOffcanvasOpen}
          onClose={() => setIsOffcanvasOpen(false)}
          onNavigate={navigateTo}
        />

        {/* Principal Dynamic View Area */}
        <main className="w-full">
          {renderPage()}
        </main>
      </div>

      {/* Main Footer Block */}
      <Footer onNavigate={navigateTo} />

      {/* Floating AI Chatbot — visible on every page */}
      <Chatbot />
    </div>
  );
}
