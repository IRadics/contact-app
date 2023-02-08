import { Contact } from "@/types/Contact";
import prisma from "../prisma";

export default async function createContact(contact: Contact) {
  const createdContact = await prisma.contact
    .create({
      data: {
        name: contact.name,
        email: contact.email,
        phoneNr: contact.phoneNr,
      },
    })
    .then()
    .catch((e) => {
      throw new Error(e);
    });

  return createdContact as Contact;
}
