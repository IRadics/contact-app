import { Contact } from "@/types/Contact";

const createContact = async (contact: Contact) => {
  const contactAdded: Contact = await fetch("/api/createContact", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
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

export default createContact;
