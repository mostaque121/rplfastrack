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
    <section className="w-full bg-white py-12 md:py-24">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mx-auto flex max-w-3xl border-[1px] border-gray-200 bg-[#F5F7FA]">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 border-l-[1px] border-gray-200 py-2 text-center text-sm font-medium transition-colors md:py-3 md:text-lg ${
                activeTab === tab.id
                  ? "bg-emerald-600 text-white"
                  : "cursor-pointer text-emerald-700 hover:text-emerald-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          {activeTab === "overview" && (
            <div className="space-y-10 md:pt-8">
              <div>
                <h2 className="mb-4 text-3xl font-bold text-emerald-600">
                  Qualification Description
                </h2>
                <div
                  className="ql-editor qualification leading-relaxed text-gray-600"
                  dangerouslySetInnerHTML={{ __html: data.description }}
                />
              </div>

              <div>
                <h2 className="mb-4 text-3xl font-bold text-emerald-600">Packaging Rules</h2>
                <div
                  className="ql-editor qualification leading-relaxed text-gray-600"
                  dangerouslySetInnerHTML={{ __html: data.packagingRule }}
                />
              </div>

              {/* Units Section */}
              <div>
                <h2 className="mb-4 text-3xl font-bold text-emerald-600">Units</h2>
                <Units coreUnits={data.coreUnits} electiveUnits={data.electiveUnits} />
              </div>
            </div>
          )}
          {activeTab === "requirements" && (
            <div className="md:pt-8">
              <div>
                <h2 className="mb-4 text-3xl font-bold text-emerald-600">Entry Requirements</h2>
                <div
                  className="ql-editor qualification leading-relaxed text-gray-600"
                  dangerouslySetInnerHTML={{ __html: data.entryRequirement }}
                />
              </div>
            </div>
          )}
          {activeTab === "outcome" && (
            <div className="md:pt-8">
              <div>
                <h2 className="mb-4 text-3xl font-bold text-emerald-600">Job Opportunities</h2>
                <div
                  className="ql-editor space-y-6 leading-relaxed text-gray-600"
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
