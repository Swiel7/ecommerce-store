import type { ComponentProps } from "react";
import Link from "next/link";
import { redirectToUrl } from "@/actions/auth";

const AuthLink = (
  props:
    | ({ intercept?: true } & ComponentProps<typeof Link>)
    | ({ intercept: false; href: string } & ComponentProps<"button">),
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
    <button
      type="button"
      className="underline hover:no-underline"
      onClick={async () => {
        redirectToUrl(href);
      }}
      {...rest}
    />
  );
};

export default AuthLink;
