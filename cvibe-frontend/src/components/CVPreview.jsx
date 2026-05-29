// 
import DarkTemplate from '../templates/DarkTemplate';
import PurpleTemplate from '../templates/PurpleTemplate';

const CVPreview = ({ data, template = 'purple' }) => {
  const templates = {
    purple: PurpleTemplate,
    dark: DarkTemplate,
  };

  const SelectedTemplate = templates[template] || PurpleTemplate;

  return (
    <div className="w-full overflow-hidden rounded-lg shadow-lg 
      border border-[var(--color-border)] bg-[var(--color-bg)]">

      <SelectedTemplate data={data} />

    </div>
  );
};

export default CVPreview;