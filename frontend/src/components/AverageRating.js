"use client"

import { useState, useEffect} from "react";
import { GetAsync } from "@/lib/api";
import { StarIcon } from "@heroicons/react/24/outline";

export default function AverageRating({bookId, showAverageText}) {
    const [averageRating, setAverageRating] = useState(0);
    const [ratingList, setRatingList] = useState([]);

    const fetchRatingsByBookId = async (documentId) => {
        try {
            const response = await GetAsync(`/api/ratings?populate=book&filters[book][documentId][$eq]=${documentId}`);
            setRatingList(response.data);
        } catch (err) {
            setError('Kunde inte hämta betyg med böcker. Försök igen senare.');
        }
    }

    useEffect(() => {
        fetchRatingsByBookId(bookId);
    }, [bookId]);

    useEffect(() => {
        const calculateAverageRating = () => {
        let sumRating = 0;
        ratingList.forEach(rating => {
            sumRating += rating.rating;
        });

        const avg = ratingList.length > 0 ? sumRating / ratingList.length : 0;
            setAverageRating(avg);
        };

        calculateAverageRating();
    }, [ratingList]);

    return (
        <>
            {showAverageText ? <p className="text-sm/6 text-gray-700 mb-1">Snittbetyg:</p> : null}
            <div className="flex gap-2 items-center">
                <div className="flex items-center">
                        <StarIcon key={"star"} className="size-6 text-yellow-300 fill-yellow-300 shrink-0" />
                </div>

                <span className="text-gray-700 summer:text-teal-700 text-sm/6">{averageRating.toFixed(1)}</span>
            </div>
        </>
    )
}