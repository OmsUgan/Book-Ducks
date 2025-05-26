"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PostAsync } from "@/lib/api";
import { ArrowPathIcon } from "@heroicons/react/20/solid";
import { toaster } from "@/lib/toaster";

export default function LoginForm() {
    const router = useRouter();
    const [loginForm, setLoginForm] = useState({ identifier: "", password: "" });
    const [errorMessage, setErrorMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setLoginForm(prev => ({ ...prev, [name]: value }));
    }

    const handleLogin = async (event) => {
        event.preventDefault();
        setErrorMessage(null);
        setIsLoading(true);

        try {
            await PostAsync("/api/auth/login", loginForm);
            await new Promise(time => setTimeout(time, 2000));
            
            toaster("Inloggning lyckades. Välkommen!");
            router.push("/user/profile");
        } catch (error) {
            setErrorMessage(error?.errorMessage || "Ett oväntat fel inträffade");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <div>
                <p className="mt-2 text-center text-gray-700 summer:text-teal-600 pink:text-rose-700">
                    Logga in för att få åtkomst till din läslista och betyg.
                </p>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[680px]">
                <div className="bg-white px-6 py-12 shadow-sm sm:rounded-lg sm:px-12">

                    <div>
                        <h2 className="text-2xl/9 font-medium text-gray-700 summer:text-teal-700 pink:text-rose-700">Logga in</h2>
                        <p className="mt-1 mb-8 text-sm/6 text-gray-500 summer:text-teal-500 pink:text-rose-500">
                            Ange dina inloggningsuppgifter för att komma åt ditt konto
                        </p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}

                        <div>
                            <label htmlFor="identifier" className="block text-sm/6 font-semibold text-gray-700 summer:text-teal-700 pink:text-rose-700">E-postadress eller användarnamn</label>
                            <div className="mt-2">
                                <input name="identifier" value={loginForm.identifier} onChange={handleChange} className="block w-full rounded-md bg-gray-100 px-3 py-2 text-base text-gray-700 summer:text-teal-700 pink:text-rose-700 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-700 sm:text-sm/6" required />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm/6 font-semibold text-gray-700 summer:text-teal-700 pink:text-rose-700">Lösenord</label>
                            <div className="mt-2">
                                <input type="password" name="password" value={loginForm.password} onChange={handleChange} className="block w-full rounded-md bg-gray-100 px-3 py-2 text-base text-gray-700 summer:text-teal-700 pink:text-rose-700 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-700 sm:text-sm/6" required />
                            </div>
                        </div>

                        <div>
                            <button type="submit" disabled={isLoading} className="w-full rounded-md bg-gray-800 px-3.5 py-2.5 text-sm/6 text-white shadow-xs hover:bg-gray-700 summer:bg-teal-800 summer:hover:bg-teal-700 pink:bg-rose-800 pink:hover:bg-rose-400">
                                { isLoading ? 
                                    (
                                        <>
                                            <ArrowPathIcon className="size-6 animate-spin mx-auto inline-flex" /> Loggar in...
                                        </>
                                    ) : "Logga in"
                                }
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </>
    )
}