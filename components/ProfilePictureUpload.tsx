import { ChangeEvent, useRef, useState } from "react";
import Button from "./Button";
import ProfilePicture from "./ProfilePicture";
import changeIcon from "../assets/icons/change.svg";
import deleteIcon from "../assets/icons/delete.svg";
import addIcon from "../assets/icons/add.svg";

const ProfilePictureUpload = ({
  className,
  currentPictureSrc,
  onPictureSelected,
}: {
  className?: string;
  currentPictureSrc?: string;
  onPictureSelected?: (picture: File | undefined) => void;
}) => {
  const [profilePicSrc, setProfilePicSrc] = useState<string | undefined>(
    currentPictureSrc
  );

  const profilePicUploadRef = useRef<HTMLInputElement>(null);
  const openFileUploadDialog = () => {
    profilePicUploadRef.current?.click();
  };

  const onFileUploadChange = (changeEvent: ChangeEvent<HTMLInputElement>) => {
    const image = changeEvent.target.files?.item(0);

    if (image) {
      setProfilePicSrc(URL.createObjectURL(image));
    }

    if (onPictureSelected) {
      onPictureSelected(image || undefined);
    }
  };

  return (
    <div
      className={`flex flex-row justify-start items-center gap-4 ${className}`}
    >
      <ProfilePicture size="large" src={profilePicSrc} />

      {profilePicSrc && (
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
            onClick={() => {
              setProfilePicSrc(undefined);
            }}
            type="button"
          />
        </>
      )}
      {!profilePicSrc && (
        <Button icon={addIcon} onClick={openFileUploadDialog} type="button">
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
  );
};

export default ProfilePictureUpload;
