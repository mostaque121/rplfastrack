"use client";
import { useState } from "react";
import Units from "./units";

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "requirements", label: "Requirements" },
  { id: "outcome", label: "Outcome" },
];
interface QualificationProps {
  data: {
    description: string;
    packagingRule: string;
    electiveUnits: string;
    coreUnits: string;
    entryRequirement: string;
    jobOpportunity: string;
  };
}

export default function QualificationContent({ data }: QualificationProps) {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <section className="w-full py-12 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex max-w-3xl mx-auto border-[1px] bg-[#F5F7FA] border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-3 text-center border-l-[1px] text-sm md:text-lg border-gray-200  font-medium transition-colors ${
                activeTab === tab.id
                  ? "text-white bg-emerald-600"
                  : "text-emerald-700 hover:text-emerald-700 cursor-pointer"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          {activeTab === "overview" && (
            <div className="md:pt-8 space-y-10">
              <div>
                <h2 className="text-3xl font-bold text-emerald-600 mb-4">
                  Qualification Description
                </h2>
                <div
                  className="text-gray-600 qualification leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: data.description }}
                />
              </div>

              <div>
                <h2 className="text-3xl font-bold text-emerald-600 mb-4">
                  Packaging Rules
                </h2>
                <div
                  className="text-gray-600 qualification leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: data.packagingRule }}
                />
              </div>

              {/* Units Section */}
              <div>
                <h2 className="text-3xl font-bold text-emerald-600 mb-4">
                  Units
                </h2>
                <Units
                  coreUnits={data.coreUnits}
                  electiveUnits={data.electiveUnits}
                />
              </div>
            </div>
          )}
          {activeTab === "requirements" && (
            <div className="md:pt-8">
              <div>
                <h2 className="text-3xl font-bold text-emerald-600 mb-4">
                  Entry Requirements
                </h2>
                <div
                  className="text-gray-600 qualification leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: data.entryRequirement }}
                />
              </div>
            </div>
          )}
          {activeTab === "outcome" && (
            <div className="md:pt-8">
              <div>
                <h2 className="text-3xl font-bold text-emerald-600 mb-4">
                  Job Opportunities
                </h2>
                <div
                  className="text-gray-600 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: data.jobOpportunity }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
