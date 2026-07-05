import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: "Why do SSC, UPSC, and Railway exams use different age cut-off reference dates?",
    a: "Each recruiting body sets its reference date based on their respective examination cycle, administrative rules, and the expected date of commencement of training or joining. For instance, UPSC typically uses August 1st, aligning with their annual cycle, whereas SSC may use January 1st or August 1st depending on the specific notification."
  },
  {
    q: "What are the standard category-wise age relaxations applicable in Indian Government Jobs?",
    a: "Standard relaxations apply to the upper age limit: 3 years for OBC (Non-Creamy Layer), 5 years for SC/ST, and 10 years for Persons with Benchmark Disabilities (PwBD). Ex-servicemen also receive relaxations usually equivalent to their years of service plus 3 years."
  },
  {
    q: "How does SarkariCalc calculate exact age in years, months, and days?",
    a: "SarkariCalc computes the exact difference between your date of birth and the official cut-off date specified in the exam notification. It accounts for leap years and varying month lengths to ensure the age in years, months, and days is 100% accurate as per government guidelines."
  },
  {
    q: "Are final year graduation students eligible for SSC CGL or UPSC IAS examinations?",
    a: "Yes, final year students can apply, provided they can produce proof of passing the requisite examination by the cut-off date prescribed in the detailed notification. The age limit is calculated based on the reference date, independent of the graduation completion date."
  },
  {
    q: "Does COVID-19 one-time age relaxation apply to 2026–2027 recruitment notifications?",
    a: "Generally, the one-time COVID-19 age relaxations were specific to notifications released immediately post-pandemic and have expired for most exams. Unless explicitly mentioned in the 2026–2027 official notification, standard age limits will apply."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-6 py-16 md:py-24 flex flex-col items-center relative z-10">
      <div className="mb-12 md:mb-16 text-center">
        <h2 className="text-4xl md:text-5xl lg:text-7xl font-display mb-4 md:mb-6 tracking-tight text-foreground">
          Frequently Asked <span className="text-muted-foreground/80">Questions</span>
        </h2>
        <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          Everything Aspirants need to know regarding age computation, relaxation norms, and reference criteria.
        </p>
      </div>

      <div className="space-y-4 w-full">
        {faqs.map((faq, i) => (
          <div key={i} className="liquid-glass rounded-2xl transition-all duration-300 relative group">
            <button
              onClick={() => toggle(i)}
              className="w-full flex items-center justify-between p-6 text-left cursor-pointer z-10 relative"
            >
              <h3 className="text-xl md:text-[22px] font-display font-normal text-foreground/90 group-hover:text-foreground transition-colors pr-8">
                {faq.q}
              </h3>
              <ChevronDown 
                className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform duration-500 ${openIndex === i ? 'rotate-180' : ''}`} 
              />
            </button>
            
            <div 
              className={`overflow-hidden transition-all duration-500 ease-in-out relative z-10 ${
                openIndex === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="p-6 pt-0 text-muted-foreground text-base leading-relaxed">
                {faq.a}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
