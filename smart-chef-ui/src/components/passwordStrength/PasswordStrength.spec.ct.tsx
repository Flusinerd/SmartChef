import { mount } from "@cypress/react";
import SCPasswordStrength from "./PasswordStrength";

describe("SCPasswordStrength", () => {
  it("should render", () => {
    mount(<SCPasswordStrength />);
  });

  it("should show empty strength", () => {
    // Should have 4 non-filled bars
    const wrapper = mount(<SCPasswordStrength />);
    wrapper.get(".sc-password-strength-indicator").should("have.length", 4);
  });

  it("should show too weak password", () => {
    // To short is when password is less than 8 characters
    const wrapper = mount(<SCPasswordStrength password="1234567" />);
    // The first bar should have class sc-filled-red
    wrapper.get(".sc-filled-red").should("have.length", 1);
  });

  it("should show weak password for only numbers", () => {
    // Weak: At least 8 characters and only letters or numbers
    const wrapper = mount(<SCPasswordStrength password="12345678" />);
    // The first bar should have class sc-filled-red
    wrapper.get(".sc-filled-red").should("have.length", 2);
  });

  it("should show weak password for only letters", () => {
    // Weak: At least 8 characters and only letters or numbers
    const wrapper = mount(<SCPasswordStrength password="abcdefgh" />);
    // The first bar should have class sc-filled-red
    wrapper.get(".sc-filled-red").should("have.length", 2);
  });

  it("should show medium password for 8 characters with one uppercase, one lowercase, one number", () => {
    // Medium: 8 characters one uppercase, one lowercase, one number
    const wrapper = mount(<SCPasswordStrength password="Abcdefgh1" />);
    // The first bar should have class sc-filled-red
    wrapper.get(".sc-filled-red").should("have.length", 2);
    // The second bar should have class sc-filled-yellow
    wrapper.get(".sc-filled-yellow").should("have.length", 1);
  });

  it("should show strong password for 8 characters with one uppercase, one lowercase, one number, one special character", () => {
    // Strong: 8 characters one uppercase, one lowercase, one number, one special character
    const wrapper = mount(<SCPasswordStrength password="Abcdefgh1!" />);
    // The first two bars should have class sc-filled-red
    wrapper.get(".sc-filled-red").should("have.length", 2);
    // The third bar should have class sc-filled-yellow
    wrapper.get(".sc-filled-yellow").should("have.length", 1);
    // The fourth bar should have class sc-filled-green
    wrapper.get(".sc-filled-green").should("have.length", 1);
  });
});
