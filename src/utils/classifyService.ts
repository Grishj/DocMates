// src/utils/classifyService.ts
// Classifies a service as "college" or "university" based on its title/id.

type ServiceCategory = "college" | "university";

interface ServiceInput {
  id: string;
  title: string;
}

// ─── Keyword mappings ──────────────────────────────────────────
const UNIVERSITY_KEYWORDS = [
  "transcript",
  "migration",
  "degree",
  "exam form",
  "exam-form",
  "equivalence",
];

const COLLEGE_KEYWORDS = [
  "recommendation",
  "admission",
  "bonafide",
  "character",
];

/**
 * Classify a service into "college" or "university".
 * Matches based on meaning (case-insensitive), checking both id and title.
 */
export function classifyService(service: ServiceInput): ServiceCategory {
  const id = service.id.toLowerCase();
  const title = service.title.toLowerCase();

  for (const keyword of COLLEGE_KEYWORDS) {
    if (id.includes(keyword) || title.includes(keyword)) {
      return "college";
    }
  }

  for (const keyword of UNIVERSITY_KEYWORDS) {
    if (id.includes(keyword) || title.includes(keyword)) {
      return "university";
    }
  }

  // Default to university for unknown services
  return "university";
}
