import React, { useState } from 'react';
import './index.css';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import SymptomChecker from './components/SymptomChecker';
import AboutSection from './components/AboutSection';
import Footer from './components/Footer';

type Page = 'home' | 'checker';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const navigate = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full min-h-screen bg-[#0f172a] text-slate-200">
      <Navbar currentPage={currentPage} onNavigate={navigate} />

      <main className="w-full">
        {currentPage === 'home' ? (
          <>
            <HeroSection onGetStarted={() => navigate('checker')} />
            <AboutSection />
          </>
        ) : (
          <SymptomChecker />
        )}
      </main>

      <Footer onNavigate={navigate} />
    </div>
  );
};

export default App;
