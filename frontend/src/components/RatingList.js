"use client"

import { StarIcon, TrashIcon } from "@heroicons/react/24/outline";
import AverageRating from "@/components/AverageRating";
import Link from "next/link";

export default function RatingList({ratingList, onDelete}) {
    const userRatingList = ratingList.map(rating => {
        return (
            <div className="rounded-lg bg-white overflow-hidden h-full flex flex-col border border-gray-300 shadow-sm" key={rating.documentId}>
                <Link href={`/books/${rating.book.documentId}/${rating.book.slug}`}>
                    <div className="relative pt-[150%]">
                        <img src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${rating.book.coverImage?.url}`} className="absolute inset-0 w-full h-full object-full" />
                    </div>

                    <div className="flex flex-col p-6 pb-3">
                        <p className="text-xl font-semibold line-clamp-2 text-gray-700">{rating.book.title}</p>
                        <p className="text-sm text-gray-500">{rating.book.authors.map((author) => author.name).join(", ")}</p>
                    </div>
                </Link>

                <div className="p-6 pt-0 space-y-2 flex-grow">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-700 text-sm">Sidor:</span>
                        <span className="text-gray-700 text-sm">{rating.book.pages}</span>
                    </div>

                    <div className="flex justify-between text-sm">
                        <span className="text-gray-700 text-sm">Lanserad:</span>
                        <span className="text-gray-700 text-sm">{rating.book.publicationDate}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <AverageRating bookId={rating.book.documentId} showAverageText={true} />
                    </div>
                </div>
                

                <div className="items-center p-6 flex flex-col gap-2 pt-2">
                    <button readOnly className="rounded-md bg-gray-800 summer:bg-teal-800 pink:bg-rose-800 px-3.5 py-2.5 text-sm/6 text-white shadow-xs inline-flex items-center justify-center gap-2 w-full">
                        <StarIcon className="size-5" />
                        {rating.rating}
                    </button>
                    <button onClick={() => onDelete("ratings", rating.documentId)} className="cursor-pointer rounded-md ring-1 ring-gray-400 px-3.5 py-2.5 text-sm/6 text-gray-700 shadow-xs hover:bg-gray-200 hover:ring-gray-200 hover:text-gray-900 inline-flex items-center justify-center gap-2 w-full">
                        <TrashIcon className="size-5" />
                        Ta bort
                    </button>
                </div>
            </div>
        )
    })

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6 pt-10">
           { userRatingList.length > 0 ? userRatingList : <p className="text-center text-gray-700 col-span-full">Inga böcker i &quot;Betygsatta&quot; listan!</p> }
        </div>
    )
}