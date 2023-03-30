import {MenuItem} from '@shopify/hydrogen/storefront-api-types';
// @ts-expect-error @headlessui/react incompatibility with node16 resolution
import {Menu} from '@headlessui/react';

//className={'flex items-center'}
export function DropdownMenu({item}: {item: MenuItem}) {
  console.log(item);
  return (
    <Menu as="div" className="flex items-center">
      <Menu.Button className={'uppercase'}>{item.title}</Menu.Button>
      {/*<Menu.Item>*/}
      {/*  <div>menu Item</div>*/}
      {/*</Menu.Item>*/}
    </Menu>
  );
}

function MegaMenu({item}: {item: MenuItem}) {
  return (
    <div>
      <div>{item.title}</div>
      <div>{item.items?.map((item) => item.title)}</div>
    </div>
  );
}
