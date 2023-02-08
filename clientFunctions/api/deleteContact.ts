import { Contact } from "@/types/Contact";

const deleteContact = async (contactId: number) => {
  const contactDeleted: Contact = await fetch("/api/deleteContact", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "DELETE",
    body: JSON.stringify({ id: contactId }),
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error: Error) => {
      throw error;
    });

  return contactDeleted;
};

export default deleteContact;
