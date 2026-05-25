import PurpleTemplate from '../templates/PurpleTemplate';
import DarkTemplate from '../templates/DarkTemplate';
import RedTemplate from '../templates/RedTemplate';

const CVPreview = ({ data, template = 'purple' }) => {
  const templates = {
    purple: PurpleTemplate,
    dark: DarkTemplate,
    red: RedTemplate,
  };

  const SelectedTemplate = templates[template] || PurpleTemplate;

  return (
    <div className="w-full shadow-lg rounded-lg overflow-hidden border border-gray-200">
      <SelectedTemplate data={data} />
    </div>
  );
};

export default CVPreview;