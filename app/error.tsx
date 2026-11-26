"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  retry,
}: {
  error: unknown;
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  // Server errors arrive without details; the digest matches the server log.
  const digest =
    error instanceof Object && "digest" in error ? String(error.digest) : null;

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 p-4 text-center">
      <p className="text-7xl font-bold tracking-tight text-muted-foreground">
        Oops
      </p>
      <h1 className="text-2xl font-semibold">Something went wrong</h1>
      <p className="max-w-sm text-muted-foreground">
        An unexpected error occurred. Please try again.
      </p>
      {digest && (
        <p className="text-xs text-muted-foreground">Error ID: {digest}</p>
      )}
      <div className="flex gap-2">
        <Button variant="outline" nativeButton={false} render={<Link href="/" />}>
          Back to home
        </Button>
        <Button onClick={() => retry()}>Try again</Button>
      </div>
    </main>
  );
}
