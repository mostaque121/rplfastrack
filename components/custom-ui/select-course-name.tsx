import Select, { StylesConfig } from "react-select";

// Type for the course data from props
type Course = {
  id: string;
  title: string;
};

// Type for react-select option
type SelectOption = {
  value: string;
  label: string;
};

type SelectCourseProps = {
  courses: Course[];
  value?: string;
  onChange: (title: string | null) => void;
  error?: string;
};

const emeraldColor = "#10b981";
const emeraldHoverColor = "#d1fae5";

// Custom styles
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

    // ✅ height override
    minHeight: "32px",
  }),

  // ✅ allow multi-line layout behavior
  valueContainer: (base) => ({
    ...base,
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    maxHeight: "60px",
    overflow: "hidden",
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

  // ✅ 2-line clamp for selected value
  singleValue: (base) => ({
    ...base,
    color: "#111827",
    whiteSpace: "normal",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 2,
    overflow: "hidden",
  }),
};

const SelectCourseName: React.FC<SelectCourseProps> = ({
  courses,
  value,
  onChange,
  error,
}) => {
  const formattedOptions: SelectOption[] = courses.map((o) => ({
    value: o.id,
    label: o.title,
  }));

  const selected = formattedOptions.find((o) => o.label === value) || null;

  return (
    <div className="relative w-full mx-auto">
      <Select
        value={selected}
        onChange={(newValue) => onChange(newValue ? newValue.label : null)}
        options={formattedOptions}
        isClearable
        styles={customStyles}
        placeholder="Select a course..."
        captureMenuScroll={false}
        menuPlacement="bottom"
        menuShouldScrollIntoView={false}
      />

      {error && <div className="mt-2 text-red-600 text-sm">{error}</div>}
    </div>
  );
};

export default SelectCourseName;
