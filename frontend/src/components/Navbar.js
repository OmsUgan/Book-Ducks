"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogBackdrop, DialogPanel, Menu, MenuButton, MenuItem, MenuItems, MenuSeparator } from "@headlessui/react";
import { Bars3Icon, UserIcon, XMarkIcon, ChevronDownIcon, ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { toaster } from "@/lib/toaster";

const navigation = {
  pages: [
    { name: 'Hem', href: '/' },
    { name: 'Böcker', href: '/books' },
  ],
}

export default function Navbar() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true)

    fetch('/api/auth/me')
      .then(response => response.json())
      .then(data => {
        setUser(data.user)
        setIsLoading(false)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [pathname]);

  async function handleLogout(e) {
    e.preventDefault();
    try {
      const res = await fetch('/api/auth/logout', { method: 'POST' });
      if (res.ok) {
        toaster("Du har loggats ut!");
        router.push('/login');
      } else {
        console.error('Något gick fel vid utloggning');
      }
    } catch {
      console.error('Kunde inte logga ut, nätverksfel');
    }
  }

  return (
    <div>
      {/* Mobile menu */}
      <Dialog open={open} onClose={setOpen} className="relative z-40 lg:hidden">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-closed:opacity-0"
        />

        <div className="fixed inset-0 z-40 flex">
          <DialogPanel
            transition
            className="relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-white pb-12 shadow-xl transition duration-300 ease-in-out data-closed:-translate-x-full"
          >
            <div className="flex px-4 pt-5 pb-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>

            <div className="space-y-6 px-4 py-6">
              {navigation.pages.map(page => (
                <div key={page.name} className="flow-root">
                  <a href={page.href} className="-m-2 block p-2 font-medium text-gray-900">
                    {page.name}
                  </a>
                </div>
              ))}
            </div>

            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              <div className="flow-root">
                <a href="#" className="-m-2 block p-2 font-medium text-gray-900">
                  Create an account
                </a>
              </div>
              <div className="flow-root">
                <a href="#" className="-m-2 block p-2 font-medium text-gray-900">
                  Sign in
                </a>
              </div>
            </div>

          </DialogPanel>
        </div>
      </Dialog>

      <header className="relative">
        <nav aria-label="Top">
          {/* Top navigation */}
            <div className="bg-gray-900 summer:bg-teal-900 pink:bg-rose-900">
            <div className="mx-auto flex h-10 max-w-7xl items-center justify-end px-4 sm:px-6 lg:px-8">
              <div className="flex items-center space-x-6">
                {user ? 
                  null : (<a href="#" className="text-sm font-medium text-white hover:text-gray-200 summer:text-teal-50 summer:hover:text-teal-100">
                  Skapa ett konto
                </a>)}
              </div>
            </div>
          </div>

          {/* Secondary navigation */}
          <div className="bg-white shadow-sm summer:bg-orange-50">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
               <div> {/*<div className="border-b border-gray-200"></div> */}
                <div className="flex h-16 items-center justify-between">
                  {/* Logo (lg+) */}
                  <div className="hidden lg:flex lg:flex-1 lg:items-center">
                    <Link href={`/`}>
                      <span className="text-xl font-medium text-gray-700 hover:text-gray-800 summer:text-teal-700 summer:hover:text-teal-900 pink:text-rose-700 pink:hover:text-rose-800">BookDucks</span>
                    </Link>
                  </div>

                  <div className="hidden h-full lg:flex">
                    {/* Flyout menus */}
                      <div className="flex h-full justify-center space-x-8">
                        {navigation.pages.map(page => (
                          <Link href={page.href} className="flex items-center text-sm/6 font-medium text-gray-700 hover:text-gray-800 summer:text-teal-700 summer:hover:text-teal-900 pink:text-rose-700 pink:hover:text-rose-800" key={page.name}>
                            {page.name}
                          </Link>
                        ))}
                      </div>
                  </div>

                  {/* Mobile menu and search (lg-) */}
                  <div className="flex flex-1 items-center lg:hidden">
                    <button
                      type="button"
                      onClick={() => setOpen(true)}
                      className="-ml-2 rounded-md bg-white p-2 text-gray-400"
                    >
                      <span className="sr-only">Open menu</span>
                      <Bars3Icon aria-hidden="true" className="size-6" />
                    </button>
                  </div>

                  <div className="flex flex-1 items-center justify-end">
                    <div className="flex items-center lg:ml-8">

                      <div className="ml-4 flow-root lg:ml-8">
                        {isLoading ? (
                          <span className="text-sm/6 font-medium text-gray-700 summer:text-teal-700 pink:text-rose-700">Hämtar användare...</span>
                        ) : user ? (
                          <>
                          <Menu>
                            <MenuButton className="cursor-pointer inline-flex items-center bg-white summer:bg-teal-700 gap-2 rounded-md px-3 py-1.5 text-sm/6 font-semibold text-white focus:not-data-focus:outline-none data-hover:bg-gray-200 data-open:bg-gray-200 summer:data-hover:bg-teal-600 summer:data-open:bg-teal-600">
                              <UserIcon aria-hidden="true" className="size-6 shrink-0 text-gray-600 group-hover:text-gray-800 summer:text-white" />
                              <span className="text-sm/6 font-medium text-gray-700 group-hover:text-gray-800 summer:text-white">{user.username}</span>
                              <ChevronDownIcon className="ml-1 size-4 text-gray-700 summer:text-white" />
                            </MenuButton>

                            <MenuItems transition anchor="bottom end"
                              className="w-52 origin-top-right rounded-xl border border-gray-400/20 bg-gray-200 summer:bg-teal-600 p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0"
                            >
                              
                              <MenuItem className="cursor-pointer group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-sm/6 text-gray-700 summer:text-white data-focus:bg-gray-700  summer:data-focus:bg-teal-700 data-focus:text-white">
                                <div>
                                  <Link href={"/user/profile"} className='group flex items-center gap-2'>
                                    <UserIcon className="size-5 fill-white/10" />
                                    Min sida
                                  </Link>
                                </div>
                              </MenuItem>
                              <MenuSeparator className="my-1 h-px bg-gray-300" />
                              <MenuItem className="cursor-pointer group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-sm/6 text-gray-700 summer:text-white data-focus:bg-gray-700 summer:data-focus:bg-teal-700 data-focus:text-white">
                                <div>
                                  <Link href={""} onClick={handleLogout} className='group flex items-center gap-2'>
                                      <ArrowRightStartOnRectangleIcon className="size-5 fill-white/10" />
                                      Logga ut
                                  </Link>
                                </div>
                              </MenuItem>
                            </MenuItems>
                          </Menu>
                          </>
                        ) : (
                          <Link href={`/login`} className="group -m-2 flex items-center p-2 ">
                              <UserIcon aria-hidden="true" className="size-6 shrink-0 text-gray-600 group-hover:text-gray-800 summer:text-teal-700 summer:group-hover:text-teal-900 pink:group-hover:text-rose-800 pink:text-rose-700 pink:hover:text-rose-800" />
                              <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800 summer:text-teal-700 summer:group-hover:text-teal-900 pink:group-hover:text-rose-800 pink:text-rose-700 pink:hover:text-rose-800">Logga in</span>
                          </Link>
                        )}

                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  )
}
