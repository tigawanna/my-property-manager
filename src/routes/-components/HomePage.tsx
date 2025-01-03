import { Link } from "@tanstack/react-router";
import { useViewer } from "@/lib/tanstack/query/use-viewer";
import { ArrowRightIcon } from "lucide-react";
import { FlipClock } from "@/components/flip-clock/DigitalFlipClock";
import { ProfileLinkCard } from "./HomeComponents";
import { GenericToolbar } from "./GenericToolbar";

export function HomePage() {
  const { viewer } = useViewer();
  return (
    <div className="jusify-center flex h-full min-h-screen w-full flex-col items-center bg-gradient-to-br from-primary/60 via-accent/60 to-primary/30 ">
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

      <div className="z-10 flex h-full min-h-screen w-full flex-col items-center justify-evenly gap-5 bg-base-300/70">
        <div className="fixed left-0 right-6 top-5 w-full">
          <GenericToolbar />
        </div>
        <div className="*:justfy-center grid grid-cols-1 justify-center gap-2 p-[5%] *:flex *:items-center *:rounded-xl *:bg-base-300/40 *:p-5 md:grid-cols-2 lg:grid-cols-2">
          <h1 className="text-7xl font-bold text-primary">
            welcome {viewer?.username}
          </h1>

          <FlipClock />
          {/* <RealTimeClock /> */}
          {viewer && <ProfileLinkCard viewer={viewer} />}
          {/* <div className="text-4xl hover:bg-primary-content/30">
          </div> */}
          <div className="text-4xl hover:bg-primary-content/30">
            {viewer ? (
              <Link
                to="/dashboard"
                className="group flex items-center justify-center gap-2"
              >
                Proceed to Dashboard
                <ArrowRightIcon className="size-10 group-hover:animate-ping group-hover:text-secondary" />
              </Link>
            ) : (
              <Link to="/auth" search={{ returnTo: "/dashboard" }}>
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
