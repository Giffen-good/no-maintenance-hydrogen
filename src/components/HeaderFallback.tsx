export function HeaderFallback({isHome}: {isHome?: boolean}) {
  return (
    <header
      role="banner"
      className={`h-nav lg:flex items-center fixed  z-40 top-0 justify-between w-full leading-none gap-8 py-8 gutter`}
    >
      <div className="flex space-x-4">
        <Box isHome={isHome} />
        <Box isHome={isHome} />
        <Box isHome={isHome} />
        <Box isHome={isHome} />
        <Box isHome={isHome} />
      </div>
      <Box isHome={isHome} wide={true} />
    </header>
  );
}

function Box({wide, isHome}: {wide?: boolean; isHome?: boolean}) {
  return (
    <div
      className={`h-6 rounded-sm ${wide ? 'w-32' : 'w-16'} ${
        isHome ? 'bg-primary/60' : 'bg-primary/20'
      }`}
    />
  );
}
