import { Contact } from "@/types/Contact";
import prisma from "../prisma";

export default async function updateContact(contact: Contact) {
  if (!contact.id)
    throw new Error("contact id is not provided, cannot update contact");

  const contactUpdated = await prisma.contact
    .update({ where: { id: contact.id }, data: contact })
    .then()
    .catch((error) => {
      throw new Error(error);
    });

  return contactUpdated as Contact;
}
