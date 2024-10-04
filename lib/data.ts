import { prisma } from "@/lib/prisma";

const ITEMS_PER_PAGES = 5;

export const getContacts = async (query: string, currentPage: number) => {
  const offset = (currentPage - 1) * ITEMS_PER_PAGES;
  try {
    const contacts = await prisma.contact.findMany({
      skip: offset,
      take: ITEMS_PER_PAGES,
      where: {
        OR: [
          {
            name: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            phone: {
              contains: query,
              mode: "insensitive",
            },
          },
        ],
      },
    });
    return contacts;
  } catch (error) {
    throw new Error("filed ito fetch contact data");
  }
};

export const getContactsById = async (id: string) => {
  try {
    const contacts = await prisma.contact.findUnique({ where: { id } });
    return contacts;
  } catch (error) {
    throw new Error("filed ito fetch contact data");
  }
};

export const getContactsPages = async (query: string) => {
  try {
    const contacts = await prisma.contact.count({
      where: {
        OR: [
          {
            name: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            phone: {
              contains: query,
              mode: "insensitive",
            },
          },
        ],
      },
    });
    const totalPages = Math.ceil(Number(contacts) / ITEMS_PER_PAGES);
    return totalPages;
  } catch (error) {
    throw new Error("filed ito fetch contact data");
  }
};
