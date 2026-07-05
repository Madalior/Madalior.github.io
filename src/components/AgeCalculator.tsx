import React, { useState } from 'react';
import { EXAMS, checkEligibility, calculateAge } from '../lib/age-logic';
import { Calendar, CheckCircle2, XCircle } from 'lucide-react';

export default function AgeCalculator() {
  const [exam, setExam] = useState(Object.keys(EXAMS)[0]);
  const [category, setCategory] = useState('general');
  const [dob, setDob] = useState('');
  const [result, setResult] = useState<any>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dob) return;

    const selectedExam = EXAMS[exam as keyof typeof EXAMS];
    const age = calculateAge(dob, selectedExam.cutoffDate);
    const eligibility = checkEligibility(age, exam, category);

    setResult({ age, eligibility, selectedExam });
  };

  return (
    <div className="liquid-glass rounded-3xl p-6 sm:p-8 md:p-12 max-w-3xl mx-auto w-full border border-white/10 text-left relative z-10 backdrop-blur-xl">
      <div className="mb-8 md:mb-10 text-center">
        <h2 className="text-3xl md:text-4xl font-display mb-2 md:mb-3 text-foreground">Govt. Exam Eligibility</h2>
        <p className="text-muted-foreground text-sm max-w-md mx-auto">
          Calculate your exact age and check eligibility based on official cut-off dates and category relaxations.
        </p>
      </div>

      <form onSubmit={handleCalculate} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground/80">Target Exam</label>
            <select
              value={exam}
              onChange={(e) => setExam(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-foreground outline-none focus:border-white/30 transition-colors appearance-none"
            >
              {Object.keys(EXAMS).map(e => (
                <option key={e} value={e} className="bg-background text-foreground">{e}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground/80">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-foreground outline-none focus:border-white/30 transition-colors appearance-none"
            >
              <option value="general" className="bg-background text-foreground">General</option>
              <option value="obc" className="bg-background text-foreground">OBC</option>
              <option value="sc_st" className="bg-background text-foreground">SC / ST</option>
              <option value="pwd" className="bg-background text-foreground">PwD</option>
              <option value="ex_sm" className="bg-background text-foreground">Ex-Servicemen</option>
            </select>
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-foreground/80">Date of Birth</label>
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="date"
                required
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-foreground outline-none focus:border-white/30 transition-colors"
                style={{ colorScheme: 'dark' }}
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full liquid-glass rounded-xl px-8 py-4 text-base font-medium text-foreground hover:scale-[1.01] transition-transform cursor-pointer mt-4"
        >
          Calculate Eligibility
        </button>
      </form>

      {result && (
        <div className="mt-10 pt-10 border-t border-white/10 animate-fade-rise">
          <div className={`rounded-2xl p-6 ${result.eligibility.eligible ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-rose-500/10 border-rose-500/20'} border`}>
            <div className="flex flex-col sm:flex-row items-start gap-4">
              {result.eligibility.eligible ? (
                <CheckCircle2 className="w-8 h-8 text-emerald-400 shrink-0 mt-1" />
              ) : (
                <XCircle className="w-8 h-8 text-rose-400 shrink-0 mt-1" />
              )}
              <div>
                <h3 className={`text-xl font-medium ${result.eligibility.eligible ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {result.eligibility.eligible ? 'You are Eligible!' : 'Not Eligible'}
                </h3>
                <p className="text-muted-foreground mt-1 text-sm md:text-base leading-relaxed">
                  As of the cut-off date <strong className="text-foreground font-medium">({new Date(result.selectedExam.cutoffDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })})</strong>, your exact age is:
                </p>
                <div className="flex gap-3 md:gap-4 mt-5">
                  <div className="bg-white/5 rounded-lg px-3 py-2 md:px-4 md:py-3 border border-white/5 text-center flex-1">
                    <div className="text-2xl md:text-3xl font-display text-foreground">{result.age.years}</div>
                    <div className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-widest mt-1">Years</div>
                  </div>
                  <div className="bg-white/5 rounded-lg px-3 py-2 md:px-4 md:py-3 border border-white/5 text-center flex-1">
                    <div className="text-2xl md:text-3xl font-display text-foreground">{result.age.months}</div>
                    <div className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-widest mt-1">Months</div>
                  </div>
                  <div className="bg-white/5 rounded-lg px-3 py-2 md:px-4 md:py-3 border border-white/5 text-center flex-1">
                    <div className="text-2xl md:text-3xl font-display text-foreground">{result.age.days}</div>
                    <div className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-widest mt-1">Days</div>
                  </div>
                </div>

                <div className="mt-6 text-sm text-foreground/80 bg-black/20 rounded-lg p-4 border border-white/5">
                  <p><strong>Required Age Range:</strong> {result.selectedExam.minAge} to {result.eligibility.maxAllowed} years</p>
                  {!result.eligibility.eligible && (
                    <p className="mt-2 text-rose-300">
                      {result.age.years < result.selectedExam.minAge
                        ? `You need to be at least ${result.selectedExam.minAge} years old.`
                        : `You have exceeded the maximum age limit of ${result.eligibility.maxAllowed} years for this category.`}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
