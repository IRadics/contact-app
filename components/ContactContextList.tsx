import { ContactContextListItem } from "@/types/ContactContextListItem";
import Image from "next/image";

const ContactContextList = ({
  items,
  className,
}: {
  items: ContactContextListItem[];
  className?: string;
}) => {
  const sizePx = 20;

  return (
    <div className={`w-56 rounded-lg overflow-hidden ${className} z-10`}>
      {items.map((item) => (
        <button
          className="flex flex-row h-11 w-full bg-uicolor-80 hover:bg-uicolor-70 active:bg-uicolor-60 p-3 gap-3 max-md:flex-row-reverse"
          key={item.icon.src + item.label}
          onClick={() => item.action}
        >
          <Image
            width={sizePx}
            height={sizePx}
            src={item.icon}
            alt=""
            //dirty solution for svg "coloring" - TODO: replace with a better solution (actually coloring the svg)
            className="text-current opacity-[.56]"
          />

          {item.label}
        </button>
      ))}
    </div>
  );
};

export default ContactContextList;
