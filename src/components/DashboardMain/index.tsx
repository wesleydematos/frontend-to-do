import { useContext, useEffect } from "react";
import { motion } from "framer-motion";

import { TaskContext } from "../../contexts/taskContext";

import { ButtonDefault } from "../Button";
import { TaskList } from "../TaskList";
import { Loading } from "../Loading";

export const DashboardMain = () => {
  const {
    tasks,
    isLoading,
    completedTasks,
    UpdateTask,
    setIsLoading,
    GetTasks,
  } = useContext(TaskContext);

  useEffect(() => {
    const fetchTasks = async () => {
      setIsLoading(true);

      try {
        await Promise.all([GetTasks(false), GetTasks(true)]);
      } catch (error) {
        console.error("Erro ao buscar tasks", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, []);

  return (
    <main className="py-24 flex flex-col items-center justify-center gap-4 ">
      {isLoading ? (
        <Loading />
      ) : (
        <div className="w-[90%] laptop:w-[60%] laptop:max-w-[600px] flex flex-col items-center gap-5">
          <motion.div
            className="flex flex-col items-center border border-white p-8 rounded-2xl gap-[10px] w-full"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-white">SUAS TAREFAS</p>
            <TaskList tasks={tasks} markAsCompleted={UpdateTask} />
            <p className="text-white">TAREFAS FINALIZADAS</p>
            <TaskList tasks={completedTasks} markAsCompleted={UpdateTask} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <ButtonDefault
              text="Adicionar nova tarefa"
              onClick={() => {}}
              height="50"
              className="w-[100%] tablet:w-[300px]"
            />
          </motion.div>
        </div>
      )}
    </main>
  );
};
