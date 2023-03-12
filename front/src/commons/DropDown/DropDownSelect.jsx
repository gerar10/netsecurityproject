import Select from "react-select";

export default function DropDownSelect({ options, handleSelect, defVal }) {
  return (
    <>
      <Select
        options={options}
        onChange={handleSelect}
        defaultValue={defVal}
        required={true}
      />
    </>
  );
}
