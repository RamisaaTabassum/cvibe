const PersonalTab = ({ data, onChange }) => {
  const handleChange = (field, value) => {
    onChange({ ...data, personalInfo: { ...data.personalInfo, [field]: value } });
  };

  const fields = [
    { key: 'name', label: 'Full Name', placeholder: 'Ramisa Tabassum' },
    { key: 'title', label: 'Professional Title', placeholder: 'Web Developer' },
    { key: 'email', label: 'Email', placeholder: 'you@example.com' },
    { key: 'phone', label: 'Phone', placeholder: '01700000000' },
    { key: 'location', label: 'Location', placeholder: 'Dhaka, Bangladesh' },
  ];

  return (
    <div className="flex flex-col gap-4">
      <h3 className="font-semibold text-gray-700">Personal Information</h3>
      {fields.map((f) => (
        <div key={f.key}>
          <label className="block mb-1 text-sm font-medium text-gray-600">{f.label}</label>
          <input
            type="text"
            value={data?.personalInfo?.[f.key] || ''}
            onChange={(e) => handleChange(f.key, e.target.value)}
            placeholder={f.placeholder}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
          />
        </div>
      ))}
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-600">Summary</label>
        <textarea
          value={data?.personalInfo?.summary || ''}
          onChange={(e) => handleChange('summary', e.target.value)}
          placeholder="Write a short professional summary..."
          rows={4}
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg resize-none focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
        />
      </div>
    </div>
  );
};

export default PersonalTab;