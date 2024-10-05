"use server";

import { z } from "zod";
import { prisma } from "./prisma.1";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const ContactSchema = z.object({
  name: z.string().min(6),
  phone: z.string().min(11),
});

export async function saveContact(prevSate: any, formData: FormData) {
  const validatedFields = ContactSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      Error: validatedFields.error.flatten().fieldErrors,
    };
  }
  await prisma.contact.create({
    data: {
      name: validatedFields.data.name,
      phone: validatedFields.data.phone,
    },
  });

  revalidatePath("/contacts");
  redirect("/contacts");
}

export async function updateContact(
  id: string,
  prevSate: any,
  formData: FormData
) {
  const validatedFields = ContactSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      Error: validatedFields.error.flatten().fieldErrors,
    };
  }

  await prisma.contact.update({
    data: {
      name: validatedFields.data.name,
      phone: validatedFields.data.phone,
    },
    where: { id },
  });

  revalidatePath("/contacts");
  redirect("/contacts");
}

export const deleteContact = async (id: string) => {
  await prisma.contact.delete({
    where: { id },
  });

  revalidatePath("/contacts");
};
