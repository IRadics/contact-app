import { Contact } from "@/types/Contact";
import Button from "./Button";
import ProfilePicture from "./ProfilePicture";
import muteIcon from "../assets/icons/mute.svg";
import callIcon from "../assets/icons/call.svg";
import moreIcon from "../assets/icons/more.svg";

import editIcon from "../assets/icons/settings.svg";
import favIcon from "../assets/icons/favourite.svg";
import removeIcon from "../assets/icons/delete.svg";

import { useState } from "react";
import { ContactContextListItem } from "@/types/ContactContextListItem";
import ContactContextList from "./ContactContextList";

const ContactListItem = ({
  contact,
  className,
}: {
  contact: Contact;
  className?: string;
}) => {
  const [contextListOpen, setContextListOpen] = useState<boolean>(false);

  const contextListItems: ContactContextListItem[] = [
    {
      icon: editIcon,
      contact: contact,
      label: "Edit",
      action: () => {},
    },
    {
      icon: favIcon,
      contact: contact,
      label: "Favourite",
      action: () => {},
    },
    {
      icon: removeIcon,
      contact: contact,
      label: "Remove",
      action: () => {},
    },
  ];

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

      <div className="relative flex flex-row justify-end items-center gap-2 flex-shrink-0">
        <Button icon={muteIcon} type="secondary" />
        <Button icon={callIcon} type="secondary" />
        <div className="relative h-fit w-fit">
          <Button
            icon={moreIcon}
            type="secondary"
            onClick={() => setContextListOpen(true)}
            className={`relative ${
              contextListOpen ? "hover:bg-none active:bg-none" : ""
            }`}
            onBlur={() => setContextListOpen(false)}
          ></Button>
          {contextListOpen && (
            <ContactContextList
              items={contextListItems}
              className="absolute top-[calc(100%+8px)] max-md:right-0"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactListItem;
