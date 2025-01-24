import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function OrderSuccess() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <h1 className="text-4xl font-bold mb-4">Order Successful!</h1>
      <p className="text-xl mb-8">Thank you for your purchase.</p>
      <Button asChild>
        <Link href="/">Return to Home</Link>
      </Button>
    </div>
  );
}
