const SelectField = ({
  label,
  name,
  value,
  onChange,
  options,
  disabled = false,
  bgColor = "bg-white", // default white background
  textColor = "text-gray-900", // default dark text
  ringColor = "focus:ring-blue-500", // default blue ring
}) => (
  <div>
    <label className="block mb-1 text-sm font-medium text-blue-100">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      required
      disabled={disabled}
      className={`w-full px-4 py-2 border rounded-xl focus:outline-none ${bgColor} ${textColor} ${ringColor} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      <option value="">Select {label}</option>
      {options?.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

export default SelectField;
