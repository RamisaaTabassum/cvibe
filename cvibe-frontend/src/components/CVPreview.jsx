import DarkTemplate from '../templates/DarkTemplate';
import PurpleTemplate from '../templates/PurpleTemplate';
import RedTemplate from '../templates/RedTemplate';

const CVPreview = ({ data, template = 'purple' }) => {
  const templates = {
    purple: PurpleTemplate,
    dark: DarkTemplate,
    red: RedTemplate,
  };

  const SelectedTemplate = templates[template] || PurpleTemplate;

  return (
    <div className="w-full overflow-hidden border border-gray-200 rounded-lg shadow-lg">
      <SelectedTemplate data={data} />
    </div>
  );
};

export default CVPreview;