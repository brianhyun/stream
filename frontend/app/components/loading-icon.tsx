import { AiOutlineLoading } from "react-icons/ai";

interface LoadingIconProps {}

export default function LoadingIcon(props: LoadingIconProps) {
  return (
    <div className="flex items-center justify-center">
      <AiOutlineLoading className="animate-spin" size={20} />
    </div>
  );
}
