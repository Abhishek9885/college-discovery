'use client';

import { useState } from 'react';
import Badge from '@/components/ui/Badge';

interface Course {
  id: string;
  name: string;
  specialization?: string | null;
  duration: string;
  degree: string;
  fees?: number | null;
}

interface CourseListProps {
  courses: Course[];
}

const degreeTypes = ['All', 'B.Tech', 'M.Tech', 'MBA', 'B.Sc', 'M.Sc', 'PhD', 'Other'];

function formatFees(fees?: number | null): string {
  if (!fees) return 'N/A';
  if (fees >= 100000) return `₹${(fees / 100000).toFixed(1)}L / year`;
  if (fees >= 1000) return `₹${(fees / 1000).toFixed(0)}K / year`;
  return `₹${fees} / year`;
}

function CourseCard({ course }: { course: Course }) {
  const [expanded, setExpanded] = useState(false);

  const nameHash = course.name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const mockSeats = 60 + (nameHash % 120);
  const mockAvgPackage = 4 + (nameHash % 15) + (nameHash % 10) / 10;
  const mockCutoff = 85 + (nameHash % 14);
  const mockEligibility = course.degree === 'B.Tech' ? '10+2 with PCM, Min 75%' 
    : course.degree === 'M.Tech' ? 'B.Tech/B.E. with GATE Score'
    : course.degree === 'MBA' ? 'Graduation with CAT/MAT Score'
    : course.degree === 'PhD' ? 'PG Degree with NET/GATE'
    : 'Relevant Qualification';

  return (
    <div className="bg-[var(--bg-card)] p-5 rounded-2xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col h-full group border border-[var(--border-color)] hover:border-primary-500/30">
      <div className="flex items-start justify-between gap-3 mb-5">
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-[var(--text-primary)] text-base group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
            {course.name}
          </h4>
          {course.specialization && (
            <p className="text-sm text-[var(--text-secondary)] mt-1">
              {course.specialization}
            </p>
          )}
        </div>
        <Badge variant="primary" className="shadow-sm">{course.degree}</Badge>
      </div>

      <div className="mt-auto space-y-4">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="bg-[var(--bg-secondary)] p-3 rounded-xl border border-[var(--border-color)]">
            <p className="text-xs text-[var(--text-tertiary)] mb-1">Annual Fee</p>
            <p className="font-bold text-[var(--text-primary)]">{formatFees(course.fees)}</p>
          </div>
          <div className="bg-[var(--bg-secondary)] p-3 rounded-xl border border-[var(--border-color)]">
            <p className="text-xs text-[var(--text-tertiary)] mb-1">Duration</p>
            <p className="font-bold text-[var(--text-primary)]">{course.duration}</p>
          </div>
          <div className="bg-[var(--bg-secondary)] p-3 rounded-xl border border-[var(--border-color)]">
            <p className="text-xs text-[var(--text-tertiary)] mb-1">Total Seats</p>
            <p className="font-bold text-[var(--text-primary)]">{mockSeats}</p>
          </div>
          <div className="bg-[var(--bg-secondary)] p-3 rounded-xl border border-[var(--border-color)]">
            <p className="text-xs text-[var(--text-tertiary)] mb-1">Avg Package</p>
            <p className="font-bold text-emerald-600 dark:text-emerald-400">₹{mockAvgPackage.toFixed(1)} LPA</p>
          </div>
        </div>

        {/* Expandable Details */}
        <div className={`overflow-hidden transition-all duration-400 ease-in-out ${expanded ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="pt-4 space-y-3 border-t border-[var(--border-color)]">
            <div className="flex items-center justify-between text-sm">
              <span className="text-[var(--text-secondary)]">Eligibility</span>
              <span className="font-semibold text-[var(--text-primary)] text-right text-xs max-w-[60%]">{mockEligibility}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-[var(--text-secondary)]">Cutoff</span>
              <span className="font-semibold text-[var(--text-primary)]">{mockCutoff}%ile</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-[var(--text-secondary)]">Mode</span>
              <span className="font-semibold text-[var(--text-primary)]">Full-Time, On Campus</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-[var(--text-secondary)]">Exams Accepted</span>
              <span className="font-semibold text-primary-600 dark:text-primary-400">
                {course.degree === 'B.Tech' ? 'JEE Main / Advanced'
                  : course.degree === 'M.Tech' ? 'GATE'
                  : course.degree === 'MBA' ? 'CAT / MAT / XAT'
                  : 'University Entrance'}
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className={`w-full py-2.5 rounded-xl font-bold text-sm transition-all duration-300 cursor-pointer ${
            expanded
              ? 'btn-gradient text-white'
              : 'border border-primary-500/30 text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20'
          }`}
        >
          {expanded ? 'Hide Details' : 'View Details'}
        </button>
      </div>
    </div>
  );
}

export default function CourseList({ courses }: CourseListProps) {
  const [activeTab, setActiveTab] = useState('All');

  const availableTypes = ['All', ...new Set(courses.map(c => c.degree))];
  const filteredTypes = degreeTypes.filter(t => availableTypes.includes(t));

  const getTypeCount = (type: string) => {
    if (type === 'All') return courses.length;
    return courses.filter(c => c.degree === type).length;
  };

  const filteredCourses =
    activeTab === 'All' ? courses : courses.filter(c => c.degree === activeTab);

  return (
    <div>
      {/* Tabs */}
      <div className="flex flex-wrap gap-2.5 mb-8">
        {filteredTypes.map(type => (
          <button
            key={type}
            onClick={() => setActiveTab(type)}
            className={`
              px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer
              hover:-translate-y-0.5 shadow-sm hover:shadow-md
              ${
                activeTab === type
                  ? 'btn-gradient text-white shadow-primary-500/30 border-transparent'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] bg-[var(--bg-secondary)] hover:bg-[var(--bg-card)] border border-[var(--border-color)]'
              }
            `}
          >
            {type} <span className={`ml-1 ${activeTab === type ? 'text-white/80' : 'opacity-70'}`}>({getTypeCount(type)})</span>
          </button>
        ))}
      </div>

      {/* Courses grid */}
      {filteredCourses.length === 0 ? (
        <p className="text-center text-sm text-[var(--text-tertiary)] py-8">
          No courses found for this category.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredCourses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
}

