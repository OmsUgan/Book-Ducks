import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";

export default function SortHeader({ options, value, onChange }) {
  const selectedObj = options.find(o => o.key === value);

  return (
    <div className="flex items-center w-full lg:w-100 bg-gray-200 summer:bg-orange-100/60 pink:bg-rose-100/75 p-1 rounded-md">
        <p className="text-sm text-gray-700 summer:text-teal-700 pink:text-rose-700 px-2 w-full">Sortera efter:</p>
      <Listbox value={value} onChange={onChange}>

        <ListboxButton className="relative block w-full rounded-sm bg-gray-700 summer:bg-teal-800 pink:bg-rose-800 py-1.5 pr-8 pl-3 text-left text-sm/6 text-white">
          {selectedObj.label}
          <ChevronDownIcon className="group pointer-events-none absolute top-2.5 right-2.5 size-4 text-white" aria-hidden="true" />
        </ListboxButton>

        <ListboxOptions anchor="bottom" transition className={clsx('w-(--button-width) rounded-md bg-gray-700 summer:bg-teal-800 pink:bg-rose-800 p-1 [--anchor-gap:--spacing(1)] focus:outline-none', 'transition duration-100 ease-in data-leave:data-closed:opacity-0')}>
          {options.map(opt => (
            <ListboxOption key={opt.key} value={opt.key} className="group flex cursor-default items-center gap-2 rounded-lg px-3 py-1.5 select-none data-focus:bg-gray-600 summer:data-focus:bg-teal-600 pink:data-focus:bg-rose-600">
              <CheckIcon className="invisible size-4 fill-white group-data-selected:visible" />
              <div className="text-sm/6 text-white">{opt.label}</div>
            </ListboxOption>
          ))}
        </ListboxOptions>

      </Listbox>
    </div>
  )
}