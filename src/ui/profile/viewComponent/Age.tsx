function Age({ label, year }: { label: string; year: string }) {
  const userAge = new Date().getFullYear() - Number(year);
  return (
    <div className="h-16 flex flex-col justify-center">
      <h3 className=" font-semibold">{label}</h3>
      <div className="">
        <p>{userAge}</p>
      </div>
    </div>
  );
}

export default Age;
