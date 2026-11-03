"use client";
import { useState } from "react";
import { MdExpandMore } from "react-icons/md"; // Import the icons

const Units = ({ coreUnits, electiveUnits }: { coreUnits: string; electiveUnits: string }) => {
  const [isCoreUnitsOpen, setCoreUnitsOpen] = useState(false);
  const [isElectiveUnitsOpen, setElectiveUnitsOpen] = useState(false);

  return (
    <div>
      <div className="mb-4">
        <h3
          className="mb-2 flex cursor-pointer items-center justify-between text-base font-semibold text-gray-800 transition-colors duration-300 hover:text-emerald-600 sm:text-xl"
          onClick={() => setCoreUnitsOpen(!isCoreUnitsOpen)}
        >
          <span className="flex items-center">
            <span
              className={`mr-2 transition-transform duration-300 ${
                isCoreUnitsOpen ? "rotate-180" : "rotate-0"
              }`}
            >
              <MdExpandMore size={24} />
            </span>
            Core Units
          </span>
        </h3>
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isCoreUnitsOpen ? "" : "max-h-0"
          }`}
        >
          <div
            className="ql-editor qualification py-2 text-sm text-gray-600"
            dangerouslySetInnerHTML={{ __html: coreUnits }}
          />
        </div>
      </div>

      <div>
        <h2
          className="mb-2 flex cursor-pointer items-center justify-between text-base font-semibold text-gray-800 transition-colors duration-300 hover:text-emerald-600 sm:text-xl"
          onClick={() => setElectiveUnitsOpen(!isElectiveUnitsOpen)}
        >
          <span className="flex items-center">
            <span
              className={`mr-2 transition-transform duration-300 ${
                isElectiveUnitsOpen ? "rotate-180" : "rotate-0"
              }`}
            >
              <MdExpandMore size={24} />
            </span>
            Elective Units
          </span>
        </h2>
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isElectiveUnitsOpen ? "h-auto" : "h-0"
          }`}
        >
          <div
            className="ql-editor qualification h-full py-2 text-sm text-gray-600"
            dangerouslySetInnerHTML={{ __html: electiveUnits }}
          />
        </div>
      </div>
    </div>
  );
};

export default Units;
