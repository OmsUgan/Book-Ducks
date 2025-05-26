"use client"

import Link from "next/link";
import { useState, useEffect } from "react";
import { BookOpenIcon, UsersIcon } from "@heroicons/react/24/outline";

export default function Hero() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    fetch("/api/auth/me")
      .then(response => response.json())
      .then(data => {
        setUser(data.user);
      })
      .catch((error) => {
        console.error(error)
      })
  }, []);

  return (
    <div>
      <div className="relative isolate overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto py-32 sm:py-48 lg:py-28">
            <div className="text-center">
              <h1 className="text-5xl font-semibold tracking-tight text-balance text-gray-700 summer:text-teal-700 pink:text-red-700 sm:text-7xl">
                Välkommen till BookDucks boksamling 
              </h1>
              <p className="mt-8 text-lg font-medium text-pretty text-gray-500 summer:text-teal-600 pink:text-rose-600 sm:text-xl/8">
              Din digitala portal till litterär utforskning. Upptäck böcker, bygg din läslista och dela dina betyg.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link href={"/books"} className="rounded-md bg-gray-800 px-3.5 py-2.5 text-sm/6 text-white shadow-xs hover:bg-gray-700 summer:bg-teal-800 summer:hover:bg-teal-700 pink:bg-rose-800 pink:hover:bg-rose-400 inline-flex gap-2 items-center" key="books">
                  <BookOpenIcon aria-hidden="true" className="size-5 text-white" />
                  Bläddra bland böcker
                </Link>
                
                {user ? 
                  null : 
                  (<Link href={"/login"} className="rounded-md ring-1 ring-gray-400 px-3.5 py-2.5 text-sm/6 text-gray-700 shadow-xs hover:bg-gray-950/20 hover:ring-gray-950/20 hover:text-gray-900 inline-flex gap-2 items-center" key="login">
                    <UsersIcon aria-hidden="true" className="size-5 text-gray-700 hover:text-gray-900" />
                    Gå med i BookDucks
                  </Link>) 
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
