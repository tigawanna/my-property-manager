import { Link } from "@tanstack/react-router";
import { useViewer } from "@/lib/tanstack/query/use-viewer";
import { ArrowRightIcon } from "lucide-react";
import { FlipClock } from "@/components/flip-clock/DigitalFlipClock";
import { ProfileLinkCard } from "./HomeComponents";
import { Helmet } from "@/components/wrappers/custom-helmet";
import { ResponsiveGenericToolbar } from "./ResponsiveGenericToolbar";

export function HomePage() {
  const { viewer } = useViewer();
  return (
    <div
      data-test="homepage"
      className="justify-center flex h-full min-h-screen w-full flex-col items-center overflow-auto bg-gradient-to-br from-primary/60 via-red/60 to-primary/30"
    >
      <Helmet
        title="My property manager"
        description="Welcome to your property manager"
      />
      {/* <picture className="fixed inset-0 z-0 size-full">
        <source
          media="(min-width:350px)"
          className="size-full object-fill"
          srcSet="https://picsum.photos/id/56/300/300"
        />
        <source
          media="(min-width:465px)"
          className="size-full object-fill"
          srcSet="https://picsum.photos/id/56/500/500"
        />
        <source
          media="(min-width:865px)"
          className="size-full object-fill"
          srcSet="https://picsum.photos/id/56/800/800"
        />
        <img
          src="https://picsum.photos/id/56/500/500"
          alt="main bg"
          className="size-full object-fill"
        />
      </picture> */}
      <ResponsiveGenericToolbar>
        <div className="flex h-full  w-full flex-col items-center justify-center gap-5 p-3 ">
          <div
            data-test="homepage-section"
            className="grid grid-cols-1 justify-center gap-[5%]  *:flex *:items-center *:rounded-xl *:bg-base-200/40 *:p-5 md:grid-cols-2 lg:w-[80%] lg:grid-cols-2"
          >
            <h1
              data-test="homepage-section-welcome"
              className="break-all text-7xl font-bold text-primary"
            >
              welcome {viewer?.username}
            </h1>
            <FlipClock />
            {viewer && <ProfileLinkCard viewer={viewer} />}
            <div
              data-test="homepage-section-links"
              className="min-h-fit w-full justify-center gap-5 text-4xl"
            >
              {viewer ? (
                <Link
                  to="/dashboard"
                  data-test="homepage-section--dashboard-link"
                  className="group flex items-center justify-center"
                >
                  Proceed to Dashboard
                  <ArrowRightIcon className="size-10 group-hover:animate-ping group-hover:text-secondary" />
                </Link>
              ) : (
                <Link
                  className="group flex items-center justify-center gap-2"
                  to="/auth"
                  search={{ returnTo: "/dashboard" }}
                >
                  Login
                  <ArrowRightIcon className="size-10 group-hover:animate-ping group-hover:text-secondary" />
                </Link>
              )}
            </div>
          </div>
          <div className="h-24 w-full -z-10 " />
        </div>
      </ResponsiveGenericToolbar>
    </div>
  );
}
