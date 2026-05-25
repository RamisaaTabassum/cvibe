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
  personalInfo: { name: '', title: '', email: '', phone: '', location: '', summary: '' },
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
        setCvData(res.data.cv);
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

  const tabs = [
    { id: 'personal', label: 'Personal', component: <PersonalTab data={cvData} onChange={setCvData} /> },
    { id: 'experience', label: 'Experience', component: <ExperienceTab data={cvData} onChange={setCvData} /> },
    { id: 'education', label: 'Education', component: <EducationTab data={cvData} onChange={setCvData} /> },
    { id: 'skills', label: 'Skills', component: <SkillsTab data={cvData} onChange={setCvData} /> },
    { id: 'certs', label: 'Certs', component: <CertsTab data={cvData} onChange={setCvData} /> },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="flex items-center justify-between px-6 py-3 bg-white border-b border-gray-200">
        <h1 className="font-semibold text-gray-800">CV Builder</h1>
        <button onClick={handleSave} disabled={saving}
          className="px-5 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 disabled:opacity-60">
          {saving ? 'Saving...' : saved ? '✓ Saved!' : 'Save CV'}
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Form Side */}
        <div className="flex flex-col w-full border-r border-gray-200 md:w-1/2">
          <div className="flex overflow-x-auto bg-white border-b border-gray-200">
            {tabs.map((tab) => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition ${activeTab === tab.id ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-500'}`}>
                {tab.label}
              </button>
            ))}
          </div>
          <div className="flex-1 p-6 overflow-y-auto">
            {tabs.find((t) => t.id === activeTab)?.component}
          </div>
        </div>

        {/* Preview Side */}
        <div className="hidden w-1/2 p-6 overflow-y-auto bg-gray-100 md:block">
          <div className="max-w-2xl p-8 mx-auto bg-white shadow rounded-xl">
            <h2 style={{fontFamily:'Bebas Neue',fontSize:'28px',letterSpacing:'2px',marginBottom:'4px'}}>
              {cvData.personalInfo?.name || 'Your Name'}
            </h2>
            <p style={{color:'#7070a0',fontSize:'14px',marginBottom:'8px'}}>
              {cvData.personalInfo?.title || 'Professional Title'}
            </p>
            <p style={{fontSize:'12px',color:'#999',marginBottom:'16px'}}>
              {[cvData.personalInfo?.email, cvData.personalInfo?.phone, cvData.personalInfo?.location].filter(Boolean).join(' · ')}
            </p>
            {cvData.personalInfo?.summary && (
              <div style={{marginBottom:'16px'}}>
                <div style={{fontSize:'10px',fontWeight:700,letterSpacing:'.1em',textTransform:'uppercase',color:'#7c5cfc',borderBottom:'1px solid #eee',paddingBottom:'4px',marginBottom:'8px'}}>Summary</div>
                <p style={{fontSize:'13px',color:'#333',lineHeight:1.6}}>{cvData.personalInfo.summary}</p>
              </div>
            )}
            {cvData.experience?.length > 0 && (
              <div style={{marginBottom:'16px'}}>
                <div style={{fontSize:'10px',fontWeight:700,letterSpacing:'.1em',textTransform:'uppercase',color:'#7c5cfc',borderBottom:'1px solid #eee',paddingBottom:'4px',marginBottom:'8px'}}>Experience</div>
                {cvData.experience.map((exp, i) => (
                  <div key={i} style={{marginBottom:'10px'}}>
                    <div style={{display:'flex',justifyContent:'space-between'}}>
                      <span style={{fontSize:'13px',fontWeight:600}}>{exp.position}</span>
                      <span style={{fontSize:'11px',color:'#888'}}>{exp.duration}</span>
                    </div>
                    <div style={{fontSize:'12px',color:'#555'}}>{exp.company}</div>
                    <div style={{fontSize:'12px',color:'#333',marginTop:'4px'}}>{exp.description}</div>
                  </div>
                ))}
              </div>
            )}
            {cvData.education?.length > 0 && (
              <div style={{marginBottom:'16px'}}>
                <div style={{fontSize:'10px',fontWeight:700,letterSpacing:'.1em',textTransform:'uppercase',color:'#7c5cfc',borderBottom:'1px solid #eee',paddingBottom:'4px',marginBottom:'8px'}}>Education</div>
                {cvData.education.map((edu, i) => (
                  <div key={i} style={{marginBottom:'8px'}}>
                    <div style={{display:'flex',justifyContent:'space-between'}}>
                      <span style={{fontSize:'13px',fontWeight:600}}>{edu.degree}</span>
                      <span style={{fontSize:'11px',color:'#888'}}>{edu.year}</span>
                    </div>
                    <div style={{fontSize:'12px',color:'#555'}}>{edu.institution}</div>
                  </div>
                ))}
              </div>
            )}
            {cvData.skills?.length > 0 && (
              <div style={{marginBottom:'16px'}}>
                <div style={{fontSize:'10px',fontWeight:700,letterSpacing:'.1em',textTransform:'uppercase',color:'#7c5cfc',borderBottom:'1px solid #eee',paddingBottom:'4px',marginBottom:'8px'}}>Skills</div>
                <div style={{display:'flex',flexWrap:'wrap',gap:'6px'}}>
                  {cvData.skills.map((skill, i) => (
                    <span key={i} style={{padding:'3px 10px',background:'#f5f5f8',border:'1px solid #eee',borderRadius:'4px',fontSize:'11px',color:'#333'}}>{skill}</span>
                  ))}
                </div>
              </div>
            )}
            {cvData.certifications?.length > 0 && (
              <div>
                <div style={{fontSize:'10px',fontWeight:700,letterSpacing:'.1em',textTransform:'uppercase',color:'#7c5cfc',borderBottom:'1px solid #eee',paddingBottom:'4px',marginBottom:'8px'}}>Certifications</div>
                {cvData.certifications.map((cert, i) => (
                  <div key={i} style={{marginBottom:'6px'}}>
                    <span style={{fontSize:'13px',fontWeight:600}}>{cert.name}</span>
                    <span style={{fontSize:'12px',color:'#555',marginLeft:'8px'}}>{cert.issuer} {cert.year}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CVBuilder;