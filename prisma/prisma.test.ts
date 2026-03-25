import { prisma } from "@/lib/prisma-client";
import { describe, it, expect } from "vitest";

describe("Prisma test", () => {
  it("create a new contact entity", async () => {
    const contact = await prisma.contactInfo.create({
      data: {
        email: "test@gmail.com",
        phone: "01020304",
      },
    });

    expect(contact).toMatchObject({
      email: "test@gmail.com",
      phone: "01020304",
    });
  });

  it("remove previously created contact from the db", async () => {
    const contactDeletion = await prisma.contactInfo.deleteMany({
      where: {
        email: "test@gmail.com",
      },
    });

    const testContact = await prisma.contactInfo.findMany({
      where: {
        email: "test@gmail.com",
      },
    });

    expect(testContact.length).toBe(0);
  });
});
