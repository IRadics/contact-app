import Button from "./Button";
import settingsIcon from "../assets/icons/settings.svg";
import addIcon from "../assets/icons/add.svg";
import UserPicture from "./UserPicture";

const Header = () => {
  //todo: use global state / context api to set the title
  const title = "Contacts";

  return (
    <div className="h-24 px-6 py-6 flex flex-row flex-shrink-0 justify-between items-center">
      <div className="t1">{title}</div>
      <div className="flex flex-row flex-shrink-0 justify-end items-center gap-2">
        <Button icon={settingsIcon} styleType="secondary" />
        <Button styleType="secondary">
          <UserPicture />
        </Button>
        <Button styleType="special" icon={addIcon} className={"ml-6"}>
          Add new
        </Button>
      </div>
    </div>
  );
};

export default Header;
