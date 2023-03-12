import deleteContact from "@/prisma/queries/deleteContact";
import getContacts from "@/prisma/queries/getContacts";
import handler from "./_handler";
import multer from "multer";
import fs from "fs";
import {
  ContactPayload,
  ContactPayloadDbCreate,
  ContactPayloadDbUpdate,
  contactPayloadToDb,
  convertContactTypesMiddleware,
} from "@/types/Contact";
import md5 from "md5";
import createContact from "@/prisma/queries/createContact";
import createImage from "@/prisma/queries/createImage";
import updateContact from "@/prisma/queries/updateContact";

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};

const uploadPath = (process.cwd(), "media/");

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 3000000 },
});

const uploadMiddleware = upload.single("profilePicture");
handler.use(uploadMiddleware);
handler.use(convertContactTypesMiddleware);

const saveImage = (image: Express.Multer.File) => {
  const fileBuffer = image.buffer;
  const hash = md5(fileBuffer);
  const ext = image.originalname.replace(/^.*\.(.*)$/, "$1");
  const filename = `${hash}.${ext}`;

  //for URL, leading slash is required!!
  const imagePathUrl = `/${uploadPath}${filename}`;
  const imagePathSave = `public/${uploadPath}${filename}`;

  try {
    fs.writeFileSync(imagePathSave, fileBuffer);
    return createImage({
      path: imagePathUrl,
      ext: ext,
      hash: hash,
      size: image.size,
    }).catch((error) => {
      throw new Error(error.message);
    });
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
  }
};

export default handler
  .get(async (req, res) => {
    return getContacts()
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((error) => res.status(500).json(error.message));
  })

  .delete(async (req, res) => {
    const id = req.body.id as string;

    if (!id) {
      res.status(400).json({ error: "id is not provided" });
      return;
    }

    return deleteContact(parseInt(id))
      .catch((error) => res.status(500).json(error.message))
      .then((result) => {
        res.status(200).json(result);
        return result;
      });
  })

  .post(async (req, res) => {
    const contact = req.body as ContactPayload;

    //name is required
    if (!contact.name) {
      res.status(400).json({ error: "name is not provided" });
      return;
    }

    //casting like this may be dangerous, however contactPayloadToDb function takes care of deleting the non needed properties
    const contactPayloadDb = contactPayloadToDb(
      contact
    ) as ContactPayloadDbCreate;

    const profilePic = req.file;
    if (profilePic) {
      const img = await saveImage(profilePic);
      if (img) {
        contactPayloadDb.profilePictureId = img.id;
      }
    }

    createContact(contactPayloadDb)
      .catch((error) => res.status(500).json(error.message))
      .then((contact) => res.status(200).json(contact));
  })

  .put(async (req, res) => {
    const contact = req.body as ContactPayload;

    //id is required
    if (!contact.id) {
      res.status(400).json({ error: "id is not provided" });
      return;
    }

    const contactPayloadDb = contactPayloadToDb(
      contact
    ) as ContactPayloadDbUpdate;

    const profilePic = req.file;
    if (profilePic) {
      const img = await saveImage(profilePic);
      if (img) {
        contactPayloadDb.profilePictureId = img.id;
      }
    }

    updateContact(contactPayloadDb)
      .catch((error) => res.status(500).json(error.message))
      .then((contact) => res.status(200).json(contact));
  });
