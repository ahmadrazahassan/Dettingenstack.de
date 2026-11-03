import type { CategoryInput, ComparisonInput, ToolInput } from "@/lib/schema";
import { hrSoftware } from "../categories/hr-software";
import {
  kenjoVsLeapsome,
  personioVsHrWorks,
  personioVsKenjo,
} from "../comparisons/hr-software";
import { factorial } from "../tools/factorial";
import { deel, sapSuccessFactors, workdayHcm } from "../tools/hr-enterprise";
import { hrWorks } from "../tools/hr-works";
import { kenjo } from "../tools/kenjo";
import { leapsome } from "../tools/leapsome";
import { personio } from "../tools/personio";
import { rexxSystems } from "../tools/rexx-systems";
import { sageHrPayroll, sageHrSuite, sagePeople } from "../tools/sage-hr";

export const category: CategoryInput = hrSoftware;
export const tools: ToolInput[] = [
  deel,
  workdayHcm,
  sapSuccessFactors,
  sageHrPayroll,
  sageHrSuite,
  sagePeople,
  kenjo,
  rexxSystems,
  hrWorks,
  personio,
  factorial,
  leapsome,
];
export const comparisons: ComparisonInput[] = [
  personioVsHrWorks,
  personioVsKenjo,
  kenjoVsLeapsome,
];
