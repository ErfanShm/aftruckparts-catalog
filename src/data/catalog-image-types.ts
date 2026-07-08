export type ImageManifestEntry = {
  src: string;
  width: number;
  height: number;
  blurDataURL: string;
  srcSetWebp: string;
  srcSetAvif: string;
};

export type ProductImageManifest = {
  hero: ImageManifestEntry;
  mounted?: ImageManifestEntry;
};

export type CatalogImageManifest = Record<string, ProductImageManifest>;
