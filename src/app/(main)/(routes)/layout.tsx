import Navbar from '@/components/Navbar'

export default function Layout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
    return (
      <section className="min-h-full">
        {/* Include shared UI here e.g. a header or sidebar */}
        {/* <Navbar/> */}
   
        {children}
      </section>
    )}
