"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { signIn } from "@/actions/auth";
import GmailComponent from "./GmailComponent";
import SubmitButton from "./SubmitButton";

export default function SignInForm() {
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const result = await signIn(formData);
    if (result.error) {
      setMessage({ type: "error", text: result.error });
    } else if (result.success) {
      setMessage({ type: "success", text: result.success });
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="font-bold text-xl">Sign In</CardTitle>
        <CardDescription>
          Sign in with your email or Gmail account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="gmail@example.com"
                required
                className="rounded"
              />
            </div>
            {message && (
              <div
                className={`p-3 rounded-md text-sm ${
                  message.type === "error"
                    ? "bg-red-100 text-red-800"
                    : "bg-green-100 text-green-800"
                }`}
              >
                {message.type === "error" && (
                  <AlertCircle className="inline-block w-4 h-4 mr-2" />
                )}
                {message.text}
              </div>
            )}
            <SubmitButton />
          </div>
        </form>
      </CardContent>

      <GmailComponent />
    </Card>
  );
}
