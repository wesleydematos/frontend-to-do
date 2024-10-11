import { Button } from "@chakra-ui/react";

import { Colors } from "../../themes/themes";

interface IButtonDefaultProps {
  onClick: () => void;
  text: string;
  isLoading?: boolean | undefined;
  className?: string;
  height?: string;
}

export const ButtonDefault = ({
  onClick,
  text,
  isLoading,
  className,
  height,
}: IButtonDefaultProps) => {
  return (
    <Button
      className={className}
      fontSize="l"
      fontWeight="medium"
      minWidth="150px"
      height={height}
      bgColor={Colors.green100}
      color={Colors.green200}
      _hover={{ bg: Colors.green300 }}
      _active={{ bg: Colors.green300 }}
      onClick={onClick}
      isLoading={isLoading}
    >
      {text}
    </Button>
  );
};
