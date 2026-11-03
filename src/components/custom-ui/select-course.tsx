import Select, { StylesConfig } from "react-select";

// Type for the course data from props
type Course = {
  id: string;
  title: string;
};

// Type for the formatted option object that react-select uses
type SelectOption = {
  value: string;
  label: string;
};

type SelectCourseProps = {
  courses: Course[];
  value?: string;
  onChange: (id: string | null) => void;
  error?: string;
};

// --- Define your custom styles with TypeScript ---
const emeraldColor = "#10b981";
const emeraldHoverColor = "#d1fae5";

// Apply the StylesConfig type.
// The first generic, `SelectOption`, defines the shape of your option data.
// The second, `false`, signifies that this is a single-select (isMulti = false).
const customStyles: StylesConfig<SelectOption, false> = {
  control: (base, state) => ({
    ...base,
    backgroundColor: "white",
    borderColor: state.isFocused ? emeraldColor : "#e5e7eb",
    boxShadow: state.isFocused ? `0 0 0 1px ${emeraldColor}` : "none",
    "&:hover": {
      borderColor: state.isFocused ? emeraldColor : "#d1d5db",
    },
    borderRadius: "0.375rem",
    padding: "2px",
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected
      ? emeraldColor
      : state.isFocused
      ? emeraldHoverColor
      : "white",
    color: state.isSelected ? "white" : "#111827",
    "&:active": {
      backgroundColor: emeraldColor,
      color: "white",
    },
    borderRadius: "0.25rem",
    margin: "0 4px",
    width: "calc(100% - 8px)",
  }),
  menu: (base) => ({
    ...base,
    borderRadius: "0.375rem",
    marginTop: "4px",
  }),
  singleValue: (base) => ({
    ...base,
    color: "#111827",
  }),
};
// --- End of custom styles ---

const SelectCourse: React.FC<SelectCourseProps> = ({
  courses,
  value,
  onChange,
  error,
}) => {
  const formattedOptions: SelectOption[] = courses.map((o) => ({
    value: o.id,
    label: o.title,
  }));
  const selected = formattedOptions.find((o) => o.value === value) || null;

  return (
    <div className="relative w-full mx-auto">
      <Select
        value={selected}
        onChange={(newValue) => onChange?.(newValue ? newValue.value : null)}
        options={formattedOptions}
        isClearable
        styles={customStyles} // Your typed styles object
        placeholder="Select a course..."
        captureMenuScroll={false}
        menuPlacement={"bottom"}
        menuShouldScrollIntoView={false}
      />
      {error && <div className="mt-2 text-red-600">{error}</div>}
    </div>
  );
};

export default SelectCourse;
