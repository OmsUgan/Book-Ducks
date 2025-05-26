import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="grid place-items-center bg-gray-50 px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="mt-4 text-3xl font-semibold tracking-tight text-balance text-gray-700 sm:text-7xl">
            Oops!
          </p>
          <p className="mt-6 text-lg text-pretty text-gray-400 sm:text-xl/8">
            Vi kunde inte hitta den boken. Kontrollera stavningen eller prova något annat.
          </p>
          <div className="mt-10 items-center justify-center gap-x-6 inline-flex">
            <Link href={"/"} className="rounded-md bg-gray-800 px-3.5 py-2.5 text-sm/6 text-white shadow-xs hover:bg-gray-700 inline-flex gap-2 items-center">
                <ArrowLeftIcon className="size-5" />
                Gå till startsidan
            </Link>
          </div>
        </div>
      </div>
    )
}