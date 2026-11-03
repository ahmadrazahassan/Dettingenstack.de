import type { CategoryInput, ComparisonInput, ToolInput } from "@/lib/schema";
import { projektmanagementSoftware } from "../categories/projektmanagement-software";
import {
  asanaVsMonday,
  aworkVsAsana,
  clickupVsMonday,
  jiraVsAsana,
} from "../comparisons/projektmanagement-software";
import { asana } from "../tools/asana";
import { awork } from "../tools/awork";
import { clickup } from "../tools/clickup";
import { jira } from "../tools/jira";
import { meistertask } from "../tools/meistertask";
import { microsoftPlanner } from "../tools/microsoft-planner";
import { monday } from "../tools/monday";
import { notion } from "../tools/notion";
import { stackfield } from "../tools/stackfield";
import { wrike } from "../tools/wrike";

// ZEP, MOCO and Teamleader Focus join via their secondary category.
export const category: CategoryInput = projektmanagementSoftware;
export const tools: ToolInput[] = [
  asana,
  monday,
  clickup,
  jira,
  wrike,
  awork,
  stackfield,
  meistertask,
  notion,
  microsoftPlanner,
];
export const comparisons: ComparisonInput[] = [
  asanaVsMonday,
  clickupVsMonday,
  jiraVsAsana,
  aworkVsAsana,
];
