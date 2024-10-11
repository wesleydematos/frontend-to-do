import { useContext, useRef } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { TaskContext } from "../../../contexts/taskContext";
import { ContextModal } from "../../../contexts/modalContext";
import { Colors } from "../../../themes/themes";
import { MessageError } from "../../MessageError";
import { CustomToast } from "../../Toast";

interface IEditTask {
  title: string;
}

export const ModalEditTask = () => {
  const { isLoading, UpdateTask, taskId } = useContext(TaskContext);
  const { isOpenEditTask, onCloseEditTask } = useContext(ContextModal);
  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const { toastify } = CustomToast();

  const createTaskSchema = yup.object().shape({
    title: yup.string().required("Título obrigatório"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IEditTask>({
    resolver: yupResolver(createTaskSchema),
  });

  const onSubmit = (data: IEditTask) => {
    if (taskId !== null) {
      UpdateTask(taskId, data);
      onCloseEditTask();
      reset();
    } else {
      toastify({
        description: "Ops, algo deu errado ao editar a tarefa!",
        status: "error",
      });
    }
  };

  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpenEditTask}
        onClose={onCloseEditTask}
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
              <h2 className="text-xl tablet:text-2xl">Editar tarefa</h2>
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
          <form onSubmit={handleSubmit(onSubmit)} className="w-[100%]">
            <ModalBody className="mt-1 laptop:mt-4 mb-4">
              <FormControl position="relative">
                <FormLabel
                  fontSize={16}
                  className={errors.title ? "text-error-100" : "text-green-100"}
                >
                  Novo título da tarefa
                </FormLabel>
                <Input
                  placeholder="Digite o título da tarefa"
                  _placeholder={{
                    color: Colors.gray100,
                    opacity: "50%",
                  }}
                  borderColor={
                    errors.title?.message ? Colors.error100 : Colors.gray200
                  }
                  bg={Colors.gray200}
                  fontSize="14px"
                  height="50px"
                  color={errors.title?.message ? Colors.error100 : Colors.white}
                  focusBorderColor={
                    errors.title?.message ? Colors.error100 : Colors.gray100
                  }
                  {...register("title")}
                />
                {errors.title?.message && (
                  <MessageError error={errors.title?.message}></MessageError>
                )}
              </FormControl>
            </ModalBody>

            <ModalFooter
              display="flex"
              flexDirection="column"
              justifyContent="space-evenly"
              w="100%"
              color={Colors.gray100}
              fontSize="14px"
            >
              <Button
                type="submit"
                bg={Colors.green100}
                color={Colors.green200}
                fontWeight="500"
                fontSize="18px"
                w="100%"
                h="49px"
                mb={5}
                _hover={{
                  bg: Colors.green300,
                }}
                _active={{ bgColor: Colors.green100 }}
                transition="0.3s ease"
                isLoading={isLoading}
              >
                Editar
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};
