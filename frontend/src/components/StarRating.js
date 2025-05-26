"use client"

import { useState } from "react";
import { StarIcon as StarSolid } from "@heroicons/react/20/solid";
import { StarIcon as StarOutline } from "@heroicons/react/24/outline";

export default function StarRating({ initialRating = 0, onChange }) {
  const [hovered, setHovered] = useState(0);
  const [selected, setSelected] = useState(initialRating);

  const handleMouseEnter = (value) => setHovered(value)
  const handleMouseLeave = () => setHovered(0)
  const handleClick = (value) => {
    setSelected(value)
    onChange(value)
  }

  return (
    <div className="flex space-x-1">
      {[1,2,3,4,5].map((value) => {
        const isFilled = value <= (hovered || selected);
        return (
          <button
            key={value}
            type="button"
            onMouseEnter={() => handleMouseEnter(value)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(value)}
            className="focus:outline-none"
            aria-label={`Ge ${value} stjärnor`}
          >
            {isFilled
              ? <StarSolid className="size-8 text-yellow-400" />
              : <StarOutline className="size-8 text-gray-300 hover:text-yellow-400" />
            }
          </button>
        )
      })}
    </div>
  )
}