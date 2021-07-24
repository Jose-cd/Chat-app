import hashPassword from "../hashPassword";

it("hash the password", () => {
  const password = "123456";

  const hashedPassword = hashPassword(password);

  expect(hashedPassword).not.toBe(password);
});
