
import Link from "next/link"

const Footer = () => {

    // set a timeout before adding the hover transition
    // hover: transition duration-500 bg-neutral-200/10 ease-in-out

    return (
        <div
            className="flex w-full h-16 bg-[#F3F4F6] justify-center items-center"
        >
            <div
                className="flex w-full h-full justify-between items-center ml-[15%] mr-[15%]"
            >
                <Link href="/">
                    <p className="text-sm font-semibold tracking-wider">
                        UARK PCQ
                    </p>
                </Link>

                <div
                    className="flex justify-center items-center gap-x-4"
                >
                    <Link href="/about">
                        <p className="text-sm font-semibold tracking-wide">
                            about
                        </p>
                    </Link>
                    <Link href="/contact">
                        <p className="text-sm font-semibold tracking-wide">
                            contact
                        </p>
                    </Link>
                    <Link href="/learn-more">
                        <p className="text-sm font-semibold tracking-wide">
                            learn more
                        </p>
                    </Link>

                </div>
            </div>
        </div>
    )
}

export default Footer