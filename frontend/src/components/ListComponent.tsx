import { useState, useRef, useEffect } from 'react';
import type { Task } from '../types/api'
import { TaskCard } from './TaskCard';
import { TaskModal } from './TaskModal';
import { CreateTaskBtn } from './ui/CreateTaskBtn'
import { updateListById, deleteListById } from '../api/endpoints/Lists';
import { useToast } from '../contexts/ToastContext';
import { BsThreeDots } from 'react-icons/bs';

interface ListProps {
  id: number;
  name: string;
  propTasks: Task[];
  refetchLists: () => Promise<void>;
}

export const ListComponent = ({ id, name, propTasks, refetchLists }: ListProps) => {
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
    <main className="border border-options-button-hover rounded-xl px-4 pt-4 pb-8 h-fit w-sm md:w-md gap-4 shrink-0">
      {/* List Title with Options */}
      <div className="flex items-center justify-between pl-2  py-4">
        {isEditingTitle ? (
          <input
            ref={inputRef}
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={saveTitle}
            className="text-white font-bold text-3xl bg-transparent border-b border-white focus:outline-none flex-1 mr-2"
          />
        ) : (
          <h2 
            onClick={handleTitleClick}
            className="text-white font-bold text-3xl cursor-pointer flex-1"
          >
            {name}
          </h2>
        )}
        
        {/* Options Button */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="text-white hover:bg-options-button-hover rounded p-1 transition duration-200"
            aria-label="List options"
          >
            <BsThreeDots className="w-5 h-5" />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 top-full mt-1 bg-bgLight rounded-md shadow-lg py-1 z-10 min-w-[120px]">
              <button
                onClick={handleRenameClick}
                className="w-full text-left px-4 py-2 text-white hover:bg-options-button-hover transition duration-200 text-sm"
              >
                Rename
              </button>
              <button
                onClick={handleDeleteClick}
                className="w-full text-left px-4 py-2 text-red-400 hover:bg-options-button-hover transition duration-200 text-sm"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Display tasks */}
      <div className="flex flex-col gap-4">
        {propTasks.length > 0 ? (
          propTasks.map((task) => (
            <div key={task.id}>
              <TaskCard 
                task={task} 
                onClick={() => handleOpenEditModal(task)}
                refetchLists={refetchLists}
              />
            </div>
          ))
        ) : (
          <p className="text-white text-sm"></p>
        )}
      </div>

      <div onClick={handleOpenCreateModal}>
        <CreateTaskBtn />
      </div>

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
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
          <div className="bg-bg p-6 rounded-lg shadow-lg max-w-sm w-full mx-4">
            <h3 className="text-white text-lg font-semibold mb-4">Delete List</h3>
            <p className="text-gray-300 mb-6">
              Are you sure you want to delete this list? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 text-white hover:bg-options-button-hover rounded transition duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-danger text-white rounded hover:bg-red-700 transition duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};
