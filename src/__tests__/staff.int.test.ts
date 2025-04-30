import request from "supertest";
import app from "../server";
import { PrismaClient } from "@prisma/client";

process.env.DATABASE_URL =
  "postgresql://hoteler_owner:npg_lM5ijYKwRp3f@ep-cool-rain-a2gjfkvf-pooler.eu-central-1.aws.neon.tech/hoteler?";
process.env.JWT_SECRET = "your-strong-secret-key-here";

const prisma = new PrismaClient();

let adminToken: string;
let staffId: number;
const ADMIN_EMAIL = "admin@hotel.com";

beforeAll(async () => {
  await prisma.extraService.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.staff.deleteMany();
  await prisma.user.deleteMany();

  const adminResponse = await request(app).post("/api/auth/register").send({
    name: "Admin User",
    email: ADMIN_EMAIL,
    password: "admin1234",
    role: "admin",
  });

  if (adminResponse.status !== 201) {
    console.error("Registration failed:", adminResponse.body);
    throw new Error(`Registration failed with status ${adminResponse.status}`);
  }

  const adminUser = await prisma.user.findUnique({
    where: { email: ADMIN_EMAIL },
  });

  if (!adminUser) {
    throw new Error("Admin user not found in database");
  }

  await prisma.user.update({
    where: { email: ADMIN_EMAIL },
    data: { role: "admin" },
  });

  const loginResponse = await request(app).post("/api/auth/login").send({
    email: ADMIN_EMAIL,
    password: "admin1234",
  });

  if (!loginResponse.body.token) {
    throw new Error("Failed to get admin token");
  }

  adminToken = loginResponse.body.token;
});

afterAll(async () => {
  await prisma.extraService.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.staff.deleteMany();
  await prisma.user.deleteMany();
  await prisma.$disconnect();
});

describe("Staff CRUD", () => {
  it("should create a staff member", async () => {
    const res = await request(app)
      .post("/api/staff")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        name: "Anna",
        role: "Manager",
        bio: "Experienced in hotel management",
        photoUrl: "https://example.com/photo.jpg",
      });

    expect(res.status).toBe(201);
    expect(res.body.staff).toHaveProperty("id");
    staffId = res.body.staff.id;
  });

  it("should fetch all staff publicly", async () => {
    const res = await request(app).get("/api/staff");
    expect(res.status).toBe(201);
    expect(Array.isArray(res.body.staff)).toBe(true);
  });

  it("should update a staff member", async () => {
    const res = await request(app)
      .put(`/api/staff/${staffId}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ bio: "Updated bio" });

    expect(res.status).toBe(200);
    expect(res.body.staff.bio).toBe("Updated bio");
  });

  it("should delete a staff member", async () => {
    const res = await request(app)
      .delete(`/api/staff/${staffId}`)
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Staff deleted successfully");
  });
});
