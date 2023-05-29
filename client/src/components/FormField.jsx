const FormField = ({
  name,
  type,
  value,
  placeholder,
  label,
  handleChange,
  isSurpriseMe,
  handlerSurpriseMe,
  required,
}) => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-900"
        >
          {label}
        </label>
        {isSurpriseMe && (
          <button
            type="button"
            onClick={handlerSurpriseMe}
            className="font-semibold text-xs text-black bg-[#ececf1] py-1 px-2 rounded-[5px]"
          >
            Surprise me
          </button>
        )}
      </div>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        className="bg-gray-50 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-[#4649ff] focus:border-[#4649ff] outline-none block w-full p-3"
        required
      />
    </div>
  );
};

export default FormField;
