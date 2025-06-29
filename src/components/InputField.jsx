const InputField = ({
  name,
  label,
  value,
  onChange,
  type = "text",
  autoFocus = false,
  half = false,
  pattern,
  title,
  bgColor = "bg-white",
  textColor = "text-blue-900",
  ringColor = "ring-blue-500",
}) => (
  <div className={half ? "w-1/2" : "w-full"}>
    <label className={`block mb-1 text-sm font-medium ${textColor}`}>
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required
      autoFocus={autoFocus}
      pattern={pattern}
      title={title}
      className={`w-full px-4 py-2 border rounded-xl ${bgColor} ${textColor} focus:outline-none focus:ring-2 focus:${ringColor}`}
    />
  </div>
);

export default InputField;
