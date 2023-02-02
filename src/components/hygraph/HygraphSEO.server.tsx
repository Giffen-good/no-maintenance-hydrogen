import {Seo} from '@shopify/hydrogen';
import {HygraphSeoData} from '~/components/hygraph/types';
import {SEO_TITLE_TEMPLATE} from '~/lib/const';

export const HygraphSEO = ({pageTitle, metaDescription, hasTitleTemplate} : HygraphSeoData) => {
  const d: {title: string; description: string; templateTitle?: string} = {
    title: pageTitle,
    description: metaDescription,
  };
  if (hasTitleTemplate) d['templateTitle'] = SEO_TITLE_TEMPLATE;
  return <Seo type="homepage" data={d} />;
};
