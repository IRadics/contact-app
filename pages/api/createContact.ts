import createContact from "@/prisma/queries/createContact";
import { Contact } from "@/types/Contact";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Contact>
) {
  const { name, email, phoneNr } = req.body;

  if (req.method !== "POST") {
    res.end();
    return;
  }
  return createContact({ name, email, phoneNr })
    .then((result) => {
      res.status(200).json(result);
      return result;
    })
    .catch((error) => res.status(500).json(error.message));
}
