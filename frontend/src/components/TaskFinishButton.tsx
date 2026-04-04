import { BsCheck2 } from "react-icons/bs";
import { updateTaskById } from "../api/endpoints/task";

interface TaskFinishButtonProps {
    taskId: number;
    finishDate: string | null;
    onSuccess: () => Promise<void>;
}

export function TaskFinishButton({ taskId, finishDate, onSuccess }: TaskFinishButtonProps) {
    const isTaskFinished = !!finishDate;

    const handleToggleFinish = async (e: React.MouseEvent) => {
        e.stopPropagation();

        try {
            const updates = finishDate
                ? { finishDate: null }
                : { finishDate: new Date().toISOString() };

            await updateTaskById(taskId, updates);
            await onSuccess();
        } catch (err) {
            console.error('Failed to update task finish status:', err);
        }
    };

    return (
        <button
            onClick={handleToggleFinish}
            className="flex items-center gap-2 transition duration-300 ease-out group cursor-pointer"
            title={isTaskFinished ? 'Marcar como não concluída' : 'Marcar como concluída'}
        >
            <span className={`w-8 h-8 rounded-full border border-dashed flex items-center justify-center transition duration-300 ease-out ${isTaskFinished
                ? 'border-lowPrioText text-lowPrioText group-hover:border-[#15C384] group-hover:text-[#15C384]'
                : 'border-white text-white group-hover:border-[#15C384] group-hover:text-[#15C384]'
                }`}>
                <BsCheck2 className="w-4 h-4" />
            </span>
            <span className={`transition duration-300 ease-out ${isTaskFinished
                ? 'text-lowPrioText group-hover:text-[#15C384]'
                : 'text-white group-hover:text-[#15C384]'
                }`}>
                {isTaskFinished ? 'Finalizado' : 'Finalizar'}
            </span>
        </button>
    );
}
