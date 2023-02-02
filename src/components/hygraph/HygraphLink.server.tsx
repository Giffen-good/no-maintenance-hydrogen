import {HygraphLinkProps} from '~/components/hygraph/types';

export const HygraphLink = ({
  children,
  link,
}: {
  children?: React.ReactNode;
  link: HygraphLinkProps;
}) => {
  console.log('link', link);
  return <div>{children}</div>;
};
