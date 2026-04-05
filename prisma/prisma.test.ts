import { describe, expect, it } from "vitest";
import { prisma } from "@/lib/prisma-client";

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
    const _contactDeletion = await prisma.contactInfo.deleteMany({
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
