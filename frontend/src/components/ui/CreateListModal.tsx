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

    if (existingListNames.includes(listNameInput.trim())) {
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
      className="fixed inset-0 bg-black/80 bg-opacity-50 z-50 flex items-center justify-center text-white"
      onClick={handleClose}
    >
      <div
        className="bg-bg p-4 rounded shadow-lg w-full max-w-md relative flex flex-col gap-2"
        onClick={(e) => e.stopPropagation()}
      >

        <div className="flex item-center justify-between">
          <p className="text-white text-lg font-semibold">Criar Lista</p>

          <button onClick={handleClose}
          >
            <BsFillXCircleFill
              className=" text-white text-xl hover:text-options-button-hover transition ease-out duration-300 cursor-pointer"

            />
          </button>
        </div>

        <p className="flex mt-4">Nome da Lista:</p>
        <input
          type="text"
          value={listNameInput}
          className="p-2 border-2 border-stone-100/10 rounded-xl focus:outline-none focus:ring focus:ring-white hover:ring hover:ring-white transition duration-200"
          onChange={(e) => {
            setListNameInput(e.target.value);
            setError("");
          }}
          autoFocus
        />
        {error && <p className="text-danger/90 text-sm">{error}</p>}
        <button
          onClick={handleSubmit}
          className="mt-6 bg-white text-black font-extrabold p-1 rounded-xl hover:bg-options-button-hover hover:text-white transition duration-200 ease-in-out cursor-pointer"
        >
          Criar Lista
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
        className="text-white w-full flex items-center gap-2 font-semibold text-sm p-2 rounded-xl hover:bg-options-button-hover transition duration-300 ease-out cursor-pointer"
      >
        <BsFillPlusCircleFill className="w-6 h-6" />
        Nova Lista
      </button>
    </div>
  );
}
