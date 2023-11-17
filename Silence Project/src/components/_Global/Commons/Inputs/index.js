function CustomInput({ type, name, value, customClass, ...rest }) {
  return (
    <input
      type={type}
      name={name}
      value={value}
      autoComplete="off"
      className={`w-full rounded-md border-2 bg-black/60 p-2 font-KanitRegular text-gray-400 transition duration-300 ease-in-out focus:outline-none ${
        customClass && customClass
      }`}
      {...rest}
    />
  );
}

export default CustomInput;
