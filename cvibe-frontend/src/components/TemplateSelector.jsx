const templates = [
  { id: 'purple', name: 'Purple', color: 'bg-purple-600' },
  { id: 'dark', name: 'Dark', color: 'bg-gray-900' },
  { id: 'red', name: 'Red', color: 'bg-red-600' },
];

const TemplateSelector = ({ selected, onSelect }) => {
  return (
    <div className="flex gap-3 p-4 bg-gray-50 rounded-lg flex-wrap">
      <p className="text-sm font-medium text-gray-600 self-center mr-2">
        Template:
      </p>
      {templates.map((t) => (
        <button
          key={t.id}
          onClick={() => onSelect(t.id)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition text-sm font-medium
            ${selected === t.id
              ? 'border-purple-600 bg-purple-50 text-purple-700'
              : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
            }`}>
          <div className={`w-4 h-4 rounded-full ${t.color}`}></div>
          {t.name}
        </button>
      ))}
    </div>
  );
};

export default TemplateSelector;