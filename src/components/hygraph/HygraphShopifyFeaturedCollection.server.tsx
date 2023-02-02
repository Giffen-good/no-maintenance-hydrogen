import {HygraphFeaturedCollectionProps} from '~/components/hygraph/types';
import {CacheLong, CacheShort, gql, useShopQuery} from '@shopify/hydrogen';
import {Grid, TiledProductCard} from '~/components';
import {getImageLoadingPriority} from '~/lib/const';
import {Nullable} from 'vitest';
import {
  Product,
  ProductVariantsArgs,
} from '@shopify/hydrogen/storefront-api-types';
import {PRODUCT_CARD_FRAGMENT} from "~/lib";

export const HygraphShopifyFeaturedCollection = ({
  __typename,
  heading,
  products,
}: HygraphFeaturedCollectionProps) => {
  if (!products) return <></>;
  const {data} = useShopQuery<{nodes: Product[]}>({
    query: PRODUCT_CARDS_BY_IDS_QUERY,
    variables: {
      ids: products,
    },
    cache: CacheShort(),
    preload: '*',
  });
  const hasAltTileLayoutOnDesktop = true;
  if (!data) return <></>;
  const productData = data.nodes;
  return (
    <div className={`component--${__typename}`}>
      {heading && <h2 className={'text-lead my-12 gutter'}>{heading}</h2>}
      <Grid
        gap={hasAltTileLayoutOnDesktop ? 'hasAltTileLayoutOnDesktop' : 'tiles'}
      >
        {productData.map((product, i: number) => (
          <TiledProductCard
            key={product.id}
            product={product}
            alternateDesktopLayout={hasAltTileLayoutOnDesktop}
            loading={getImageLoadingPriority(i)}
          />
        ))}
      </Grid>
    </div>
  );
};

const PRODUCT_CARDS_BY_IDS_QUERY = gql`
  ${PRODUCT_CARD_FRAGMENT}
  query ProductByIDs($ids: [ID!]!) {
    nodes(ids: $ids) {
      ... on Product {
        ...ProductCard
      }
    }
  }
`;
