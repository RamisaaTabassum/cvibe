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
      case 'personal':
        return <PersonalTab data={cvData} onChange={setCvData} />;
      case 'experience':
        return <ExperienceTab data={cvData} onChange={setCvData} />;
      case 'education':
        return <EducationTab data={cvData} onChange={setCvData} />;
      case 'skills':
        return <SkillsTab data={cvData} onChange={setCvData} />;
      case 'certs':
        return <CertsTab data={cvData} onChange={setCvData} />;
      default:
        return <PersonalTab data={cvData} onChange={setCvData} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0f] text-[#f0f0f8]">

      {/* TOP NAV - MATCHING MAIN NAVBAR MARGIN & COLOR */}
      <div className="w-full border-b border-[#2a2a38] bg-[#0f0f15]/80 backdrop-blur-md">
        <div className="flex items-center justify-between max-w-6xl px-6 py-4 mx-auto md:px-12">
          <h1 className="text-lg font-semibold tracking-wide text-white">CVBuilder</h1>

          <button
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-2 text-sm font-medium text-white bg-[#7c5cfc] hover:bg-[#6b4ae6] rounded-lg disabled:opacity-50 transition-all duration-200"
          >
            {saving ? 'Saving...' : saved ? '✓ Saved!' : 'Save CV'}
          </button>
        </div>
      </div>

      {/* BODY CONTAINER - ALIGNED WITH THE LANDING PAGE CONTENT WIDTH */}
      <div className="flex flex-1 w-full max-w-6xl px-6 py-8 mx-auto overflow-hidden md:px-12">
        
        {/* INNER WRAPPER TO LOCK GRID ASYMMETRY */}
        <div className="flex w-full overflow-hidden border border-gray-800 rounded-xl bg-[#0f0f15]">
          
          {/* LEFT SIDE FORM FIELDS */}
          <div className="flex flex-col w-full border-r border-gray-800 md:w-1/2">
            {/* TABS HEADER CONTROL */}
            <div className="flex overflow-x-auto border-b border-gray-800 bg-[#111118]">
              {tabConfig.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-5 py-3 text-sm font-medium whitespace-nowrap transition-all duration-150 ${
                    activeTab === tab.id
                      ? 'text-purple-400 border-b-2 border-purple-500 bg-[#14141f]'
                      : 'text-gray-400 hover:text-gray-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* ACTIVE TAB COMPONENT CONTENT */}
            <div className="flex-1 p-6 overflow-y-auto">
              {renderActiveTabContent()}
            </div>
          </div>

          {/* RIGHT LIVE PREVIEW WINDOW */}
          <div className="hidden w-1/2 p-6 overflow-y-auto md:flex items-start justify-center bg-[#0a0a0f]">
            {/* Real-time Document Card */}
            <div className="w-full max-w-md p-6 border border-gray-800 rounded-xl bg-[#111118] space-y-4 shadow-2xl">
              
              {/* Personal Details Snapshot */}
              <div>
                <h2 className="text-xl font-bold tracking-wide text-white break-words">
                  {cvData.personalInfo?.name || 'Your Name'}
                </h2>
                <p className="text-xs font-medium text-purple-300 mt-0.5">
                  {cvData.personalInfo?.title || 'Professional Title'}
                </p>
                <p className="mt-1.5 text-[11px] text-gray-400 leading-relaxed">
                  {[cvData.personalInfo?.email, cvData.personalInfo?.phone, cvData.personalInfo?.location]
                    .filter(Boolean)
                    .join(' · ')}
                </p>
                {cvData.personalInfo?.summary && (
                  <p className="mt-3 text-[11px] text-gray-300 border-t border-gray-800 pt-2 leading-relaxed break-words">
                    {cvData.personalInfo.summary}
                  </p>
                )}
              </div>

              {/* Dynamic Real-time Experience List Mapping */}
              {cvData.experience?.length > 0 && (
                <div className="pt-3 border-t border-gray-800">
                  <h3 className="text-[10px] font-bold text-purple-400 tracking-wider uppercase mb-2">Experience</h3>
                  <div className="space-y-3">
                    {cvData.experience.map((exp, index) => (
                      <div key={exp.id || index} className="text-[11px] break-words">
                        <div className="flex flex-wrap justify-between font-semibold text-gray-200 gap-1 mb-0.5">
                          <span>
                            {exp.position || 'Position'}{' '}
                            {exp.company ? `@ ${exp.company}` : ''}
                          </span>
                          <span className="font-normal text-gray-500">{exp.duration}</span>
                        </div>
                        <p className="leading-relaxed text-gray-400">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default CVBuilder;