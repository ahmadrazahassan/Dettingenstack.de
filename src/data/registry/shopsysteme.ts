import type { CategoryInput, ComparisonInput, ToolInput } from "@/lib/schema";
import { shopsysteme } from "../categories/shopsysteme";
import {
  shopifyVsShopware,
  shopwareVsJtlShop,
} from "../comparisons/shopsysteme";
import { gambio, jtlShop, woocommerce } from "../tools/shop-weitere";
import { shopify } from "../tools/shopify";
import { shopware } from "../tools/shopware";

export const category: CategoryInput = shopsysteme;
export const tools: ToolInput[] = [
  shopify,
  shopware,
  jtlShop,
  woocommerce,
  gambio,
];
export const comparisons: ComparisonInput[] = [
  shopifyVsShopware,
  shopwareVsJtlShop,
];
