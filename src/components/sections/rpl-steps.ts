import { Award, ClipboardCheck, FileText, MessageSquare, type LucideIcon } from "lucide-react";

export type RplStep = {
  icon: LucideIcon;
  title: string;
  /** One line, used in the hero. */
  short: string;
  /** Full explanation, used in the process section. */
  long: string;
};

/** The four RPL steps, shared by the hero summary and the process timeline. */
export const RPL_STEPS: RplStep[] = [
  {
    icon: MessageSquare,
    title: "Free eligibility check",
    short: "Tell us about your work history and goals.",
    long: "Talk to RPL Fast Track about your career goals and work history. We tell you which qualifications your experience could lead to, free and with no obligation.",
  },
  {
    icon: FileText,
    title: "Gather your evidence",
    short: "We show you exactly what to collect.",
    long: "Prepare evidence of your skills and experience, such as your resume, references, employment records, payslips, certificates and work samples. We guide you on what suits your qualification.",
  },
  {
    icon: ClipboardCheck,
    title: "Assessment",
    short: "A registered training organisation reviews it.",
    long: "A registered training organisation (RTO) assesses your evidence. If the assessor needs more information they will contact you, and if a skill gap is found they may recommend some extra training.",
  },
  {
    icon: Award,
    title: "Get certified",
    short: "Receive your nationally recognised qualification.",
    long: "Your qualification is issued by the RTO and sits on the same national register as qualifications earned by study. It is recognised by employers and can support licensing applications.",
  },
];
