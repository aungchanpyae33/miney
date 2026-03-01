function ProfileLoading() {
  return (
    <div className="rounded-3xl relative w-full  shadow-[_3px_-3px_var(--semicontainer)] flex flex-col items-center justify-between bg-cardcontainer animate-pulse  h-[400px] max-h-[400px] p-5">
      <div className="animate-pulse w-full p-2">
        <div className="mx-auto bg-ink-400 rounded-full h-28 w-28 mb-4"></div>
        <div className="h-6 bg-ink-400 rounded-md w-1/2 mx-auto mb-4"></div>
        <div className="bg-ink-400 p-6 rounded-lg mb-4">
          <div className="grid grid-cols-2 gap-x-8 gap-y-6">
            <div>
              <div className="h-4 bg-cardcontainer rounded-md w-1/2 mb-2"></div>
              <div className="h-4 bg-cardcontainer rounded-md w-1/4"></div>
            </div>
            <div>
              <div className="h-4 bg-cardcontainer rounded-md w-1/2 mb-2"></div>
              <div className="h-4 bg-cardcontainer rounded-md w-1/3"></div>
            </div>
            <div className="col-span-2">
              <div className="h-4 bg-cardcontainer rounded-md w-1/3 mb-2"></div>
              <div className="w-full bg-cardcontainer rounded-full h-2.5">
                <div className=" h-2.5 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="h-8 inline-block mr-2 bg-ink-400 rounded-md w-1/3 mx-auto mb-4"></div>
        <div className="h-8 inline-block bg-ink-400 rounded-md w-1/3 mx-auto mb-4"></div>
      </div>
    </div>
  );
}

export default ProfileLoading;
