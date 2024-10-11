import { useToast } from "@chakra-ui/react";

interface IToast {
  description: string;
  status: "info" | "warning" | "success" | "error" | "loading" | undefined;
}

export const CustomToast = () => {
  const toast = useToast();

  const toastify = (res: IToast) => {
    toast({
      position: "top-right",
      duration: 2500,
      isClosable: true,
      variant: "left-accent",
      description: res.description,
      status: res.status,
    });
  };

  return { toastify };
};
