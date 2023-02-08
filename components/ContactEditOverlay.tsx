import { Contact } from "@/types/Contact";
import Button from "./Button";
import ProfilePicture from "./ProfilePicture";
import addIcon from "../assets/icons/add.svg";
import changeIcon from "../assets/icons/change.svg";
import deleteIcon from "../assets/icons/delete.svg";
import TextInputLabelled from "./TextInputLabelled";
import { ChangeEvent, useContext, useRef, useState } from "react";
import { AppContext } from "@/clientFunctions/context/appContext";

const ContactEditOverlay = ({
  contact,
  onSubmit,
  onCancel,
}: {
  contact?: Contact;
  onSubmit?: (contact: Contact) => void;
  onCancel?: () => void;
}) => {
  const isNewContact = !contact;

  const profilePicUploadRef = useRef<HTMLInputElement>(null);

  const [profilePicSrcLocal, setProfilePicSrcLocal] = useState<string>();
  const [profilePicSrc, setProfilePicSrc] = useState<string | undefined>(
    contact?.profilePicSrc
  );
  const [name, setName] = useState<string>(contact?.name || "");
  const [phoneNr, setPhoneNr] = useState<string>(contact?.phoneNr || "");
  const [email, setEmail] = useState<string>(contact?.email || "");

  const [nameError, setNameError] = useState<boolean>(false);

  const openFileUploadDialog = () => {
    profilePicUploadRef.current?.click();
  };

  const onFileUploadChange = (changeEvent: ChangeEvent<HTMLInputElement>) => {
    const image = changeEvent.target.files?.item(0);
    if (image) {
      setProfilePicSrcLocal(URL.createObjectURL(image));
    }
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.currentTarget.value);
  };

  const handlePhoneNrChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPhoneNr(event.currentTarget.value);
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value);
  };

  const {
    contactEditOverlay,
    api: { createContact, updateContact },
  } = useContext(AppContext);

  const handleSubmit = async () => {
    //set error to name input field if it is empty
    if (!name) {
      setNameError(true);
      return;
    }

    const contact: Contact = {
      name,
      email,
      phoneNr,
      profilePicSrc,
    };

    if (isNewContact) {
      await createContact(contact);
    } else {
      await updateContact(contact);
    }

    if (onSubmit) onSubmit(contact);
    contactEditOverlay.close();
  };

  const handleCancel = () => {
    contactEditOverlay.close();
    if (onCancel) onCancel();
  };

  return (
    <div className="bg-[#000000]/40 absolute top-0 left-0 h-screen w-screen py-[180px] z-20">
      <div className="w-[364px] h-full m-auto p-6 bg-uicolor-100">
        <form className="flex flex-col gap-6 justify-start h-full">
          <div className="t1 text-left">
            {isNewContact ? "Add Contact" : "Edit Contact"}
          </div>

          {/*TODO: extract the picture upload part into a separate component */}
          <div className="flex flex-row justify-start items-center gap-4">
            <ProfilePicture
              size="large"
              src={profilePicSrcLocal || profilePicSrc}
            />

            {(profilePicSrcLocal || profilePicSrc) && (
              <>
                <Button
                  icon={changeIcon}
                  onClick={openFileUploadDialog}
                  type="button"
                >
                  Change Picture
                </Button>
                <Button
                  icon={deleteIcon}
                  onClick={() => setProfilePicSrcLocal(undefined)}
                  type="button"
                />
              </>
            )}
            {!profilePicSrcLocal && !profilePicSrc && (
              <Button
                icon={addIcon}
                onClick={openFileUploadDialog}
                type="button"
              >
                Add Picture
              </Button>
            )}
            <input
              type="file"
              ref={profilePicUploadRef}
              accept={"image/*"}
              onChange={onFileUploadChange}
              hidden={true}
            />
          </div>
          <TextInputLabelled
            label="Name"
            placeholder="Jamie Wright"
            error={nameError}
            onFocus={() => setNameError(false)}
            onChange={handleNameChange}
            value={name}
          />
          <TextInputLabelled
            label="Phone number"
            placeholder="+01 234 5678"
            onChange={handlePhoneNrChange}
            value={phoneNr}
          />
          <TextInputLabelled
            label="Email address"
            placeholder="jamie.wright@mail.com"
            onChange={handleEmailChange}
            value={email}
          />

          <div className="flex flex-row self-end mt-auto gap-2">
            <Button styleType="secondary" type="button" onClick={handleCancel}>
              Cancel
            </Button>
            <Button styleType="primary" type="button" onClick={handleSubmit}>
              Done
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactEditOverlay;
