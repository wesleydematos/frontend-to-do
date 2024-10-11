import {
  IoCreateOutline,
  IoCheckmarkCircle,
  IoTrashOutline,
} from "react-icons/io5";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

import { ContentBox } from "../ContentBox";

export const ContentBoxDiv = () => {
  const classBox = "text-green-100 text-5xl";
  const { ref: sectionRef, inView: isVisible } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  return (
    <section
      ref={sectionRef}
      className="mt-8 flex justify-center relative z-8 laptop:pb-10"
    >
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl m-auto px-4 flex gap-10 laptop:gap-4 laptop:justify-evenly overflow-x-scroll laptop:overflow-hidden laptop:flex-wrap laptop:w-full mb-20 laptop:mb-[120px]"
        >
          <ContentBox
            title="Crie e edite"
            text="Crie e edite as suas tarefas a serem feitas."
          >
            <IoCreateOutline className={classBox} />
          </ContentBox>

          <ContentBox
            title="Acompanhe"
            text="Conclua as tarefas das quais você já completou."
          >
            <IoCheckmarkCircle className={classBox} />
          </ContentBox>

          <ContentBox
            title="Exclua"
            text="Exclua as tarefas que não fazem mais sentido acompanhar."
          >
            <IoTrashOutline className={classBox} />
          </ContentBox>
        </motion.div>
      )}
    </section>
  );
};
