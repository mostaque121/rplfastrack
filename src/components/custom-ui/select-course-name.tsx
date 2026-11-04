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
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative mx-auto w-full">
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
          className={`w-full rounded-md border bg-white px-3 py-2 text-sm text-ink transition-all outline-none ${
            isOpen
              ? "border-[#10b981] ring-1 ring-[#10b981]"
              : "border-gray-200 hover:border-gray-300"
          }`}
        />

        {currentValue && (
          <button
            type="button"
            onClick={() => onChange(null)}
            className="absolute right-2 px-1 text-xs font-bold text-muted-foreground hover:text-gray-600"
          >
            ✕
          </button>
        )}
      </div>

      {/* Helper Suggestion Dropdown */}
      {isOpen && filteredCourses.length > 0 && (
        <ul className="absolute z-50 mt-1 max-h-56 w-full overflow-auto rounded-md border border-gray-200 bg-white p-1 text-sm shadow-lg">
          {filteredCourses.map((course) => (
            <li
              key={course.id}
              onClick={() => {
                onChange(course.title);
                setIsOpen(false);
              }}
              className="cursor-pointer rounded px-3 py-2 text-ink transition-colors hover:bg-[#d1fae5]"
            >
              {course.title}
            </li>
          ))}
        </ul>
      )}

      {error && <div className="mt-2 text-sm text-red-600">{error}</div>}
    </div>
  );
};

export default SelectCourseName;
