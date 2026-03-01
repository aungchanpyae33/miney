function SingleText({ label, data }: { label: string; data: string }) {
  return (
    <div className="h-16 flex flex-col justify-center">
      <h3 className=" font-semibold">{label}</h3>
      <div className="">
        <p>{data}</p>
      </div>
    </div>
  );
}

export default SingleText;
