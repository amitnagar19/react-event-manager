import type { EventFormData } from './types';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const CATEGORIES = ['Meeting', 'Deadline', 'Review', 'Launch', 'Workshop'];

interface Props {
    onSave: (data: EventFormData) => void;
    onCancel: () => void;
    initialData?: Partial<EventFormData>;
}
function EventForm({ onSave, onCancel, initialData }: Props) {
    const [success, setSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<EventFormData>({
        defaultValues: initialData,
    });

    const onSubmit = (data: EventFormData) => {
        onSave(data);
        setSuccess(true);
        reset();
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
            <div role="status" aria-live="polite" aria-atomic="true">
                {success && (
                    <div className="p-3 bg-green-50 border border-green-200 rounded text-green-700 text-sm">
                        Event saved successfully!
                    </div>
                )}
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="title" className="text-sm font-medium text-gray-700">
                    Title <span className="text-red-500">*</span>
                </label>
                <input
                    id="title"
                    type="text"
                    {...register('title', { required: 'Title is required' })}
                    className={`px-3 py-2 border rounded text-sm focus:outline-none focus:border-blue-400 ${errors.title ? 'border-red-400' : 'border-gray-300'}`}
                    placeholder="Event title"
                />
                {errors.title && <p className="text-xs text-red-500">{errors.title.message}</p>}
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="date" className="text-sm font-medium text-gray-700">
                    Date <span className="text-red-500">*</span>
                </label>
                <input
                    id="date"
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    {...register('date', {
                        validate: (v) => {
                            if (!v) return 'Date is required';
                            const date = new Date(v);
                            if (isNaN(date.getTime())) return 'Invalid date';
                            if (date < new Date(new Date().toDateString()))
                                return 'Date cannot be in the past';
                            return true;
                        },
                    })}
                    className={`px-3 py-2 border rounded text-sm focus:outline-none focus:border-blue-400 ${errors.date ? 'border-red-400' : 'border-gray-300'}`}
                />
                {errors.date && <p className="text-xs text-red-500">{errors.date.message}</p>}
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="category" className="text-sm font-medium text-gray-700">
                    Category
                </label>
                <select
                    id="category"
                    {...register('category')}
                    className="px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-400"
                >
                    {CATEGORIES.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="description" className="text-sm font-medium text-gray-700">
                    Description
                </label>
                <textarea
                    id="description"
                    {...register('description')}
                    rows={3}
                    className="px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-400 resize-none"
                    placeholder="Optional description"
                />
            </div>

            <div className="flex justify-end gap-2 pt-2">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50 cursor-pointer"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
                >
                    Save
                </button>
            </div>
        </form>
    );
}

export default EventForm;
