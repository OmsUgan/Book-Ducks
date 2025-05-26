"use client"

import { GetAsync } from "@/lib/api";
import Link from "next/link";
import { useState, useEffect } from "react";

const BookSkeleton = () => (
  <div className="group relative animate-pulse rounded-md">
    <div className="bg-gray-300 h-64 rounded-md"></div>
    <div className="mt-3">
      <div className="h-4 bg-gray-300 w-3/4 rounded-md"></div>
      <div className="h-3 bg-gray-300 w-1/2 mt-2 rounded-md"></div>
    </div>
  </div>
);

export default function HomePageBookList() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await GetAsync("/api/books?pLevel=2");
        await new Promise(time => setTimeout(time, 1500));
        setBooks(response);
      } catch (err) {
        setError('Kunde inte hämta böcker. Försök igen senare.');
      } finally {
        setIsLoading(false);
      }
    }
    fetchBooks();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

    return (
        <>
        {isLoading ? (
        <div className="bg-gray-200 summer:bg-orange-100 pink:bg-rose-100">
          <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8">
            <h2 className="text-2xl font-bold tracking-tight text-gray-700">Utvalda böcker</h2>
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {[...Array(8)].map((_, index) => (
                <BookSkeleton key={index} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-gray-200 summer:bg-orange-100 pink:bg-rose-100">
          <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8">
            <h2 className="text-2xl font-bold tracking-tight text-gray-700">Utvalda böcker</h2>
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {books.data.slice(0, 8).map(book => (
                <div key={book.documentId} className="group relative">
                  <img alt={book.title} src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${book.coverImage?.url}`} className="aspect-square rounded-md object-full group-hover:opacity-75 lg:aspect-auto lg:h-80" />
                  <div className="mt-3">
                    <div>
                      <p className="text-sm text-gray-700">
                        <Link href={`/books/${book.documentId}/${book.slug}`}>
                          <span aria-hidden="true" className="absolute inset-0" />
                          {book.title}
                        </Link>
                      </p>
                      <p className="text-sm text-gray-500">
                        {book.authors.map(author => author.name).join(", ")}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
        </>
    )
}