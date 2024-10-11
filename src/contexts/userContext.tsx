import { createContext, useState } from "react";

interface IUserContextProps {
  children: React.ReactNode;
}

interface IUserContext {
  isLoading: boolean;
}

//   interface IUserDataRegister {
//     name: string;
//     password: string;
//     confirmPassword: string;
//   }

//   interface IUserDataLogin {
//     email: string;
//     password: string;
//   }

//   interface IUserApiLoginResp {
//     accessToken: string;
//   }

export const UserContext = createContext<IUserContext>({} as IUserContext);

export const UserProvider = ({ children }: IUserContextProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoading, setIsLoading] = useState(false);

  return (
    <UserContext.Provider
      value={{
        isLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
