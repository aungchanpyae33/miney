import { LoadingIcon } from "../profile/formChild/icons";

function PageLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <span className=" animate-spin">
        <LoadingIcon width={30} height={30} />
      </span>
    </div>
  );
}

export default PageLoading;
