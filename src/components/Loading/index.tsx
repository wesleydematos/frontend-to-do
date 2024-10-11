import { Spinner } from "@chakra-ui/react";

import { Colors } from "../../themes/themes";

export const Loading = () => {
  return (
    <div className="fixed top-0 left-0 h-[100vh] w-[100vw] bg-black_rgba flex items-center justify-center z-10">
      <Spinner
        size="xl"
        color={Colors.green100}
        speed="0.70s"
        thickness="4px"
      />
    </div>
  );
};
