import { Contact } from "@/types/Contact";
import axios, { AxiosError, AxiosResponse } from "axios";

const deleteContact = async (contactId: number) => {
  const formData = new FormData();
  if (contactId) formData.append("id", contactId.toString());
  const { data: contactDeleted }: AxiosResponse<Contact> = await axios
    .delete("/api/contact", { data: formData })
    .catch((error: AxiosError) => {
      throw error;
    });

  return contactDeleted;
};

export default deleteContact;
