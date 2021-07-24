import accessEnv from "../accessEnv";

it("Should return default value", () => {
  const response = accessEnv("qqqqqqqqq", "value");
  expect(response).toBe("value");
});

it("Should return a valid ENV variable", () => {
  const result = accessEnv("DB_PASSWORD", "");
  expect(result).toBe("123456");
});
