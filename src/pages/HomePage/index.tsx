import { useContext } from "react";

import { ContentBoxDiv } from "../../components/ContentBoxDiv";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { HomeMain } from "../../components/HomeMain";
import { ModalLogin } from "../../components/Modals/ModalLogin";
import { ModalRegister } from "../../components/Modals/ModalRegister";

import { UserContext } from "../../contexts/userContext";
import { useProtectedRoutes } from "../../hooks/useProtectedRoutes";

export const HomePage = () => {
  const { isLogged } = useContext(UserContext);
  useProtectedRoutes(isLogged, false);

  return (
    <div className="bg-gray-300 w-full  ">
      <div className="bg-home bg-cover h-screen w-full absolute opacity-10 shadow-[0_100px_100px_#070516]" />
      <Header />
      <HomeMain />
      <ContentBoxDiv />
      <Footer />
      <ModalLogin />
      <ModalRegister />
    </div>
  );
};
