interface Props {
    tabs: ReadonlyArray<{ readonly value: string; readonly label: string }>;
    active: string;
    onChange: (value: string) => void;
}

function Tabs({ tabs, active, onChange }: Props) {
    return (
        <div>
            <div className="bg-white border-b border-gray-200 px-6">
                <div className="flex">
                    {tabs.map((tab) => (
                        <button
                            key={tab.value}
                            onClick={() => onChange(tab.value)}
                            className={`px-4 py-3 text-sm font-medium border-b-2 cursor-pointer ${
                                active === tab.value
                                    ? 'border-blue-600 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Tabs;
