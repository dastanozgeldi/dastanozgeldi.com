import Link from "next/link";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <div className="border-b my-6" />
      <div className="mb-3 flex items-center justify-between">
        <Button asChild variant="outline">
          <Link href="/blog">
            <ArrowLeftIcon className="size-4" /> see all posts
          </Link>
        </Button>

        <Button variant="outline" asChild>
          <Link href="/projects">
            see projects <ArrowRightIcon className="size-4" />
          </Link>
        </Button>
      </div>
    </>
  );
}
