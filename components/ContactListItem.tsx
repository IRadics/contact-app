import { Contact } from "@/types/Contact";
import Button from "./Button";
import ProfilePicture from "./ProfilePicture";
import muteIcon from "../assets/icons/mute.svg";
import callIcon from "../assets/icons/call.svg";
import moreIcon from "../assets/icons/more.svg";

import editIcon from "../assets/icons/settings.svg";
import favIcon from "../assets/icons/favourite.svg";
import removeIcon from "../assets/icons/delete.svg";

import { useContext, useState } from "react";
import { ContactContextListItem } from "@/types/ContactContextListItem";
import ContactContextList from "./ContactContextList";

import { AppContext } from "@/clientFunctions/context/appContext";

const ContactListItem = ({
  contact,
  className,
}: {
  contact: Contact;
  className?: string;
}) => {
  const [contextListOpen, setContextListOpen] = useState<boolean>(false);
  const {
    contactEditOverlay,
    api: { deleteContact },
  } = useContext(AppContext);

  const contextListItems: ContactContextListItem[] = [
    {
      icon: editIcon,
      contact: contact,
      label: "Edit",
      action: (contact) => contactEditOverlay.open(contact),
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
      action: async (contact) => {
        if (contact.id) {
          deleteContact(contact.id);
        }
      },
    },
  ];

  const contextListItemsHiddenElements: ContactContextListItem[] = [
    {
      icon: muteIcon,
      contact: contact,
      label: "Mute",
      action: () => {},
    },
    {
      icon: callIcon,
      contact: contact,
      label: "Call",
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
        <Button
          icon={muteIcon}
          styleType="secondary"
          className="max-sm:hidden"
        />
        <Button
          icon={callIcon}
          styleType="secondary"
          className="max-sm:hidden"
        />
        <div className="relative h-fit w-fit">
          <Button
            icon={moreIcon}
            styleType="secondary"
            onClick={() => setContextListOpen(true)}
            className={`relative ${
              contextListOpen ? "hover:bg-none active:bg-none" : ""
            }`}
            onBlur={() => setContextListOpen(false)}
          ></Button>
          {contextListOpen && (
            <>
              <ContactContextList
                items={contextListItems}
                className="absolute top-[calc(100%+8px)] max-md:right-0 max-sm:hidden"
              />
              <ContactContextList
                items={[...contextListItemsHiddenElements, ...contextListItems]}
                className="absolute top-[calc(100%+8px)] max-md:right-0 sm:hidden"
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactListItem;
