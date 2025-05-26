"use client"

import { TrashIcon } from "@heroicons/react/24/outline";
import AverageRating from "@/components/AverageRating";
import Link from "next/link";

export default function WishList({wishList, onDelete}) {
    const userWishList = wishList.map(wish => {
        return (
                <div className="rounded-lg bg-white overflow-hidden h-full flex flex-col border border-gray-300 shadow-sm" key={wish.documentId}>
                    <Link href={`/books/${wish.book.documentId}/${wish.book.slug}`}>
                        <div className="relative pt-[150%]">
                            <img src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${wish.book.coverImage?.url}`} className="absolute inset-0 w-full h-full object-full" />
                        </div>

                        <div className="flex flex-col p-6 pb-3">
                            <p className="text-xl font-semibold line-clamp-2 text-gray-700">{wish.book.title}</p>
                            <p className="text-sm text-gray-500">{wish.book.authors.map((author) => author.name).join(", ")}</p>
                        </div>
                    </Link>

                    <div className="p-6 pt-0 space-y-2 flex-grow">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-700 text-sm">Sidor:</span>
                            <span className="text-gray-700 text-sm">{wish.book.pages}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-700 text-sm">Lanserad:</span>
                            <span className="text-gray-700 text-sm">{wish.book.publicationDate}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <AverageRating bookId={wish.book.documentId} showAverageText={true} />
                        </div>
                    </div>

                    <div className="items-center p-6 flex flex-col gap-2 pt-2">
                        {/* <button className="cursor-pointer rounded-md bg-gray-800 px-3.5 py-2.5 text-sm/6 text-white shadow-xs hover:bg-gray-700 inline-flex items-center justify-center gap-2 w-full">
                            <StarIcon className="size-5" />
                            Betygsätt
                        </button> */}
                        <button onClick={() => onDelete("wishlists", wish.documentId)} className="cursor-pointer rounded-md ring-1 ring-gray-400 px-3.5 py-2.5 text-sm/6 text-gray-700 shadow-xs hover:bg-gray-200 hover:ring-gray-200 hover:text-gray-900 inline-flex items-center justify-center gap-2 w-full">
                            <TrashIcon className="size-5" />
                            Ta bort
                        </button>
                    </div>
                </div>
            
        )
    })

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6 pt-10">
           { userWishList.length > 0 ? userWishList : <p className="text-center text-gray-700 col-span-full">Inga böcker i &quot;Att läsa&quot; listan!</p> }
        </div>
    )
}