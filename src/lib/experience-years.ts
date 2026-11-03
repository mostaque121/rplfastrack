export const experienceYears = [
  { id: "1", name: "Less than 1 year" },
  { id: "1-3", name: "1-3 years" },
  { id: "3-5", name: "3-5 years" },
  { id: "5-10", name: "5-10 years" },
  { id: "10+", name: "More than 10 years" },
];

export function getExperienceLabel(id: string) {
  return experienceYears.find((exp) => exp.id === id)?.name;
}
