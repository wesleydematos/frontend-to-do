/* eslint-disable @typescript-eslint/no-explicit-any */
export const MessageError = ({ error }: any) => {
  return (
    <>
      <p className="text-error-100 text-sm mt-2 rounded max-w-max ">{error}</p>
    </>
  );
};
