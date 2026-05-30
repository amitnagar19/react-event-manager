import { faker } from '@faker-js/faker';

export interface Event {
    id: string
    title: string
    description: string
    date: string
    category: string
}

const CATEGORIES = ['Meeting', 'Demo', 'Review', 'Launch', 'Workshop'];

export const mockEvents: Event[] = Array.from({ length: 200 }, () => ({
    id: faker.string.uuid(),
    title: faker.lorem.words({ min: 2, max: 5 }),
    description: faker.lorem.sentence(),
    date: faker.date.between({ from: '2026-05-01', to: '2026-06-30' }).toISOString(),
    category: faker.helpers.arrayElement(CATEGORIES),
}))
