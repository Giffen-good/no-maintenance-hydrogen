import {
  HygraphContentTiles,
  HygraphShopifyFeaturedCollection,
  HygraphComponentWrapper,
} from '~/components/index.server';

export const HygraphDynamicContent = ({content}: {content: any}) => {
  return (
    <>
      {content.map((c: any, idx: number) => (
        <HygraphComponentWrapper
          config={c.generalConfig}
          id={c.__typename}
          key={`${c.__typename}-${idx}`}
        >
          <ModuleSwitcher {...c} />
        </HygraphComponentWrapper>
      ))}
    </>
  );
};

const ModuleSwitcher = (c: any) => {
  const {generalConfig, ...props} = c;
  switch (c.__typename) {
    case 'FeaturedCollection':
      return <HygraphShopifyFeaturedCollection {...props} />;
    case 'ContentTile':
      return <HygraphContentTiles {...props} />;
    default:
      return <></>;
  }
};
