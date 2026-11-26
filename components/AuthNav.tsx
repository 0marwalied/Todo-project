"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Show, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

// On /sign-in show only "Sign up", on /sign-up only "Sign in", elsewhere both.
const AuthNav = () => {
  const pathname = usePathname();
  const onSignIn = pathname.startsWith("/sign-in");
  const onSignUp = pathname.startsWith("/sign-up");

  return (
    <>
      <Show when="signed-out">
        {!onSignIn && (
          <Button
            variant="outline"
            nativeButton={false}
            render={<Link href="/sign-in" />}
          >
            Sign in
          </Button>
        )}
        {!onSignUp && (
          <Button nativeButton={false} render={<Link href="/sign-up" />}>
            Sign up
          </Button>
        )}
      </Show>
      <Show when="signed-in">
        <UserButton />
      </Show>
    </>
  );
};

export default AuthNav;
