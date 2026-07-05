import React from 'react';
import { EXAMS } from '../lib/age-logic';

export default function AllExamsTable() {
  return (
    <div className="liquid-glass rounded-3xl p-8 md:p-12 max-w-4xl mx-auto w-full border border-white/10 text-left relative z-10 backdrop-blur-xl mt-12">
      <div className="mb-8">
        <h2 className="text-3xl font-display mb-3 text-foreground">All Exams Reference</h2>
        <p className="text-muted-foreground text-sm">
          Official age limits and cut-off dates for major government exams in India.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-foreground/80">
          <thead className="text-xs uppercase bg-white/5 border-b border-white/10 text-foreground">
            <tr>
              <th className="px-6 py-4 rounded-tl-xl">Exam Name</th>
              <th className="px-6 py-4">Cut-off Date</th>
              <th className="px-6 py-4">Min Age</th>
              <th className="px-6 py-4">Gen Max</th>
              <th className="px-6 py-4 rounded-tr-xl">OBC Max</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(EXAMS).map(([name, data], idx) => (
              <tr key={name} className={`border-b border-white/5 hover:bg-white/5 transition-colors ${idx === Object.keys(EXAMS).length - 1 ? 'border-b-0' : ''}`}>
                <td className="px-6 py-4 font-medium text-foreground">{name}</td>
                <td className="px-6 py-4">{new Date(data.cutoffDate).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}</td>
                <td className="px-6 py-4">{data.minAge}</td>
                <td className="px-6 py-4">{data.maxAge.general}</td>
                <td className="px-6 py-4">{data.maxAge.obc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
