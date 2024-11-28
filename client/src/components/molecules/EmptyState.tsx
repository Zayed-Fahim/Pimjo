import { MoodSad } from "@/constant";

const EmptyState = ({ message }: { message: string }) => {
  return (
    <div className="my-4 flex flex-col items-center justify-center space-y-1 py-3">
      <MoodSad className="size-12" />
      <p className="text-center">{message}</p>
    </div>
  );
};

export default EmptyState;
