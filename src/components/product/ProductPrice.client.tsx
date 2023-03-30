import {Money, useProductOptions} from '@shopify/hydrogen';

export function ProductPriceClient() {
  const {selectedVariant} = useProductOptions();
  const {price, compareAtPrice} = selectedVariant || {};

  if (!selectedVariant) return null;
  const isOnSale =
    selectedVariant?.priceV2?.amount <
      selectedVariant?.compareAtPriceV2?.amount || false;

  return (
    <span className="flex flex-col pl-2">
      <Money
        withoutTrailingZeros
        data={selectedVariant.priceV2!}
        as="span"
        className={' text-heading'}
      />
      {isOnSale && (
        <Money
          withoutTrailingZeros
          data={selectedVariant.compareAtPriceV2!}
          as="span"
          className="opacity-50 strike  text-heading"
        />
      )}
    </span>
  );
}
