import clsx from 'clsx';

export function Grid({
  as: Component = 'div',
  className,
  flow = 'row',
  gap,
  items = 4,
  layout = 'tiles',
  ...props
}: {
  as?: React.ElementType;
  className?: string;
  flow?: 'row' | 'col';
  gap?: 'default' | 'blog' | 'tiles' | 'hasAltTileLayoutOnDesktop';
  items?: number;
  layout?: 'default' | 'products' | 'auto' | 'blog' | 'tiles';
  [key: string]: any;
}) {
  const layouts = {
    default: `grid-cols-1 ${items === 2 && 'md:grid-cols-2'}  ${
      items === 3 && 'sm:grid-cols-3'
    } ${items > 3 && 'md:grid-cols-3'} ${items >= 4 && 'lg:grid-cols-4'}`,
    products: `grid-cols-2 ${items >= 3 && 'md:grid-cols-3'} ${
      items >= 4 && 'lg:grid-cols-4'
    }`,
    tiles: `grid-cols-2 ${items >= 3 && 'md:grid-cols-3'} ${
      items >= 4 && 'lg:grid-cols-4'
    } ${items >= 5 && 'xl:grid-cols-5'}`,
    auto: 'auto-cols-auto',
    blog: `grid-cols-2 pt-24`,
  };

  const gaps = {
    default: 'grid gap-2 gap-y-6 md:gap-4 lg:gap-6',
    blog: 'grid gap-6',
    tiles: 'grid gap-x-0 gap-y-8',
    hasAltTileLayoutOnDesktop: 'grid gap-x-0 gap-y-8 lg:gap-y-0',
  };

  const flows = {
    row: 'grid-flow-row',
    col: 'grid-flow-col',
  };

  const styles = clsx(
    flows[flow],
    gap && gaps[gap],
    layouts[layout],
    className,
  );

  return <Component {...props} className={styles} />;
}
