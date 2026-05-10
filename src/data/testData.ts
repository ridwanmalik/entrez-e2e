import { randomCustomerDropoffAddress } from "@/data/locationTestData"
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
  accountNumber: string
  street: string
  additionalAddress: string
  city: string
  postalCode: string
}

export const validUser = (role: Role = Role.Client): UserData => {
  const address = randomCustomerDropoffAddress()

  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: generateUniqueEmail(),
    phone: generatePhoneNumber(),
    dateOfBirth: moment(faker.date.birthdate({ min: 18, max: 60, mode: 'age' })).format('DD/MM/YYYY'),
    role,
    pin: "Test7@",
    accountNumber: faker.finance.iban({ countryCode: 'FI' }),
    street: address.street,
    additionalAddress: '',
    city: address.city,
    postalCode: address.postalCode,
  }
}

export {
  customerDropoffAddresses,
  customerDropoffs,
  driverBases,
  geofences,
  restaurantAddresses,
  restaurants,
} from "@/data/locationTestData"

export const invalidUsers: Record<string, UserData> = {
  emptyEmail: {
    firstName: "Test",
    lastName: "User",
    email: "",
    phone: "+15551234567",
    dateOfBirth: "01/01/1990",
    role: Role.Client,
    pin: "Test7@",
    accountNumber: "FI0000000000000000",
    street: "123 Test St",
    additionalAddress: "",
    city: "Testville",
    postalCode: "00100",
  },
  invalidEmailFormat: {
    firstName: "Test",
    lastName: "User",
    email: "not-a-valid-email",
    phone: "+15551234567",
    dateOfBirth: "01/01/1990",
    role: Role.Client,
    pin: "Test7@",
    accountNumber: "FI0000000000000000",
    street: "123 Test St",
    additionalAddress: "",
    city: "Testville",
    postalCode: "00100",
  },
}
