import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Core layout and structural framework components
import CVBuilderLayout from '../components/CVBuilderLayout';
import CVPreview from '../components/CVPreview';

// Reusable atom UI elements
import Badge from '../components/UI/Badge';
import Input from '../components/UI/Input';

// Fixed paths for builder tab workspace panels
import AIToolsTab from '../components/builder/AIToolsTab';
import CertsTab from '../components/builder/CertsTab'; // FIX: CertificationsTab থেকে CertsTab-এ পরিবর্তন করা হয়েছে
import EducationTab from '../components/builder/EducationTab';
import ExperienceTab from '../components/builder/ExperienceTab';
import PersonalTab from '../components/builder/PersonalTab';
import SkillsTab from '../components/builder/SkillsTab';

export default function CVBuilder() {
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('Personal'); 
  const [selectedTemplate, setSelectedTemplate] = useState('dark');

  const [cvData, setCvData] = useState({
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
    technicalSkills: '',
    softSkills: '',
    languages: '',
    certifications: ''
  });

  const tabs = ['Personal', 'Education', 'Experience', 'Skills', 'Certifications', 'AI Tools'];
  const baseBtnClass = "py-[10px] px-[22px] rounded-[8px] font-['DM_Sans',sans-serif] text-[14px] font-medium cursor-pointer transition-all duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] transform hover:scale-[1.04] active:scale-[0.96]";

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Personal':
        return <PersonalTab cvData={cvData} setCvData={setCvData} Input={Input} Badge={Badge} />;
      case 'Education':
        return <EducationTab data={cvData} onChange={setCvData} />;
      case 'Experience':
        return <ExperienceTab data={cvData} onChange={setCvData} />;
      case 'Skills':
        return <SkillsTab data={cvData} onChange={setCvData} />;
      case 'Certifications':
        return <CertsTab data={cvData} onChange={setCvData} />; // FIX: <CertsTab /> রেন্ডার করা হচ্ছে
      case 'AI Tools':
        return <AIToolsTab data={cvData} onChange={setCvData} />;
      default:
        return <PersonalTab cvData={cvData} setCvData={setCvData} Input={Input} Badge={Badge} />;
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
    <div className="flex flex-col h-screen bg-[#0a0a0f] text-[#f0f0f8] overflow-hidden antialiased">
      
      {/* Top Navbar */}
      <nav className="w-full bg-[#0a0a0f]/85 backdrop-blur-[16px] border-b border-[#2a2a38] py-[18px] px-6 sm:px-12 md:px-16 lg:px-24 flex items-center justify-between shrink-0 z-50">
        <div 
          onClick={() => navigate("/")}
          className="font-['Bebas_Neue',sans-serif] text-[28px] tracking-[2px] text-white cursor-pointer select-none leading-none"
        >
          CV<span className="text-[#7c5cfc]">ibe</span>
        </div>
        
        <div className="flex items-center gap-[10px]">
          <span className="text-[14px] font-medium text-[#7070a0] hidden sm:inline font-['DM_Sans',sans-serif] mr-2">
            Editing: My CV
          </span>
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

      {/* Main Framework Workspace Wrapper */}
      <CVBuilderLayout>
        <div className="flex flex-col md:flex-row w-full h-full overflow-hidden border border-[#2a2a38] bg-[#0a0a0f] m-0">
          
          {/* Left Panel */}
          <div className="w-full md:w-1/2 flex flex-col justify-between border-r border-[#2a2a38] bg-[#0f0f15] overflow-y-auto p-5 md:p-6 scrollbar-none">
            <div>
              <div className="flex bg-[#161622] p-1 rounded-lg border border-[#2a2a38] gap-1 mb-6 w-full overflow-x-auto scrollbar-none">
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

              {/* Completeness Card */}
              <div className="mt-8 p-5 bg-[#12121a] border border-[#222233] rounded-xl">
                <div className="flex items-center justify-between text-xs font-bold tracking-wide text-gray-400 mb-2.5 font-['DM_Sans',sans-serif]">
                  <span>CV Completeness</span>
                  <span className="text-[#4ade80]">25%</span>
                </div>
                <div className="w-full h-1.5 bg-[#1c1c2b] rounded-full overflow-hidden">
                  <div className="h-full bg-[#4ade80] rounded-full transition-all duration-500" style={{ width: '25%' }}></div>
                </div>
                <div className="mt-4 space-y-2 text-[12px] text-gray-400 font-['DM_Sans',sans-serif]">
                  <div className="flex items-center gap-2 text-gray-500">⚪ Add your name</div>
                  <div className="flex items-center gap-2 text-[#4ade80] font-medium">✓ Add education</div>
                  <div className="flex items-center gap-2 text-gray-500">⚪ Add skills</div>
                  <div className="flex items-center gap-2 text-gray-500">⚪ Add a summary</div>
                </div>
              </div>
            </div>

            {/* Step Control Buttons */}
            <div className="flex items-center justify-between pt-6 border-t border-[#2a2a38] mt-6 shrink-0">
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
                onClick={activeTab === 'AI Tools' ? null : handleNext}
              >
                {activeTab === 'AI Tools' ? 'Finish' : 'Next →'}
              </button>
            </div>
          </div>

          {/* Right Live Preview Column */}
          <div className="w-full md:w-1/2 flex flex-col bg-[#050508] overflow-hidden p-6 md:p-8 lg:p-12">
            <div className="flex flex-col gap-3 mb-6 shrink-0">
              <span className="text-[11px] font-bold tracking-wider text-[#505070] uppercase font-['DM_Sans',sans-serif]">
                LIVE PREVIEW
              </span>
              <div className="flex items-center gap-2">
                {['Dark', 'Purple', 'Bold'].map((tmpl) => (
                  <button
                    key={tmpl}
                    type="button"
                    onClick={() => setSelectedTemplate(tmpl.toLowerCase())}
                    className={`px-4 py-1.5 text-[12px] font-medium rounded-full transition duration-150 cursor-pointer ${
                      selectedTemplate === tmpl.toLowerCase()
                        ? 'bg-[#7c5cfc] text-white shadow-sm'
                        : 'bg-[#12121a] text-[#7070a0] hover:text-gray-200 border border-[#2a2a38]'
                    }`}
                  >
                    {tmpl}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-1 w-full overflow-y-auto bg-[#050508] flex justify-center items-start scrollbar-none">
              <div className="w-full max-w-[620px] aspect-[1/1.414] shadow-2xl rounded-2xl overflow-hidden bg-white text-black">
                <CVPreview data={cvData} template={selectedTemplate} />
              </div>
            </div>
          </div>

        </div>
      </CVBuilderLayout>
    </div>
  );
}