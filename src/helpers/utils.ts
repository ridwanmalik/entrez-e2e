import moment from "moment"

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
