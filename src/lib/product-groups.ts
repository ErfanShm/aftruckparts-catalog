import { DASTEH_KEYS, type ProductDasteh } from "@/data/products";
import type { Product } from "@/locales";

export type ProductDastehGroup = {
  dasteh: ProductDasteh;
  label: string;
  products: Product[];
};

export function groupProductsByDasteh(products: Product[]): ProductDastehGroup[] {
  return DASTEH_KEYS.flatMap((dasteh) => {
    const groupProducts = products.filter((p) => p.dasteh === dasteh);
    if (groupProducts.length === 0) return [];
    return [
      {
        dasteh,
        label: groupProducts[0]!.dastehLabel,
        products: groupProducts,
      },
    ];
  });
}
