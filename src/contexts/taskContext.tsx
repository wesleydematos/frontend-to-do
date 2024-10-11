/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, useEffect, useState } from "react";
import { CustomToast } from "../components/Toast";
import { Api } from "../services/Api";

interface ITaskContextProps {
  children: React.ReactNode;
}

interface ITaskContext {
  isLoading: boolean;
  tasks: ITask[];
  completedTasks: ITask[];
  deleteTask: (taskId: number) => void;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  GetTasks: (completed: boolean) => Promise<unknown>;
  UpdateTask: (
    id: number,
    updatedData: {
      title?: string;
      completed?: boolean;
    }
  ) => Promise<unknown>;
}

interface ITask {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

export const TaskContext = createContext<ITaskContext>({} as ITaskContext);

export const TaskProvider = ({ children }: ITaskContextProps) => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [completedTasks, setCompletedTasks] = useState<ITask[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { toastify } = CustomToast();

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

  const deleteTask = (taskId: number) => {
    alert(`deleted task ${taskId}`);
  };

  return (
    <TaskContext.Provider
      value={{
        isLoading,
        tasks,
        completedTasks,
        deleteTask,
        GetTasks,
        setIsLoading,
        UpdateTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
