function Select({ options, handleChange, value }) {
  return (
    <select
      className="text-xl p-1 border border-solid rounded-sm bg-grey-0 font-medium shadow-sm"
      onChange={handleChange}
      value={value}
    >
      {options.map((el, key) => {
        return (
          <option key={key} value={el.value}>
            {el.label}
            {/* {console.log(el.label)} */}
          </option>
        );
      })}
    </select>
  );
}

export default Select;
