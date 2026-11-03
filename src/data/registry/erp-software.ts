import type { CategoryInput, ComparisonInput, ToolInput } from "@/lib/schema";
import { erpSoftware } from "../categories/erp-software";
import {
  businessCentralVsSapBusinessOne,
  odooVsSapBusinessOne,
  xentralVsWeclapp,
} from "../comparisons/erp-software";
import { businessCentral } from "../tools/business-central";
import { haufeX360 } from "../tools/haufe-x360";
import { jtlWawi } from "../tools/jtl-wawi";
import { sage100 } from "../tools/sage-100";
import {
  sageB7,
  sageOperations,
  sageWincarat,
  sageX3,
} from "../tools/sage-erp";
import { sapBusinessOne } from "../tools/sap-business-one";
import { weclapp } from "../tools/weclapp";
import { xentral } from "../tools/xentral";

// Odoo joins via its secondary category.
export const category: CategoryInput = erpSoftware;
export const tools: ToolInput[] = [
  sageX3,
  sageOperations,
  sageB7,
  sageWincarat,
  weclapp,
  xentral,
  jtlWawi,
  haufeX360,
  businessCentral,
  sage100,
  sapBusinessOne,
];
export const comparisons: ComparisonInput[] = [
  xentralVsWeclapp,
  odooVsSapBusinessOne,
  businessCentralVsSapBusinessOne,
];
