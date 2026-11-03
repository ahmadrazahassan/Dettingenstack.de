import type { CategoryInput, ComparisonInput, ToolInput } from "@/lib/schema";
import { newsletterSoftware } from "../categories/newsletter-software";
import {
  brevoVsMailchimp,
  cleverreachVsRapidmail,
} from "../comparisons/newsletter-software";
import { activecampaign } from "../tools/activecampaign";
import { brevo } from "../tools/brevo";
import { cleverreach } from "../tools/cleverreach";
import { getresponse } from "../tools/getresponse";
import { inxmail } from "../tools/inxmail";
import { klaviyo } from "../tools/klaviyo";
import { mailchimp } from "../tools/mailchimp";
import { rapidmail } from "../tools/rapidmail";

export const category: CategoryInput = newsletterSoftware;
export const tools: ToolInput[] = [
  cleverreach,
  rapidmail,
  brevo,
  mailchimp,
  inxmail,
  klaviyo,
  getresponse,
  activecampaign,
];
export const comparisons: ComparisonInput[] = [
  cleverreachVsRapidmail,
  brevoVsMailchimp,
];
