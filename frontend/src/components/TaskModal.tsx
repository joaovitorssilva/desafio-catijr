import { useState } from "react";
import { createTask, updateTaskById, deleteTaskById } from "../api/endpoints/task";
import { PriorityDropdown } from "./ui/PriorityDropdown";
import { DeleteModal } from "./ui/DeleteModal";
import { BsArrowBarRight, BsFillCalendarWeekFill } from "react-icons/bs";
import { TaskFinishButton } from "./TaskFinishButton";
import DatePicker from "react-datepicker";
import { ptBR } from 'date-fns/locale';
import { useToast } from "../contexts/ToastContext";
import type { Priority, Task } from "../types/api";

interface TaskModalProps {
  listId: number;
  refetchLists: () => Promise<void>;
  isOpen: boolean;
  onClose: () => void;
  task?: Task;
  mode: 'create' | 'edit';
}

export function TaskModal({ listId, refetchLists, isOpen, onClose, task, mode }: TaskModalProps) {
  // Initialize state based on mode (edit or create new task)
  const [title, setTitle] = useState(mode === 'edit' && task ? task.title : "");
  const [description, setDescription] = useState(mode === 'edit' && task ? (task.description || "") : "");
  const [priority, setPriority] = useState<Priority | "">(mode === 'edit' && task ? (task.priority || "") : "");
  const [date, setDate] = useState<Date | null>(mode === 'edit' && task && task.expectedFinishDate ? new Date(task.expectedFinishDate) : null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [error, setError] = useState("")
  const [priorityError, setPriorityError] = useState("")
  const { showToast } = useToast();

  const handleSubmit = async () => {

    try {
      const taskData = {
        title: title,
        description: description || undefined,
        priority: priority === "" ? undefined : priority,
        expectedFinishDate: date ? date.toISOString() : null,
      };

      if (title.trim() === "") {
        setError("Título não pode estar vazio");
        return
      }

      if (priority === "") {
        setPriorityError("Prioridade não pode estar vazia");
        return
      }


      if (mode === 'edit' && task) {
        await updateTaskById(task.id, taskData);
      } else {
        await createTask({
          ...taskData,
          listId: listId,
        } as Task);
      }

      onClose();
      await refetchLists();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    if (!task) return;

    try {
      await deleteTaskById(task.id);
      setIsDeleteModalOpen(false);
      onClose();
      await refetchLists();
      showToast('Tarefa deletada com sucesso');
    } catch (err) {
      console.error('Failed to delete task:', err);
    }
  };


  return (
    <>
      <div
        className={`fixed inset-0 z-50 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
      >
        <div className="absolute inset-0 bg-black/70" onClick={onClose}></div>
        <div
          className={`fixed top-0 right-0 h-full w-full max-w-xl bg-bg border-l border-white py-10 shadow-lg transform transition-transform duration-300 ease-out ${isOpen ? "translate-x-0" : "translate-x-full"
            } flex flex-col gap-2`}
        >

          {/*============HEADER============ */}

          <div className="flex items-center justify-between mb-4 px-17">
            <button
              onClick={onClose}
              className="text-white font-bold text-xl p-2 rounded-sm hover:bg-options-button-hover cursor-pointer"
            >
              <BsArrowBarRight />
            </button>
            {mode === 'edit' && task && (
              <TaskFinishButton
                taskId={task.id}
                finishDate={task.finishDate}
                onSuccess={refetchLists}
              />
            )}
          </div>

          {/*============FORM============ */}
          <div className="flex flex-col px-17 gap-3">
            <input
              type="text"
              placeholder="Título"
              className="font-bold text-3xl text-white bg-transparent rounded-md p-2  focus:outline-none focus:ring ring-white transition duration-300 ease-out placeholder:text-date-text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value)
                setError("")
              }}
            />
            {error && <p className="text-danger/90 text-sm">{error}</p>}


            <hr className="text-line" />

            <div className="flex items-center justify-between">
              <span className="font-semibold text-white">
                Data de conclusão
              </span>
              <div className="flex items-center p-2 gap-3 text-sm rounded border border-line bg-transparent shrink-0">
                <DatePicker
                  selected={date}
                  onChange={(newDate: Date | null) => setDate(newDate)}
                  dateFormat="dd  MMM',' yyyy"
                  locale={ptBR as any}
                  placeholderText="dd/mm/yyyy"
                  className="bg-transparent text-white text-sm font-semibold uppercase w-28 date-picker-input"
                  popperClassName="z-50"
                  minDate={new Date()}
                />
                <BsFillCalendarWeekFill className="w-4 h-4 text-white" />

              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="font-semibold text-white">
                Prioridade
              </span>

              <PriorityDropdown
                value={priority}
                onChange={(newPriority) => {
                  setPriority(newPriority)
                  setPriorityError("")
                }}
              />
            </div>
            {priorityError && <p className="text-danger/90 text-sm">{priorityError}</p>}

            <hr className="text-line" />

            <div className="flex flex-col gap-4">

              <span className="font-semibold text-white">
                Descrição
              </span>
              <textarea
                placeholder="Descrição"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="p-2 min-h-[100px] resize-y rounded-md bg-transparent text-white border border-white focus:outline-none focus:ring ring-white transition duration-200 placeholder:text-date-text"
              />
            </div>

            <hr className="text-line" />

            <div className="mt-4 flex flex-col items-center gap-4">

              <button
                onClick={handleSubmit}
                // disabled={!isFormValid}
                className={`text-white font-semibold p-2 rounded w-full transition duration-300 ease-out bg- bg-options-button-pressed hover:bg-options-button-hover cursor-pointer  `}
              >
                {mode === 'edit' ? 'Atualizar' : 'Salvar'}
              </button>
              <div className="flex items-center gap-2">
                {mode === 'edit' && (
                  <button
                    onClick={() => setIsDeleteModalOpen(true)}
                    className="flex gap-2 items-center 1 text-danger rounded-md p-2 w-ful hover:bg-options-button-hover transition duration-300 ease-out cursor-pointer"
                    aria-label="Delete task"
                  >
                    Deletar
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        itemName={`a tarefa "${title}"?`}
      />
    </>
  );
}
