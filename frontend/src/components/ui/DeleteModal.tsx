import { BsFillXCircleFill } from 'react-icons/bs';
import { AiFillDelete } from 'react-icons/ai';

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName: string;
}

export function DeleteModal({ isOpen, onClose, onConfirm, itemName }: DeleteModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
      <div className="bg-bg px-4 py-3 rounded-lg max-w-sm w-full border border-white mx-4">
        <div className="flex justify-end">
          <button onClick={onClose}>
            <BsFillXCircleFill
              className=" text-white text-xl hover:text-options-button-hover transition ease-out duration-300 cursor-pointer"
            />
          </button>
        </div>

        <h3 className="text-white text-lg font-semibold mb-4">Tem certeza que deseja deletar {itemName}</h3>
        <p className="text-white  mb-6">
          Essa ação não é reversível
        </p>
        <div className="flex gap-3 justify-start">
          <button
            onClick={onConfirm}
            className="flex gap-2 items-center 1 text-danger rounded-md p-2 w-ful hover:bg-options-button-hover transition duration-300 ease-out cursor-pointer"
            aria-label="Delete"
          >
            <AiFillDelete className="w-6 h-6" />
            Deletar
          </button>
        </div>
      </div>
    </div>
  );
}
