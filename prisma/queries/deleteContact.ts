import { Contact } from "@/types/Contact";
import prisma from "../prisma";

export default async function deleteContact(contactId: number) {
  const contactDeleted = await prisma.contact
    .delete({ where: { id: contactId } })
    .then()
    .catch((error) => {
      throw new Error(error);
    });

  return contactDeleted as Contact;
}
