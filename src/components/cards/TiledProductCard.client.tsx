import clsx from 'clsx';
import {
  flattenConnection,
  Image,
  Link,
  Money,
  useMoney,
} from '@shopify/hydrogen';

import {Text} from '~/components';
import {isDiscounted, isNewArrival} from '~/lib/utils';
import {getProductPlaceholder} from '~/lib/placeholders';
import type {
  MoneyV2,
  Product,
  ProductVariant,
  ProductVariantConnection,
} from '@shopify/hydrogen/storefront-api-types';

export function TiledProductCard({
  product,
  label,
  className,
  loading,
  onClick,
  alternateDesktopLayout,
}: {
  product: Product;
  label?: string;
  className?: string;
  loading?: HTMLImageElement['loading'];
  onClick?: () => void;
  alternateDesktopLayout?: boolean;
}) {
  let cardLabel;

  const cardData = product?.variants ? product : getProductPlaceholder();
  const anyVariantInStock =
    product?.variants?.nodes.filter((variant) => variant.availableForSale)
      .length > 0;
  const {
    image,
    priceV2: price,
    compareAtPriceV2: compareAtPrice,
  } = flattenConnection<ProductVariant>(
    cardData?.variants as ProductVariantConnection,
  )[0] || {};
  if (label) {
    cardLabel = label;
  } else if (isDiscounted(price as MoneyV2, compareAtPrice as MoneyV2)) {
    cardLabel = 'Sale';
  } else if (isNewArrival(product.publishedAt)) {
    cardLabel = 'New';
  }
  const styles = alternateDesktopLayout
    ? {
        container: clsx(
          'grid gap-3 lg:gap-0 relative hide-on-desktop',
          className,
        ),
        text: clsx('lg:absolute bottom-0 left-0 w-full ', className),
      }
    : {
        container: clsx('grid gap-3', className),
        text: '',
      };
  return (
    <Link
      onClick={onClick}
      to={`/products/${product.handle}`}
      className={'text-primary product-card'}
    >
      <div className={styles.container}>
        <div className="card-image aspect-[4/5] bg-primary/5">
          <Text
            as="label"
            size="fine"
            className="absolute top-0 right-0 m-4 text-right text-notice"
          >
            {cardLabel}
          </Text>
          {image && (
            <Image
              className="aspect-[4/5] w-full object-cover fadeIn"
              widths={[320]}
              sizes="320px"
              loaderOptions={{
                crop: 'center',
                scale: 2,
                width: 320,
                height: 400,
              }}
              // @ts-ignore Stock type has `src` as optional
              data={image}
              alt={image.altText || `Picture of ${product.title}`}
              loading={loading}
            />
          )}
        </div>
        <div
          className={
            'bg-white transition-all duration-500 h-full w-full opacity-0 img-overlay absolute inset-0 left-0 top-0 '
          }
        ></div>
        <div
          className={`${styles.text} product-card-text-container py-0 lg:py-4 px-4`}
        >
          <div className={' flex justify-between'}>
            <Text className="w-full line-clamp-2" as="h3">
              {product.title}
            </Text>
            <div className="flex gap-4 pl-4">
              {anyVariantInStock ? (
                <Text className="flex gap-4">
                  <Money withoutTrailingZeros data={price!} />
                  {isDiscounted(
                    price as MoneyV2,
                    compareAtPrice as MoneyV2,
                  ) && (
                    <CompareAtPrice
                      className={'opacity-50'}
                      data={compareAtPrice as MoneyV2}
                    />
                  )}
                </Text>
              ) : (
                <span className="whitespace-nowrap text-copy">
                  <i>Sold out</i>
                </span>
              )}
            </div>
          </div>
          <div className={'flex flex-wrap -ml-2 pt-1'}>
            {product?.variants?.nodes &&
              product.variants.nodes.map((variant, idx) => (
                <h4 key={`variant-${idx}`} className={'inline px-2 text-copy'}>
                  {variant.availableForSale ? (
                    variant.title
                  ) : (
                    <s>{variant.title}</s>
                  )}
                </h4>
              ))}
          </div>
        </div>
      </div>
    </Link>
  );
}

function CompareAtPrice({
  data,
  className,
}: {
  data: MoneyV2;
  className?: string;
}) {
  const {currencyNarrowSymbol, withoutTrailingZerosAndCurrency} =
    useMoney(data);

  const styles = clsx('strike', className);

  return (
    <span className={styles}>
      {currencyNarrowSymbol}
      {withoutTrailingZerosAndCurrency}
    </span>
  );
}
