"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, KeyRound, Lock, ShieldAlert } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function NotAuthenticatedPage() {
  const [isHovering, setIsHovering] = useState(false);

  const funnyMessages = [
    "Looks like you forgot your VIP pass!",
    "This content is playing hard to get.",
    "Authentication required. No sneaking allowed!",
    "You shall not pass... without logging in first.",
  ];

  const [messageIndex] = useState(
    Math.floor(Math.random() * funnyMessages.length)
  );

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-secondary/30 to-accent/20">
      <div className="w-full max-w-4xl">
        <Card className="border-2 shadow-2xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Left side - Visual */}
            <div className="bg-primary p-8 md:p-12 flex flex-col items-center justify-center text-primary-foreground relative overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 left-10 w-32 h-32 border-4 border-primary-foreground rounded-full" />
                <div className="absolute bottom-10 right-10 w-24 h-24 border-4 border-primary-foreground rounded-lg rotate-45" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border-4 border-primary-foreground rounded-full" />
              </div>

              <div
                className="relative z-10 transition-transform duration-500 ease-out"
                style={{
                  transform: isHovering
                    ? "scale(1.1) rotate(5deg)"
                    : "scale(1) rotate(0deg)",
                }}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <div className="relative">
                  <Lock
                    className="w-32 h-32 md:w-40 md:h-40 mb-6"
                    strokeWidth={1.5}
                  />
                  <div className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-3 animate-bounce">
                    <ShieldAlert className="w-6 h-6" />
                  </div>
                </div>
              </div>

              <div className="relative z-10 text-center mt-6">
                <h3 className="text-xl md:text-2xl font-bold mb-2 text-balance">
                  Access Denied
                </h3>
                <p className="text-sm md:text-base opacity-90 text-pretty">
                  But we can fix that together!
                </p>
              </div>
            </div>

            {/* Right side - Content */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <div className="space-y-6">
                <div>
                  <div className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-medium mb-4">
                    <KeyRound className="w-4 h-4" />
                    Authentication Required
                  </div>

                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-balance leading-tight">
                    Oops! You&apos;re Not Logged In
                  </h1>

                  <p className="text-lg md:text-xl text-muted-foreground mb-2 text-pretty">
                    {funnyMessages[messageIndex]}
                  </p>

                  <p className="text-base text-muted-foreground text-pretty leading-relaxed">
                    To access this exclusive content, you&apos;ll need to
                    authenticate first. Don&apos;t worry, it&apos;s quick and
                    painless—we promise no pop quizzes!
                  </p>
                </div>

                <div className="space-y-3 pt-4">
                  <Link href="/signin" prefetch={false}>
                    <Button
                      size="lg"
                      className="w-full group text-base md:text-lg h-12 md:h-14"
                    >
                      Sign In to Continue
                      <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                  <Link href="/signin" prefetch={false}>
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full text-base md:text-lg h-12 md:h-14 bg-transparent"
                    >
                      Create an Account
                    </Button>
                  </Link>
                </div>

                <div className="pt-6 border-t">
                  <p className="text-sm text-muted-foreground text-center text-pretty">
                    Need help? Contact our support team—we&apos;re friendly, we
                    swear!
                    <br className="hidden sm:inline" />
                    That&apos;s just science. 🔬
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Footer note */}
        <div className="text-center mt-8 text-sm text-muted-foreground">
          <p className="text-pretty">
            Pro tip: Authenticated users get 100% more access to content.
            That&apos;s just science. 🔬
          </p>
        </div>
      </div>
    </div>
  );
}
