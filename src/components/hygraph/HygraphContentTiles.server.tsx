import {
  HygraphContentTilesProps,
  HygraphLinkProps,
  HygraphSingleTile,
} from '~/components/hygraph/types';
import {ReactNode} from 'react';
import {Link} from '@shopify/hydrogen';
import {Nullable} from 'vitest';
import {getCSS} from '~/lib';
import {COMPONENT_DEFAULTS} from '~/lib/const';
import {HygraphExternalMedia} from '~/components/hygraph/HygraphExternalMedia';

export const HygraphContentTiles = ({
  aspectRatio,
  mobileAspectRatio,
  hasGutterBetweenTiles,
  tiles,
  __typename,
}: HygraphContentTilesProps) => {
  return (
    <div
      className={`${
        aspectRatio ?? COMPONENT_DEFAULTS.CONTENT_TILE_ASPECT_RATIO
      } ${mobileAspectRatio}_m generic-content-section flex relative ${
        hasGutterBetweenTiles ? 'gap-4' : ''
      } `}
    >
      {tiles.map((tile, index) => {
        return <TileComponent t={tile} key={`${__typename}-${index}`} />;
      })}
    </div>
  );
};

const TileComponent = ({t}: {t: HygraphSingleTile}) => {
  const rawTextPos = t.textPosition ?? 'middle_center';
  const styles = getCSS(null, t.textColor);
  return (
    <div className={`${getTextPosClasses(rawTextPos)} generic-block relative`}>
      <HygraphExternalMedia
        media={t.backgroundMedia}
        className="absolute h-full w-full object-cover"
      />
      <CTAWrapper link={t.link}>
        {t.hasOverlayOnHover && (
          <div
            className={`absolute inset-0 h-full w-full top-0 left-0 bg-black opacity-0 opass-overlay`}
          ></div>
        )}
        <hgroup className={'absolute text-wrapper'} style={styles}>
          <h2 className={'text-heading xl:text-display'}>{t.heading}</h2>
          <h3>{t.subheading}</h3>
        </hgroup>
      </CTAWrapper>
    </div>
  );
};
const CTAWrapper = ({
  link,
  children,
}: {
  children: ReactNode;
  link: Nullable<HygraphLinkProps>;
}) => {
  const c = 'relative image-container block';
  const att = link?.openInNewTab
    ? {
        target: '_blank',
        rel: 'noopener',
      }
    : {};
  if (link) {
    return (
      <Link to={link.urlString} className={c} {...att}>
        {children}
      </Link>
    );
  } else {
    return <div className={c}>{children}</div>;
  }
};
const getTextPosClasses = (rawTextPos: string): string => {
  const textPos = rawTextPos.split('_');
  const verticalPos = textPos[0];
  const horizontalPos = textPos[1];
  return `va--${verticalPos} ha--${horizontalPos}`;
};

// const HygraphSingleContentTile = ({content}: {content: any}) => {
//   return <div>Single Content Tile</div>
// }
