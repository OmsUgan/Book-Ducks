"use client"

import toast from "react-hot-toast";
import { CheckCircleIcon } from '@heroicons/react/24/outline'

export function toaster (notificationText) {
    toast.custom(t => (
        <div className={`${ t.visible ? 'animate-enter' : 'animate-leave' } pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black/15 transition`}>
            <div className="p-4">
                <div className="flex items-start">
                    <div className="shrink-0">
                        <CheckCircleIcon aria-hidden="true" className="size-6 text-green-700" />
                    </div>
                    <div className="ml-3 w-0 flex-1 pt-0.5">
                        <p className="text-sm/6 text-gray-700">{ notificationText }</p>
                    </div>
                </div>
            </div>
        </div>
    ));
}