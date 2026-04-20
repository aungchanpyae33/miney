function Friendliness({
  label,
  text_slider_friendness,
}: {
  label: string;
  text_slider_friendness: string;
}) {
  const friendnesssPercentage = Number(text_slider_friendness);
  return (
    <div className="h-16 flex flex-col justify-center gap-1">
      <h3 className="font-semibold">
        {label} {`(${friendnesssPercentage}%)`}
      </h3>
      <div>
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
