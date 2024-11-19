import Image from 'next/image'


const HomeCard1 = () => {
    return (
<div
  className='flex flex-col sm:flex-row justify-between items-start gap-y-8 sm:gap-x-8 sm:h-[512px] mt-12 w-full  border-[#45503B] shadow-lg rounded-[1rem] p-6 sm:p-12 overflow-hidden shadow-[#45503B]'
>
  <Image
    src='/images/imagePlaceholder.png'
    width={200}
    height={200}
    className='w-full sm:w-[300px] md:w-[400px] h-auto sm:h-[300px] md:h-[400px] rounded-[2rem] transition-all duration-300 hover:scale-105'
    alt='Search'
  />
  <div className='flex flex-col gap-y-6 w-full h-full overflow-hidden'>
    <h1 className='text-2xl md:text-4xl font-extrabold tracking-wide text-[#45503B]'>
      Who are we?
    </h1>

    <p className='text-sm md:text-lg lg:text-xl font-light text-[#45503B]'>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
      quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
      consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
      cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
      proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>
  </div>
</div>


    )
}

export default HomeCard1