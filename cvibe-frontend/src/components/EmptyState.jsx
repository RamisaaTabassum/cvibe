import { Link } from 'react-router-dom';

const EmptyState = ({ title, description, actionText, actionLink }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="w-20 h-20 bg-purple-50 rounded-full flex items-center
        justify-center mb-4">
        <span className="text-3xl">📄</span>
      </div>
      <h3 className="text-lg font-semibold text-gray-700 mb-2">{title}</h3>
      <p className="text-gray-400 text-sm mb-6 max-w-xs">{description}</p>
      {actionLink && (
        <Link to={actionLink}
          className="bg-purple-600 text-white px-6 py-3 rounded-lg
            font-medium hover:bg-purple-700 transition text-sm">
          {actionText}
        </Link>
      )}
    </div>
  );
};

export default EmptyState;