import { useMemo } from 'react';
import { format, parseISO } from 'date-fns';
import type { TimelineEvent, TimelineGroup } from './types';
import TimelineItem from './TimelineItem.tsx';

interface Props {
    events: TimelineEvent[];
}

const DAY_FORMAT = 'MMMM d, yyyy';

function Timeline({ events }: Props) {
    const groups = useMemo<TimelineGroup[]>(() => {
        const sorted = [...events].sort((a, b) => a.date.localeCompare(b.date));
        const map = new Map<string, TimelineEvent[]>();

        sorted.forEach((event) => {
            const key = format(parseISO(event.date), DAY_FORMAT);
            if (!map.has(key)) map.set(key, []);
            map.get(key)!.push(event);
        });

        return Array.from(map.entries()).map(([label, events]) => ({ label, events }));
    }, [events]);

    if (groups.length === 0) {
        return <p className="text-gray-400 text-sm">No events</p>;
    }
    return (
        <div>
            {groups.map((group) => (
                <div key={group.label}>
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3 mt-8 first:mt-0">
                        {group.label}
                    </h3>
                    <div className="border-t border-gray-100 pt-4">
                        {group.events.map((event) => (
                            <TimelineItem
                                key={event.id}
                                title={event.title}
                                description={event.description}
                                category={event.category}
                                date={event.date}
                                isFocused={false}
                                onFocus={() => {}}
                            />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Timeline;
