import { Contact } from "@/types/Contact";
import Button from "./Button";
import ProfilePicture from "./ProfilePicture";
import addIcon from "../assets/icons/add.svg";
import TextInputLabelled from "./TextInputLabelled";

const ContactEditOverlay = ({
  contact,
  isNewContact,
}: {
  contact: Contact;
  isNewContact?: boolean;
}) => {
  const { id, name, email, phoneNr, profilePicSrc } = contact;

  return (
    <div className="bg-[#000000]/40 absolute top-0 left-0 h-screen w-screen py-[180px]">
      <div className="w-[364px] h-full m-auto p-6 bg-uicolor-100">
        <div className="flex flex-col gap-6 justify-start h-full">
          <div className="t1 text-left">
            {isNewContact ? "Add Contact" : "Edit Contact"}
          </div>
          <div className="flex flex-row justify-start items-center gap-4">
            <ProfilePicture size="large" src={profilePicSrc} />
            <Button icon={addIcon}>Add Picture</Button>
          </div>
          <TextInputLabelled label="Name" />
          <TextInputLabelled label="Phone number" />
          <TextInputLabelled label="Email address" />

          <div className="flex flex-row self-end mt-auto gap-2">
            <Button type="secondary">Cancel</Button>
            <Button type="primary">Done</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactEditOverlay;
