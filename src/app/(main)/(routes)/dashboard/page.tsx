'use client'
import useAuthUser from '@/app/hooks/auth_user';
import Navbar from '@/components/Navbar'

export default function Page() {;
  return (
      <>
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

            <div className='font-bold text-3xl'>
              <h1>Dashboard content</h1>
            </div>
          </div>
        </main>
      </>
  )
}
