"use client";

import * as React from "react";

type DivProps = React.HTMLAttributes<HTMLDivElement>;

export function Card({ className = "", ...props }: DivProps) {
  return (
    <div
      className={
        "rounded-2xl border border-border bg-background shadow-sm " + className
      }
      {...props}
    />
  );
}

export function CardHeader({ className = "", ...props }: DivProps) {
  return (
    <div
      className={
        "p-4 md:p-5 border-b border-border/60 flex flex-col gap-1 " + className
      }
      {...props}
    />
  );
}

export function CardTitle({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={
        "text-base md:text-lg font-semibold leading-none tracking-tight " +
        className
      }
      {...props}
    />
  );
}

export function CardContent({ className = "", ...props }: DivProps) {
  return <div className={"p-4 md:p-5 " + className} {...props} />;
}
