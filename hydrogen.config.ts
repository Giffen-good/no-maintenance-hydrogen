import {defineConfig, CookieSessionStorage} from '@shopify/hydrogen/config';

export default defineConfig({
  shopify: {
    defaultCountryCode: 'US',
    defaultLanguageCode: 'EN',
    storeDomain:
      // @ts-ignore
      import.meta.env.VITE_PUBLIC_STOREFRONT_DOMAIN,
    storefrontToken: import.meta.env.VITE_PUBLIC_STOREFRONT_API_TOKEN,
    storefrontApiVersion: import.meta.env.VITE_STOREFRONT_API_VERSION,
    // @ts-ignore
    storefrontId: import.meta.env.VITE_STOREFRONT_ID,
    privateStorefrontToken: import.meta.env.VITE_PRIVATE_STOREFRONT_API_TOKEN,
  },
  session: CookieSessionStorage('__session', {
    path: '/',
    httpOnly: true,
    secure: import.meta.env.PROD,
    sameSite: 'Strict',
    maxAge: 60 * 60 * 24 * 30,
  }),
});
