import type { CategoryInput, ComparisonInput, ToolInput } from "@/lib/schema";
import { buchhaltungssoftware } from "../categories/buchhaltungssoftware";
import {
  lexwareOfficeVsSevdesk,
  sevdeskVsDatevUnternehmenOnline,
} from "../comparisons/buchhaltungssoftware";
import { buchhaltungsbutler } from "../tools/buchhaltungsbutler";
import { candis } from "../tools/candis";
import { collmex } from "../tools/collmex";
import { datevUnternehmenOnline } from "../tools/datev-unternehmen-online";
import { lexwareBuchhaltung } from "../tools/lexware-buchhaltung";
import { lexwareOffice } from "../tools/lexware-office";
import { papierkram } from "../tools/papierkram";
import { sage50, sageActive, sageIntacct } from "../tools/sage-finanzen";
import { sevdesk } from "../tools/sevdesk";
import { wisoMeinbuero } from "../tools/wiso-meinbuero";

export const category: CategoryInput = buchhaltungssoftware;
export const tools: ToolInput[] = [
  sageActive,
  sage50,
  sageIntacct,
  lexwareOffice,
  sevdesk,
  buchhaltungsbutler,
  papierkram,
  wisoMeinbuero,
  collmex,
  lexwareBuchhaltung,
  datevUnternehmenOnline,
  candis,
];
export const comparisons: ComparisonInput[] = [
  lexwareOfficeVsSevdesk,
  sevdeskVsDatevUnternehmenOnline,
];
