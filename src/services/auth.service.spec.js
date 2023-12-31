import "dotenv/config";
import mockUserDB from "../../__tests__/mocks/mock_user.data.js";
import mockEmailServices from "../../__tests__/mocks/mock_email.services.js";
import AuthService from "./auth.services";

const authService = AuthService({
  usersDB: mockUserDB,
  emailServices: mockEmailServices,
});

describe("Auth service", () => {
  describe("Signup", () => {
    const data = {
      firstname: "fawad",
      lastname: "alam",
      email: "fwd.alam@yahoo.com",
      password: "123456778900",
      confirm_password: "123456778900",
    };
    describe("Valdiate firstname", () => {
      test("should validate the length", async () => {
        try {
          await authService.signup({ ...data, firstname: "ab" });
        } catch (err) {
          expect(err.message).toBe(
            "First name should be 3 characters long atleast"
          );
        }
      });
      test("should validate that the firstname is not empty", async () => {
        try {
          await authService.signup({ ...data, firstname: "" });
        } catch (err) {
          expect(err.message).toBe("First name cannot be empty");
        }
      });
      test("should not allow non-string values in firstname", async () => {
        try {
          await authService.signup({ ...data, firstname: {} });
        } catch (err) {
          expect(err.message).toBe("First name can only be text");
        }
      });
      test("should now allow firstname greater than 15 characters", async () => {
        try {
          await authService.signup({
            ...data,
            firstname: "this is a very long firstname here.",
          });
        } catch (err) {
          expect(err.message).toBe(
            "First name cannot be longer than 15 characters"
          );
        }
      });
    });
    describe("Valdiate lastname", () => {
      test("should validate the length", async () => {
        try {
          await authService.signup({ ...data, lastname: "ab" });
        } catch (err) {
          expect(err.message).toBe(
            "Last name should be 3 characters long atleast"
          );
        }
      });
      test("should validate that the lastname is not empty", async () => {
        try {
          await authService.signup({ ...data, lastname: "" });
        } catch (err) {
          expect(err.message).toBe("Last name cannot be empty");
        }
      });
      test("should not allow non-string values in lastname", async () => {
        try {
          await authService.signup({ ...data, lastname: {} });
        } catch (err) {
          expect(err.message).toBe("Last name can only be text");
        }
      });
      test("should now allow lastname greater than 15 characters", async () => {
        try {
          await authService.signup({
            ...data,
            lastname: "this is a very long firstname here.",
          });
        } catch (err) {
          expect(err.message).toBe(
            "Last name cannot be longer than 15 characters"
          );
        }
      });
    });
    describe("Validate email", () => {
      test("should throw error on invalid email", async () => {
        try {
          await authService.signup({
            ...data,
            email: "some@invalid@email./com",
          });
        } catch (err) {
          expect(err.message).toBe("Invalid email");
        }
      });
      test("should throw error if email is not provided", async () => {
        try {
          const dataCopyObject = { ...data };
          delete dataCopyObject.email;
          await authService.signup({ ...dataCopyObject });
        } catch (err) {
          expect(err.message).toBe("Email is required");
        }
      });
    });
    describe("Validate password", () => {
      test("should throw error if passwords do not match", async () => {
        try {
          await authService.signup({
            ...data,
            password: "a different password",
          });
        } catch (err) {
          expect(err.message).toBe("Passwords do not match");
        }
      });
      test("should throw error if password is greater than 30 characters", async () => {
        try {
          await authService.signup({
            ...data,
            password: "a very very very very long password",
          });
        } catch (err) {
          expect(err.message).toBe(
            "Password cannot be longer than 30 characters"
          );
        }
      });
    });
    describe("Create new user", () => {
      test("should throw error if email is already registered", async () => {
        try {
          await authService.signup({ ...data });
        } catch (err) {
          expect(err.message).toBe("Email is already registered");
        }
      });
    });
  });
  describe("Verify Email", () => {
    test("should throw error if token is missing", async () => {
      try {
        await authService.verifyEmail();
      } catch (err) {
        expect(err.message).toBe("Token is missing");
      }
    });
    test("should return error if token is invalid", async () => {
      try {
        await authService.verifyEmail("asdfasdfasd");
      } catch (err) {
        expect(err.message).toBe("Invalid token");
      }
    });
    test("should return error if token is expired", async () => {
      try {
        await authService.verifyEmail(
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NTM5ZTMzNjkxNzM5NDBlYjI5ODQzNGQiLCJpYXQiOjE2OTgyOTI1MzUsImV4cCI6MTY5ODI5MjgzNX0.LHVf0g7RgOq9XSBtZ7VcBUaoF05oIvpNkCRVQSOpVM0"
        );
      } catch (err) {
        expect(err.message).toBe("Token has expired");
      }
    });
  });
  describe("Request Verification Email", () => {
    test("should throw error if the user is already verified", async () => {
      try {
        const mockUserObject = {
          firstname: "Asad",
          lastname: "Khan",
          email: "mirza.galib@poetryhub.com",
          password: "some-hashed-password",
          role: "user",
          isVerified: true,
        };
        await authService.requestVerificationEmail(mockUserObject);
      } catch (err) {
        expect(err.message).toBe("You are already a verified user");
      }
    });
  });
});
