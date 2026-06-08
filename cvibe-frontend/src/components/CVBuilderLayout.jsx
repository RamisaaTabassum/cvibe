import { useState } from 'react';
import CVPreview from './CVPreview';
import TemplateSelector from './TemplateSelector';
import CompletenessBar from './CompletenessBar';

const CVBuilderLayout = ({ cvData, onChange }) => {
  const [template, setTemplate] = useState('purple');
  const [activeTab, setActiveTab] = useState('personal');
  const [showPreview, setShowPreview] = useState(false);

  const tabs = [
    { id: 'personal', label: 'Personal' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'skills', label: 'Skills' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">

      <CompletenessBar data={cvData} />

      <TemplateSelector selected={template} onSelect={setTemplate} />

      <div className="md:hidden flex border-b border-gray-200 bg-white">
        <button
          onClick={() => setShowPreview(false)}
          className={`flex-1 py-3 text-sm font-medium ${!showPreview ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-500'}`}>
          Edit
        </button>
        <button
          onClick={() => setShowPreview(true)}
          className={`flex-1 py-3 text-sm font-medium ${showPreview ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-500'}`}>
          Preview
        </button>
      </div>

      <div className="flex flex-col md:flex-row h-full">

        <div className={`w-full md:w-1/2 bg-white border-r border-gray-200 ${showPreview ? 'hidden md:block' : 'block'}`}>
          <div className="flex border-b border-gray-200 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition
                  ${activeTab === tab.id
                    ? 'text-purple-600 border-b-2 border-purple-600'
                    : 'text-gray-500 hover:text-gray-700'}`}>
                {tab.label}
              </button>
            ))}
          </div>
          <div className="p-6 overflow-y-auto">
            {onChange && onChange(activeTab)}
          </div>
        </div>

        <div className={`w-full md:w-1/2 bg-gray-100 p-6 overflow-y-auto ${showPreview ? 'block' : 'hidden md:block'}`}>
          <div className="max-w-2xl mx-auto">
            <CVPreview data={cvData} template={template} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CVBuilderLayout;