import getContacts from "@/prisma/queries/getContacts";
import { Contact } from "@/types/Contact";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Contact[]>
) {
  if (req.method !== "GET") {
    res.end();
    return;
  }

  return getContacts()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => res.status(500).json(error.message));
}
