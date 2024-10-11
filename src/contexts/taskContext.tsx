import { createContext, useState } from "react";

interface ITaskContextProps {
  children: React.ReactNode;
}

interface ITaskContext {
  isLoading: boolean;
}

export const TaskContext = createContext<ITaskContext>({} as ITaskContext);

export const TaskProvider = ({ children }: ITaskContextProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoading, setIsLoading] = useState(false);

  return (
    <TaskContext.Provider
      value={{
        isLoading,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
