import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import CVPreview from '../components/CVPreview';
import CompletenessBar from '../components/CompletenessBar';

import Badge from '../components/UI/Badge';
import Input from '../components/UI/Input';

import AIToolsTab from '../components/builder/AIToolsTab';
import EducationTab from '../components/builder/EducationTab';
import ExperienceTab from '../components/builder/ExperienceTab';
import PersonalTab from '../components/builder/PersonalTab';
import SkillsTab from '../components/builder/SkillsTab';

import Toast from '../components/Toast';
import { createCV, getCVById, updateCV } from '../utils/cvApi';

export default function CVBuilder() {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [activeTab, setActiveTab] = useState('Personal'); 
  const [selectedTemplate, setSelectedTemplate] = useState('dark');
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  const [cvData, setCvData] = useState({
    title: 'My CV',
    personalInfo: { 
      name: '', 
      title: '', 
      email: '', 
      phone: '', 
      location: '', 
      linkedin: '', 
      summary: '' 
    },
    education: [{ id: '1', institution: '', degree: '' }],
    experience: [{ id: '1', company: '', position: '', duration: '' }],
    skills: [],
    certifications: '', 
    technicalSkills: '',
    softSkills: '',
    languages: ''
  });

  useEffect(() => {
    const fetchCV = async () => {
      if (id) {
        try {
          const res = await getCVById(id);
          if (res.data?.success && res.data.cv) {
            setCvData(res.data.cv);
            if (res.data.cv.template) {
              setSelectedTemplate(res.data.cv.template);
            }
          }
        } catch (err) {
          setToast({ message: 'Failed to load CV data.', type: 'error' });
        }
      }
    };
    fetchCV();
  }, [id]);

  const tabs = ['Personal', 'Education', 'Experience', 'Skills', 'AI Tools'];
  
  const templateOptions = [
    { id: 'dark', label: 'Dark' },
    { id: 'purple', label: 'Purple' },
    { id: 'red', label: 'Bold' }
  ];

  const baseBtnClass = "py-[10px] px-[22px] rounded-[8px] font-['DM_Sans',sans-serif] text-[14px] font-medium cursor-pointer transition-all duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] transform hover:scale-[1.04] active:scale-[0.96]";

  const handleSave = async () => {
    setSaving(true);
    try {
      if (id) {
        await updateCV(id, { ...cvData, template: selectedTemplate });
        setToast({ message: 'CV updated successfully!', type: 'success' });
      } else {
        const res = await createCV({ ...cvData, template: selectedTemplate });
        if (res.data?.cv?._id) {
          setToast({ message: 'CV saved successfully!', type: 'success' });
          navigate(`/builder/${res.data.cv._id}`, { replace: true });
        }
      }
    } catch (err) {
      setToast({ message: 'Save failed! Try again.', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const handleDataChange = (update) => {
    if (typeof update === 'function') {
      setCvData((prev) => {
        const nextState = update(prev);
        return { ...nextState };
      });
    } else {
      setCvData({ ...update });
    }
  };

  const renderTabContent = () => {
    const sharedProps = { 
      data: cvData, 
      onChange: handleDataChange, 
      cvData: cvData, 
      setCvData: handleDataChange, 
      Input, 
      Badge 
    };

    switch (activeTab) {
      case 'Personal':
        return <PersonalTab {...sharedProps} />;
      case 'Education':
        return <EducationTab {...sharedProps} />;
      case 'Experience':
        return <ExperienceTab {...sharedProps} />;
      case 'Skills':
        return <SkillsTab {...sharedProps} />; 
      case 'AI Tools':
        return <AIToolsTab {...sharedProps} />;
      default:
        return <PersonalTab {...sharedProps} />;
    }
  };

  const handleNext = () => {
    const currentIndex = tabs.indexOf(activeTab);
    if (currentIndex < tabs.length - 1) setActiveTab(tabs[currentIndex + 1]);
  };

  const handleBack = () => {
    const currentIndex = tabs.indexOf(activeTab);
    if (currentIndex > 0) setActiveTab(tabs[currentIndex - 1]);
  };

  return (
    <div className="flex flex-col h-screen max-h-screen bg-[#0a0a0f] text-[#f0f0f8] overflow-hidden antialiased">
      
      <nav className="w-full bg-[#0a0a0f]/85 backdrop-blur-[16px] border-b border-[#2a2a38] py-[18px] px-6 sm:px-12 md:px-16 lg:px-24 flex items-center justify-between shrink-0 z-50">
        <div 
          onClick={() => navigate("/")}
          className="font-['Bebas_Neue',sans-serif] text-[28px] tracking-[2px] text-white cursor-pointer select-none leading-none"
        >
          CV<span className="text-[#7c5cfc]">ibe</span>
        </div>
        
        <div className="flex items-center gap-[10px]">
          <span className="text-[14px] font-medium text-[#7070a0] hidden sm:inline font-['DM_Sans',sans-serif] mr-2">
            Editing: {cvData.title}
          </span>
          
          <button 
            onClick={handleSave}
            disabled={saving}
            className={`${baseBtnClass} bg-[#7c5cfc] hover:bg-[#694bd9] text-white disabled:opacity-50`}
          >
            {saving ? 'Saving...' : 'Save CV'}
          </button>

          <button className={`${baseBtnClass} bg-[#ff4a7a] hover:bg-[#e03b68] text-white shadow-lg shadow-[#ff4a7a]/10 flex items-center gap-2`}>
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
            </svg>
            Download PDF
          </button>
          
          <button 
            onClick={() => navigate("/dashboard")}
            className={`${baseBtnClass} bg-transparent text-[#7070a0] border border-[#2a2a38] hover:border-[#7c5cfc] hover:text-white`}
          >
            ← Dashboard
          </button>
        </div>
      </nav>

      <div className="flex flex-col flex-1 w-full px-6 pt-4 pb-6 overflow-hidden sm:px-12 md:px-16 lg:px-24">
        <div className="flex flex-col md:flex-row w-full h-full overflow-hidden border border-[#2a2a38] bg-[#0f0f15] rounded-xl shadow-2xl">
          
          <div className="w-full md:w-1/2 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#2a2a38] bg-[#0f0f15] h-[50vh] md:h-full overflow-y-auto p-5 md:p-6 scrollbar-none relative">
            
            <div className="pb-24">
              <div className="flex bg-[#161622] p-1 rounded-lg border border-[#2a2a38] gap-1 mb-6 w-full overflow-x-auto scrollbar-none shrink-0">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 min-w-[95px] py-2.5 text-[13px] font-medium rounded-md transition duration-200 cursor-pointer text-center font-['DM_Sans',sans-serif] ${
                      activeTab === tab
                        ? 'bg-[#7c5cfc] text-white shadow-md'
                        : 'text-gray-400 hover:text-gray-200 hover:bg-[#1c1c2b]'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="animate-fade-in">
                {renderTabContent()}
              </div>

              <CompletenessBar data={cvData} />
            </div>

            <div className="flex items-center justify-between pt-4 pb-2 border-t border-[#2a2a38] shrink-0 bg-[#0f0f15] sticky bottom-0 left-0 right-0 z-10">
              <button 
                type="button"
                onClick={handleBack}
                disabled={activeTab === 'Personal'}
                className="px-4 py-2 text-xs font-medium text-gray-400 transition cursor-pointer hover:text-gray-200 disabled:opacity-40"
              >
                ← Back
              </button>
              <button 
                type="button"
                className="px-5 py-2 bg-[#7c5cfc] hover:bg-[#694bd9] text-white text-xs font-medium rounded-lg transition cursor-pointer"
                onClick={activeTab === 'AI Tools' ? handleSave : handleNext}
              >
                {activeTab === 'AI Tools' ? 'Finish & Save' : 'Next →'}
              </button>
            </div>
          </div>

          <div className="w-full md:w-1/2 flex flex-col bg-[#050508] h-[50vh] md:h-full p-6 md:p-8 md:overflow-hidden">
            <div className="flex flex-col gap-3 mb-4 shrink-0">
              <span className="text-[11px] font-bold tracking-wider text-[#505070] uppercase font-['DM_Sans',sans-serif]">
                LIVE PREVIEW
              </span>
              <div className="flex items-center gap-2">
                {templateOptions.map((tmpl) => (
                  <button
                    key={tmpl.id}
                    type="button"
                    onClick={() => setSelectedTemplate(tmpl.id)}
                    className={`px-4 py-1.5 text-[12px] font-medium rounded-full transition duration-150 cursor-pointer ${
                      selectedTemplate === tmpl.id
                        ? 'bg-[#7c5cfc] text-white shadow-sm'
                        : 'bg-[#12121a] text-[#7070a0] hover:text-gray-200 border border-[#2a2a38]'
                    }`}
                  >
                    {tmpl.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-1 w-full overflow-y-auto bg-[#050508] flex justify-center items-start scrollbar-none py-2">
              <div className="w-full max-w-[620px] aspect-[1/1.414] shadow-2xl rounded-2xl overflow-hidden bg-white text-black shrink-0">
                <CVPreview data={cvData} template={selectedTemplate} />
              </div>
            </div>
          </div>

        </div>
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

    </div>
  );
}