import PurpleTemplate from '../templates/PurpleTemplate';
import DarkTemplate from '../templates/DarkTemplate';

const CVPreview = ({ data, template = 'purple' }) => {
  const templates = {
    purple: PurpleTemplate,
    dark: DarkTemplate,
  };

  const SelectedTemplate = templates[template] || PurpleTemplate;

  return (
    <div className="w-full shadow-lg rounded-lg overflow-hidden border border-gray-200">
      <SelectedTemplate data={data} />
    </div>
  );
};

export default CVPreview;