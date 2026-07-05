import React, { useState } from 'react';
import AgeCalculator from './components/AgeCalculator';
import ExamDirectory from './components/ExamDirectory';
import FAQ from './components/FAQ';
import ChatWidget from './components/ChatWidget';
import { Menu, X } from 'lucide-react';

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleScrollTo = (id: string) => {
    setMenuOpen(false);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const navLinks = [
    { label: 'Home', id: 'home' },
    { label: 'Calculator', id: 'calculator' },
    { label: 'Directory', id: 'directory' },
    { label: 'FAQ', id: 'faq' },
    { label: 'About', id: 'about' },
  ];

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-background text-foreground">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 w-full h-full object-cover z-0 opacity-40"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4"
      />
      
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/40 z-0" />

      {/* Navigation */}
      <nav className="relative z-20 flex items-center justify-between px-4 sm:px-6 md:px-8 py-4 md:py-5 max-w-7xl mx-auto w-full">
        {/* Logo */}
        <button
          onClick={() => handleScrollTo('home')}
          className="text-xl sm:text-2xl md:text-3xl tracking-tight font-display text-foreground flex items-baseline gap-1 cursor-pointer"
        >
          SarkariCalc<sup className="text-[9px] sm:text-[10px] font-sans font-normal ml-0.5">.me</sup>
        </button>

        {/* Desktop Nav */}
        <div className="hidden lg:flex gap-6 xl:gap-8">
          {navLinks.map((item, i) => (
            <button
              key={item.id}
              onClick={() => handleScrollTo(item.id)}
              className={`text-sm transition-colors hover:text-foreground cursor-pointer ${
                i === 0 ? 'text-foreground' : 'text-muted-foreground'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Desktop CTA */}
        <button
          onClick={() => handleScrollTo('calculator')}
          className="hidden lg:block liquid-glass rounded-full px-5 py-2 md:px-6 md:py-2.5 text-sm text-foreground hover:scale-[1.03] transition-transform cursor-pointer"
        >
          Check Eligibility
        </button>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden p-2 rounded-full hover:bg-white/10 transition-colors"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="relative z-20 lg:hidden liquid-glass mx-4 rounded-2xl mb-4 overflow-hidden">
          <div className="flex flex-col p-4 gap-1">
            {navLinks.map((item) => (
              <button
                key={item.id}
                onClick={() => handleScrollTo(item.id)}
                className="text-left px-4 py-3 rounded-xl text-sm text-foreground hover:bg-white/10 transition-colors cursor-pointer"
              >
                {item.label}
              </button>
            ))}
            <div className="mt-2 pt-2 border-t border-white/10">
              <button
                onClick={() => handleScrollTo('calculator')}
                className="w-full liquid-glass rounded-xl px-4 py-3 text-sm text-foreground hover:scale-[1.01] transition-transform cursor-pointer"
              >
                Check Eligibility →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <main
        id="home"
        className="relative z-10 flex flex-col items-center justify-center text-center px-4 sm:px-6 pt-16 sm:pt-24 md:pt-28 pb-20 sm:pb-28 md:pb-32 w-full max-w-7xl mx-auto min-h-[80vh]"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6 sm:mb-8 text-[10px] sm:text-xs font-medium tracking-widest text-muted-foreground uppercase animate-fade-rise">
          🇮🇳 India's #1 Govt Job Age Calculator
        </div>

        <h1 className="animate-fade-rise text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[1.08] md:leading-[1] tracking-tight max-w-5xl font-normal font-display text-foreground">
          Age Calculator for{' '}
          <em className="not-italic text-muted-foreground">Government Jobs.</em>
        </h1>
        <p className="animate-fade-rise-delay text-muted-foreground text-sm sm:text-base md:text-lg max-w-xl sm:max-w-2xl mt-5 sm:mt-6 md:mt-8 leading-relaxed px-2">
          Instant Eligibility Check for SSC, UPSC, Railways &amp; More. We automatically apply
          official cut-off dates and category-specific age relaxations.
        </p>
        <div className="animate-fade-rise-delay-2 flex flex-col sm:flex-row gap-3 mt-7 sm:mt-10 md:mt-12">
          <button
            onClick={() => handleScrollTo('calculator')}
            className="liquid-glass rounded-full px-8 sm:px-12 md:px-14 py-3.5 sm:py-4 md:py-5 text-sm md:text-base text-foreground hover:scale-[1.03] transition-transform cursor-pointer"
          >
            Calculate Age Now
          </button>
          <button
            onClick={() => handleScrollTo('directory')}
            className="rounded-full px-8 sm:px-10 py-3.5 sm:py-4 text-sm text-muted-foreground border border-white/10 hover:bg-white/5 hover:text-foreground transition-colors cursor-pointer"
          >
            View All Exams
          </button>
        </div>

        {/* Stats Row */}
        <div className="animate-fade-rise-delay-3 flex flex-wrap justify-center gap-6 sm:gap-10 mt-12 sm:mt-16 md:mt-20 text-center">
          {[
            { value: '30+', label: 'Exams Covered' },
            { value: '5', label: 'Category Relaxations' },
            { value: '100%', label: 'Free & Accurate' },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-2xl sm:text-3xl font-display text-foreground">{stat.value}</div>
              <div className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-widest mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </main>

      {/* Content Sections */}
      <section className="relative z-10 w-full px-4 sm:px-6 pb-20 sm:pb-28 md:pb-32 space-y-20 sm:space-y-24">
        <div id="calculator" className="animate-fade-rise-delay-3 max-w-7xl mx-auto scroll-mt-24">
          <AgeCalculator />
        </div>

        <div id="directory" className="max-w-7xl mx-auto scroll-mt-24">
          <ExamDirectory />
        </div>

        <div id="faq" className="max-w-7xl mx-auto scroll-mt-24">
          <FAQ />
        </div>

        {/* About Section */}
        <div id="about" className="max-w-4xl mx-auto scroll-mt-24">
          <div className="liquid-glass rounded-3xl p-6 sm:p-10 md:p-14 border border-white/10">
            <div className="text-center mb-8 sm:mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-[10px] sm:text-xs font-medium tracking-widest text-muted-foreground uppercase mb-5 sm:mb-6">
                About Us
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display text-foreground tracking-tight mb-4 sm:mb-5">
                Built for <em className="not-italic text-muted-foreground">Aspirants,</em>
                <br className="hidden sm:block" /> by Aspirants
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
                SarkariCalc was built with one mission — to remove the confusion around age
                eligibility for government exams in India. Every year, lakhs of aspirants miss
                out on their dream exams because they miscalculate their age against the wrong
                cut-off date or forget to apply their category relaxation.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-6 sm:mt-8">
              {[
                {
                  emoji: '🎯',
                  title: 'Exam-Specific Accuracy',
                  desc: 'Every exam has its own cut-off reference date. We maintain the correct dates — not generic Jan 1st defaults.',
                },
                {
                  emoji: '⚖️',
                  title: 'Category-Aware',
                  desc: 'OBC, SC/ST, PwD, and Ex-Servicemen relaxations are built-in. No manual math required.',
                },
                {
                  emoji: '🔒',
                  title: 'Free Forever',
                  desc: 'No login, no paywalls, no data collection. SarkariCalc is and always will be completely free.',
                },
              ].map((card) => (
                <div
                  key={card.title}
                  className="bg-white/5 rounded-2xl p-5 sm:p-6 border border-white/5 hover:border-white/10 transition-colors"
                >
                  <div className="text-2xl mb-3">{card.emoji}</div>
                  <h3 className="text-sm sm:text-base font-medium text-foreground mb-2">{card.title}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{card.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 sm:mt-10 pt-8 sm:pt-10 border-t border-white/10 text-center">
              <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed max-w-xl mx-auto">
                We're continuously updating exam data based on official notifications from UPSC,
                SSC, RRB, IBPS, and State PSCs. Have a suggestion or found an error?{' '}
                <a
                  href="mailto:contact@sarkaricalc.me"
                  className="text-foreground underline underline-offset-4 hover:text-white transition-colors"
                >
                  contact@sarkaricalc.me
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 sm:gap-8 text-sm text-muted-foreground">
            <div className="text-center md:text-left">
              <p className="text-foreground font-display text-lg sm:text-xl mb-1">SarkariCalc.me</p>
              <p className="text-xs sm:text-sm">India's free age eligibility calculator for government jobs.</p>
            </div>
            <div className="flex flex-wrap justify-center md:justify-end gap-4 sm:gap-6 text-xs sm:text-sm">
              {navLinks.slice(1).map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleScrollTo(item.id)}
                  className="hover:text-foreground transition-colors cursor-pointer"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <p className="text-[10px] sm:text-xs text-muted-foreground/60">
              © 2026 SarkariCalc.me — All rights reserved.
            </p>
            <p className="text-[10px] sm:text-xs text-muted-foreground/60 max-w-md">
              Disclaimer: This tool is for reference only. Always verify with the official exam notification for final eligibility.
            </p>
          </div>
        </div>
      </footer>

      <ChatWidget />
    </div>
  );
}
