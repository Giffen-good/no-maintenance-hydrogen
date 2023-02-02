import {HygraphMedia} from '~/components/hygraph/types';
import {Image, Video} from '@shopify/hydrogen';
import {Nullable} from "vitest";

export const HygraphMediaServer = ({
  media,
  className,
}: {
  media: Nullable<HygraphMedia>;
  className: string;
}) => {
  if (!media) return null;
  const {mimeType, url} = media;
  const t = mimeType.split('/')[0];
  switch (t) {
    case 'image':
      return (
        <Image
          className={className}
          width={2000}
          height={2000}
          src={url}
          alt={'TODO add image alt'}
        />
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
};
