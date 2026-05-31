import type { RefCallback } from 'react';

interface Props {
    title: string;
    description: string;
    category: string;
    date: string;
    isFocused: boolean;
    onFocus: () => void;
    itemRef: RefCallback<HTMLDivElement>;
}

function TimelineItem({ title, description, category, date, isFocused, onFocus, itemRef }: Props) {
    const time = new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return (
        <div
            ref={itemRef}
            tabIndex={-1}
            onFocus={onFocus}
            className={`flex gap-4 focus:outline-none group ${isFocused ? 'outline-none' : ''}`}
        >
            {/* dot + line */}
            <div className="flex flex-col items-center">
                <div
                    className={`w-3 h-3 rounded-full mt-1 shrink-0 ${isFocused ? 'bg-blue-500' : 'bg-gray-300 group-hover:bg-blue-400'}`}
                />
                <div className="w-px flex-1 bg-gray-200 mt-1" />
            </div>

            {/* content */}
            <div
                className={`pb-6 flex-1 p-2 rounded ${isFocused ? 'bg-blue-50 ring-2 ring-blue-300' : ''}`}
            >
                <p className="font-medium text-gray-800">{title}</p>
                <p className="text-sm text-gray-500 mt-0.5">{description}</p>
                <p className="text-xs text-gray-400 mt-1">
                    {category} · {time}
                </p>
            </div>
        </div>
    );
}

export default TimelineItem;
