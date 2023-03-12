import { Image } from "@prisma/client";
import prisma from "../prisma";

export default async function createImage(
  image: Omit<Image, "id" | "dateCreated">
) {
  const img = await prisma.image
    .create({
      data: {
        hash: image.hash,
        path: image.path,
        ext: image.ext,
        size: image.size,
      },
    })
    .then()
    .catch((e: any) => {
      throw new Error(e);
    });

  return img;
}
