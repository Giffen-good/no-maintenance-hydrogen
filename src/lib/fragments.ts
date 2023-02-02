import {gql} from '@shopify/hydrogen';

/************************************************************
 ** Hygraph Fragments
 * 1. Partials Fragments
 * 2. Component Fragments
 * 3. Page Fragments
 * 4. Misc. Fragments
 ************************************************************/

/**
 * URL Link Fragment. Used throughout every component that has a link.
 * @type {string}
 */
const LINK_FRAGMENT = gql`
  fragment Link on Link {
    urlString
    openInNewTab
  }
`;

/**
 * General Component Config used across all components
 * @type {string}
 */
export const HY_COMPONENT_GENERAL_CONFIG_FRAGMENT = gql`
  fragment GeneralConfig on ComponentGeneralConfig {
    backgroundColor {
      hex
    }
    hasGutter
    margin
    textColor {
      hex
    }
  }
`;

/**
 * General Page Confiig used across all pages
 * @type {string}
 */
export const HY_PAGE_SEO_FRAGMENT = gql`
  fragment SEO on PageMetaSeo {
    metaDescription
    pageTitle
    hasTitleTemplate
  }
`;

const HY_TILE_FRAGMENT = gql`
  ${LINK_FRAGMENT}
  fragment Tile on Tile {
    backgroundMedia
    mobileFallbackMedia
    heading
    link {
      ...Link
    }
    subheading
    textColor {
      hex
    }
    hasOverlayOnHover
    textPosition
  }
`;
/************************************************************
 ** Hygraph Component Fragments 
 /************************************************************/

/**
 * Component Fragment for the "ContentTile" component
 * @type {string}
 */
export const HY_CONTENT_TILE_FRAGMENT = gql`
  ${HY_TILE_FRAGMENT}
  fragment ContentTile on ContentTile {
    aspectRatio
    mobileAspectRatio
    hasGutterBetweenTiles
    generalConfig {
      ...GeneralConfig
    }
    tiles {
      ...Tile
    }
  }
`;

/**
 * Component Fragment for the "FeaturedCollection" component
 * @type {string}
 */
export const HY_FEATURED_COLLECTION_FRAGMENT = gql`
  fragment FeaturedCollection on FeaturedCollection {
    heading
    products
    generalConfig {
      ...GeneralConfig
    }
  }
`;

export const DYNAMIC_PAGE_CONTENT_FRAGMENT = gql`
  ${HY_COMPONENT_GENERAL_CONFIG_FRAGMENT}
  ${HY_FEATURED_COLLECTION_FRAGMENT}
  ${HY_CONTENT_TILE_FRAGMENT}
  fragment DynamicPageContent on Page {
    dynamicPageContent {
      __typename
      ... on FeaturedCollection {
        ...FeaturedCollection
      }
      ... on ContentTile {
        ...ContentTile
      }
    }
  }
`;

/************************************************************
 * Shopify Fragments
 *************************************************************/

export const MEDIA_FRAGMENT = gql`
  fragment Media on Media {
    mediaContentType
    alt
    previewImage {
      url
    }
    ... on MediaImage {
      id
      image {
        url
        width
        height
      }
    }
    ... on Video {
      id
      sources {
        mimeType
        url
      }
    }
    ... on Model3d {
      id
      sources {
        mimeType
        url
      }
    }
    ... on ExternalVideo {
      id
      embedUrl
      host
    }
  }
`;

export const PRODUCT_CARD_FRAGMENT = gql`
  fragment ProductCard on Product {
    id
    title
    publishedAt
    handle
    variants(first: 10) {
      nodes {
        title
        availableForSale
        id
        image {
          url
          altText
          width
          height
        }
        priceV2 {
          amount
          currencyCode
        }
        compareAtPriceV2 {
          amount
          currencyCode
        }
      }
    }
  }
`;
