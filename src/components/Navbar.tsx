"use client";
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { redirect, usePathname, useRouter } from 'next/navigation'
import { PowerIcon } from "@heroicons/react/24/outline";

import { handleSignOut } from "@/lib/cognito_actions";
import useAuthUser from '@/app/hooks/auth_user';
const navigation = [
  { name: 'Dashboard', href: '/dashboard', current: false },
  { name: 'Submit Job', href: '/submit', current: false },
]
const userNavigation = [
  { name: 'Your Profile', href: '/profile' },
  { name: 'Settings', href: 'dashboard/settings' },

]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}
const Navbar = () => {
  const user = useAuthUser();
  const router = useRouter();
  const pathname = usePathname();

    // Update the navigation array to set the current page
    const updatedNavigation = navigation.map((item) => ({
      ...item,
      current: pathname === item.href,
    }));

  return (
    <Disclosure as="nav" className="bg-[#45503B]">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1
                className="text-white font-bold"
                role="button"
                onClick={() => router.push('/')}
              >
                  Capstone SCA
              </h1>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    aria-current={item.current ? 'page' : undefined}
                    className={classNames(
                      item.current ? 'bg-[#6C7C59] text-white' : 'text-gray-300 hover:bg-[#6c7c5941] hover:text-white',
                      'rounded-md px-3 py-2 text-sm font-medium',
                    )}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              {/* Profile dropdown */}
              <Menu as="div" className="relative ml-3">
                <div>
                  <MenuButton className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                    <img alt=""
                    src={"https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/ec350a95-5964-4f25-a60e-64226bea331a/d7q63ai-53a292fd-5171-4cca-bb57-75d5ebe3d555.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2VjMzUwYTk1LTU5NjQtNGYyNS1hNjBlLTY0MjI2YmVhMzMxYVwvZDdxNjNhaS01M2EyOTJmZC01MTcxLTRjY2EtYmI1Ny03NWQ1ZWJlM2Q1NTUucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.j-dKg9D9eiuNc3FSvSIE9AcYGN6R1lQ6pXhk8VdQVEQ"}
                    className="h-8 w-8 rounded-full" />
                  </MenuButton>
                </div>
                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  {userNavigation.map((item) => (
                    <MenuItem key={item.name}>
                      <a
                        href={item.href}
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                      >
                        {item.name}
                      </a>
                    </MenuItem>
                  ))}
                  {user?.isAdmin && <MenuItem>
                    <a
                      href={'/dashboard/admin'}
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                      Admin Page
                    </a>
                  </MenuItem>}
                  <MenuItem key={'Sign Out'}>
                    <form action={handleSignOut}>
                      <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
                        <PowerIcon className="w-6" />
                        <div className="hidden md:block">Sign Out</div>
                      </button>
                    </form>
                  </MenuItem>
                </MenuItems>
              </Menu>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            {/* Mobile menu button */}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
            </DisclosureButton>
          </div>
        </div>
      </div>

      <DisclosurePanel className="md:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              aria-current={item.current ? 'page' : undefined}
              className={classNames(
                item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                'block rounded-md px-3 py-2 text-base font-medium',
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
        <div className="border-t border-gray-700 pb-3 pt-4">
          <div className="flex items-center px-5">
            <div className="flex-shrink-0">
              <img alt="" src={user?.imageUrl} className="h-10 w-10 rounded-full" />
            </div>
            <div className="ml-3">
              <div className="text-base font-medium leading-none text-white">{user?.name}</div>
              <div className="text-sm font-medium leading-none text-gray-400">{user?.email}</div>
            </div>
            <button
              type="button"
              className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <span className="absolute -inset-1.5" />
              <span className="sr-only">View notifications</span>
              <BellIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-3 space-y-1 px-2">
            {userNavigation.map((item) => (
              <DisclosureButton
                key={item.name}
                as="a"
                href={item.href}
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
              >
                {item.name}
              </DisclosureButton>
            ))}
          </div>
        </div>
      </DisclosurePanel>
    </Disclosure>
  )
}

export default Navbar