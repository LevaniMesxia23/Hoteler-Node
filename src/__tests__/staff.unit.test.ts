import { createStaffSchema, updateStaffSchema } from "../validator/staff";

describe("Staff Validator", () => {
  it("should validate a correct payload", () => {
    const result = createStaffSchema.safeParse({
      name: "John Doe",
      role: "Manager",
      bio: "I am a manager",
      photoUrl: "https://example.com/photo.jpg",
    });

    expect(result.success).toBe(true);
  });

  it("should fail if name is missing ", () => {
    const result = createStaffSchema.safeParse({
      role: "Manager",
    });

    expect(result.success).toBe(false);
  });

  it("should fail if role is missing ", () => {
    const result = createStaffSchema.safeParse({
      name: "John Doe",
    });

    expect(result.success).toBe(false);
  });

  it("should allow parial update", () => {
    const result = updateStaffSchema.safeParse({
      bio: "I am a manager",
    });

    expect(result.success).toBe(true);
  });
});
