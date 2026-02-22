import { Multiple_input } from "../../../../database.type-fest";

function MultipleList({
  label,
  items,
}: {
  label: string;
  items: Multiple_input;
}) {
  return (
    <div className="w-full">
      <h2 className="font-semibold mb-2">{label}</h2>
      <div className="w-fit flex flex-wrap gap-1   break-all ">
        {items.map((item) => (
          <div key={item.id} className="p-[2px] rounded-lg bg-semicontainer ">
            <div className="bg-zonecontainer  leading-relaxed p-2 rounded-lg">
              {item.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MultipleList;
