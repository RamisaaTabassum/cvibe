const templates = [
  { id: 'purple', name: 'Purple', color: 'bg-purple-600' },
  { id: 'dark', name: 'Dark', color: 'bg-gray-700' },
];

const TemplateSelector = ({ selected, onSelect }) => {
  return (
    <div className="flex gap-3 p-4 rounded-lg 
      bg-[var(--color-bg-secondary)] border border-[var(--color-border)]">

      <p className="text-sm font-medium text-[var(--color-text-muted)] self-center mr-2">
        Template:
      </p>

      {templates.map((t) => (
        <button
          key={t.id}
          onClick={() => onSelect(t.id)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition text-sm font-medium
            ${
              selected === t.id
                ? "border-purple-500 bg-purple-500/10 text-white"
                : "border-[var(--color-border)] bg-transparent text-[var(--color-text-muted)] hover:text-white"
            }`}
        >
          <div className={`w-4 h-4 rounded-full ${t.color}`}></div>
          {t.name}
        </button>
      ))}

    </div>
  );
};

export default TemplateSelector;