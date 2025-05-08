import type { ComponentProps } from "react";
import Link from "next/link";
import { redirectToUrl } from "@/actions/auth";

const AuthLink = (
  props:
    | ({ intercept?: true } & ComponentProps<typeof Link>)
    | ({ intercept: false; href: string } & ComponentProps<"a">),
) => {
  const allowIntercept = props.intercept !== false;

  if (allowIntercept) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { intercept, ...rest } = props;
    return <Link className="underline hover:no-underline" replace {...rest} />;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { href, intercept, ...rest } = props;

  return (
    <a
      className="focus-visible:border-ring focus-visible:ring-ring/50 cursor-pointer underline outline-none hover:no-underline focus-visible:ring-[3px]"
      tabIndex={0}
      onClick={(e) => {
        e.preventDefault();
        redirectToUrl(href);
      }}
      {...rest}
    />
  );
};

export default AuthLink;
