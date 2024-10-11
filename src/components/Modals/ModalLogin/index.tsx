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

import { ContextModal } from "../../../contexts/modalContext";
import { UserContext } from "../../../contexts/userContext";

import { Colors } from "../../../themes/themes";
import { MessageError } from "../../MessageError";
import { Loading } from "../../Loading";

interface ILoginForm {
  email: string;
  password: string;
}

export const ModalLogin = () => {
  const { Login, isLoading } = useContext(UserContext);
  const [showPass, setShowPass] = useState(false);
  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const loginSchema = yup.object().shape({
    email: yup
      .string()
      .email("E-mail obrigatório")
      .required("E-mail obrigatório"),
    password: yup.string().required("Senha obrigatória"),
  });

  const { isOpenLogin, onCloseLogin, onOpenRegister } =
    useContext(ContextModal);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>({
    resolver: yupResolver(loginSchema),
  });

  const handleShowPass = () => setShowPass(!showPass);

  const onSubmit = (data: ILoginForm) => {
    Login(data);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpenLogin}
        onClose={onCloseLogin}
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
              <h2 className="text-xl tablet:text-2xl">Entre na sua conta</h2>
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
                  className={errors.email ? "text-error-100" : "text-green-100"}
                >
                  Email
                </FormLabel>
                <Input
                  placeholder="Digite o e-mail do usuário"
                  _placeholder={{
                    color: Colors.gray100,
                    opacity: "50%",
                  }}
                  borderColor={
                    errors.email?.message ? Colors.error100 : Colors.gray200
                  }
                  bg={Colors.gray200}
                  fontSize="14px"
                  height="50px"
                  color={errors.email?.message ? Colors.error100 : Colors.white}
                  focusBorderColor={
                    errors.email?.message ? Colors.error100 : Colors.gray100
                  }
                  {...register("email")}
                />
                {errors.email?.message && (
                  <MessageError error={errors.email?.message}></MessageError>
                )}
              </FormControl>

              <FormControl mt={4}>
                <FormLabel
                  className={
                    errors.password ? "text-error-100" : "text-green-100"
                  }
                >
                  Senha
                </FormLabel>
                <InputGroup>
                  <Input
                    placeholder="Digite sua senha"
                    _placeholder={{
                      color: Colors.gray100,
                      opacity: "50%",
                    }}
                    borderColor={
                      errors.password?.message
                        ? Colors.error100
                        : Colors.gray200
                    }
                    bg={Colors.gray200}
                    fontSize="14px"
                    height="50px"
                    color={
                      errors.email?.message ? Colors.error100 : Colors.white
                    }
                    focusBorderColor={
                      errors.email?.message ? Colors.error100 : Colors.gray100
                    }
                    type={showPass ? "text" : "password"}
                    {...register("password")}
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
              >
                Entrar
              </Button>
              <p>
                Não possui conta?{" "}
                <Button
                  onClick={() => {
                    onCloseLogin();
                    onOpenRegister();
                  }}
                  className="underline hover:brightness-90 transition-colors"
                  variant="link"
                  fontSize="14px"
                  fontWeight="medium"
                  color={Colors.gray100}
                >
                  Clique aqui
                </Button>
              </p>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};
