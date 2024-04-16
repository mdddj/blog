import { Spinner } from "@nextui-org/react";

export default function LoadingWidget() {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <Spinner />
    </div>
  );
}
