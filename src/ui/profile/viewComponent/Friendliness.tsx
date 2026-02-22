function Friendliness({
  label,
  text_select_friendness,
}: {
  label: string;
  text_select_friendness: string;
}) {
  const friendnesssPercentage = Number(text_select_friendness) * 20;
  return (
    <div className="h-16 flex flex-col justify-center gap-1">
      <h3 className="leading-relaxed  font-semibold">
        {label} {`(${friendnesssPercentage}%)`}
      </h3>
      <div className="leading-relaxed">
        <div className="bg-cardcontainer border border-gray-400 w-full  h-2 relative">
          <span
            className="h-full bg-semicontainer block"
            style={{ width: `${friendnesssPercentage}%` }}
          ></span>
        </div>
      </div>
    </div>
  );
}

export default Friendliness;
