import {
  HygraphComponentGeneralConfig,
  HygraphHexColor,
} from '~/components/hygraph/types';
import {HygraphComponentWrapperClient} from './HygraphComponentWrapper.client';
import {Nullable} from 'vitest';
import {ReactNode} from 'react';
import type * as CSS from 'csstype';
import {getCSS} from '~/lib';
import clsx from 'clsx';

export const HygraphComponentWrapper = ({
  config,
  children,
  id,
}: {
  children?: ReactNode;
  config: Nullable<HygraphComponentGeneralConfig>;
  id: string;
}) => {
  if (!config)
    return (
      <HygraphComponentWrapperClient>{children}</HygraphComponentWrapperClient>
    );

  const {configClasses, configCSS} = processConfig(config);
  const classes = clsx(`component--${id}`, configClasses);
  return (
    <HygraphComponentWrapperClient>
      <div className={classes} style={configCSS}>
        {children}
      </div>
    </HygraphComponentWrapperClient>
  );
};

const processConfig = (
  config: HygraphComponentGeneralConfig,
): {configClasses: string; configCSS: CSS.Properties} => {
  const {backgroundColor, hasGutter, margin, textColor} = config;
  return {
    configClasses: getConfigClasses(hasGutter, margin),
    configCSS: getCSS(backgroundColor, textColor),
  };
};
const getConfigClasses = (
  hasGutter: Nullable<boolean>,
  margin: Nullable<'None' | 'Small' | 'Medium' | 'Large'>,
): string => {
  const opts = {
    None: 'section-margin--none',
    Small: 'section-margin--small',
    Medium: 'section-margin--medium',
    Large: 'section-margin--large',
  };

  return clsx(margin && opts[margin], {
    gutter: hasGutter,
  });
};
