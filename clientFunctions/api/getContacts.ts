import { Contact } from "@/types/Contact";

const getContacts = async () => {
  const contacts: Contact[] = await fetch("/api/contact", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error: Error) => {
      throw error;
    });

  return contacts;
};

export default getContacts;
