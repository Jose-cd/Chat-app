import generateUUID from "../generateUUID";

it("Generate a valid uuid", () => {
  const result = generateUUID();

  expect(result).toHaveLength(36);
});
