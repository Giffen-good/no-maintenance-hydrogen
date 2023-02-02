import {Suspense} from 'react';
import {
  gql, HydrogenRouteProps,
  Seo,
  ShopifyAnalyticsConstants,
  useServerAnalytics,
} from '@shopify/hydrogen';

import {Layout} from '~/components/index.server';
import {HygraphPageContent} from '~/components/hygraph/HygraphPageContent.server';

export default function Homepage({params}: HydrogenRouteProps) {
  const {handle} = params;
  useServerAnalytics({
    shopify: {
      canonicalPath: '/',
      pageType: ShopifyAnalyticsConstants.pageType.home,
    },
  });

  return (
    <Layout>
      <Suspense>
        <HygraphPageContent slug={handle} />
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
