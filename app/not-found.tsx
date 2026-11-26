import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 p-4 text-center">
      <p className="text-7xl font-bold tracking-tight text-muted-foreground">
        404
      </p>
      <h1 className="text-2xl font-semibold">Page not found</h1>
      <p className="max-w-sm text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Button nativeButton={false} render={<Link href="/" />}>
        Back to home
      </Button>
    </main>
  );
}
