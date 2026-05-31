import DataGrid from './components/DataGrid/DataGrid.tsx';
import { type Event } from './data/mockEvents';
import type { ColumnConfig } from './components/DataGrid/types';
import EventForm from './components/EventForm/EventForm.tsx';
import { useCallback, useState } from 'react';
import Modal from './components/Modal.tsx';
import type { EventFormData } from './components/EventForm/types.ts';
import { useEventStore } from './store/useEventStore.ts';
import Timeline from './components/Timeline/Timeline.tsx';
import Tabs from './components/Tabs.tsx';
import { Plus } from 'lucide-react';

const columns: ColumnConfig<Event>[] = [
    { accessor: 'title', label: 'Title' },
    {
        accessor: 'date',
        label: 'Date',
        format: (v) => new Date(v as string).toLocaleString(),
    },
    { accessor: 'category', label: 'Category' },
    { accessor: 'description', label: 'Description' },
];

const TABS = [
    { value: 'grid', label: 'Data Grid' },
    { value: 'timeline', label: 'Timeline' },
] as const;
type Tab = (typeof TABS)[number]['value'];

function App() {
    const [modalOpen, setModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<Tab>('grid');
    const { events, addEvent } = useEventStore();

    const handleClose = useCallback(() => setModalOpen(false), []);
    const handleSave = (data: EventFormData) => {
        addEvent(data);
        setTimeout(() => handleClose(), 1000);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-20">
                <h1 className="text-xl font-semibold text-gray-800">Event Manager</h1>
                <button
                    onClick={() => setModalOpen(true)}
                    className="inline-flex items-center gap-1 px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
                >
                    <Plus size={16} />
                    New Event
                </button>
            </header>
            <Tabs tabs={TABS} active={activeTab} onChange={(v) => setActiveTab(v as Tab)} />
            <main className="p-6 max-w-6xl mx-auto">
                {activeTab === 'grid' && (
                    <DataGrid columns={columns} data={events} loading={false} error={null} />
                )}
                {activeTab === 'timeline' && <Timeline events={events} />}
            </main>

            <Modal open={modalOpen} onClose={handleClose} title="New Event">
                <EventForm onSave={handleSave} onCancel={handleClose} />
            </Modal>
        </div>
    );
}

export default App;
