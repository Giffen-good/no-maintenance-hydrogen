import {CacheLong, CacheShort, fetchSync, gql} from '@shopify/hydrogen';
import {NotFound} from '~/components/index.server';
import {DYNAMIC_PAGE_CONTENT_FRAGMENT, HY_PAGE_SEO_FRAGMENT} from '~/lib';
import {Suspense} from 'react';
import {HygraphSEO, HygraphDynamicContent} from '~/components/index.server';

export const HygraphPageContent = ({
  slug,
  customBody,
}: {
  slug?: string;
  customBody?: {query: string; variables: any};
}) => {
  const q = customBody ?? {query: HY_SLUG_QUERY, variables: {slug}};
  const {data} = fetchSync(import.meta.env['VITE_HYGRAPH_API'], {
    method: 'POST',
    preload: true,
    cache: CacheShort(),
    body: JSON.stringify(q),
  }).json();
  if (!data?.page) {
    return <NotFound type="collection" />;
  }

  return (
    <Suspense>
      <>
        <HygraphSEO {...data.page.seo} />
        <HygraphDynamicContent content={data.page.dynamicPageContent} />
      </>
    </Suspense>
  );
};

const HY_SLUG_QUERY = gql`
  ${HY_PAGE_SEO_FRAGMENT}
  ${DYNAMIC_PAGE_CONTENT_FRAGMENT}
  query GetPage($slug: String!) {
    page(where: {slug: $slug}) {
      seo {
        ...SEO
      }
      ...DynamicPageContent
    }
  }
`;
