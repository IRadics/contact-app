import { Contact, ContactPayloadDbCreate } from "@/types/Contact";
import prisma from "../prisma";

export default async function createContact(contact: ContactPayloadDbCreate) {
  if (!contact.name)
    throw new Error("contact name is not provided, cannot update contact");

  const createdContact = await prisma.contact
    .create({
      data: contact,
    })
    .then()
    .catch((e) => {
      throw new Error(e);
    });

  return createdContact as Contact;
}
