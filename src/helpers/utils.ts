import moment from "moment"

export interface FinnishAddress {
  street: string
  city: string
  postalCode: string
}

const FINNISH_ADDRESSES: FinnishAddress[] = [
  { street: "Porttikuja 11A 012", city: "Helsinki", postalCode: "00940" },
  { street: "Kolmas linja 17", city: "Helsinki", postalCode: "00530" },
  { street: "Kolmas linja 18", city: "Helsinki", postalCode: "00530" },
  { street: "Kalervonkatu 5", city: "Helsinki", postalCode: "00610" },
  { street: "Harjutori 8", city: "Helsinki", postalCode: "00500" },
  { street: "Työpajankatu 6 A", city: "Helsinki", postalCode: "00580" },
  { street: "Ostostie 4", city: "Helsinki", postalCode: "00940" },
  // { street: 'Kivikonkaari 39 C',  city: 'Helsinki',  postalCode: '00940' }, // Invalid
  { street: "Aurakatu 6", city: "Turku", postalCode: "20100" },
  { street: "Yliopistonkatu 22", city: "Turku", postalCode: "20100" },
]

export const generateFinnishAddress = (): FinnishAddress =>
  FINNISH_ADDRESSES[Math.floor(Math.random() * FINNISH_ADDRESSES.length)]

export const generateUniqueEmail = (): string => {
  const ts = moment().format("HHmmss")
  return `qa${ts}@example.com`
}

export const generatePhoneNumber = (): string => {
  const mid = Math.floor(Math.random() * 11) + 40
  const suffix = Math.floor(Math.random() * 9000000) + 1000000
  return `358${mid}${suffix}`
}

export const pause = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms))

export const retry = async <T>(fn: () => Promise<T>, retries: number = 3, delayMs: number = 1000): Promise<T> => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await fn()
    } catch (err: unknown) {
      if (attempt === retries) throw err
      const message = err instanceof Error ? err.message : String(err)
      console.warn(`[retry] Attempt ${attempt}/${retries} failed: ${message}. Retrying in ${delayMs}ms…`)
      await pause(delayMs)
    }
  }
  throw new Error("retry: exhausted retries")
}

export const second = (s: number): number => s * 1000
