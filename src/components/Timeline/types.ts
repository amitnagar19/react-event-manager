export interface TimelineEvent {
    id: string;
    title: string;
    description: string;
    date: string;
    category: string;
}

export interface TimelineGroup {
    label: string;
    events: TimelineEvent[];
}
