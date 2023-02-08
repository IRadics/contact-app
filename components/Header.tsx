import Button from "./Button";
import settingsIcon from "../assets/icons/settings.svg";
import addIcon from "../assets/icons/add.svg";
import UserPicture from "./UserPicture";
import { useContext } from "react";
import { AppContext } from "@/clientFunctions/context/appContext";

const Header = ({ className }: { className?: string }) => {
  const { contactEditOverlay } = useContext(AppContext);

  //todo: use global state / context api to set the title if there will be other pages
  const title = "Contacts";

  return (
    <div
      className={`py-6 flex flex-row flex-shrink-0 justify-between items-center ${className}`}
    >
      <div className="t1 max-md:text-lg max-xs:text-sm">{title}</div>
      <div className="flex flex-row flex-shrink-0 justify-end items-center gap-2 max-sm:gap-1 max-xxs:gap-0">
        <Button icon={settingsIcon} styleType="secondary" />
        <Button styleType="secondary">
          <UserPicture />
        </Button>
        <Button
          styleType="special"
          icon={addIcon}
          className={"ml-6 max-md:ml-1"}
          onClick={() => contactEditOverlay.open()}
        >
          Add new
        </Button>
      </div>
    </div>
  );
};

export default Header;
