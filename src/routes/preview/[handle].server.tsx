import {Suspense} from 'react';
import {
  gql,
  HydrogenRouteProps,
  ShopifyAnalyticsConstants,
  useServerAnalytics,
} from '@shopify/hydrogen';

import {Layout} from '~/components/index.server';
import {HygraphPageContent} from '~/components/hygraph/HygraphPageContent.server';
import {DYNAMIC_PAGE_CONTENT_FRAGMENT, HY_PAGE_SEO_FRAGMENT} from '~/lib';

export default function Homepage({params}: HydrogenRouteProps) {
  const {handle} = params;
  useServerAnalytics({
    shopify: {
      canonicalPath: '/',
      pageType: ShopifyAnalyticsConstants.pageType.home,
    },
  });
  const q = {query: HY_ID_QUERY, variables: {id: handle}};
  return (
    <Layout>
      <Suspense>
        <HygraphPageContent customBody={q} />
      </Suspense>
    </Layout>
  );
}

const HOMEPAGE_SEO_QUERY = gql`
  query shopInfo {
    shop {
      name
      description
    }
  }
`;
const HY_ID_QUERY = gql`
  ${HY_PAGE_SEO_FRAGMENT}
  ${DYNAMIC_PAGE_CONTENT_FRAGMENT}
  query GetPage($id: ID!) {
    page(where: {id: $id}, stage: DRAFT) {
      seo {
        ...SEO
      }
      ...DynamicPageContent
    }
  }
`;
