import { generatePhoneNumber, generateUniqueEmail } from "@/helpers/utils"
import { faker } from "@faker-js/faker"
import moment from "moment"

export enum Role {
  Client = "Client",
  Service = "Service",
}

export interface UserData {
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: string
  role: Role
  pin: string
}

export const validUser = (): UserData => ({
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  email: generateUniqueEmail(),
  phone: generatePhoneNumber(),
  dateOfBirth: moment(faker.date.birthdate({ min: 18, max: 60, mode: 'age' })).format('DD/MM/YYYY'),
  role: Role.Client,
  pin: "Test7@",
})

export const invalidUsers: Record<string, UserData> = {
  emptyEmail: {
    firstName: "Test",
    lastName: "User",
    email: "",
    phone: "+15551234567",
    dateOfBirth: "01/01/1990",
    role: Role.Client,
    pin: "Test7@",
  },
  invalidEmailFormat: {
    firstName: "Test",
    lastName: "User",
    email: "not-a-valid-email",
    phone: "+15551234567",
    dateOfBirth: "01/01/1990",
    role: Role.Client,
    pin: "Test7@",
  },
}
