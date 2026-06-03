import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import CertsTab from '../components/builder/CertsTab';
import EducationTab from '../components/builder/EducationTab';
import ExperienceTab from '../components/builder/ExperienceTab';
import PersonalTab from '../components/builder/PersonalTab';
import SkillsTab from '../components/builder/SkillsTab';

import { createCV, getCVById, updateCV } from '../utils/cvApi';

const defaultCV = {
  title: 'My CV',
  personalInfo: {
    name: '',
    title: '',
    email: '',
    phone: '',
    location: '',
    summary: ''
  },
  experience: [],
  education: [],
  skills: [],
  certifications: [],
};

const CVBuilder = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [cvData, setCvData] = useState(defaultCV);
  const [activeTab, setActiveTab] = useState('personal');
  const [selectedTemplate, setSelectedTemplate] = useState('classic'); // 'classic', 'modern', 'executive'
  const [viewMode, setViewMode] = useState('edit'); // Mobile toggle: 'edit' or 'preview'
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (id) {
      getCVById(id).then((res) => {
        const fetchedData = res.data.cv;
        setCvData({
          ...defaultCV,
          ...fetchedData,
          personalInfo: { ...defaultCV.personalInfo, ...fetchedData?.personalInfo }
        });
      });
    }
  }, [id]);

  const handleSave = async () => {
    setSaving(true);
    try {
      if (id) {
        await updateCV(id, cvData);
      } else {
        const res = await createCV(cvData);
        navigate(`/builder/${res.data.cv._id}`, { replace: true });
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      alert('Save Failed!');
    } finally {
      setSaving(false);
    }
  };

  const tabConfig = [
    { id: 'personal', label: 'Personal' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'skills', label: 'Skills' },
    { id: 'certs', label: 'Certs' },
  ];

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case 'personal': return <PersonalTab data={cvData} onChange={setCvData} />;
      case 'experience': return <ExperienceTab data={cvData} onChange={setCvData} />;
      case 'education': return <EducationTab data={cvData} onChange={setCvData} />;
      case 'skills': return <SkillsTab data={cvData} onChange={setCvData} />;
      case 'certs': return <CertsTab data={cvData} onChange={setCvData} />;
      default: return <PersonalTab data={cvData} onChange={setCvData} />;
    }
  };

  // ==========================================================
  // ATS-FRIENDLY, REAL-LIFE JOB CV LAYOUTS (PURE WHITE SHEETS)
  // ==========================================================

  // 1. CLASSIC LAYOUT (Standard Ivy League / Finance & Corporate Tradition)
  const RenderClassicTemplate = () => (
    <div className="font-serif text-slate-900 text-left space-y-4 text-[11px]">
      {/* Centered Traditional Header */}
      <div className="text-center space-y-0.5">
        <h2 className="text-xl font-bold tracking-tight text-black uppercase">
          {cvData.personalInfo?.name || 'YOUR FULL NAME'}
        </h2>
        <p className="text-[11px] font-medium tracking-wide text-slate-700 italic">
          {cvData.personalInfo?.title || 'Target Job Title / Domain'}
        </p>
        <p className="text-[10px] text-slate-600 space-x-1.5">
          {[cvData.personalInfo?.email, cvData.personalInfo?.phone, cvData.personalInfo?.location]
            .filter(Boolean)
            .join('  •  ')}
        </p>
      </div>

      {/* Summary */}
      {cvData.personalInfo?.summary && (
        <div className="space-y-1">
          <h3 className="text-[11px] font-bold tracking-wider uppercase border-b border-slate-400 text-black">Professional Summary</h3>
          <p className="leading-normal text-justify text-slate-700">{cvData.personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {cvData.experience?.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-[11px] font-bold tracking-wider uppercase border-b border-slate-400 text-black">Professional Experience</h3>
          <div className="space-y-2.5">
            {cvData.experience.map((exp, i) => (
              <div key={i} className="space-y-0.5">
                <div className="flex justify-between font-bold text-black">
                  <span>{exp.position || 'Position Title'} {exp.company ? `| ${exp.company}` : ''}</span>
                  <span className="italic font-normal text-slate-600">{exp.duration || 'Dates'}</span>
                </div>
                <p className="leading-normal text-justify whitespace-pre-line text-slate-700">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {cvData.education?.length > 0 && (
        <div className="space-y-1.5">
          <h3 className="text-[11px] font-bold tracking-wider uppercase border-b border-slate-400 text-black">Education</h3>
          {cvData.education.map((edu, i) => (
            <div key={i} className="flex items-start justify-between">
              <div>
                <span className="font-bold text-black">{edu.degree || 'Degree Details'}</span>
                <span className="block text-slate-700">{edu.school || 'University / Institution'}</span>
              </div>
              <span className="italic text-slate-600">{edu.year || edu.duration}</span>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {cvData.skills?.length > 0 && (
        <div className="space-y-1">
          <h3 className="text-[11px] font-bold tracking-wider uppercase border-b border-slate-400 text-black">Core Competencies</h3>
          <p className="leading-normal text-slate-700">
            {cvData.skills.map((s) => (typeof s === 'string' ? s : s.name)).join(', ')}
          </p>
        </div>
      )}

      {/* Certifications */}
      {cvData.certifications?.length > 0 && (
        <div className="space-y-1">
          <h3 className="text-[11px] font-bold tracking-wider uppercase border-b border-slate-400 text-black">Certifications</h3>
          <ul className="list-disc pl-4 text-slate-700 space-y-0.5">
            {cvData.certifications.map((cert, i) => (
              <li key={i}>
                <span className="font-semibold text-black">{cert.name}</span> — {cert.issuer} <span className="italic text-slate-500">({cert.date || cert.year})</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  // 2. MODERN LINEAR LAYOUT (Tech, Startup & ATS-Optimized Clean Alignment)
  const RenderModernTemplate = () => (
    <div className="font-sans text-slate-900 text-left space-y-4 text-[11px]">
      {/* Left-Aligned Clean Metadata Block */}
      <div className="flex items-start justify-between pb-2 border-b-2 border-slate-900">
        <div>
          <h2 className="text-2xl font-black tracking-tight uppercase text-slate-900">
            {cvData.personalInfo?.name || 'YOUR FULL NAME'}
          </h2>
          <p className="text-xs font-bold text-slate-600 mt-0.5 tracking-wide">
            {cvData.personalInfo?.title || 'Professional Title'}
          </p>
        </div>
        <div className="text-[10px] text-slate-600 text-right space-y-0.5">
          {cvData.personalInfo?.email && <p className="font-medium">{cvData.personalInfo.email}</p>}
          {cvData.personalInfo?.phone && <p>{cvData.personalInfo.phone}</p>}
          {cvData.personalInfo?.location && <p>{cvData.personalInfo.location}</p>}
        </div>
      </div>

      {/* Summary */}
      {cvData.personalInfo?.summary && (
        <div className="space-y-1">
          <h3 className="text-[10px] font-extrabold uppercase tracking-widest text-slate-900">Profile Summary</h3>
          <p className="leading-relaxed text-justify text-slate-600">{cvData.personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {cvData.experience?.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-[10px] font-extrabold uppercase tracking-widest text-slate-900">Professional Experience</h3>
          <div className="space-y-3">
            {cvData.experience.map((exp, i) => (
              <div key={i} className="space-y-0.5">
                <div className="flex items-baseline justify-between">
                  <h4 className="font-bold text-slate-900 text-[11px]">
                    {exp.position} <span className="font-normal text-slate-500">at {exp.company}</span>
                  </h4>
                  <span className="text-[10px] text-slate-500 font-medium whitespace-nowrap">{exp.duration}</span>
                </div>
                <p className="leading-relaxed whitespace-pre-line text-slate-600">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {cvData.education?.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-[10px] font-extrabold uppercase tracking-widest text-slate-900">Education</h3>
          <div className="space-y-2">
            {cvData.education.map((edu, i) => (
              <div key={i} className="flex items-baseline justify-between">
                <div>
                  <h4 className="font-bold text-slate-900">{edu.degree}</h4>
                  <p className="text-slate-600">{edu.school}</p>
                </div>
                <span className="text-[10px] text-slate-500 whitespace-nowrap">{edu.year || edu.duration}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {cvData.skills?.length > 0 && (
        <div className="space-y-1">
          <h3 className="text-[10px] font-extrabold uppercase tracking-widest text-slate-900">Technical Skills</h3>
          <p className="font-medium leading-relaxed text-slate-600">
            {cvData.skills.map((s) => (typeof s === 'string' ? s : s.name)).join('   |   ')}
          </p>
        </div>
      )}
    </div>
  );

  // 3. EXECUTIVE LAYOUT (Bold Left-Accent System for High-Level Applications)
  const RenderExecutiveTemplate = () => (
    <div className="font-sans text-slate-900 text-left space-y-4 text-[11px]">
      {/* Structural Minimalist Row */}
      <div className="py-1 pl-4 border-l-4 border-slate-800">
        <h2 className="text-2xl font-bold tracking-tight uppercase text-slate-900">{cvData.personalInfo?.name || 'YOUR FULL NAME'}</h2>
        <p className="text-xs font-semibold text-slate-600 mt-0.5 tracking-wide">{cvData.personalInfo?.title || 'Executive Lead'}</p>
        <div className="text-[10px] text-slate-500 mt-1 flex flex-wrap gap-x-4">
          {cvData.personalInfo?.email && <span>{cvData.personalInfo.email}</span>}
          {cvData.personalInfo?.phone && <span>{cvData.personalInfo.phone}</span>}
          {cvData.personalInfo?.location && <span>{cvData.personalInfo.location}</span>}
        </div>
      </div>

      {cvData.personalInfo?.summary && (
        <div className="space-y-1">
          <h3 className="text-[10px] font-bold text-slate-900 uppercase tracking-wider bg-slate-100 px-2 py-0.5">Executive Expertise Statement</h3>
          <p className="px-2 leading-relaxed text-justify text-slate-600">{cvData.personalInfo.summary}</p>
        </div>
      )}

      {cvData.experience?.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-[10px] font-bold text-slate-900 uppercase tracking-wider bg-slate-100 px-2 py-0.5">Employment History</h3>
          <div className="space-y-2.5 px-2">
            {cvData.experience.map((exp, i) => (
              <div key={i} className="space-y-0.5">
                <div className="flex items-center justify-between font-bold text-slate-900">
                  <span>{exp.position} <span className="font-normal text-slate-500">— {exp.company}</span></span>
                  <span className="text-[10px] text-slate-500 font-normal">{exp.duration}</span>
                </div>
                <p className="leading-relaxed whitespace-pre-line text-slate-600">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {cvData.education?.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-[10px] font-bold text-slate-900 uppercase tracking-wider bg-slate-100 px-2 py-0.5">Education & Qualifications</h3>
          <div className="space-y-1.5 px-2">
            {cvData.education.map((edu, i) => (
              <div key={i} className="flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900">{edu.degree}</span>
                  <span className="text-slate-600 block text-[10px]">{edu.school}</span>
                </div>
                <span className="text-[10px] text-slate-500">{edu.year || edu.duration}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {cvData.skills?.length > 0 && (
        <div className="space-y-1">
          <h3 className="text-[10px] font-bold text-slate-900 uppercase tracking-wider bg-slate-100 px-2 py-0.5">Core Matrix Expertise</h3>
          <p className="text-slate-600 leading-relaxed font-medium px-2 pt-0.5">
            {cvData.skills.map((s) => (typeof s === 'string' ? s : s.name)).join(', ')}
          </p>
        </div>
      )}
    </div>
  );

  return (
    <div className="flex flex-col h-screen bg-[#0a0a0f] text-[#f0f0f8] overflow-hidden">
      
      {/* STABLE FIXED VIEWPORT NAVIGATION HEADER */}
      <div className="w-full h-16 border-b border-[#2a2a38] bg-[#0f0f15] z-50 flex shrink-0 items-center">
        <div className="flex items-center justify-between w-full max-w-[1600px] px-4 md:px-8 mx-auto">
          <h1 className="text-lg font-semibold tracking-wide text-white">CVBuilder</h1>
          
          {/* Responsive View Switcher for Handheld screens */}
          <div className="flex md:hidden bg-[#161622] p-1 rounded-lg border border-[#2a2a38]">
            <button
              onClick={() => setViewMode('edit')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition ${viewMode === 'edit' ? 'bg-[#7c5cfc] text-white' : 'text-gray-400'}`}
            >
              Form Editor
            </button>
            <button
              onClick={() => setViewMode('preview')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition ${viewMode === 'preview' ? 'bg-[#7c5cfc] text-white' : 'text-gray-400'}`}
            >
              Paper View
            </button>
          </div>

          {/* PERMANENT WORKING SAVE TRIGGER */}
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-5 py-2 text-sm font-semibold text-white bg-[#7c5cfc] hover:bg-[#6b4ae6] rounded-xl disabled:opacity-50 transition-all duration-200 cursor-pointer shadow-lg shadow-[#7c5cfc]/20"
          >
            {saving ? 'Saving...' : saved ? '✓ Saved Successfully' : 'Save CV'}
          </button>
        </div>
      </div>

      {/* FULL RESPONSIVE DUAL COLUMN CONTROL LAYOUT */}
      <div className="flex flex-1 w-full max-w-[1600px] mx-auto overflow-hidden p-4 md:p-6 gap-4">
        <div className="flex w-full overflow-hidden border border-[#2a2a38] rounded-xl bg-[#0f0f15]">
          
          {/* CONTENT INTAKE COMPONENT PANEL */}
          <div className={`flex flex-col w-full md:w-1/2 border-r border-[#2a2a38] overflow-hidden ${viewMode === 'edit' ? 'flex' : 'hidden md:flex'}`}>
            <div className="flex overflow-x-auto border-b border-[#2a2a38] bg-[#111118] shrink-0 scrollbar-none">
              {tabConfig.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-5 py-3 text-sm font-medium whitespace-nowrap transition-all duration-150 cursor-pointer ${
                    activeTab === tab.id
                      ? 'text-[#7c5cfc] border-b-2 border-[#7c5cfc] bg-[#14141f]'
                      : 'text-gray-400 hover:text-gray-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="flex-1 p-5 overflow-y-auto">
              {renderActiveTabContent()}
            </div>
          </div>

          {/* HIGH FIDELITY PURE WHITE PAPER SIMULATION FRAME */}
          <div className={`w-full md:w-1/2 flex flex-col bg-[#050508] overflow-hidden ${viewMode === 'preview' ? 'flex' : 'hidden md:flex'}`}>
            
            {/* Real-time Document Alignment Bar */}
            <div className="flex flex-wrap items-center justify-between px-4 py-3 border-b border-[#2a2a38] bg-[#0d0d14] gap-2 shrink-0">
              <span className="text-xs font-semibold tracking-wider text-gray-400 uppercase">ATS Structure Type</span>
              <div className="flex bg-[#161622] p-1 rounded-lg border border-[#2a2a38] gap-1">
                <button
                  onClick={() => setSelectedTemplate('classic')}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition cursor-pointer ${selectedTemplate === 'classic' ? 'bg-[#7c5cfc] text-white shadow' : 'text-gray-400 hover:text-gray-200'}`}
                >
                  Classic
                </button>
                <button
                  onClick={() => setSelectedTemplate('modern')}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition cursor-pointer ${selectedTemplate === 'modern' ? 'bg-[#7c5cfc] text-white shadow' : 'text-gray-400 hover:text-gray-200'}`}
                >
                  Modern
                </button>
                <button
                  onClick={() => setSelectedTemplate('executive')}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition cursor-pointer ${selectedTemplate === 'executive' ? 'bg-[#7c5cfc] text-white shadow' : 'text-gray-400 hover:text-gray-200'}`}
                >
                  Executive
                </button>
              </div>
            </div>

            {/* Simulated Clean Document Boundaries */}
            <div className="flex-1 p-4 md:p-8 overflow-y-auto bg-[#0a0a0f] flex justify-center items-start">
              <div className="w-full max-w-[600px] bg-white text-slate-900 shadow-[0_0_50px_rgba(0,0,0,0.8)] rounded-xs p-8 sm:p-12 min-h-[780px] transition-all duration-150 overflow-hidden">
                {selectedTemplate === 'classic' && <RenderClassicTemplate />}
                {selectedTemplate === 'modern' && <RenderModernTemplate />}
                {selectedTemplate === 'executive' && <RenderExecutiveTemplate />}
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default CVBuilder;