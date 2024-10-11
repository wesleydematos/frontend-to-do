import { useContext, useRef } from "react";
import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

import { TaskContext } from "../../../contexts/taskContext";
import { ContextModal } from "../../../contexts/modalContext";
import { Colors } from "../../../themes/themes";

import { ButtonDefault } from "../../Button";

export const ModalDeleteTask = () => {
  const { DeleteTask, isLoading } = useContext(TaskContext);
  const { isOpenDeleteTask, onCloseDeleteTask } = useContext(ContextModal);
  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const handleDeleteTask = () => {
    DeleteTask();
    onCloseDeleteTask();
  };

  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpenDeleteTask}
        onClose={onCloseDeleteTask}
      >
        <ModalOverlay />
        <ModalContent
          maxW={550}
          mx={4}
          p={3}
          px={[0, 3]}
          border={`2px solid ${Colors.green100}`}
          bg={Colors.gray300}
        >
          <div className="m-auto text-xl">
            <ModalHeader className="text-green-100">
              <h2 className="text-xl tablet:text-2xl">
                Tem certeza que deseja deletar a tarefa?
              </h2>
            </ModalHeader>

            <ModalCloseButton
              className="mt-3 mr-2 text-gray-300"
              borderRadius={50}
              h={6}
              w={6}
              bg={Colors.green100}
              _hover={{ bg: Colors.green300 }}
              transition="0.3s ease"
            />
          </div>

          <div className="w-full flex justify-end pr-3 gap-3">
            <ButtonDefault
              onClick={() => handleDeleteTask()}
              text="Deletar"
              isLoading={isLoading}
              className="bg-error-100 mt-5"
            />
          </div>
        </ModalContent>
      </Modal>
    </>
  );
};
