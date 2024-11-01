import Image from 'next/image'


const HomeCard1 = () => {
    return (
        <div
            className='flex flex-col sm:flex-row justify-between items-start gap-x-8 gap-y-8 h-[512px] mt-12 w-full bg-neutral-100 rounded-[2rem] p-12 overflow-hidden'
        >
            <Image
                src='/images/imagePlaceholder.png'
                width={200}
                height={200}
                className='sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px] rounded-[2rem] transition'
                alt='Search'
            />
            
            <div
                className='flex flex-col gap-y-6 w-full h-full overflow-hidden'
            >
                <h1
                    className='text-2xl md:text-4xl font-medium tracking-wide text-neutral-800'
                >
                    Who we are
                </h1>

                <p
                    className='text-sm md:text-lg lg:text-xl font-normal  text-neutral-700'
                >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
            </div>

        </div>
    )
}

export default HomeCard1