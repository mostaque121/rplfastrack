import React, { useEffect, useRef, useState } from "react";

type Course = {
  id: string;
  title: string;
};

type SelectCourseProps = {
  courses: Course[];
  value?: string;
  onChange: (title: string | null) => void;
  error?: string;
};

const SelectCourseName: React.FC<SelectCourseProps> = ({
  courses,
  value = "",
  onChange,
  error,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentValue = value || "";

  // Filter options based on typed input
  const filteredCourses = courses.filter((c) =>
    c.title.toLowerCase().includes(currentValue.toLowerCase()),
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full mx-auto">
      <div className="relative flex items-center">
        <input
          type="text"
          value={currentValue}
          onChange={(e) => {
            onChange(e.target.value || null);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Select or type a course..."
          className={`w-full px-3 py-2 text-sm text-gray-900 bg-white border rounded-md outline-none transition-all ${
            isOpen
              ? "border-[#10b981] ring-1 ring-[#10b981]"
              : "border-gray-200 hover:border-gray-300"
          }`}
        />

        {currentValue && (
          <button
            type="button"
            onClick={() => onChange(null)}
            className="absolute right-2 text-gray-400 hover:text-gray-600 text-xs px-1 font-bold"
          >
            ✕
          </button>
        )}
      </div>

      {/* Helper Suggestion Dropdown */}
      {isOpen && filteredCourses.length > 0 && (
        <ul className="absolute z-50 w-full mt-1 max-h-56 overflow-auto bg-white border border-gray-200 rounded-md shadow-lg p-1 text-sm">
          {filteredCourses.map((course) => (
            <li
              key={course.id}
              onClick={() => {
                onChange(course.title);
                setIsOpen(false);
              }}
              className="px-3 py-2 cursor-pointer rounded text-gray-900 hover:bg-[#d1fae5] transition-colors"
            >
              {course.title}
            </li>
          ))}
        </ul>
      )}

      {error && <div className="mt-2 text-red-600 text-sm">{error}</div>}
    </div>
  );
};

export default SelectCourseName;
