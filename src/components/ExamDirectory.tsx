import React, { useState, useEffect } from 'react';
import { EXAMS } from '../lib/age-logic';
import { BookOpen, Search, History } from 'lucide-react';

export default function ExamDirectory() {
  const [searchQuery, setSearchQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  const saveSearch = (query: string) => {
    const trimmed = query.trim();
    if (!trimmed) return;
    
    setRecentSearches(prev => {
      const updated = [trimmed, ...prev.filter(s => s.toLowerCase() !== trimmed.toLowerCase())].slice(0, 3);
      localStorage.setItem('recentSearches', JSON.stringify(updated));
      return updated;
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      saveSearch(searchQuery);
    }
  };

  const handleBlur = () => {
    if (searchQuery.trim()) {
      saveSearch(searchQuery);
    }
  };

  const handleRecentClick = (search: string) => {
    setSearchQuery(search);
    saveSearch(search);
  };

  const [visibleCount, setVisibleCount] = useState(10);

  useEffect(() => {
    setVisibleCount(10);
  }, [searchQuery]);

  const filteredExams = Object.entries(EXAMS).filter(([name, exam]) => {
    return name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const displayedExams = filteredExams.slice(0, visibleCount);

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-24 flex flex-col items-center">
      
      {/* Header Section */}
      <div className="flex flex-col items-center text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8 text-xs font-medium tracking-widest text-muted-foreground uppercase">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Official Notifications Matrix</span>
        </div>
        
        <h2 className="text-4xl md:text-5xl lg:text-7xl font-display mb-4 md:mb-6 tracking-tight text-foreground">
          2026–2027 <span className="text-muted-foreground/80">Exam Cut-off</span> Directory
        </h2>
        
        <p className="text-muted-foreground text-base md:text-lg max-w-2xl leading-relaxed">
          Comprehensive age limits and official reference dates compiled across SSC, UPSC, Banking, Railways, and State Services.
        </p>
      </div>

      {/* Search */}
      <div className="w-full max-w-lg mx-auto relative mb-6">
        <div className="liquid-glass rounded-full flex items-center w-full">
          <Search className="absolute left-6 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search for an exam..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            className="w-full bg-transparent pl-14 pr-6 py-4 text-base text-foreground outline-none transition-all placeholder:text-muted-foreground"
          />
        </div>
        
        {/* Recent Searches */}
        {recentSearches.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mr-1">
              <History className="w-3.5 h-3.5" />
              <span>Recent:</span>
            </div>
            {recentSearches.map((search, idx) => (
              <button
                key={idx}
                onClick={() => handleRecentClick(search)}
                className="px-3 py-1.5 text-xs rounded-full bg-white/5 border border-white/10 text-muted-foreground hover:text-foreground hover:bg-white/10 transition-colors"
              >
                {search}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Exam Table */}
      <div className="w-full mt-8 md:mt-10 liquid-glass rounded-2xl overflow-hidden overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="border-b border-white/10 bg-white/5 text-xs sm:text-sm text-muted-foreground">
              <th className="p-4 sm:p-5 font-medium whitespace-nowrap">Exam Name</th>
              <th className="p-4 sm:p-5 font-medium whitespace-nowrap">Cut-off Date</th>
              <th className="p-4 sm:p-5 font-medium whitespace-nowrap">General</th>
              <th className="p-4 sm:p-5 font-medium whitespace-nowrap">OBC</th>
              <th className="p-4 sm:p-5 font-medium whitespace-nowrap">SC/ST</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-sm sm:text-base">
            {displayedExams.map(([name, exam]) => (
              <tr key={name} className="hover:bg-white/5 transition-colors group">
                <td className="p-4 sm:p-5">
                  <div className="font-medium text-foreground">{name}</div>
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                    {exam.group}
                  </div>
                </td>
                <td className="p-4 sm:p-5 text-foreground whitespace-nowrap font-medium">
                  {new Date(exam.cutoffDate).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                </td>
                <td className="p-4 sm:p-5 text-foreground whitespace-nowrap">
                  <div className="font-medium">{exam.minAge} - {exam.maxAge.general} yrs</div>
                  <div className="text-xs text-muted-foreground mt-1">Marks: {exam.cutoffMarks?.general || 'N/A'}</div>
                </td>
                <td className="p-4 sm:p-5 text-foreground whitespace-nowrap">
                  <div className="font-medium">{exam.minAge} - {exam.maxAge.obc} yrs</div>
                  <div className="text-xs text-muted-foreground mt-1">Marks: {exam.cutoffMarks?.obc || 'N/A'}</div>
                </td>
                <td className="p-4 sm:p-5 text-foreground whitespace-nowrap">
                  <div className="font-medium">{exam.minAge} - {exam.maxAge.sc_st} yrs</div>
                  <div className="text-xs text-muted-foreground mt-1">Marks: {exam.cutoffMarks?.sc_st || 'N/A'}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredExams.length === 0 && (
          <div className="p-12 text-center text-muted-foreground">
            No exams found matching your search.
          </div>
        )}
      </div>

      {visibleCount < filteredExams.length && (
        <div className="mt-8 flex justify-center w-full">
          <button 
            onClick={() => setVisibleCount(prev => prev + 10)}
            className="px-6 py-3 rounded-full liquid-glass border border-white/10 hover:bg-white/5 transition-all text-sm font-medium text-foreground"
          >
            Load More Exams ({filteredExams.length - visibleCount} remaining)
          </button>
        </div>
      )}

    </div>
  );
}
