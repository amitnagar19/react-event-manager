import { useCallback, useMemo, useRef, useState } from 'react';
import { format, parseISO } from 'date-fns';
import type { TimelineEvent, TimelineGroup } from './types';
import TimelineItem from './TimelineItem.tsx';

interface Props {
    events: TimelineEvent[];
}

const DAY_FORMAT = 'MMMM d, yyyy';

function Timeline({ events }: Props) {
    const [focusedGroup, setFocusedGroup] = useState(0);
    const [focusedItem, setFocusedItem] = useState(0);
    const [announcement, setAnnouncement] = useState('');

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

    const itemRefsMap = useRef<Map<string, HTMLDivElement | null>>(new Map());
    const focusedRef = useRef({ group: 0, item: 0 });

    const moveFocus = useCallback(
        (gi: number, ii: number) => {
            focusedRef.current = { group: gi, item: ii };
            setFocusedGroup(gi);
            setFocusedItem(ii);
            const event = groups[gi]?.events[ii];
            if (event) itemRefsMap.current.get(event.id)?.focus();
            setAnnouncement(
                `${event.title}, ${groups[gi].label}, item ${ii + 1} of ${groups[gi].events.length}`,
            );
        },
        [groups],
    );

    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent) => {
            const { group: gi, item: ii } = focusedRef.current;
            const group = groups[gi];
            switch (e.key) {
                case 'ArrowDown':
                    e.preventDefault();
                    if (ii < group.events.length - 1) moveFocus(gi, ii + 1);
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    if (ii > 0) moveFocus(gi, ii - 1);
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    if (gi < groups.length - 1) moveFocus(gi + 1, 0);
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    if (gi > 0) moveFocus(gi - 1, 0);
                    break;
            }
        },
        [groups, moveFocus],
    );

    if (groups.length === 0) {
        return <p className="text-gray-400 text-sm">No events</p>;
    }
    return (
        <div onKeyDown={handleKeyDown} tabIndex={0}>
            <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
                {announcement}
            </div>
            {groups.map((group, gi) => (
                <div key={group.label}>
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3 mt-8 first:mt-0">
                        {group.label}
                    </h3>
                    <div
                        role="list"
                        aria-label={group.label}
                        className="border-t border-gray-100 pt-4"
                    >
                        {group.events.map((event, ii) => (
                            <div key={event.id} role="listitem">
                                <TimelineItem
                                    title={event.title}
                                    description={event.description}
                                    category={event.category}
                                    date={event.date}
                                    isFocused={focusedGroup === gi && focusedItem === ii}
                                    onFocus={() => {
                                        setFocusedGroup(gi);
                                        setFocusedItem(ii);
                                    }}
                                    itemRef={(el) => {
                                        itemRefsMap.current.set(event.id, el);
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Timeline;
