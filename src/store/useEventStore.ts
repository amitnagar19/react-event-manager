import { create } from 'zustand';
import type { Event } from '../data/mockEvents';
import { mockEvents } from '../data/mockEvents';
import type { EventFormData } from '../components/EventForm/types';

interface EventStore {
    events: Event[];
    addEvent: (data: EventFormData) => void;
}

export const useEventStore = create<EventStore>((set) => ({
    events: mockEvents,
    addEvent: ({ title, description, date, category }) =>
        set((state) => ({
            events: [
                {
                    id: crypto.randomUUID(),
                    title,
                    description: description ?? '',
                    date: new Date(date).toISOString(),
                    category,
                },
                ...state.events,
            ],
        })),
}));
