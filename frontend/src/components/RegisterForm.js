"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PostAsync } from "@/lib/api";
import { ArrowPathIcon } from "@heroicons/react/20/solid";
import { toaster } from "@/lib/toaster";

export default function RegisterForm() {
    const router = useRouter();
    const [registerForm, setRegisterForm] = useState({ username: "", email: "", password: "" });
    const [errorMessage, setErrorMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setRegisterForm(prev => ({ ...prev, [name]: value }));
    }

    const handleRegister = async (event) => {
        event.preventDefault();
        setErrorMessage(null);
        setIsLoading(true);

        try {
            await PostAsync("/api/auth/register", registerForm);
            await new Promise(time => setTimeout(time, 2000));

            toaster("Registreringen lyckades! Välkommen ombord!");
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
                    Skapa ett nytt konto för att påbörja din läsresa.
                </p>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[680px]">
                <div className="bg-white px-6 py-12 shadow-sm sm:rounded-lg sm:px-12">

                    <div>
                        <h2 className="text-2xl/9 font-medium text-gray-700 summer:text-teal-700 pink:text-rose-700">Skapa ett konto</h2>
                        <p className="mt-1 mb-8 text-sm/6 text-gray-500 summer:text-teal-500 pink:text-rose-500">
                            Ange dina uppgifter för att skapa ett nytt konto
                        </p>
                    </div>

                    <form onSubmit={handleRegister} className="space-y-6">
                        {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}
                        
                        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                            {/* <div>
                                <label htmlFor="firstname" className="block text-sm/6 font-semibold text-gray-700">Förnamn</label>
                                <div className="mt-2">
                                    <input name="firstname" value={registerForm.firstname} onChange={handleChange} className="block w-full rounded-md bg-gray-100 px-3 py-2 text-base text-gray-700 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-700 sm:text-sm/6" required />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="lastname" className="block text-sm/6 font-semibold text-gray-700">Efternamn</label>
                                <div className="mt-2">
                                    <input name="lastname" value={registerForm.lastname} onChange={handleChange} className="block w-full rounded-md bg-gray-100 px-3 py-2 text-base text-gray-700 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-700 sm:text-sm/6" required />
                                </div>
                            </div> */}

                            <div className="sm:col-span-2">
                                <label htmlFor="username" className="block text-sm/6 font-semibold text-gray-700 summer:text-teal-700 pink:text-rose-700">Användarnamn</label>
                                <div className="mt-2">
                                    <input name="username" value={registerForm.username} onChange={handleChange} className="block w-full rounded-md bg-gray-100 px-3 py-2 text-base text-gray-700 summer:text-teal-700 pink:text-rose-700 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-700 sm:text-sm/6" required />
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="email" className="block text-sm/6 font-semibold text-gray-700 summer:text-teal-700 pink:text-rose-700">E-postadress</label>
                                <div className="mt-2">
                                    <input type="email" name="email" value={registerForm.email} onChange={handleChange} className="block w-full rounded-md bg-gray-100 px-3 py-2 text-base text-gray-700 summer:text-teal-700 pink:text-rose-700 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-700 sm:text-sm/6" required />
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="password" className="block text-sm/6 font-semibold text-gray-700 summer:text-teal-700 pink:text-rose-700">Lösenord</label>
                                <div className="mt-2">
                                    <input type="password" name="password" value={registerForm.password} onChange={handleChange} className="block w-full rounded-md bg-gray-100 px-3 py-2 text-base text-gray-700 summer:text-teal-700 pink:text-rose-700 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-700 sm:text-sm/6" required />
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <button type="submit" disabled={isLoading} className="w-full rounded-md bg-gray-800 px-3.5 py-2.5 text-sm/6 text-white shadow-xs hover:bg-gray-700 summer:bg-teal-800 summer:hover:bg-teal-700 pink:bg-rose-800 pink:hover:bg-rose-400">
                                    { isLoading ? 
                                        (
                                            <>
                                                <ArrowPathIcon className="size-6 animate-spin mx-auto inline-flex" /> Skapar konto...
                                            </>
                                        ) : 'Skapa konto' 
                                    }
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}