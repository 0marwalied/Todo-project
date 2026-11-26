import { SignIn } from "@clerk/nextjs";
import { Suspense } from "react";

export default function Page() {
  return (
    <div className="flex flex-1 items-center justify-center p-4">
      <Suspense>
        <SignIn />
      </Suspense>
    </div>
  );
}
