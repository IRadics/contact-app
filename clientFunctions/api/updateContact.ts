import { Contact, ContactPayload } from "@/types/Contact";
import axios, { AxiosError, AxiosResponse } from "axios";

const updateContact = async (contact: ContactPayload) => {
  const formData = new FormData();
  Object.entries(contact).forEach(([key, value]) => {
    if (value !== undefined) formData.append(key, value);
  });

  const { data: contactAdded }: AxiosResponse<Contact> = await axios
    .put("/api/contact", formData)
    .catch((error: AxiosError) => {
      throw error;
    });

  return contactAdded;
};

export default updateContact;
