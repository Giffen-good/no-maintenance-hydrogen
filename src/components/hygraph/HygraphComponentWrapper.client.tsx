import {ReactNode} from 'react';

export const HygraphComponentWrapperClient = ({
  children,
}: {
  children: ReactNode;
}) => {
  return <section>{children}</section>;
};
