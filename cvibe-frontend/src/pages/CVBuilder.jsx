import axios from 'axios';
import html2pdf from 'html2pdf.js';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import CVPreview from '../components/CVPreview';
import CompletenessBar from '../components/CompletenessBar';

import Badge from '../components/UI/Badge';
import Input from '../components/UI/Input';

import ATSScoreTab from '../components/builder/ATSScoreTab';
import EducationTab from '../components/builder/EducationTab';
import ExperienceTab from '../components/builder/ExperienceTab';
import PersonalTab from '../components/builder/PersonalTab';
import SkillsTab from '../components/builder/SkillsTab';

import Toast from '../components/Toast';
import { createCV, getCVById, incrementAiUse, incrementDownloadCount, updateCV } from '../utils/cvApi';

export default function CVBuilder() {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  
  const [activeTab, setActiveTab] = useState('Personal'); 
  const [selectedTemplate, setSelectedTemplate] = useState('dark');
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  const hasTriggeredDownload = useRef(false);

  const [cvData, setCvData] = useState({
    title: 'My CV', 
    personalInfo: { 
      fullName: '', 
      name: '', 
      title: '', 
      jobTitle: '', 
      email: '', 
      phone: '', 
      location: '', 
      linkedin: '', 
      summary: '' 
    },
    education: [{ id: '1', institution: '', degree: '' }],
    experience: [{ id: '1', company: '', position: '', duration: '', description: '' }],
    skills: [], 
    certifications: '', 
    technicalSkills: '',
    softSkills: '',
    languages: '',
    aiUsed: false,
    aiUses: 0
  });

  useEffect(() => {
    const fetchCV = async () => {
      if (id) {
        try {
          const res = await getCVById(id);
          if (res.data?.success && res.data.cv) {
            const fetchedCv = res.data.cv;
            
            setCvData({
              ...fetchedCv,
              skills: Array.isArray(fetchedCv.skills) ? fetchedCv.skills : [],
              personalInfo: fetchedCv.personalInfo || {}
            });

            if (fetchedCv.template) {
              setSelectedTemplate(fetchedCv.template);
            }
          }
        } catch (err) {
          setToast({ message: 'Failed to load CV data.', type: 'error' });
        }
      }
    };
    fetchCV();
  }, [id]);

  // Handle opening specific tab passed via state from Quick Actions
  useEffect(() => {
    if (location.state?.openTab) {
      setActiveTab(location.state.openTab);
    }
  }, [location.state]);

  // Handle triggered download from Dashboard
  useEffect(() => {
    if (location.state?.triggerDownload && !hasTriggeredDownload.current) {
      hasTriggeredDownload.current = true;

      // Clear navigation state to prevent re-triggering on page refresh
      navigate(location.pathname, { replace: true, state: {} });

      // Small delay to ensure #cv-preview-content DOM element is fully rendered
      const timer = setTimeout(() => {
        handleDownloadPDF();
      }, 600);

      return () => clearTimeout(timer);
    }
  }, [location.state, id]);

  const tabs = ['Personal', 'Education', 'Experience', 'Skills', 'ATS Audit'];
  
  const templateOptions = [
    { id: 'dark', label: 'Dark' },
    { id: 'purple', label: 'Purple' },
    { id: 'red', label: 'Bold' }
  ];

  const baseBtnClass = "py-[10px] px-[22px] rounded-[8px] font-['DM_Sans',sans-serif] text-[14px] font-medium cursor-pointer transition-all duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] transform hover:scale-[1.04] active:scale-[0.96]";

  const saveCvToBackend = async (dataToSave) => {
    try {
      if (id) {
        await updateCV(id, { ...dataToSave, template: selectedTemplate });
      }
    } catch (err) {
      console.error("Auto-save failed:", err);
    }
  };

  const incrementAiUsage = async () => {
    setCvData((prev) => {
      const updated = {
        ...prev,
        aiUsed: true, 
        aiUses: (prev?.aiUses || 0) + 1 
      };
      
      saveCvToBackend(updated); 
      return updated;
    });

    if (id) {
      try {
        if (typeof incrementAiUse === 'function') {
          await incrementAiUse(id);
        } else {
          await axios.post(`/api/cvs/${id}/ai-use`);
        }
      } catch (err) {
        console.error("Failed to track AI usage on backend:", err);
      }
    }
  };

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

  const handleDownloadPDF = async () => {
    const element = document.getElementById('cv-preview-content');
    if (!element) {
      setToast({ message: 'Preview load failed!', type: 'error' });
      return;
    }

    const personName = (cvData?.personalInfo?.name || cvData?.personalInfo?.fullName)?.trim();
    const currentTitle = cvData?.title?.trim();
    const finalName = (personName || currentTitle || 'My_CV').replace(/\s+/g, '_');
    const defaultFilename = `${finalName}_CVibe.pdf`;

    const options = {
      margin: 0,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    };

    try {
      setToast({ message: 'Preparing PDF...', type: 'success' });

      if (window.showSaveFilePicker) {
        const handle = await window.showSaveFilePicker({
          suggestedName: defaultFilename,
          types: [{
            description: 'PDF Document',
            accept: { 'application/pdf': ['.pdf'] },
          }],
        });
        
        const pdfWorker = html2pdf().set(options).from(element).outputPdf('arraybuffer');
        const buffer = await pdfWorker;
        const writable = await handle.createWritable();
        await writable.write(buffer);
        await writable.close();
      } else {
        html2pdf().set({ ...options, filename: defaultFilename }).from(element).save();
      }

      setToast({ message: 'PDF downloaded successfully!', type: 'success' });

      let currentId = id;
      if (!currentId) {
        try {
          const res = await createCV({ ...cvData, template: selectedTemplate });
          if (res.data?.cv?._id) {
            currentId = res.data.cv._id;
            navigate(`/builder/${currentId}`, { replace: true });
          }
        } catch (saveErr) {
          console.error("Auto-save prior to download failed:", saveErr);
        }
      }

      if (currentId) {
        await incrementDownloadCount(currentId);
      }
    } catch (err) {
      if (err.name === 'AbortError') {
        console.log("User cancelled the save directory selection.");
      } else {
        console.error("Failed to download PDF:", err);
        setToast({ message: 'Download failed!', type: 'error' });
      }
    }
  };

  const handleDataChange = (update) => {
    if (typeof update === 'function') {
      setCvData((prev) => {
        const nextState = update(prev);
        return {
          ...nextState,
          skills: Array.isArray(nextState?.skills) ? nextState.skills : (prev.skills || [])
        };
      });
    } else {
      setCvData((prev) => ({
        ...prev,
        ...update,
        skills: Array.isArray(update?.skills) ? update.skills : (prev.skills || [])
      }));
    }
  };

  const renderTabContent = () => {
    const sharedProps = { 
      data: cvData, 
      onChange: handleDataChange, 
      cvData: cvData, 
      setCvData: handleDataChange, 
      incrementAiUsage: incrementAiUsage,
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
      case 'ATS Audit':
        return <ATSScoreTab {...sharedProps} />;
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
      
      {/* Navigation Bar */}
      <nav className="w-full bg-[#0a0a0f]/85 backdrop-blur-[16px] border-b border-[#2a2a38] py-[14px] px-6 sm:px-12 md:px-16 lg:px-24 flex items-center justify-between shrink-0 z-50">
        <div 
          onClick={() => navigate("/")}
          className="font-['Bebas_Neue',sans-serif] text-[28px] tracking-[2px] text-white cursor-pointer select-none leading-none mr-4"
        >
          CV<span className="text-[#7c5cfc]">ibe</span>
        </div>
        
        <div className="flex items-center gap-[12px] flex-1 justify-end">
          <div className="flex items-center bg-[#12121a] border border-[#2a2a38] rounded-md px-3 py-1.5 focus-within:border-[#7c5cfc] transition max-w-[200px] sm:max-w-[260px]">
            <span className="text-[12px] text-[#7070a0] font-medium mr-2 font-['DM_Sans',sans-serif] select-none">Title:</span>
            <input 
              type="text"
              value={cvData.title || ''}
              onChange={(e) => setCvData(prev => ({ ...prev, title: e.target.value }))}
              className="bg-transparent text-[13px] font-medium text-white focus:outline-none w-full font-['DM_Sans',sans-serif]"
              placeholder="Enter CV Title"
            />
          </div>
          
          <button 
            onClick={handleSave}
            disabled={saving}
            className={`${baseBtnClass} bg-[#7c5cfc] hover:bg-[#694bd9] text-white disabled:opacity-50`}
          >
            {saving ? 'Saving...' : 'Save CV'}
          </button>

          <button 
            onClick={handleDownloadPDF}
            className={`${baseBtnClass} bg-[#ff4a7a] hover:bg-[#e03b68] text-white shadow-lg shadow-[#ff4a7a]/10 flex items-center gap-2`}
          >
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

      {/* Builder Core Area */}
      <div className="flex flex-col flex-1 w-full px-6 pt-4 pb-6 overflow-hidden sm:px-12 md:px-16 lg:px-24">
        <div className="flex flex-col md:flex-row w-full h-full overflow-hidden border border-[#2a2a38] bg-[#0f0f15] rounded-xl shadow-2xl">
          
          {/* Form / Edit Section */}
          <div className="w-full md:w-1/2 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#2a2a38] bg-[#0f0f15] h-[50vh] md:h-full overflow-y-auto p-5 md:p-6 scrollbar-none relative">
            
            <div className="pb-24">
              {/* Tab Navigation */}
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

              {/* Active Tab View */}
              <div className="animate-fade-in">
                {renderTabContent()}
              </div>

              <CompletenessBar data={cvData} />
            </div>

            {/* Bottom Controls */}
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
                onClick={activeTab === 'ATS Audit' ? handleSave : handleNext}
              >
                {activeTab === 'ATS Audit' ? 'Finish & Save' : 'Next →'}
              </button>
            </div>
          </div>

          {/* Live Preview Section */}
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
                <div id="cv-preview-content">
                  <CVPreview data={cvData} template={selectedTemplate} />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Toast Notification */}
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