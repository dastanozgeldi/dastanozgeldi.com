import Link from "next/link";

export default function Page() {
  return (
    <div className="mb-6 flex items-center justify-center">
      <div className="flex flex-col space-y-2.5">
        <p>hi, i'm dastan</p>
        <ul className="list-disc list-inside">
          <li>i&apos;m an 18 y.o. builder from Almaty, Kazakhstan.</li>
          <li>i've been programming since 13.</li>
          <li>
            i'm a software engineer at{" "}
            <a href="https://rette.ai" className="underline">
              rette.ai
            </a>
            .
          </li>
          <li>
            you might wanna look at what i've{" "}
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
    </div>
  );
}
