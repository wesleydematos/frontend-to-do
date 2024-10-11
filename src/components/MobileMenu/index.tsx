import { Dispatch } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import "animate.css";

interface IMobileMenu {
  mobileMenu: boolean;
  setMobileMenu: Dispatch<React.SetStateAction<boolean>>;
}

export const MobileMenu = ({ mobileMenu, setMobileMenu }: IMobileMenu) => {
  return (
    <button
      aria-label="Menu"
      type="button"
      className="flex items-center justify-center"
      onClick={() => setMobileMenu(!mobileMenu)}
    >
      {mobileMenu ? (
        <AiOutlineClose
          aria-label="Fechar Menu"
          className="text-green-100 text-3xl w-10 h-10 animate__animated animate__flipInX"
        />
      ) : (
        <AiOutlineMenu
          aria-label="Abrir Menu"
          className="text-green-100 text-3xl w-10 h-10 animate__animated animate__flipInX"
        />
      )}
    </button>
  );
};
