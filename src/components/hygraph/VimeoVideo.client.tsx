import Vimeo from '@u-wave/react-vimeo';

// @todo — Create Vimeo Video Component
export const VimeoVideoClient = ({
  id,
  className,
}: {
  id: string;
  className: string;
}) => {
  return <Vimeo video={id} autoplay className={className} />;
};
