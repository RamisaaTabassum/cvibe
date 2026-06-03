import DarkTemplate from '../templates/DarkTemplate';
import PurpleTemplate from '../templates/PurpleTemplate';

const CVPreview = ({ data, template = 'purple' }) => {
  const templates = {
    purple: PurpleTemplate,
    dark: DarkTemplate,
  };

  const SelectedTemplate = templates[template] || PurpleTemplate;

  return (
    /* Standard Paper Wrapper:
      - Forced white background (bg-white) and dark text (text-slate-900) to replicate real CV paper.
      - A high shadow (shadow-2xl) helps the CV stand out cleanly against your application's dark background.
      - Max width restricted to 850px to match standard A4 proportions.
    */
    <div className="w-full max-w-[850px] mx-auto bg-white text-slate-900 rounded-xl shadow-2xl border border-gray-200 overflow-hidden transition-all duration-300">
      
      {/* A4 Ratio Inner Container:
        - Responsive padding (p-8 to md:p-14) creates professional margins around your templates.
        - Minimum height set to 1100px to enforce a realistic page-like look.
      */}
      <div className="p-8 sm:p-12 md:p-14 min-h-[1100px] bg-white flex flex-col justify-between">
        
        <SelectedTemplate data={data} />
        
      </div>

    </div>
  );
};

export default CVPreview;