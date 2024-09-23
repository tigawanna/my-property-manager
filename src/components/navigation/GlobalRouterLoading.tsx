interface GlobalRouterLoadingProps {}

export function GlobalRouterLoading({}: GlobalRouterLoadingProps) {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center gap-2">
      <div className="w-full h-[40vh] bg-base-300 skeleton rounded-lg" />
      <div className="w-full flex flex-col md:flex-row items-center justify-center'">
        <div className="w-full h-[40vh] bg-base-300 skeleton rounded-lg" />
        <div className="w-full h-[40vh] bg-base-300 skeleton rounded-lg" />
      </div>
    </div>
  );
}
