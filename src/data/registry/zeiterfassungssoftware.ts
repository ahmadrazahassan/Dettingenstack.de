import type { CategoryInput, ComparisonInput, ToolInput } from "@/lib/schema";
import { zeiterfassungssoftware } from "../categories/zeiterfassungssoftware";
import {
  clockinVsCrewmeister,
  clockodoVsPapershift,
} from "../comparisons/zeiterfassungssoftware";
import { atossTimeControl } from "../tools/atoss-time-control";
import { clockin } from "../tools/clockin";
import { clockodo } from "../tools/clockodo";
import { crewmeister } from "../tools/crewmeister";
import { moco } from "../tools/moco";
import { papershift } from "../tools/papershift";
import { timetac } from "../tools/timetac";
import { zep } from "../tools/zep";

// Personio, Kenjo, HR WORKS and Factorial join via their secondary category.
export const category: CategoryInput = zeiterfassungssoftware;
export const tools: ToolInput[] = [
  clockodo,
  clockin,
  papershift,
  crewmeister,
  timetac,
  zep,
  moco,
  atossTimeControl,
];
export const comparisons: ComparisonInput[] = [
  clockodoVsPapershift,
  clockinVsCrewmeister,
];
