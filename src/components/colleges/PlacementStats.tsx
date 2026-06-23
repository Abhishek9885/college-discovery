'use client';

import { useState } from 'react';

interface PlacementYear {
  year: number;
  averagePackage?: number | null;
  highestPackage?: number | null;
  medianPackage?: number | null;
  placementRate?: number | null;
  totalStudents?: number | null;
  placedStudents?: number | null;
  topRecruiters?: string[];
}

interface PlacementStatsProps {
  placements: PlacementYear[];
}

function formatPackage(value?: number | null): string {
  if (!value) return 'N/A';
  if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
  if (value >= 1000) return `₹${(value / 1000).toFixed(0)}K`;
  return `₹${value}`;
}

// Map company names to their domains for logo fetching
const companyDomains: Record<string, string> = {
  'Google': 'google.com',
  'Microsoft': 'microsoft.com',
  'Apple': 'apple.com',
  'Amazon': 'amazon.com',
  'Meta': 'meta.com',
  'Facebook': 'facebook.com',
  'Netflix': 'netflix.com',
  'Goldman Sachs': 'goldmansachs.com',
  'JP Morgan': 'jpmorgan.com',
  'JPMorgan': 'jpmorgan.com',
  'Morgan Stanley': 'morganstanley.com',
  'Deloitte': 'deloitte.com',
  'McKinsey': 'mckinsey.com',
  'Accenture': 'accenture.com',
  'TCS': 'tcs.com',
  'Infosys': 'infosys.com',
  'Wipro': 'wipro.com',
  'IBM': 'ibm.com',
  'Intel': 'intel.com',
  'Samsung': 'samsung.com',
  'Adobe': 'adobe.com',
  'Oracle': 'oracle.com',
  'Cisco': 'cisco.com',
  'Qualcomm': 'qualcomm.com',
  'Texas Instruments': 'ti.com',
  'Flipkart': 'flipkart.com',
  'Uber': 'uber.com',
  'Atlassian': 'atlassian.com',
  'SAP': 'sap.com',
  'Cognizant': 'cognizant.com',
  'HCL': 'hcltech.com',
  'PayPal': 'paypal.com',
  'Salesforce': 'salesforce.com',
  'HSBC': 'hsbc.com',
  'Barclays': 'barclays.com',
  'Deutsche Bank': 'db.com',
  'Capgemini': 'capgemini.com',
  'Reliance': 'ril.com',
  'Tata Motors': 'tatamotors.com',
  'L&T': 'larsentoubro.com',
  'Mahindra': 'mahindra.com',
  'Bosch': 'bosch.com',
  'Siemens': 'siemens.com',
};

function getCompanyLogoUrl(name: string): string {
  const domain = companyDomains[name];
  const targetDomain = domain || name.toLowerCase().replace(/\s+/g, '') + '.com';
  return `https://www.google.com/s2/favicons?sz=128&domain=${targetDomain}`;
}

function CompanyChip({ name }: { name: string }) {
  const [imgError, setImgError] = useState(false);
  const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

  return (
    <div className="flex items-center gap-2.5 bg-[var(--bg-card)] border border-[var(--border-color)] px-4 py-3 rounded-2xl hover:border-primary-500/30 hover:shadow-md transition-all duration-300 group cursor-default">
      {!imgError ? (
        <img
          src={getCompanyLogoUrl(name)}
          alt={name}
          className="w-6 h-6 rounded-md object-contain flex-shrink-0"
          onError={() => setImgError(true)}
        />
      ) : (
        <div className="w-6 h-6 rounded-md bg-gradient-to-br from-primary-500 to-violet-500 flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
          {initials}
        </div>
      )}
      <span className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
        {name}
      </span>
    </div>
  );
}

export default function PlacementStats({ placements }: PlacementStatsProps) {
  const [activeYear, setActiveYear] = useState(
    placements.length > 0 ? placements[0].year : new Date().getFullYear()
  );

  const currentData = placements.find(p => p.year === activeYear);

  if (placements.length === 0) {
    return (
      <div className="text-center py-12 text-[var(--text-tertiary)]">
        <svg className="w-12 h-12 mx-auto mb-3 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        <p className="text-sm">No placement data available yet.</p>
      </div>
    );
  }

  const metrics = [
    {
      label: 'Average Package',
      value: formatPackage(currentData?.averagePackage),
      icon: '💰',
      color: 'from-primary-500 to-primary-600',
    },
    {
      label: 'Highest Package',
      value: formatPackage(currentData?.highestPackage),
      icon: '🚀',
      color: 'from-emerald-500 to-emerald-600',
    },
    {
      label: 'Placement Rate',
      value: currentData?.placementRate ? `${currentData.placementRate}%` : 'N/A',
      icon: '📊',
      color: 'from-amber-500 to-amber-600',
    },
    {
      label: 'Students Placed',
      value: currentData?.placedStudents
        ? `${currentData.placedStudents}/${currentData.totalStudents || '?'}`
        : 'N/A',
      icon: '🎓',
      color: 'from-violet-500 to-violet-600',
    },
  ];

  // Simple bar chart data
  const barData = placements.slice(0, 5).reverse();
  const maxPackage = Math.max(...barData.map(p => p.averagePackage || 0), 1);

  return (
    <div className="space-y-6">
      {/* Year selector */}
      <div className="flex flex-wrap gap-2">
        {placements.map(p => (
          <button
            key={p.year}
            onClick={() => setActiveYear(p.year)}
            className={`
              px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer
              hover:-translate-y-0.5 shadow-sm hover:shadow-md
              ${
                activeYear === p.year
                  ? 'btn-gradient text-white'
                  : 'text-[var(--text-secondary)] bg-[var(--bg-secondary)] hover:bg-[var(--bg-card)] border border-[var(--border-color)]'
              }
            `}
          >
            {p.year}
          </button>
        ))}
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map(metric => (
          <div key={metric.label} className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4 text-center hover:border-primary-500/20 transition-colors">
            <span className="text-lg mb-1 block">{metric.icon}</span>
            <p className="text-xs text-[var(--text-tertiary)] mb-1">{metric.label}</p>
            <p className={`text-xl font-extrabold bg-gradient-to-r ${metric.color} bg-clip-text text-transparent`}>
              {metric.value}
            </p>
          </div>
        ))}
      </div>

      {/* Bar chart */}
      {barData.length > 1 && (
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-6">
          <h4 className="text-sm font-bold text-[var(--text-primary)] mb-6">
            Average Package Trend
          </h4>
          <div className="flex items-end gap-4 h-48">
            {barData.map((p, i) => {
              const height = ((p.averagePackage || 0) / maxPackage) * 100;
              const isActive = p.year === activeYear;
              return (
                <div key={p.year} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                  <span className={`text-xs font-bold ${isActive ? 'text-primary-600 dark:text-primary-400' : 'text-[var(--text-secondary)]'}`}>
                    {formatPackage(p.averagePackage)}
                  </span>
                  <div
                    className={`w-full max-w-[60px] md:max-w-[80px] rounded-t-xl transition-all duration-700 ease-out cursor-pointer hover:opacity-90 ${
                      isActive
                        ? 'bg-gradient-to-t from-primary-600 to-primary-400 shadow-lg shadow-primary-500/20'
                        : 'bg-gradient-to-t from-primary-600/40 to-primary-400/40'
                    }`}
                    style={{ 
                      height: `${Math.max(height, 8)}%`,
                      animationDelay: `${i * 100}ms` 
                    }}
                    onClick={() => setActiveYear(p.year)}
                  />
                  <span className={`text-xs font-semibold ${isActive ? 'text-primary-600 dark:text-primary-400' : 'text-[var(--text-secondary)]'}`}>
                    {p.year}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Top Recruiters with Company Logos */}
      {currentData?.topRecruiters && currentData.topRecruiters.length > 0 && (
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-6">
          <h4 className="text-sm font-bold text-[var(--text-primary)] mb-4">
            Top Recruiters
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {currentData.topRecruiters.map(recruiter => (
              <CompanyChip key={recruiter} name={recruiter} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

