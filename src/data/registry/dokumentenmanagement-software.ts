import type { CategoryInput, ComparisonInput, ToolInput } from "@/lib/schema";
import { dokumentenmanagementSoftware } from "../categories/dokumentenmanagement-software";
import { docuwareVsElo } from "../comparisons/dokumentenmanagement-software";
import { amagno } from "../tools/amagno";
import {
  docuware,
  dvelop,
  easyArchive,
  elo,
  enaio,
  mFiles,
  sharepoint,
  windream,
} from "../tools/dms-anbieter";
import { ecodms } from "../tools/ecodms";

export const category: CategoryInput = dokumentenmanagementSoftware;
export const tools: ToolInput[] = [
  ecodms,
  amagno,
  docuware,
  elo,
  dvelop,
  enaio,
  easyArchive,
  mFiles,
  windream,
  sharepoint,
];
export const comparisons: ComparisonInput[] = [docuwareVsElo];
