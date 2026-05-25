import DarkTemplate from '../templates/DarkTemplate';
import PurpleTemplate from '../templates/PurpleTemplate';

const CVPreview = ({ data, template = 'purple' }) => {
  const templates = {
    purple: PurpleTemplate,
    dark: DarkTemplate,
  };

  const SelectedTemplate = templates[template] || PurpleTemplate;

  return (
    <div className="w-full overflow-hidden border border-gray-200 rounded-lg shadow-lg">
      <SelectedTemplate data={data} />
    </div>
  );
};

export default CVPreview;