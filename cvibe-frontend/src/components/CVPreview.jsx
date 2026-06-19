import DarkTemplate from '../templates/DarkTemplate';
import PurpleTemplate from '../templates/PurpleTemplate';
import RedTemplate from '../templates/RedTemplate';

export default function CVPreview({ data, template }) {
  switch (template) {
    case 'dark':
      return <DarkTemplate data={data} />;
    case 'purple':
      return <PurpleTemplate data={data} />;
    case 'red':
      return <RedTemplate data={data} />;
    default:
      return <DarkTemplate data={data} />;
  }
}