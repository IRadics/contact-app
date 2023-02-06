import { StaticImageData } from "next/image";
import { Contact } from "./Contact";

export type ContactContextListItem = {
  icon: StaticImageData;
  label: string;
  action: (contact: Contact) => void;
  contact: Contact;
};
