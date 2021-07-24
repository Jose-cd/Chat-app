import hashPassword from "../hashPassword";
import passwordCompareSync from "../passwordCompareSync";

it("expect comparing password and hashedPassword to be true", () => {
  const inputPassword = "123456";
  const hashedPassword = hashPassword(inputPassword);

  const comparedPasswordMatch = passwordCompareSync(
    inputPassword,
    hashedPassword
  );

  expect(comparedPasswordMatch).toBeTruthy();
});

it("expect comparing passwords to be false", () => {
  const inputPassword = "123456";
  const hashedPassword = hashPassword("differentPassword");

  const comparedPasswordMatch = passwordCompareSync(
    inputPassword,
    hashedPassword
  );

  expect(comparedPasswordMatch).toBeFalsy();
});
