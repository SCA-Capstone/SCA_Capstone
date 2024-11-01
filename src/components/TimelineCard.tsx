import { LucideIcon } from "lucide-react";


interface TimelineCardProps {
    title: string;
    description: string;
    icon: LucideIcon;
}

const TimelineCard = ({title, description, icon:Icon}: TimelineCardProps) => {
  return (
    <div
        className="flex flex-col justify-start items-center p-6 bg-neutral-200 rounded-xl w-64 h-64 gap-y-6 hover:translate-y-[-10px] hover:shadow-lg transition"
    >
        <div
            className="flex flex-col justify-start items-center gap-y-4"
        >
            <h1
                className="font-bold text-lg text-gray-900"
            >
                {title}
            </h1>

            <p
                className="text-sm text-neutral-500"
            >
                {description}
            </p>
        </div>
        <Icon
            className="w-12 h-12 text-gray-900"
        />

    </div>
  )
}

export default TimelineCard