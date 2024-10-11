import { useContext, useRef, useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";

import { Colors } from "../../../themes/themes";
import { ContextModal } from "../../../contexts/modalContext";
import { UserContext } from "../../../contexts/userContext";

import { MessageError } from "../../MessageError";

interface IDataRegister {
  email: string;
  password: string;
  confirmPassword: string;
}

export const ModalRegister = () => {
  const { isOpenRegister, onCloseRegister, onOpenLogin } =
    useContext(ContextModal);

  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const handleShowPass = () => setShowPass(!showPass);

  const handleShowConfirmPass = () => setShowConfirmPass(!showConfirmPass);

  const formSchema = yup.object().shape({
    email: yup.string().required("E-mail obrigatório").email("E-mail inválido"),
    password: yup
      .string()
      .required("Senha obrigatória")
      .min(8, "Deve conter no mínimo 8 caracteres"),
    confirmPassword: yup
      .string()
      .required("Confirmação de senha obrigatória")
      .oneOf([yup.ref("password")], "As senhas não conferem"),
  });

  const { Register, isRegisterSuccess, setIsRegisterSuccess } =
    useContext(UserContext);

  const handleClick = () => {
    if (isRegisterSuccess) {
      onCloseRegister();
      onOpenLogin();
    }
    return null;
  };

  if (isRegisterSuccess) {
    onCloseRegister();
    setIsRegisterSuccess(!isRegisterSuccess);
    onOpenLogin();
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IDataRegister>({
    resolver: yupResolver(formSchema),
  });

  const onSubmit = (data: IDataRegister) => {
    Register(data);
    reset();
  };

  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpenRegister}
        onClose={onCloseRegister}
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
              <h2 className="text-xl tablet:text-2xl">Crie sua conta</h2>
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
          <form className="w-[100%]" onSubmit={handleSubmit(onSubmit)}>
            <ModalBody className=" mt-1 laptop:mt-4 mb-4">
              <FormControl mt={4}>
                <FormLabel
                  className={
                    errors.email?.message ? "text-error-100" : "text-green-100"
                  }
                >
                  E-mail
                  <span className="text-error-100 ml-1">*</span>
                </FormLabel>
                <Input
                  id="email"
                  placeholder="Digite o seu e-mail"
                  {...register("email")}
                  _placeholder={{
                    color: Colors.gray100,
                    opacity: "50%",
                  }}
                  fontSize="14px"
                  borderColor={
                    errors.email?.message ? Colors.error100 : Colors.gray200
                  }
                  bg={Colors.gray200}
                  height="50px"
                  color={errors.email?.message ? Colors.error100 : Colors.white}
                  focusBorderColor={
                    errors.email?.message ? Colors.error100 : Colors.gray100
                  }
                />
                {errors.email?.message && (
                  <MessageError error={errors.email?.message}></MessageError>
                )}
              </FormControl>

              <FormControl mt={4}>
                <FormLabel
                  className={
                    errors.password?.message
                      ? "text-error-100"
                      : "text-green-100"
                  }
                >
                  Senha
                  <span className="text-error-100 ml-1">*</span>
                </FormLabel>
                <InputGroup>
                  <Input
                    id="password"
                    placeholder="Digite sua senha"
                    {...register("password")}
                    _placeholder={{
                      color: Colors.gray100,
                      opacity: "50%",
                    }}
                    fontSize="14px"
                    borderColor={
                      errors.password?.message
                        ? Colors.error100
                        : Colors.gray200
                    }
                    bg={Colors.gray200}
                    height="50px"
                    color={
                      errors.password?.message ? Colors.error100 : Colors.white
                    }
                    focusBorderColor={
                      errors.password?.message
                        ? Colors.error100
                        : Colors.gray100
                    }
                    type={showPass ? "text" : "password"}
                  />
                  <InputRightElement>
                    <Button
                      onClick={handleShowPass}
                      bg="transparent"
                      padding={0}
                      _hover={{ bg: "transparent" }}
                      _active={{ bg: "transparent" }}
                      top="5px"
                      right="10px"
                    >
                      {showPass ? (
                        <BsEyeSlash className=" text-gray-100" />
                      ) : (
                        <BsEye className=" text-gray-100" />
                      )}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {errors.password?.message && (
                  <MessageError error={errors.password?.message}></MessageError>
                )}
              </FormControl>

              <FormControl mt={4}>
                <FormLabel
                  className={
                    errors.confirmPassword?.message
                      ? "text-error-100"
                      : "text-green-100"
                  }
                >
                  Confirme sua senha
                  <span className="text-error-100 ml-1">*</span>
                </FormLabel>
                <InputGroup>
                  <Input
                    id="confirmPassword"
                    placeholder="Confirme sua senha"
                    {...register("confirmPassword")}
                    _placeholder={{
                      color: Colors.gray100,
                      opacity: "50%",
                    }}
                    fontSize="14px"
                    borderColor={
                      errors.confirmPassword?.message
                        ? Colors.error100
                        : Colors.gray200
                    }
                    bg={Colors.gray200}
                    height="50px"
                    color={
                      errors.confirmPassword?.message
                        ? Colors.error100
                        : Colors.white
                    }
                    focusBorderColor={
                      errors.confirmPassword?.message
                        ? Colors.error100
                        : Colors.gray100
                    }
                    type={showConfirmPass ? "text" : "password"}
                  />
                  <InputRightElement display="flex" alignItems="center">
                    <Button
                      onClick={handleShowConfirmPass}
                      bg="transparent"
                      padding={0}
                      _hover={{ bg: "transparent" }}
                      _active={{ bg: "transparent" }}
                      top="5px"
                      right="10px"
                    >
                      {showConfirmPass ? (
                        <BsEyeSlash className=" text-gray-100" />
                      ) : (
                        <BsEye className=" text-gray-100" />
                      )}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {errors.confirmPassword?.message && (
                  <MessageError
                    error={errors.confirmPassword?.message}
                  ></MessageError>
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
                onClick={handleClick}
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
              >
                Criar
              </Button>

              <p>
                Já possui conta?{" "}
                <Button
                  onClick={() => {
                    onCloseRegister();
                    onOpenLogin();
                  }}
                  className="underline hover:brightness-90 transition-colors"
                  variant="link"
                  fontSize="14px"
                  fontWeight="medium"
                  color={Colors.gray100}
                >
                  Faça o login
                </Button>
              </p>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};
