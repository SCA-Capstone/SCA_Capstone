import { CircleCheck, Cpu, Upload } from "lucide-react"
import TimelineCard from "./TimelineCard"



const HomeCardTimeline = () => {

    const timelineItems = [
        {
            title: 'Upload your Algorithm',
            description: 'create your account and fill out the submission form',
            icon: Upload,
        },
        {
            title: 'We will test the processes for you',
            description: 'Using our tools, we will test your encryption algorithm.',
            icon: Cpu,
        },
        {
            title: 'Get notified when your report is ready',
            description: 'You will receive an email when your report is ready',
            icon: CircleCheck,
        },
    ]

  return (
    <div
            className='flex flex-col justify-start items-center gap-x-8 gap-y-24 sm:h-[512px] h-[1048px] mt-12 w-full bg-neutral-100 rounded-[2rem] p-12 overflow-hidden'
    >
        <h1
            className="text-5xl font-bold tracking-tight text-gray-900"
        >
            Timeline
        </h1>

        <div
            className="flex flex-col sm:flex-row justify-center items-center gap-x-32 gap-y-8"
        >
            {timelineItems.map((item, index) => (
                <TimelineCard key={index} {...item} />
            ))}
        </div>
    </div>
  )
}

export default HomeCardTimeline