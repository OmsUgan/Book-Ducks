"use client"

import { useState, useEffect } from "react";
import RatingList from "@/components/RatingList";
import WishList from "@/components/WishList";
import SortHeader from "@/components/SortHeader";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { toaster } from "@/lib/toaster";
import { apiDelete } from "@/lib/api";

const WISHLIST_OPTIONS = [
    { key: 'titleAsc',   label: 'Titel (A-Ö)' },
    { key: 'authorAsc',  label: 'Författare (A-Ö)' },
];

const RATING_OPTIONS = [
    { key: 'titleAsc',   label: 'Titel (A-Ö)' },
    { key: 'authorAsc',  label: 'Författare (A-Ö)' },
    { key: 'ratingDesc', label: 'Betyg (Högst–Lägst)' },
];

export default function ProfilePage() {
    const [username, setUsername] = useState("");
    const [wishList, setWishList] = useState([]);
    const [ratingList, setRatingList] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    const [wishlistSort, setWishlistSort] = useState(WISHLIST_OPTIONS[0].key);
    const [ratingSort,   setRatingSort]   = useState(RATING_OPTIONS[0].key);

    useEffect(() => {
        setLoading(true);

        fetch("/api/user/profile")
            .then(response => response.json())
            .then(data => {
                setUsername(data.data.username);
                setWishList(data.data.wishlists);
                setRatingList(data.data.ratings);
                setLoading(false);
            })
            .catch((error) => {
                setErrorMessage(error);
                setLoading(false);
            });
    }, []);

    const handleDelete = async (endpoint, documentId) => {
        try {
            if (endpoint === "wishlists") {
                await apiDelete(`/api/wishlists/${documentId}`);
                setWishList(wishList => wishList.filter(wish => wish.documentId !== documentId));
            } else {
                await apiDelete(`/api/ratings/${documentId}`);
                setRatingList(ratingList => ratingList.filter(rating => rating.documentId !== documentId));
            }

            toaster("Boken är nu borttagen från listan!");
        } catch (error) {
            console.error("Error deleting:", error);
        }
    }

    function sortBooks(arr, option) {
        const copy = [...arr]
        switch(option) {
            case 'titleAsc':
                return copy.sort((a, b) => {
                  const aTitle = a.book.title.trim();
                  const bTitle = b.book.title.trim();
                  return aTitle.localeCompare(bTitle, 'sv', { sensitivity: 'base' });
                });
        case 'authorAsc':
            return copy.sort((a, b) => {
            const aA = a.book.authors.map(x=>x.name).join(', ');
            const bA = b.book.authors.map(x=>x.name).join(', ');
            return aA.localeCompare(bA, 'sv');
            });
        case 'ratingDesc':
            return copy.sort((a, b) => b.rating - a.rating);
        default:
            return copy
        }
    }

    const sortedWish  = sortBooks(wishList, wishlistSort);
    const sortedRate  = sortBooks(ratingList, ratingSort);

    return (
        <>
            <div className="min-h-full py-12 sm:px-6 max-w-7xl mx-auto px-3">
                <div className="text-center">
                    <h2 className="text-2xl/9 font-semibold text-gray-700 summer:text-teal-700 pink:text-rose-700">Välkommen tillbaka { username }</h2>
                    <p className="mt-1 mb-8 text-sm/6 text-gray-700 summer:text-teal-700 pink:text-rose-700">
                        Nedan kan du bläddra igenom dina listor för &quot;Att läsa&quot; och &quot;Betygsatta böcker&quot;.
                    </p>
                </div>

                <TabGroup>
                    <TabList className="h-10 rounded-md bg-gray-200 summer:bg-orange-100/60 pink:bg-rose-100/75 p-1 text-muted-foreground grid grid-cols-2 sm:mx-auto sm:w-full">
                        <Tab key="wishlist" className="rounded-sm px-3 py-1 text-sm/6 text-gray-700 summer:text-teal-700 pink:text-rose-700 focus:not-data-focus:outline-none data-focus:outline data-hover:bg-white/5 data-selected:text-white data-selected:bg-gray-700 summer:data-selected:bg-teal-800 pink:data-selected:bg-rose-800">
                            Att läsa
                        </Tab>

                        <Tab key="ratinglist" className="rounded-sm px-3 py-1 text-sm/6 text-gray-700 summer:text-teal-700 pink:text-rose-700 focus:not-data-focus:outline-none data-focus:outline data-hover:bg-white/5 data-selected:text-white data-selected:bg-gray-700 summer:data-selected:bg-teal-800 pink:data-selected:bg-rose-800">
                            Betygsatta
                        </Tab>
                    </TabList>

                    <TabPanels className="mt-3">
                        { errorMessage ? errorMessage : null }

                        { loading ? 
                                <div className="mt-8 flex-col items-center justify-items-center justify-center">
                                    <ArrowPathIcon className="size-8 animate-spin text-gray-700 summer:text-teal-700" />
                                    <p className="text-gray-700 summer:text-teal-700 pt-2">Laddar listan...</p>
                                </div>
                            :
                                <>
                                    {/* Att läsa */}
                                    <TabPanel key="wishlist">
                                        {sortedWish.length > 0 && (
                                            <div className='flex items-center justify-end'>
                                                <SortHeader
                                                    options={WISHLIST_OPTIONS}
                                                    value={wishlistSort}
                                                    onChange={setWishlistSort}
                                                />
                                            </div>
                                        )}
                                        <WishList wishList={sortedWish} onDelete={handleDelete} />
                                    </TabPanel>
                                    {/* Att läsa */}

                                    {/* Betyg */}
                                    <TabPanel key="ratinglist">
                                        {sortedRate.length > 0 && (
                                            <div className='flex items-center justify-end'>
                                                <SortHeader
                                                    options={RATING_OPTIONS}
                                                    value={ratingSort}
                                                    onChange={setRatingSort}
                                                />
                                            </div>
                                        )}
                                        <RatingList ratingList={sortedRate} onDelete={handleDelete} />
                                    </TabPanel>
                                    {/* Betyg */}
                                </>
                            }
                    </TabPanels>
                </TabGroup>
            </div>
        </>
    )
}