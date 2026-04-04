import { useState, useRef, useEffect } from 'react';
import type { Task } from '../types/api'
import { TaskCard } from './TaskCard';
import { TaskModal } from './TaskModal';
import { CreateTaskBtn } from './ui/CreateTaskBtn'
import { DeleteModal } from './ui/DeleteModal';
import { updateListById, deleteListById } from '../api/endpoints/Lists';
import { useToast } from '../contexts/ToastContext';
import { BsFillPencilFill, BsThreeDots } from 'react-icons/bs';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { AiFillDelete } from 'react-icons/ai';

interface ListProps {
  id: number;
  name: string;
  propTasks: Task[];
  refetchLists: () => Promise<void>;
  isDragOverlay?: boolean;
}

export const ListComponent = ({ id, name, propTasks, refetchLists, isDragOverlay }: ListProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [selectedTask, setSelectedTask] = useState<Task | undefined>(undefined);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editTitle, setEditTitle] = useState(name);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { showToast } = useToast();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { setNodeRef, isOver } = useDroppable({
    id: id,
  });

  const handleOpenCreateModal = () => {
    setModalMode('create');
    setSelectedTask(undefined);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (task: Task) => {
    setModalMode('edit');
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTask(undefined);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus input when entering edit mode
  useEffect(() => {
    if (isEditingTitle && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditingTitle]);

  const handleTitleClick = () => {
    setEditTitle(name);
    setIsEditingTitle(true);
    setIsDropdownOpen(false);
  };

  const handleRenameClick = () => {
    setEditTitle(name);
    setIsEditingTitle(true);
    setIsDropdownOpen(false);
  };

  const saveTitle = async () => {
    if (editTitle.trim() === '' || editTitle === name) {
      setIsEditingTitle(false);
      return;
    }

    try {
      await updateListById({ id, name: editTitle.trim() });
      await refetchLists();
    } catch (err) {
      console.error('Failed to update list:', err);
    }
    setIsEditingTitle(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      saveTitle();
    } else if (e.key === 'Escape') {
      setEditTitle(name);
      setIsEditingTitle(false);
    }
  };

  const handleDeleteClick = () => {
    setIsDropdownOpen(false);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteListById(String(id));
      await refetchLists();
      showToast('Lista deletada com sucesso');
    } catch (err) {
      console.error('Failed to delete list:', err);
    }
    setIsDeleteModalOpen(false);
  };

  return (
    <main
      ref={isDragOverlay ? undefined : setNodeRef}
      className={`border border-line rounded-xl px-4 pt-4 pb-8 h-fit w-sm md:w-md gap-4 shrink-0 ${isOver ? 'ring-2 ring-lime-400' : ''} ${isDragOverlay ? 'w-sm md:w-md' : ''}`}
    >
      {/* List Title with Options */}
      {!isDragOverlay && (
        <div className="flex items-center justify-between pl-2  py-4">
          {isEditingTitle ? (
            <input
              ref={inputRef}
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={saveTitle}
              className="text-zinc-50 text-3xl font-bold border-b-2 border-white mr-10 w-full appearance-none focus:outline-none! caret-white"
            />
          ) : (
            <h2
              onClick={handleTitleClick}
              className="text-zinc-50 font-bold text-3xl cursor-pointer flex-1"
            >
              {name}
            </h2>
          )}

          {/* Options Button */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="text-zinc-50 hover:bg-options-button-hover rounded p-1 transition duration-200"
              aria-label="List options"
            >
              <BsThreeDots className="w-5 h-5" />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 top-full mt-1 bg-bg border border-line rounded-md py-1 z-10 min-w-[120px]">
                <button
                  onClick={handleRenameClick}
                  className="flex items-center justify-center gap-2 w-full text-left p-2 text-zinc-50 hover:bg-options-button-hover transition ease-out duration-300 text-sm rounded-sm"
                >
                  <BsFillPencilFill />
                  Renomear
                </button>
                <button
                  onClick={handleDeleteClick}
                  className="flex gap-2 items-center text-danger rounded-sm p-2 w-full hover:bg-options-button-hover transition duration-300 ease-out cursor-pointer"
                  aria-label="Delete"
                >
                  <AiFillDelete className="w-6 h-6" />
                  Deletar
                </button>
              </div>
            )}
          </div>
        </div>
      )
      }

      {/* Display tasks */}
      <SortableContext items={propTasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
        <div className="flex flex-col gap-4">
          {propTasks.length > 0 ? (
            propTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onClick={() => !isDragOverlay && handleOpenEditModal(task)}
                refetchLists={refetchLists}
              />
            ))
          ) : (
            <p className="text-zinc-50 text-sm"></p>
          )}
        </div>
      </SortableContext>

      {
        !isDragOverlay && (
          <div onClick={handleOpenCreateModal}>
            <CreateTaskBtn />
          </div>
        )
      }

      <TaskModal
        key={`${modalMode}-${selectedTask?.id || 'new'}`}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        listId={id}
        refetchLists={refetchLists}
        task={selectedTask}
        mode={modalMode}
      />

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        itemName={`a lista ${name}`}
      />
    </main >
  );
};
