import { Contact } from "@/types/Contact";
import prisma from "../prisma";

export default async function getContacts() {
  const contacts = await prisma.contact
    .findMany({ include: { profilePicture: true } })
    .then()
    .catch((e) => {
      throw new Error(e);
    });

  return contacts.map((contact) => {
    return {
      name: contact.name,
      email: contact.email,
      id: contact.id,
      phoneNr: contact.phoneNr,
      profilePicSrc: contact.profilePicture?.path,
    } as Contact;
  });
}
