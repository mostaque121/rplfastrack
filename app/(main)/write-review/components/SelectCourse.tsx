import { Input } from "@/components/ui/input";
import { ChangeEvent, FocusEvent, useState } from "react";

type Course = {
  id: string;
  title: string;
};

type SelectCourseProps = {
  suggestions: Course[];
  setSelectedCourse: (id: string) => void;
  error?: string;
};

const SelectCourse: React.FC<SelectCourseProps> = ({
  suggestions,
  setSelectedCourse,
  error,
}) => {
  const [filteredSuggestions, setFilteredSuggestions] = useState<Course[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.currentTarget.value;
    const filtered = suggestions.filter((suggestion) =>
      suggestion.title.toLowerCase().includes(input.toLowerCase())
    );
    setFilteredSuggestions(filtered);
    setShowSuggestions(true);
  };

  const handleFocus = () => {
    if (suggestions.length) {
      setFilteredSuggestions(suggestions);
      setShowSuggestions(true);
    }
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    if (
      !e.relatedTarget ||
      !(e.relatedTarget as HTMLElement).classList.contains("suggestion-item")
    ) {
      setShowSuggestions(false);
    }
  };

  const handleClick = (suggestion: Course) => {
    setFilteredSuggestions([]);
    setShowSuggestions(false);
    setSelectedCourse(suggestion.id);
  };

  const SuggestionsListComponent = () =>
    filteredSuggestions.length ? (
      <div className="absolute w-full border border-gray-300 rounded-lg shadow-lg mt-1 max-h-48 overflow-auto bg-white z-50">
        {filteredSuggestions.map((suggestion) => (
          <h3
            key={suggestion.id}
            className="suggestion-item p-2 cursor-pointer text-sm md:text-base text-ellipsis overflow-hidden text-nowrap hover:bg-blue-300 transition-colors duration-200"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => handleClick(suggestion)}
            tabIndex={0}
          >
            {suggestion.title}
          </h3>
        ))}
      </div>
    ) : (
      <div className="absolute w-full mt-1 p-2 border border-gray-300 rounded-lg shadow-lg bg-white z-50">
        <em>No suggestions available</em>
      </div>
    );

  return (
    <div className="relative w-full mx-auto">
      <Input
        type="text"
        className="w-full "
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder="Please Select a course"
      />
      {showSuggestions && <SuggestionsListComponent />}
      {error && <div className="mt-2 text-red-600">{error}</div>}
    </div>
  );
};

export default SelectCourse;
