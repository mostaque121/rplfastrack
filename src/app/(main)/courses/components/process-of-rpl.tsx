"use client";

import { IoIosCheckmarkCircle } from "react-icons/io";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

const steps = [
  {
    title: "Free Skills Assessment",
    description:
      "Connect with RPL Fast Track to discuss your career goals and identify the right qualifications for you.",
  },
  {
    title: "Portfolio of Experience",
    description:
      "Work with your consultant to gather evidence like certificates, work samples, reference letters, and your resume.",
  },
  {
    title: "Review of Evidence",
    description:
      "Your portfolio will be reviewed by an RTO assessor. If needed, free training will be provided to fill any gaps.",
  },
  {
    title: "Congratulations, You’re Now Qualified!",
    description:
      "Once approved, you’ll receive a nationally recognised qualification equivalent to one earned through full-time study.",
  },
];

export default function RPLTimeline() {
  return (
    <section className="py-16 md:py-24 bg-[#F5F7FA]">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="text-3xl font-bold text-center mt-4 text-emerald-600 ">
          RPL Process
        </h2>
        <VerticalTimeline lineColor="#059669">
          {steps.map((step, index) => (
            <VerticalTimelineElement
              key={index}
              visible={true}
              date={`Step ${index + 1}`}
              dateClassName="custom-date"
              icon={<IoIosCheckmarkCircle />}
              iconStyle={{
                background: "#059669",
                color: "#fff",
                boxShadow: "none",
              }}
              contentArrowStyle={{ borderRight: "15px solid #059669" }}
              contentStyle={{
                background: "#059669",
                color: "#fff",
                border: "3px solid #059669",
                borderRadius: "8px",
                boxShadow: "none",
              }}
            >
              <h3 className="text-lg text-whitr font-semibold mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-gray-100 leading-relaxed">
                {step.description}
              </p>
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
      </div>
    </section>
  );
}
