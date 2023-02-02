import {ProductGrid, Section} from '~/components';
import {Collection} from '@shopify/hydrogen/storefront-api-types';
import {gql, useLocalization, useShopQuery} from '@shopify/hydrogen';
import {PRODUCT_CARD_FRAGMENT} from '~/lib';

const pageBy = 20;
export function FeaturedCollection({
  title = '',
  handle = 'nomaintenance',
}: {
  title?: string;
  handle?: string;
}) {
  const {
    language: {isoCode: language},
    country: {isoCode: country},
  } = useLocalization();
  // @ts-ignore
  const {
    data: {collection},
  } = useShopQuery({
    query: COLLECTION_QUERY,
    variables: {
      handle,
      language,
      country,
      pageBy,
    },
    preload: true,
  });
  console.log('collection', collection);
  if (!collection) return null;
  return (
    <Section padding={'y'}>
      <ProductGrid
        layout={'tiles'}
        key={collection.id}
        alternateDesktopLayout={true}
        collection={collection}
        url={`/collections/${handle}?country=${country}`}
      />
    </Section>
  );
}

const COLLECTION_QUERY = gql`
  ${PRODUCT_CARD_FRAGMENT}
  query CollectionDetails(
    $handle: String!
    $country: CountryCode
    $language: LanguageCode
    $pageBy: Int!
    $cursor: String
  ) @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      id
      title
      description
      seo {
        description
        title
      }
      image {
        id
        url
        width
        height
        altText
      }
      products(first: $pageBy, after: $cursor) {
        nodes {
          ...ProductCard
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
`;
