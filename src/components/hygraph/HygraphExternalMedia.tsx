import {Image, Video} from '@shopify/hydrogen';
import {Nullable} from 'vitest';
import {VimeoVideoClient} from './VimeoVideo.client';
export const HygraphExternalMedia = ({
  media,
  className,
}: {
  media: Nullable<any>;
  className: string;
}) => {
  if (!media) return null;
  if (media.vimeoVideoId) {
    return <VimeoVideoClient id={media.vimeoVideoId} className={className} />;
  } else {
    return <CloudinaryMedia media={media} className={className} />;
  }
};

function CloudinaryMedia({media, className}: {media: any; className: string}) {
  const m = media.image;
  const {title, alt, url} = getCtx(m);
  switch (m.resource_type) {
    case 'image':
      return (
        <picture>
          {media.mobileFallback && (
            <source
              srcSet={getSrc(media.mobileFallback)}
              media="(max-width: 600px)"
            />
          )}
          <Image
            loading={media.hasLazyLoad ? 'lazy' : 'eager'}
            className={className}
            width={2000}
            height={2000}
            src={url}
            title={title}
            alt={alt}
          />
        </picture>
      );
    case 'video':
      return (
        <video
          className={className}
          controls={false}
          muted
          loop
          playsInline
          autoPlay
        >
          <source src={url} />
        </video>
      );
    default:
      return <></>;
  }
}
function getCtx(m: any) {
  const url = getSrc(m);
  const c = m.context;
  if (!c?.custom) return {title: '', alt: '', url};
  return {title: c.custom.caption, alt: c.custom.alt, url};
}
function getSrc(m: any) {
  if (!m.derived) return m.url;
  return m.derived[0].url;
}
