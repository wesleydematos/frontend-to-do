import { createContext, useEffect } from "react";
import { useDisclosure } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";

interface IModalContextProps {
  children: React.ReactNode;
}

interface IModalContext {
  isOpenRegister: boolean;
  isOpenLogin: boolean;
  isOpenCreateTask: boolean;
  isOpenEditTask: boolean;
  isOpenDeleteTask: boolean;
  onOpenRegister: () => void;
  onCloseRegister: () => void;
  onOpenLogin: () => void;
  onCloseLogin: () => void;
  onOpenCreateTask: () => void;
  onOpenEditTask: () => void;
  onOpenDeleteTask: () => void;
  onCloseCreateTask: () => void;
  onCloseEditTask: () => void;
  onCloseDeleteTask: () => void;
}

export const ContextModal = createContext<IModalContext>({} as IModalContext);

export const ModalProvider = ({ children }: IModalContextProps) => {
  const { pathname } = useLocation();

  useEffect(() => {
    onCloseLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const {
    isOpen: isOpenLogin,
    onOpen: onOpenLogin,
    onClose: onCloseLogin,
  } = useDisclosure();

  const {
    isOpen: isOpenRegister,
    onOpen: onOpenRegister,
    onClose: onCloseRegister,
  } = useDisclosure();

  const {
    isOpen: isOpenCreateTask,
    onOpen: onOpenCreateTask,
    onClose: onCloseCreateTask,
  } = useDisclosure();

  const {
    isOpen: isOpenEditTask,
    onOpen: onOpenEditTask,
    onClose: onCloseEditTask,
  } = useDisclosure();

  const {
    isOpen: isOpenDeleteTask,
    onOpen: onOpenDeleteTask,
    onClose: onCloseDeleteTask,
  } = useDisclosure();

  return (
    <ContextModal.Provider
      value={{
        isOpenLogin,
        isOpenRegister,
        isOpenCreateTask,
        isOpenEditTask,
        isOpenDeleteTask,
        onOpenLogin,
        onOpenRegister,
        onOpenCreateTask,
        onOpenEditTask,
        onOpenDeleteTask,
        onCloseLogin,
        onCloseRegister,
        onCloseCreateTask,
        onCloseEditTask,
        onCloseDeleteTask,
      }}
    >
      {children}
    </ContextModal.Provider>
  );
};
