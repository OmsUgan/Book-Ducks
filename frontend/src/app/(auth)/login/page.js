"use client"

import LoginForm from "@/components/LoginForm";
import RegisterForm from "@/components/RegisterForm";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";

export default function LoginPage() {
    return (
        <>
            {/* <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8"></div> */}
            <div className="py-12 sm:px-6 lg:px-8">
                <TabGroup className="p-3">
                    <TabList className="h-10 items-center justify-center rounded-md bg-gray-200 summer:bg-orange-100/60 pink:bg-rose-100/75 p-1 text-muted-foreground grid grid-cols-2 sm:mx-auto sm:w-full sm:max-w-[680px]">
                        <Tab key="login" className="rounded-sm px-3 py-1 text-sm/6 text-gray-700 summer:text-teal-700 pink:text-rose-700 focus:not-data-focus:outline-none data-focus:outline data-hover:bg-white/5 data-selected:text-white data-selected:bg-gray-700 summer:data-selected:bg-teal-800 pink:data-selected:bg-rose-800">
                            Logga in
                        </Tab>

                        <Tab key="register" className="rounded-sm px-3 py-1 text-sm/6 text-gray-700 summer:text-teal-700 pink:text-rose-700 focus:not-data-focus:outline-none data-focus:outline data-hover:bg-white/5 data-selected:text-white data-selected:bg-gray-700 summer:data-selected:bg-teal-800 pink:data-selected:bg-rose-800">
                            Registrera dig
                        </Tab>
                    </TabList>

                    <TabPanels className="mt-3">
                        <p className="mt-10 text-center text-2xl/9 font-semibold text-gray-700 summer:text-teal-700 pink:text-rose-700">
                            Välkommen till BookDucks
                        </p>

                        {/* Logga in */}
                        <TabPanel key="login" className="rounded-xl">
                            <LoginForm />
                        </TabPanel>
                        {/* Logga in */}

                        {/* Skapa konto */}
                        <TabPanel key="register" className="rounded-xl">
                            <RegisterForm />
                        </TabPanel>
                        {/* Skapa konto */}

                    </TabPanels>
                </TabGroup>
            </div>
        </>
    )
}