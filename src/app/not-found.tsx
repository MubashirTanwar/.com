import Link from "next/link";
import { CloseButton } from "@/components/shell/CloseButton";

export default function NotFound() {
  return (
    <div className="pb-6">
      <CloseButton />
      <div className="mx-auto max-w-md rounded-3xl border border-[#d9dbde] dark:border-[#242424] bg-white dark:bg-[#141414] p-8 text-center">
        <h1 className="text-3xl text-[#1f1f1f] dark:text-[#cccccc]">Nothing here</h1>
        <p className="mt-3 text-stone-500">That page doesn&apos;t exist.</p>
        <Link href="/" className="mt-6 inline-block underline underline-offset-4 text-[#1f1f1f] dark:text-[#cccccc]">
          Back home
        </Link>
      </div>
    </div>
  );
}
