const CertsTab = ({ data, onChange }) => {
  const certs = data?.certifications || [];

  const addCert = () => {
    onChange({ ...data, certifications: [...certs, { name: '', issuer: '', year: '' }] });
  };

  const updateCert = (index, field, value) => {
    const updated = certs.map((c, i) => i === index ? { ...c, [field]: value } : c);
    onChange({ ...data, certifications: updated });
  };

  const removeCert = (index) => {
    onChange({ ...data, certifications: certs.filter((_, i) => i !== index) });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-700">Certifications</h3>
        <button onClick={addCert} className="px-3 py-1 text-sm text-white transition bg-purple-600 rounded-lg hover:bg-purple-700">+ Add</button>
      </div>
      {certs.map((cert, i) => (
        <div key={i} className="flex flex-col gap-3 p-4 border border-gray-200 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-500">Certification {i + 1}</span>
            <button onClick={() => removeCert(i)} className="text-xs text-red-500 hover:underline">Remove</button>
          </div>
          {['name', 'issuer', 'year'].map((field) => (
            <input key={field} type="text"
              value={cert[field] || ''}
              onChange={(e) => updateCert(i, field, e.target.value)}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
            />
          ))}
        </div>
      ))}
      {certs.length === 0 && (
        <p className="py-4 text-sm text-center text-gray-400">Click + Add to add certification</p>
      )}
    </div>
  );
};

export default CertsTab;