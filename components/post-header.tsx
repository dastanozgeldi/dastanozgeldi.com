import { Suspense } from "react";
import { formatDate } from "@/lib/formatters";
import Views from "./views";

export default function PostHeader({
  slug,
  metadata,
}: {
  slug: string;
  metadata: {
    title: string;
    description: string;
    date: string;
  };
}) {
  return (
    <header className="space-y-2.5">
      <h1 className="text-2xl font-bold">{metadata.title}</h1>
      <p className="text-sm text-muted-foreground flex items-center justify-between">
        <span>
          {formatDate(metadata.date, {
            short: true,
          }).toLowerCase()}
        </span>
        <Suspense fallback={<>... views</>}>
          <Views slug={slug} />
        </Suspense>
      </p>
      <p className="text-sm text-muted-foreground">{metadata.description}</p>
    </header>
  );
}
