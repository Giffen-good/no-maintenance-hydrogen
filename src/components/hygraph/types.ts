import {Nullable} from 'vitest';
import {scalarOptions} from "yaml";
import Null = scalarOptions.Null;

type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;

type Color = RGB | RGBA | HEX;
export interface HygraphSeoData {
  metaDescription: string;
  pageTitle: string;
  hasTitleTemplate: boolean;
}

export interface HygraphComponentGeneralConfig {
  backgroundColor: Nullable<HygraphHexColor>;
  hasGutter: Nullable<boolean>;
  margin: Nullable<'None' | 'Small' | 'Medium' | 'Large'>;
  textColor: Nullable<HygraphHexColor>;
}

interface HygraphComponent {
  __typename: string;
}

export interface HygraphContentTilesProps extends HygraphComponent {
  aspectRatio: Nullable<string>;
  mobileAspectRatio: Nullable<string>;
  hasGutterBetweenTiles: Nullable<boolean>;
  tiles: HygraphSingleTile[];
}
export interface HygraphContentTilesParent extends HygraphContentTilesProps {
  generalConfig: Nullable<HygraphComponentGeneralConfig>;
}

export interface HygraphSingleTile {
  heading: Nullable<string>;
  subheading: Nullable<string>;
  textColor: Nullable<HygraphHexColor>;
  textPosition: Nullable<string>;
  backgroundMedia: Nullable<HygraphMedia>;
  mobileFallbackMedia: Nullable<HygraphMedia>;
  hasOverlayOnHover: Nullable<boolean>;
  link: Nullable<HygraphLinkProps>;
}

export interface HygraphFeaturedCollectionProps extends HygraphComponent {
  heading: Nullable<string>;
  products: Nullable<string[]>;
}

export type HygraphHexColor = {hex: Color};
export interface HygraphLinkProps {
  urlString: string;
  openInNewTab: boolean;
}

export interface HygraphMedia {
  mimeType: string;
  url: string;
}
