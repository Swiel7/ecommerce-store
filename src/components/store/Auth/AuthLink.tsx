import type { ComponentProps } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { redirectToUrl } from "@/lib/actions/auth";

type AuthLinkProps =
  | ({ intercept?: true } & ComponentProps<typeof Link>)
  | ({ intercept: false; href: string } & ComponentProps<"a">);

const AuthLink = (props: AuthLinkProps) => {
  const allowIntercept = props.intercept !== false;

  if (allowIntercept) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { intercept, ...rest } = props;

    return (
      <Button variant="link" size="sm" className="px-0 font-medium" asChild>
        <Link replace {...rest} />
      </Button>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { href, intercept, ...rest } = props;

  return (
    <Button variant="link" size="sm" className="px-0 font-medium" asChild>
      <a
        tabIndex={0}
        onClick={(e) => {
          e.preventDefault();
          redirectToUrl(href);
        }}
        {...rest}
      />
    </Button>
  );
};

export default AuthLink;
