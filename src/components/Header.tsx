
interface HeaderProps {
    children: React.ReactNode;
}

const Header = ({children}: HeaderProps) => {
  return (
    <header className="bg-[#45503B] shadow rounded-b-3xl border-neutral-500 border-t">
        <div className="mx-auto max-w-7xl  px-4 py-6 sm:px-6 lg:px-8">
            {children}
        </div>
    </header>
  )
}

export default Header