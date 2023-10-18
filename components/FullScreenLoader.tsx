import { Loader } from './Loader';

export const FullScreenLoader = () => {
  return (
    <div className="min-h-screen w-full top-0 left-0 absolute flex justify-center items-center bg-black">
      <Loader />
    </div>
  );
};
