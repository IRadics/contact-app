import updateContact from "@/prisma/queries/updateContact";
import { Contact } from "@/types/Contact";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Contact>
) {
  const { name, email, phoneNr, id }: Contact = req.body;

  if (req.method !== "PUT") {
    res.end();
    return;
  }
  return updateContact({ name, email, phoneNr, id })
    .then((result) => {
      res.status(200).json(result);
      return result;
    })
    .catch((error) => res.status(500).json(error.message));
}
