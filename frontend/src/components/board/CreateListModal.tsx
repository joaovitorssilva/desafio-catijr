import { useState } from 'react';
import { BsFillPlusCircleFill, BsFillXCircleFill } from 'react-icons/bs';

interface CreateListModalProps {
  isOpen: boolean;
  onClose: (e?: React.MouseEvent) => void;
  onSubmit: (name: string) => Promise<void>;
  existingListNames: string[];
}

export function CreateListModal({ isOpen, onClose, onSubmit, existingListNames }: CreateListModalProps) {
  const [listNameInput, setListNameInput] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (listNameInput.trim() === "") {
      setError("Nome não pode estar vazio");
      return;
    }

    if (existingListNames.some(n => n.toLowerCase() === listNameInput.trim().toLowerCase())) {
      setError("Já existe uma lista com este nome");
      return;
    }

    await onSubmit(listNameInput.trim());
    setListNameInput("");
    setError("");
    onClose();
  };

  const handleClose = (e: React.MouseEvent) => {
    setListNameInput("");
    setError("");
    onClose(e);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/80 bg-opacity-50 z-50 flex items-center justify-center text-zinc-50"
      onClick={handleClose}
    >
      <div
        className="bg-zinc-900 p-4 rounded-lg border shadow-lg w-full max-w-sm relative flex flex-col gap-2"
        onClick={(e) => e.stopPropagation()}
      >

        <div className="flex item-center justify-between">
          <p className="text-zinc-50 text-lg font-semibold">
            Criar Lista
          </p>
          <button onClick={handleClose}
          >
            <BsFillXCircleFill
              className=" text-zinc-50 text-xl hover:text-options-button-hover transition ease-out duration-300 cursor-pointer"
            />
          </button>
        </div>

        <p className="flex mt-4">Nome:</p>
        <input
          type="text"
          value={listNameInput}
          className="p-2 border rounded-xl focus:outline-none focus:ring focus:ring-line"
          onChange={(e) => {
            setListNameInput(e.target.value);
            setError("");
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit(e as unknown as React.MouseEvent);
            }
          }}
          autoFocus
        />
        {error && <p className="ml-1 text-sm text-danger/90 ">{error}</p>}
        <button
          onClick={handleSubmit}
          className="mt-6 bg-options-button-hover text-zinc-50 font-bold p-2 rounded-xl hover:bg-options-button-pressed transition duration-300 ease-out cursor-pointer"
        >
          Adicionar
        </button>
      </div>
    </div>
  );
}

interface AddListButtonProps {
  onClick: (e: React.MouseEvent) => void;
}

export function AddListButton({ onClick }: AddListButtonProps) {
  return (
    <div className="rounded-md flex flex-col gap-4 min-w-[300px] w-[300px] h-min shrink-0 relative top-2">
      <button
        onClick={onClick}
        className="text-zinc-50 w-full flex items-center gap-2 font-semibold text-sm p-2 rounded-xl hover:bg-options-button-hover transition duration-300 ease-out cursor-pointer"
      >
        <BsFillPlusCircleFill className="w-6 h-6" />
        Nova Lista
      </button>
    </div>
  );
}
