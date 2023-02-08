import { Contact } from "@/types/Contact";

const updateContact = async (contact: Contact) => {
  const contactAdded: Contact = await fetch("/api/updateContact", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify(contact),
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error: Error) => {
      throw error;
    });

  return contactAdded;
};

export default updateContact;
