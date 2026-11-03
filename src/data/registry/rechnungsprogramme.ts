import type { CategoryInput, ComparisonInput, ToolInput } from "@/lib/schema";
import { rechnungsprogramme } from "../categories/rechnungsprogramme";
import {
  easybillVsFastbill,
  sevdeskVsBillomat,
} from "../comparisons/rechnungsprogramme";
import { billomat } from "../tools/billomat";
import { easybill } from "../tools/easybill";
import { fastbill } from "../tools/fastbill";
import { orgamax } from "../tools/orgamax";
import { sage50Handwerk } from "../tools/sage-finanzen";
import { zervant } from "../tools/zervant";

// Lexware Office, sevdesk, WISO MeinBüro and Papierkram join via their secondary category.
export const category: CategoryInput = rechnungsprogramme;
export const tools: ToolInput[] = [
  sage50Handwerk,
  easybill,
  fastbill,
  billomat,
  orgamax,
  zervant,
];
export const comparisons: ComparisonInput[] = [
  easybillVsFastbill,
  sevdeskVsBillomat,
];
