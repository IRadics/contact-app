import { NextApiRequest, NextApiResponse } from "next";
import { NextHandler } from "next-connect";

/**
 * Contact type - to be used on frontend (read only)
 */
export type Contact = {
  name: string;
  phoneNr?: string;
  email?: string;
  profilePicSrc?: string;
  id?: number;
};

/**
 * Contact payload - to be used on create / update API calls on frontend
 */
export interface ContactPayload
  extends Partial<Omit<Contact, "profilePicSrc">> {
  profilePicture?: File;
}

/**
 * Contact payload for DB - to be used for Prisma DB contact creation
 */
export interface ContactPayloadDbCreate extends Omit<Contact, "profilePicSrc"> {
  profilePictureId?: number;
}

/**
 * Contact payload for DB - to be used for Prisma DB contact update
 */
export interface ContactPayloadDbUpdate
  extends Partial<ContactPayloadDbCreate> {}

export const contactPayloadToDb = (payload: ContactPayload) => {
  delete payload.profilePicture;
  const payloadDb = payload;
  return payloadDb as ContactPayloadDbCreate | ContactPayloadDbUpdate;
};

/**
 * next-connect middleware to convert the data into correct types in the api request.
 */
export const convertContactTypesMiddleware = (
  req: NextApiRequest,
  res: NextApiResponse,
  next: NextHandler
) => {
  if (req.method === "PUT" || req.method === "POST") {
    const contact = req.body as ContactPayload;
    if (!contact) return;
    if (contact.id && typeof contact.id === "string") {
      contact.id = parseInt(contact.id);
    }
  }
  if (req.method === "DELETE") {
    const id = req.body;

    if (typeof id === "string") req.body = parseInt(id);
  }
  next();
};
