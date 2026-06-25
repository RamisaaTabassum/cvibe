import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import html2pdf from "html2pdf.js";

// Core layout and structural components
import CompletenessBar from '../components/CompletenessBar';
import CVBuilderLayout from '../components/CVBuilderLayout';
import CVPreview from '../components/CVPreview';
import TemplateSelector from '../components/TemplateSelector';

// Reusable atom UI elements
import Badge from '../components/UI/Badge';
import Button from '../components/UI/Button';
import Input from '../components/UI/Input';

// Fixed paths for builder tab workspace panels
import CertsTab from '../components/builder/CertsTab';
import EducationTab from '../components/builder/EducationTab';
import ExperienceTab from '../components/builder/ExperienceTab';
import PersonalTab from '../components/builder/PersonalTab';
import SkillsTab from '../components/builder/SkillsTab';

export default function CVBuilder() {
  const navigate = useNavigate();
  
  // Active workspace tab state
  const [activeTab, setActiveTab] = useState('Personal');
  const [selectedTemplate, setSelectedTemplate] = useState('dark');

  // CV data state
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
    education: [],
    experience: [],
    skills: [],
    certifications: []
  });

  const tabs = ['Personal', 'Education', 'Experience', 'Skills', 'AI Tools'];

  // Render active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'Personal':
        return <PersonalTab cvData={cvData} setCvData={setCvData} Input={Input} Badge={Badge} />;
      case 'Education':
        return <EducationTab cvData={cvData} setCvData={setCvData} Input={Input} Button={Button} />;
      case 'Experience':
        return <ExperienceTab cvData={cvData} setCvData={setCvData} Input={Input} Button={Button} />;
      case 'Skills':
        return <SkillsTab cvData={cvData} setCvData={setCvData} Input={Input} Button={Button} />;
      case 'AI Tools':
        return <CertsTab cvData={cvData} setCvData={setCvData} Input={Input} Button={Button} />;
      default:
        return <PersonalTab cvData={cvData} setCvData={setCvData} Input={Input} Badge={Badge} />;
    }
  };

 // Navigation handlers
  const handleNext = () => {
    const currentIndex = tabs.indexOf(activeTab);
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1]);
    }
  };

  const handleBack = () => {
    const currentIndex = tabs.indexOf(activeTab);
    if (currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1]);
    }
  };
  const handleDownloadPDF = () => {
  const element = document.getElementById("cv-preview-content");

  if (!element) {
    alert("CV preview not found.");
    return;
  }

  const fileName =
    cvData.personalInfo.name?.trim() || "My-CV";

  const options = {
    margin: 0,
    filename: `${fileName}.pdf`,
    image: {
      type: "jpeg",
      quality: 1
    },
    html2canvas: {
      scale: 2,
      useCORS: true
    },
    jsPDF: {
      unit: "mm",
      format: "a4",
      orientation: "portrait"
    }
  };

  html2pdf().set(options).from(element).save();
};

  return (
    <div className="flex flex-col h-screen bg-[#0a0a0f] text-[#f0f0f8] overflow-hidden antialiased">
      
     /* Top Navigation */
      <nav className="w-full h-16 border-b border-[#2a2a38] bg-[#0a0a0f] px-6 sm:px-12 flex items-center justify-between shrink-0 z-50">
        <div 
          onClick={() => navigate("/")}
          className="font-['Bebas_Neue',sans-serif] text-[28px] tracking-[2px] text-white cursor-pointer select-none leading-none"
        >
          CV<span className="text-[#7c5cfc]">ibe</span>
        </div>
        
        <div className="flex items-center gap-4">
          <span className="text-[13px] text-gray-400 hidden sm:inline font-['DM_Sans',sans-serif]">Editing: My CV</span>
                  <Button
          variant="pink"
          onClick={handleDownloadPDF}
        >
          Download PDF
        </Button>
          <Button 
            variant="secondary"
            onClick={() => navigate("/dashboard")}
          >
            ← Dashboard
          </Button>
        </div>
      </nav>

      {/* Main Framework Structural Shell Layout */}
      <CVBuilderLayout>
        <div className="flex w-full h-full overflow-hidden border border-[#2a2a38] rounded-xl bg-[#0a0a0f]">
          
          {/* Left Panel Workspace Column */}
          <div className="w-full md:w-1/2 flex flex-col justify-between border-r border-[#2a2a38] bg-[#0f0f15] overflow-y-auto p-5 md:p-6 scrollbar-none">
            <div>
              
              {/* Tab Category Workspace Selector Menu Header */}
              <div className="flex bg-[#161622] p-1 rounded-lg border border-[#2a2a38] gap-1 mb-6 w-full overflow-x-auto scrollbar-none">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 min-w-[85px] py-2 text-[13px] font-medium rounded-md transition duration-200 cursor-pointer text-center font-['DM_Sans',sans-serif] ${
                      activeTab === tab
                        ? 'bg-[#7c5cfc] text-white shadow-md'
                        : 'text-gray-400 hover:text-gray-200 hover:bg-[#1c1c2b]'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Functional Interactive Dynamic Content Frame Section */}
              <div className="animate-fade-in">
                {renderTabContent()}
              </div>

              {/* Data Integrity Metric Tracker Progress System */}
              <div className="mt-6">
                <CompletenessBar data={cvData} />
              </div>

            </div>

            {/* Layout Stepper Footer Control Action Flow bar */}
            <div className="flex items-center justify-between pt-6 border-t border-[#2a2a38] mt-6 shrink-0">
              <Button 
                variant="text" 
                onClick={handleBack}
                disabled={activeTab === 'Personal'}
              >
                ← Back
              </Button>
              
              <Button 
                variant="primary" 
                className="px-6"
                onClick={activeTab === 'AI Tools' ? null : handleNext}
              >
                {activeTab === 'AI Tools' ? 'Finish' : 'Next →'}
              </Button>
            </div>
          </div>

          {/* Right Panel Workspace Column */}
          <div className="w-full md:w-1/2 flex flex-col bg-[#050508] overflow-hidden">
            
            {/* Live Document Output Settings Configuration Header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-[#2a2a38] bg-[#0d0d14] shrink-0">
              <span className="text-[11px] font-bold tracking-wider text-gray-500 uppercase font-['DM_Sans',sans-serif]">
                Live Preview
              </span>
              
              {/* Specialized Dynamic Template Control Swapping Unit */}
              <TemplateSelector 
                selectedTemplate={selectedTemplate} 
                setSelectedTemplate={setSelectedTemplate} 
              />
            </div>

            {/* Interactive Realtime Output View Render Layer */}
            <div className="flex-1 p-4 md:p-6 overflow-y-auto bg-[#0a0a0f] flex justify-center items-start scrollbar-none">
              <CVPreview data={cvData} template={selectedTemplate} />
            </div>

          </div>

        </div>
      </CVBuilderLayout>
    </div>
  );
}