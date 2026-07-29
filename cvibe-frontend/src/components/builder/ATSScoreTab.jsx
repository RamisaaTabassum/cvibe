import { useState } from 'react';

const ATSScoreTab = ({ cvData, setCvData }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);
  const [auditResult, setAuditResult] = useState(null);

  const isGibberish = (str) => {
    if (!str || typeof str !== 'string') return false;
    const text = str.trim();
    if (text.length < 2) return true;

    const spamPatterns = ['asdfgh', 'qwerty', 'zxcvbn', 'dfasdfdsf', '12345678'];
    if (spamPatterns.some((pattern) => text.toLowerCase().includes(pattern))) return true;

    if (/(.)\1{2,}/.test(text)) return true;

    return false;
  };

  // CV Action Verbs List
  const actionVerbs = new Set([
    'developed', 'engineered', 'built', 'created', 'designed', 'implemented', 
    'spearheaded', 'managed', 'led', 'architected', 'optimized', 'scaled', 
    'increased', 'reduced', 'improved', 'automated', 'launched', 'delivered'
  ]);

  const handleAuditCV = () => {
    if (!cvData) return;
    setIsAnalyzing(true);

    setTimeout(() => {
      let totalScore = 0;
      const passedRules = [];
      const failedRules = [];

      const personal = cvData.personalInfo || cvData.personal || {};
      const experiences = Array.isArray(cvData.experience) ? cvData.experience : [];
      const education = Array.isArray(cvData.education) ? cvData.education : [];

      let skillsList = [];
      if (Array.isArray(cvData.skills)) {
        skillsList = cvData.skills;
      }
      if (typeof cvData.technicalSkills === 'string' && cvData.technicalSkills.trim()) {
        skillsList = [...skillsList, ...cvData.technicalSkills.split(',').map(s => s.trim())];
      }
      if (typeof cvData.softSkills === 'string' && cvData.softSkills.trim()) {
        skillsList = [...skillsList, ...cvData.softSkills.split(',').map(s => s.trim())];
      }
      skillsList = skillsList.filter(Boolean);

      // PERSONAL INFO AUDIT 
      const name = personal.fullName || personal.name || '';
      const title = personal.jobTitle || personal.title || personal.designation || '';
      const email = personal.email || '';
      const phone = personal.phone || '';

      if (name.trim() && !isGibberish(name) && title.trim() && !isGibberish(title)) {
        totalScore += 10;
        passedRules.push('Valid Full Name and Target Job Title provided.');
      } else {
        failedRules.push('Full Name or Job Title is missing or contains invalid text.');
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (email && emailRegex.test(email) && phone.trim().length >= 6) {
        totalScore += 10;
        passedRules.push('Professional Contact details (Email & Phone) verified.');
      } else {
        failedRules.push('Provide a valid email address and contact phone number.');
      }

      //PROFESSIONAL SUMMARY AUDIT
      const summaryText = personal.summary || personal.about || '';
      const summaryCharCount = summaryText.trim().length;

      if (summaryCharCount >= 20 && !isGibberish(summaryText)) {
        totalScore += 20;
        passedRules.push('Professional Summary is provided and valid.');
      } else {
        failedRules.push('Summary is too short or contains invalid text (Min 20 characters required).');
      }

      // WORK EXPERIENCE AUDIT 
      if (experiences.length > 0) {
        let hasValidExp = false;
        let hasMetrics = false;
        let verbCount = 0;

        experiences.forEach((exp) => {
          const pos = exp.jobTitle || exp.position || exp.role || exp.title || '';
          const comp = exp.company || exp.companyName || '';
          const desc = exp.description || exp.responsibilities || '';

          if (pos.trim() && !isGibberish(pos) && comp.trim() && !isGibberish(comp)) {
            hasValidExp = true;
          }

          const lowerDesc = desc.toLowerCase();
          if (/\d+%|\$\d+|\b\d+\b/.test(lowerDesc)) hasMetrics = true;

          lowerDesc.split(/\s+/).forEach((w) => {
            if (actionVerbs.has(w)) verbCount++;
          });
        });

        if (hasValidExp) {
          totalScore += 10;
          passedRules.push('Work Experience details are authentic and valid.');

          if (verbCount >= 1) {
            totalScore += 8;
            passedRules.push('Strong Action Verbs (e.g., Developed, Engineered) detected in experience.');
          } else {
            failedRules.push('Use Action Verbs (e.g., Developed, Designed, Managed) in experience bullet points.');
          }

          if (hasMetrics) {
            totalScore += 7;
            passedRules.push('Quantifiable achievements (% or numbers) included in experience.');
          } else {
            failedRules.push('Add measurable results (e.g., "Increased speed by 30%") to show impact.');
          }
        } else {
          failedRules.push('Work Experience section contains invalid or incomplete role details.');
        }
      } else {
        failedRules.push('Work Experience section is empty. Add at least 1 relevant role.');
      }

      //  SKILLS AUDIT 
      if (skillsList.length >= 3) {
        const hasInvalidSkill = skillsList.some((s) => {
          const skillName = typeof s === 'object' ? s.name || s.skill : s;
          return isGibberish(skillName);
        });

        if (hasInvalidSkill) {
          failedRules.push('One or more skills contain invalid gibberish text.');
        } else {
          totalScore += 15;
          passedRules.push(`Core technical & soft skills validated (${skillsList.length} skills).`);
        }
      } else {
        failedRules.push('Add at least 3 core technical or soft skills.');
      }

      // EDUCATION AUDIT 
      if (education.length > 0) {
        let isValidEdu = true;

        education.forEach((edu) => {
          const deg = edu.degree || edu.degreeName || edu.title || '';
          const inst = edu.institution || edu.school || edu.university || '';

          if (!deg.trim() || !inst.trim() || isGibberish(deg) || isGibberish(inst)) {
            isValidEdu = false;
          }
        });

        if (isValidEdu) {
          totalScore += 20;
          passedRules.push('Educational degrees and institution names are valid.');
        } else {
          failedRules.push('Education section has incomplete or gibberish details.');
        }
      } else {
        failedRules.push('Missing Education background details.');
      }

      const calculatedScore = Math.min(100, totalScore);

      setAuditResult({
        totalScore: calculatedScore,
        passedRules,
        failedRules,
      });

      // Update ATS score 
      if (typeof setCvData === 'function') {
        setCvData((prev) => ({
          ...prev,
          atsScore: calculatedScore,
        }));
      }

      setIsAnalyzing(false);
      setHasAnalyzed(true);
    }, 400);
  };

  return (
    <div className="space-y-6 w-full text-[#f0f0f8] font-['DM_Sans',sans-serif]">
      
      {/* 1. Direct Scan Trigger */}
      <div className="p-6 bg-[#111118] border border-[#221c38] rounded-xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="flex items-center gap-2 text-base font-semibold text-white">
            <span>🛡️</span> Complete CV Quality & ATS Audit
          </h3>
          <p className="mt-1 text-xs text-gray-400">
            Real-time validation for text quality, formatting standards, action verbs, and section completeness.
          </p>
        </div>

        <button
          onClick={handleAuditCV}
          disabled={isAnalyzing}
          className="px-6 py-3 text-xs font-semibold bg-[#7c5cfc] hover:bg-[#6a4ae8] text-white rounded-lg transition cursor-pointer flex items-center gap-2 whitespace-nowrap shadow-lg shadow-[#7c5cfc]/20 disabled:opacity-50"
        >
          {isAnalyzing ? (
            <>
              <span className="w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin" />
              Auditing Full CV...
            </>
          ) : (
            <>
              <span>✦</span> Scan CV Authenticity & Rules
            </>
          )}
        </button>
      </div>

      {/* 2. Audit Output Section */}
      {hasAnalyzed && auditResult && (
        <div className="space-y-5 animate-fadeIn">
          
          {/* Health Score Overview */}
          <div className="p-6 bg-[#111118] border border-[#2a2a38] rounded-xl flex items-center justify-between">
            <div>
              <h4 className="text-lg font-bold text-white">CV Quality Score</h4>
              <p className="mt-1 text-xs text-gray-400">
                {auditResult.totalScore >= 80
                  ? '🟢 Excellent! Your CV is professional, valid, and ATS-ready.'
                  : auditResult.totalScore >= 50
                  ? '🟡 Moderate score. Address the flagged items below.'
                  : '🔴 High risk. Contains invalid text or missing essential sections.'}
              </p>
            </div>
            <div className="flex items-center justify-center w-20 h-20 rounded-full bg-[#09090d] border-4 border-[#7c5cfc] shadow-lg shadow-[#7c5cfc]/20">
              <span className="text-xl font-bold text-white">{auditResult.totalScore}%</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          
            <div className="p-4 bg-[#111118] border border-[#14291f] rounded-xl space-y-3">
              <h4 className="text-xs font-semibold text-[#4ade80] uppercase tracking-wider flex items-center gap-1.5">
                ✓ Passed Standards ({auditResult.passedRules.length})
              </h4>
              <ul className="space-y-2 text-xs text-gray-300">
                {auditResult.passedRules.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#4ade80] mt-0.5">•</span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>

           
            <div className="p-4 bg-[#111118] border border-[#381c21] rounded-xl space-y-3">
              <h4 className="text-xs font-semibold text-[#f87171] uppercase tracking-wider flex items-center gap-1.5">
                ✕ Action Items & Errors ({auditResult.failedRules.length})
              </h4>
              <ul className="space-y-2 text-xs text-gray-300">
                {auditResult.failedRules.length > 0 ? (
                  auditResult.failedRules.map((rule, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#f87171] mt-0.5">•</span>
                      <span>{rule}</span>
                    </li>
                  ))
                ) : (
                  <li className="text-xs text-gray-400">All checks passed without issues!</li>
                )}
              </ul>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default ATSScoreTab;