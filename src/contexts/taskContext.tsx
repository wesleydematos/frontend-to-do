import { createContext, useState } from "react";

import { CustomToast } from "../components/Toast";
import { Api } from "../services/Api";

interface ITaskContextProps {
  children: React.ReactNode;
}

interface ITaskContext {
  isLoading: boolean;
  taskId: number | null;
  tasks: ITask[];
  completedTasks: ITask[];
  DeleteTask: () => void;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setTaskId: React.Dispatch<React.SetStateAction<null | number>>;
  GetTasks: (completed: boolean) => Promise<unknown>;
  UpdateTask: (
    id: number,
    updatedData: {
      title?: string;
      completed?: boolean;
    }
  ) => Promise<unknown>;
  CreateTask: (taskData: ICreateTask) => Promise<unknown>;
}

interface ITask {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

interface ICreateTask {
  title: string;
}

export const TaskContext = createContext<ITaskContext>({} as ITaskContext);

export const TaskProvider = ({ children }: ITaskContextProps) => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [completedTasks, setCompletedTasks] = useState<ITask[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [taskId, setTaskId] = useState<null | number>(null);

  const { toastify } = CustomToast();

  const CreateTask = async (taskData: ICreateTask) => {
    setIsLoading(true);

    try {
      const token = localStorage.getItem("@TODO:TOKEN");

      await Api.post("tasks/create", taskData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toastify({
        description: "Tarefa criada com sucesso!",
        status: "success",
      });

      await Promise.all([GetTasks(false), GetTasks(true)]);
    } catch (error) {
      toastify({
        description: "Ops, algo deu errado ao criar a tarefa!",
        status: "error",
      });

      return error;
    } finally {
      setIsLoading(false);
    }
  };

  const GetTasks = async (completed: boolean) => {
    setIsLoading(true);

    try {
      const token = localStorage.getItem("@TODO:TOKEN");

      const res = await Api.get(`tasks?completed=${completed}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (completed) {
        setCompletedTasks(res.data);
      } else {
        setTasks(res.data);
      }
    } catch (error) {
      toastify({
        description: "Ops, algo deu errado tente novamente!",
        status: "error",
      });

      return error;
    } finally {
      setIsLoading(false);
    }
  };

  const UpdateTask = async (
    id: number,
    updatedData: { title?: string; completed?: boolean }
  ) => {
    setIsLoading(true);

    try {
      const token = localStorage.getItem("@TODO:TOKEN");

      await Api.put(`tasks/${id}`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toastify({
        description: "Tarefa atualizada com sucesso!",
        status: "success",
      });

      await Promise.all([GetTasks(false), GetTasks(true)]);
    } catch (error) {
      toastify({
        description: "Ops, algo deu errado ao atualizar a tarefa!",
        status: "error",
      });

      return error;
    } finally {
      setIsLoading(false);
    }
  };

  const DeleteTask = async () => {
    setIsLoading(true);

    try {
      const token = localStorage.getItem("@TODO:TOKEN");

      await Api.delete(`tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toastify({
        description: "Tarefa deletada com sucesso!",
        status: "success",
      });

      await Promise.all([GetTasks(false), GetTasks(true)]);
    } catch (error) {
      toastify({
        description: "Ops, algo deu errado ao deletar a tarefa!",
        status: "error",
      });

      return error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TaskContext.Provider
      value={{
        isLoading,
        tasks,
        taskId,
        completedTasks,
        CreateTask,
        DeleteTask,
        GetTasks,
        setIsLoading,
        UpdateTask,
        setTaskId,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
