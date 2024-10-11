import { createContext, useState } from "react";
import { Api } from "../services/Api";
import { CustomToast } from "../components/Toast";
import { useNavigate } from "react-router-dom";

interface IUserContextProps {
  children: React.ReactNode;
}

interface IUserContext {
  isLoading: boolean;
  isRegisterSuccess: boolean;
  isLogged: boolean;

  Register: (data: IUserDataRegister) => void;
  Login: (data: IUserDataLogin) => void;
  Logout: () => void;
  setIsRegisterSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IUserDataRegister {
  email: string;
  password: string;
  confirmPassword: string;
}

interface IUserDataLogin {
  email: string;
  password: string;
}

interface IUserApiLoginResp {
  accessToken: string;
}

export const UserContext = createContext<IUserContext>({} as IUserContext);

export const UserProvider = ({ children }: IUserContextProps) => {
  const [isLogged, setIsLogged] = useState(
    !!localStorage.getItem("@TODO:TOKEN")
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isRegisterSuccess, setIsRegisterSuccess] = useState(false);

  const navigate = useNavigate();
  const { toastify } = CustomToast();

  const Register = async (data: IUserDataRegister) => {
    try {
      await Api.post("users/signup", {
        email: data.email,
        password: data.password,
      });
      setIsRegisterSuccess(true);

      toastify({
        description: "Usuário cadastrado com sucesso!",
        status: "success",
      });
    } catch (error) {
      toastify({
        description: "Ops, algo deu errado tente novamente!",
        status: "error",
      });
      setIsRegisterSuccess(false);
      return error;
    }
  };

  const Login = async (data: IUserDataLogin) => {
    try {
      setIsLoading(true);
      const res = await Api.post<IUserApiLoginResp>("auth/login", data);
      localStorage.clear();
      localStorage.setItem("@TODO:TOKEN", res.data.accessToken);
      setIsLogged(true);

      navigate("/dashboard");
      toastify({
        description: "Login realizado com sucesso!",
        status: "success",
      });
    } catch (error) {
      toastify({
        description: "E-mail ou senha inválido, tente novamente!",
        status: "error",
      });
      return error;
    } finally {
      setIsLoading(false);
    }
  };

  const Logout = () => {
    setIsLogged(false);
    localStorage.removeItem("@TODO:TOKEN");
    navigate("/");
  };

  return (
    <UserContext.Provider
      value={{
        isLoading,
        isRegisterSuccess,
        isLogged,
        setIsRegisterSuccess,
        Register,
        Login,
        Logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
