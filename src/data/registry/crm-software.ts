import type { CategoryInput, ComparisonInput, ToolInput } from "@/lib/schema";
import { crmSoftware } from "../categories/crm-software";
import {
  centralstationcrmVsPipedrive,
  hubspotVsPipedrive,
  hubspotVsSalesforce,
  pipedriveVsZohoCrm,
} from "../comparisons/crm-software";
import { centralstationcrm } from "../tools/centralstationcrm";
import { dynamics365Sales } from "../tools/dynamics-365-sales";
import { hubspotCrm } from "../tools/hubspot-crm";
import { odooCrm } from "../tools/odoo-crm";
import { pipedrive } from "../tools/pipedrive";
import { sageSalesManagement } from "../tools/sage-erp";
import { salesforceSalesCloud } from "../tools/salesforce-sales-cloud";
import { teamleaderFocus } from "../tools/teamleader-focus";
import { zohoCrm } from "../tools/zoho-crm";

export const category: CategoryInput = crmSoftware;
export const tools: ToolInput[] = [
  sageSalesManagement,
  hubspotCrm,
  pipedrive,
  salesforceSalesCloud,
  dynamics365Sales,
  zohoCrm,
  centralstationcrm,
  teamleaderFocus,
  odooCrm,
];
export const comparisons: ComparisonInput[] = [
  hubspotVsPipedrive,
  hubspotVsSalesforce,
  pipedriveVsZohoCrm,
  centralstationcrmVsPipedrive,
];
