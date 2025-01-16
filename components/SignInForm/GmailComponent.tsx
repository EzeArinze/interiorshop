import { signInWithGmail } from "@/actions/auth";
import React, { useTransition } from "react";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

function GmailComponent() {
  const [isPending, startTransition] = useTransition();

  const handleGmailSignIn = () => {
    startTransition(async () => {
      const result = await signInWithGmail();
      if (result.success) {
        alert("Successfully signed In");
      }
    });
  };

  return (
    <>
      <div className="mt-4 relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <div className="m-4">
        <Button
          type="button"
          variant="outline"
          className="w-full rounded font-semibold text-gray-800"
          onClick={handleGmailSignIn}
          disabled={isPending}
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Signing In...
            </>
          ) : (
            <>Sign in with Gmail</>
          )}
        </Button>
      </div>
    </>
  );
}

export default GmailComponent;
