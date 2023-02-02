export const PAGINATION_SIZE = 8;
export const DEFAULT_GRID_IMG_LOAD_EAGER_COUNT = 4;
export const ATTR_LOADING_EAGER = 'eager';

export const COMPONENT_DEFAULTS = {
  CONTENT_TILE_ASPECT_RATIO: 'aspect_1x1',
}
export const SEO_TITLE_TEMPLATE = '%s | No Maintenance';
export function getImageLoadingPriority(
  index: number,
  maxEagerLoadCount = DEFAULT_GRID_IMG_LOAD_EAGER_COUNT,
) {
  return index < maxEagerLoadCount ? ATTR_LOADING_EAGER : undefined;
}
