"use client";

import { GetAsync } from "@/lib/api";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function BooksPage() {
    const [books, setBooks] = useState([]);
    const [page, setPage] = useState(1);
    const [isInitialLoading, setIsInitialLoading] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [error, setError] = useState(null);

    const fetchBooks = async (pageNumber) => {
        try {
            const url = new URL('/api/books?populate=*', process.env.NEXT_PUBLIC_STRAPI_API_URL);
            url.searchParams.append('pagination[page]', pageNumber);
            url.searchParams.append('pagination[pageSize]', 8);
            url.searchParams.append('pagination[withCount]', true);

            const apiUrl = `${url.pathname}${url.search}`;
            const response = await GetAsync(apiUrl);
      
            await new Promise((time) => setTimeout(time, 1500));

            if (response.data.length === 0 || response.meta.pagination.page >= response.meta.pagination.pageCount) {
                setHasMore(false);
            }

            setBooks((prev) => [
                ...prev,
                ...response.data.filter(
                  (book) => !prev.some((b) => b.documentId === book.documentId)
                ),
            ]);
        } catch (err) {
            setError("Kunde inte hämta böcker.");
        } finally {
            setIsInitialLoading(false);
            setIsLoadingMore(false);
        }
    };
      
    useEffect(() => {
        fetchBooks(page);
    }, [page]);

    const handleLoadMore = () => {
        setIsLoadingMore(true);
        setPage((prev) => prev + 1);
    };

    const bookCard = books.map(book => {
        return (
            <div key={book.documentId} className="group relative">
                <img alt={book.title} src={`http://localhost:1337${book.coverImage?.url}`} className="aspect-square rounded-md object-full group-hover:opacity-75 lg:aspect-auto lg:h-80" />
                <div className="mt-3">
                    <p className="text-sm text-gray-700 ">
                        <Link href={`/books/${book.documentId}/${book.slug}`}>
                            <span aria-hidden="true" className="absolute inset-0" />
                            {book.title}
                        </Link>
                    </p>
                    <p className="text-sm text-gray-500">
                        { book.authors.map((author) => author.name).join(", ") }
                    </p>
                </div>
            </div>
        )
    });

    const BookSkeleton = () => (
        <div className="group relative animate-pulse rounded-md">
            <div className="bg-gray-300 h-64 rounded-md"></div>
            <div className="mt-3">
                <div className="h-4 bg-gray-300 w-3/4 rounded-md"></div>
                <div className="h-3 bg-gray-300 w-1/2 mt-2 rounded-md"></div>
            </div>
        </div>
    );

    return (
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8">
            <div className="text-center">
                <h2 className="text-2xl/9 font-semibold text-gray-700 summer:text-teal-700 pink:text-rose-700">Böcker</h2>
                <p className="mt-1 mb-8 text-sm/6 text-gray-700 summer:text-teal-700 pink:text-rose-700">
                    Nedan kan du bläddra igenom alla böcker som vi har registrerat.
                </p>
            </div>

            {isInitialLoading ? (
                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {[...Array(8)].map((_, index) => (
                        <BookSkeleton key={index} />
                    ))}
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        { bookCard.length > 0 ? bookCard : <p className="text-center text-gray-700 col-span-full">Finns inga böcker registrerad!</p> }

                    </div>
                    {hasMore && !isLoadingMore && (
                        <div className="mt-8 flex justify-center">
                            <button onClick={handleLoadMore} className="cursor-pointer rounded-md bg-gray-800 summer:bg-teal-800 pink:bg-rose-800 px-3.5 py-2.5 text-sm/6 text-white shadow-xs hover:bg-gray-700 summer:hover:bg-teal-700 pink:hover:bg-rose-400 inline-flex items-center justify-center gap-2">
                                Ladda in fler böcker
                            </button>
                        </div>
                    )}

                    {isLoadingMore && (
                        <div className="mt-8 flex-col items-center justify-items-center justify-center">
                            <ArrowPathIcon className="size-8 animate-spin text-gray-700 summer:text-teal-700 pink:text-rose-700" />
                            <p className="text-gray-700 summer:text-teal-700 pink:text-rose-700 pt-2">Laddar fler böcker...</p>
                        </div>
                    )}
            
                    {!hasMore && (
                        <div className="mt-8 text-center text-gray-700">Inga fler böcker att visa.</div>
                    )}
                </>
            )}

            {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
    );
}
