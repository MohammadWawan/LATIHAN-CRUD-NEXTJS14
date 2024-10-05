import { prisma } from "./prisma.1";

const ITEMS_PER_PAGES = 5;

export const getContacts = async (query: string, currentPage: number) => {
  const offset = (currentPage - 1) * ITEMS_PER_PAGES;
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
};

export const getContactsById = async (id: string) => {
  const contacts = await prisma.contact.findUnique({ where: { id } });
  return contacts;
};

export const getContactsPages = async (query: string) => {
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
};
