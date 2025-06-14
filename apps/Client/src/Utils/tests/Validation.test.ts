import { describe, it, expect } from "vitest";
import {
  ValidateName,
  ValidateEmail,
  ValidatePassword,
  ConfirmPassword,
} from "../Validation";

describe("Validation Functions", () => {
  describe("ValidateName", () => {
    it("should return true for valid names (3-10 chars)", () => {
      expect(ValidateName("abc")).toBe(true);
      expect(ValidateName("abcdefghij")).toBe(true);
    });

    it("should return false for invalid names", () => {
      expect(ValidateName("ab")).toBe(false); // too short
      expect(ValidateName("abcdefghijk")).toBe(false); // too long
      expect(ValidateName("")).toBe(false); // empty
    });
  });

  describe("ValidateEmail", () => {
    it("should return true for valid emails", () => {
      expect(ValidateEmail("test@example.com")).toBe(true);
      expect(ValidateEmail("user.name+tag@domain.co")).toBe(true);
    });

    it("should return false for invalid emails", () => {
      expect(ValidateEmail("")).toBe(false); // empty
      expect(ValidateEmail("test@")).toBe(false); // incomplete
      expect(ValidateEmail("test.example.com")).toBe(false); // no @
    });
  });

  describe("ValidatePassword", () => {
    it("should return true for valid passwords (6+ chars)", () => {
      expect(ValidatePassword("123456")).toBe(true);
      expect(ValidatePassword("longpassword")).toBe(true);
    });

    it("should return false for invalid passwords", () => {
      expect(ValidatePassword("12345")).toBe(false); // too short
      expect(ValidatePassword("")).toBe(false); // empty
    });
  });

  describe("ConfirmPassword", () => {
    it("should return true when passwords match", () => {
      expect(ConfirmPassword("password", "password")).toBe(true);
    });

    it("should return false when passwords differ", () => {
      expect(ConfirmPassword("password", "passw0rd")).toBe(false);
      expect(ConfirmPassword("", "password")).toBe(false);
    });
  });
});
