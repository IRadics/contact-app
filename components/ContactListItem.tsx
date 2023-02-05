import { Contact } from "@/types/Contact";
import Button from "./Button";
import ProfilePicture from "./ProfilePicture";
import muteIcon from "../assets/icons/mute.svg";
import callIcon from "../assets/icons/call.svg";
import moreIcon from "../assets/icons/more.svg";

const ContactListItem = ({
  contact,
  className,
}: {
  contact: Contact;
  className?: string;
}) => {
  return (
    <div className={`flex flex-row justify-between w-full ${className}`}>
      <div className="relative flex flex-row items-center h-10 gap-4">
        <ProfilePicture
          size="small"
          src={contact.profilePicSrc}
          className="max-xs:hidden flex-shrink-0"
        />

        <div className="relative h-full grid">
          <span className="t3 text-textcolor-primary whitespace-nowrap">
            {contact.name}
          </span>
          <br />
          <span className="t5 text-textcolor-secondary whitespace-nowrap">
            {contact.phoneNr}
          </span>
        </div>
      </div>

      <div className="flex flex-row justify-end items-center gap-2 flex-shrink-0">
        <Button icon={muteIcon} type="secondary" />
        <Button icon={callIcon} type="secondary" />
        <Button icon={moreIcon} type="secondary" />
      </div>
    </div>
  );
};

export default ContactListItem;
