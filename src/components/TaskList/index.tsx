import { useContext, useState } from "react";
import { FiTrash } from "react-icons/fi";
import { FaPencilAlt } from "react-icons/fa";

import { ContextModal } from "../../contexts/modalContext";

interface ITask {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

interface ITaskListProps {
  tasks: ITask[];
  markAsCompleted: (
    id: number,
    updatedData: {
      title?: string;
      completed?: boolean;
    }
  ) => void;
  deleteTask: (id: number) => void;
}

export function TaskList({
  tasks,
  markAsCompleted,
  deleteTask,
}: ITaskListProps) {
  const [taskToDelete, setTaskToDelete] = useState<ITask | null>(null);
  const { isOpenDeleteTask, onOpenDeleteTask } = useContext(ContextModal);

  const openDeleteModal = (task: ITask) => {
    setTaskToDelete(task);
    onOpenDeleteTask();
  };

  const closeDeleteModal = () => {
    setTaskToDelete(null);
    onOpenDeleteTask();
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const confirmDeleteTask = () => {
    if (taskToDelete) {
      deleteTask(taskToDelete.id);
      closeDeleteModal();
    }
  };

  return (
    <div className="flex flex-col gap-[10px] w-full my-3">
      {tasks.length === 0 ? (
        <p className="text-white font-extrabold text-center">-</p>
      ) : (
        tasks.map((task) => (
          <div
            key={task.id}
            className="flex justify-between rounded-lg p-4 border border-dashed border-gray-100"
          >
            <div className="flex items-center gap-[10px] min-w-[50%]">
              <input
                className="cursor-pointer w-6 h-6 rounded-[4px] checked:bg-green-100 hover:checked:bg-green-300 border border-green-200"
                type="checkbox"
                checked={task.completed}
                onChange={() =>
                  markAsCompleted(task.id, { completed: !task.completed })
                }
              />
              <span
                className={`${"w-[calc(100%-85px)] text-[16px] font-normal leading-[19.36px] tracking-[-0.02em] whitespace-nowrap overflow-hidden text-ellipsis text-white"} ${
                  task.completed
                    ? "text-gray-100 line-through decoration-[1px] decoration-green-300"
                    : ""
                }`}
              >
                {task.title}
              </span>
            </div>
            <div className="flex">
              <button onClick={() => openDeleteModal(task)}>
                <FiTrash size={24} color="#d7dde9" />
              </button>
              <button onClick={() => openDeleteModal(task)}>
                <FaPencilAlt size={24} color="#d7dde9" />
              </button>
            </div>
          </div>
        ))
      )}

      {isOpenDeleteTask && (
        <></>
        // <ModalContainer
        //   action={confirmDeleteTask}
        //   actionName="Deletar"
        //   closeModal={closeDeleteModal}
        //   title="Deletar tarefa"
        //   type="danger"
        // >
        //   <p>Tem certeza que deseja deletar esta tarefa?</p>
        // </ModalContainer>
      )}
    </div>
  );
}
