"use client"

import { useState, useEffect, useCallback  } from "react";
import { useParams } from "next/navigation";
import { StarIcon } from "@heroicons/react/20/solid";
import { Tab, TabGroup, TabList, TabPanel, Dialog, DialogPanel, DialogTitle, DialogBackdrop } from "@headlessui/react";
import { notFound } from "next/navigation";
import AverageRating from "@/components/AverageRating";
import StarRating from "@/components/StarRating";
import { BookmarkIcon } from "@heroicons/react/24/outline";
import { apiGet, apiPost } from "@/lib/api";
import { toaster } from '@/lib/toaster';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function BookBySlugPage() {
  const { documentId } = useParams();
  const [book, setBook] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [ratingValue, setRatingValue] = useState(0);
  const [saving, setSaving] = useState(false);
  const [user, setUser] = useState(null);
  const [myRating, setMyRating] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(null);

  const fetchBook = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await apiGet(`/api/books/${documentId}`);
      setBook(response.data);
    } catch (err) {
      setErrorMessage('Kunde inte hämta boken.');
    } finally {
      setIsLoading(false);
    }
  }, [documentId]);

  useEffect(() => {
    if (documentId) fetchBook();
  }, [documentId, fetchBook]);

  useEffect(() => {
    fetch('/api/auth/me')
      .then(response => response.json())
      .then(data => {
        setUser(data.user);
      })
      .catch((error) => {
        console.error(error);
      })
  }, []);


  useEffect(() => {
    if (user && book) {
      const rating = book?.ratings?.find(r => r.user.documentId === user.documentId)?.rating;
      setMyRating(rating || 0);
    }

    if (user && book) {
      const wishlists = book.wishlists || []
      const currentUserId = user?.documentId
      setIsWishlisted(wishlists.some(w => w.user.documentId === currentUserId));
    }
  }, [user, book]);

  const handleSaveRating = async (event) => {
    event.preventDefault();
    if (ratingValue === 0) return
    setSaving(true);

    try {
      await apiPost("/api/ratings", {
        bookId: documentId,
        rating: ratingValue,
        userId: user.documentId
      });
      
      setIsOpen(false);
      toaster("Ditt betyg är sparat!");

      setRatingValue(0);
      await fetchBook();           
    } catch (error) {
      setErrorMessage(error?.errorMessage || "Ett oväntat fel inträffade");
    } finally {
      setSaving(false);
    }
  }

  const handleSaveWishlist = async (event) => {
    event.preventDefault();
    if (isWishlisted) return
    setSaving(true);

    try {
      await apiPost("/api/wishlists", {
        bookId: documentId,
        userId: user.documentId
      });
      
      toaster(`Du har lagt till boken i "Att läsa" listan!`);

      await fetchBook();
    } catch (error) {
      setErrorMessage(error?.errorMessage || "Ett oväntat fel inträffade");
    } finally {
      setSaving(false);
    }
  }

  if (book?.error?.status === 404) notFound();
  if (isLoading) return <div>Laddar...</div>
  if (errorMessage) return notFound();

  const formatDateTime = (datetime) => new Intl.DateTimeFormat('sv-SE', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(datetime));

  return (
    <div className="mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="lg:grid lg:grid-cols-7 lg:grid-rows-1 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16">
          <div className="lg:col-span-3 lg:row-end-1">
            <img alt={book.title} src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${book.coverImage?.url}`} className="aspect-4/5 w-full rounded-md bg-gray-100 object-full" />
          </div>

          <div className="mx-auto mt-14 max-w-2xl sm:mt-16 lg:col-span-4 lg:row-span-2 lg:row-end-2 lg:mt-0 lg:w-150">
            <div className="flex flex-col">

              <div className="mt-4">
                <h1 className="text-2xl font-bold tracking-tight text-gray-700 summer:text-teal-700 pink:text-rose-700 sm:text-3xl">{book.title}</h1>
                <p className="mt-2 text-sm/6 text-gray-500 summer:text-teal-600 pink:text-rose-600">
                  {book.authors.map((author) => author.name).join(", ")}
                </p>
              </div>

              <div>
                <div className="flex justify-between items-center mt-4">
                  <p className="text-sm/6 text-gray-700 summer:text-teal-700">Snittbetyg:</p> 
                  <AverageRating bookId={book.documentId} showAverageText={false} />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mt-4">
                  <p className="text-sm/6 text-gray-700 summer:text-teal-700">Antal sidor:</p> 
                  <p className="text-sm text-gray-700 summer:text-teal-700">{book.pages}</p>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mt-4">
                  <p className="text-sm/6 text-gray-700 summer:text-teal-700">Utgivningsdatum:</p> 
                  <p className="text-sm text-gray-700 summer:text-teal-700">{book.publicationDate}</p>
                </div>
              </div>
            </div>
            

            { user ? 
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                <button onClick={handleSaveWishlist} disabled={ saving || isWishlisted } className={`cursor-pointer rounded-md bg-gray-800 summer:bg-teal-800 pink:bg-rose-800 px-3.5 py-2.5 text-sm/6 text-white shadow-xs ${!isWishlisted ? "cursor-pointer hover:bg-gray-700 summer:hover:bg-teal-700 pink:hover:bg-rose-400" : null} inline-flex gap-2 items-center justify-center w-full`}>
                  <BookmarkIcon className={`size-5 ${ isWishlisted ? 'text-rose-400 fill-rose-400 pink:text-white pink:fill-white' : null } shrink-0`} />
                  {saving ? "Sparar..." : isWishlisted ? `I din "Att Läsa" lista` : `Spara i "Att Läsa" lista` }
                </button>

                <button onClick={!myRating ? () => setIsOpen(true) : null}  type="button" className={`rounded-md ring-1 ring-gray-400 pink:ring-rose-900 px-3.5 py-2.5 text-sm/6 text-gray-700 summer:text-teal-700 pink:text-rose-800 shadow-xs ${!myRating ? "cursor-pointer hover:bg-gray-200 hover:ring-gray-200" : null} hover:text-gray-900 summer:hover:text-teal-900 pink:hover:text-rose-900 inline-flex items-center justify-center gap-2 w-full`}>
                  <StarIcon className="size-5 shrink-0" />
                  {myRating ? myRating : "Betygsätt"}
                </button>

                <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-10">
                  <form onSubmit={handleSaveRating}>
                    <DialogBackdrop transition className="fixed inset-0 bg-gray-700/60 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in" />
                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                      <div className="flex min-h-full items-center justify-center p-4">
                        <DialogPanel transition className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-closed:sm:translate-y-0 data-closed:sm:scale-95">
                          <div>
                            <div className="text-center">
                              <DialogTitle className="text-base font-medium text-gray-700">
                                Betygsätt &quot;{ book.title }&quot;
                              </DialogTitle>
                              <div className="mt-2">

                                <div className="mt-2 flex justify-center">
                                  <StarRating initialRating={ratingValue} onChange={(val) => setRatingValue(val)} />
                                </div>

                              </div>
                            </div>
                          </div>
                          <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                            <button type="submit" disabled={saving} className="cursor-pointer rounded-md bg-gray-800 px-3.5 py-2.5 text-sm/6 text-white shadow-xs hover:bg-gray-700 inline-flex gap-2 items-center justify-center w-full sm:col-start-2">
                              {saving ? 'Sparar...' : 'Spara'}
                            </button>
                            <button type="button" onClick={() => setIsOpen(false)} className="cursor-pointer rounded-md ring-1 ring-gray-400 px-3.5 py-2.5 text-sm/6 text-gray-700 shadow-xs hover:bg-gray-200 hover:ring-gray-200 hover:text-gray-900 inline-flex items-center justify-center gap-2 w-full">
                              Avbryt
                            </button>
                          </div>
                        </DialogPanel>
                      </div>
                    </div>
                  </form>
                </Dialog>

              </div>
            :
              null
            }
          </div>

          <div className="mx-auto mt-16 w-full max-w-2xl lg:col-span-4 lg:mt-0 lg:max-w-none">
            <TabGroup>
              <div className="border-b border-gray-200">
                <TabList className="-mb-px flex space-x-8">
                  <Tab className="border-b-2 border-transparent py-6 text-sm font-medium whitespace-nowrap text-gray-700 hover:border-gray-300 hover:text-gray-800 data-selected:border-indigo-600 data-selected:text-indigo-600">
                    Betyg
                  </Tab>
                </TabList>
              </div>
              <TabPanel className="-mb-10">
                { book.ratings.length > 0 ? 
                  (book.ratings.map((review, reviewIdx) => (
                      <div key={review.id} className="flex space-x-4 text-sm text-gray-500">
                        <div className={classNames(reviewIdx === 0 ? '' : 'border-t border-gray-200', 'py-5')}>
                          <p className="text-sm/6 font-medium text-gray-700">{review.user.username}</p>

                          <p className="text-sm text-gray-500">{ formatDateTime(review.createdAt) }</p>

                          <div className="mt-2 flex items-center">
                            {[0, 1, 2, 3, 4].map((rating) => (
                              <StarIcon
                                key={rating}
                                aria-hidden="true"
                                className={classNames(
                                  review.rating > rating ? 'text-yellow-400' : 'text-gray-300',
                                  'size-5 shrink-0',
                                )}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                  )))
                :
                  <p className="mt-5 text-gray-700">Det finns inget betyg för den här boken just nu!</p>
                }
              </TabPanel>
            </TabGroup>
          </div>
        </div>
    </div>
  );
}