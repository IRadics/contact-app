import deleteContact from "@/prisma/queries/deleteContact";
import { Contact } from "@/types/Contact";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Contact>
) {
  const { id } = req.body;

  if (req.method !== "DELETE") {
    res.end();
    return;
  }

  if (id) {
    deleteContact(parseInt(id))
      .then((result) => {
        res.status(200).json(result);
        return result;
      })
      .catch((error) => res.status(500).json(error.message));
  } else {
    res.end();
    return;
  }
}
