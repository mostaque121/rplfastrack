export const australianStates = [
  { id: "nsw", name: "New South Wales" },
  { id: "vic", name: "Victoria" },
  { id: "qld", name: "Queensland" },
  { id: "wa", name: "Western Australia" },
  { id: "sa", name: "South Australia" },
  { id: "tas", name: "Tasmania" },
  { id: "act", name: "Australian Capital Territory" },
  { id: "nt", name: "Northern Territory" },
];

/** Where the person is in their working life: tells the assessor how easy evidence will be. */
export const workStatuses = [
  { id: "employed", name: "Working in this industry now" },
  { id: "self-employed", name: "Running my own business" },
  { id: "between-jobs", name: "Between jobs or on a break" },
  { id: "different-field", name: "Now working in a different field" },
];

/** Highest qualification already held: helps match the right level. */
export const existingQualifications = [
  { id: "none", name: "No formal qualification" },
  { id: "cert-2-3", name: "Certificate II or III" },
  { id: "cert-4-plus", name: "Certificate IV, Diploma or higher" },
  { id: "overseas", name: "Overseas qualification" },
];

export const getWorkStatusLabel = (id?: string) => workStatuses.find((w) => w.id === id)?.name;

export const getExistingQualificationLabel = (id?: string) =>
  existingQualifications.find((q) => q.id === id)?.name;

/** Quick-select answers for people whose industry or qualification isn't in the list. */
export const OTHER_INDUSTRY = "Other industry";
export const OTHER_QUALIFICATION = "Not listed / not sure";
