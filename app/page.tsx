import Link from "next/link";

export default function Page() {
  return (
    <div className="m-6 flex flex-col space-y-2.5">
      <p>hi, i&apos;m dastan</p>
      <ul className="list-disc list-inside">
        <li>i&apos;m a software engineer from Almaty, Kazakhstan.</li>
        <li>i&apos;ve been programming since 13.</li>
        <li>
          currently working at{" "}
          <a href="https://rette.ai" className="underline">
            rette.ai
          </a>
          .
        </li>
        <li>
          you might wanna look at what i&apos;ve{" "}
          <Link href="/projects" className="underline">
            built
          </Link>{" "}
          or{" "}
          <Link href="/blog" className="underline">
            written
          </Link>{" "}
          so far.
        </li>
      </ul>
    </div>
  );
}
