import { BsFillPlusCircleFill } from "react-icons/bs";

export function CreateTaskBtn() {
  return (
    <div className="mt-2">
      <button
        className="flex items-center gap-4 p-2 rounded-md text-white cursor-pointer transition duration-300 ease-out hover:bg-options-button-hover">
        <BsFillPlusCircleFill />
        Nova Tarefa
      </button>
    </div>
  )
}