export interface GeofenceData {
  city: string
  centerName: string
  centerAddress: string
  centerLat: number
  centerLon: number
  radiusKm: number
}

export interface RestaurantData {
  city: string
  name: string
  address: string
  lat: number
  lon: number
}

export interface CustomerDropoffData {
  customerId: string
  city: string
  label: string
  dropoffAddress: string
  lat: number
  lon: number
}

export interface DriverBaseData {
  driverId: string
  city: string
  name: string
  baseNotes: string
  baseLat: number
  baseLon: number
}

export interface AddressFixture {
  street: string
  city: string
  postalCode: string
  fullAddress: string
  label?: string
  lat?: number
  lon?: number
}

export const geofences: GeofenceData[] = [
  {
    city: "Helsinki",
    centerName: "Helsinki Central Station",
    centerAddress: "Kaivokatu 1, 00100 Helsinki",
    centerLat: 60.17194,
    centerLon: 24.94139,
    radiusKm: 10,
  },
  {
    city: "Tampere",
    centerName: "Keskustori (Tampere Central Square)",
    centerAddress: "Keskustori, 33100 Tampere",
    centerLat: 61.4982,
    centerLon: 23.7608,
    radiusKm: 10,
  },
  {
    city: "Turku",
    centerName: "Kauppatori (Market Square)",
    centerAddress: "Kauppatori, 20100 Turku",
    centerLat: 60.451,
    centerLon: 22.2668,
    radiusKm: 10,
  },
]

export const restaurants: RestaurantData[] = [
  {
    city: "Helsinki",
    name: "Restaurant Olo",
    address: "Pohjoisesplanadi 5, 00170 Helsinki",
    lat: 60.172753,
    lon: 24.938939,
  },
  {
    city: "Helsinki",
    name: "Savoy",
    address: "Eteläesplanadi 14, 00130 Helsinki",
    lat: 60.16529,
    lon: 24.926647,
  },
  {
    city: "Helsinki",
    name: "Restaurant Grön",
    address: "Albertinkatu 36, 00180 Helsinki",
    lat: 60.173218,
    lon: 24.913627,
  },
  {
    city: "Helsinki",
    name: "Löyly",
    address: "Hernesaarenranta 4, 00150 Helsinki",
    lat: 60.145574,
    lon: 24.900537,
  },
  {
    city: "Helsinki",
    name: "YesYesYes",
    address: "Iso Roobertinkatu 1, 00120 Helsinki",
    lat: 60.148467,
    lon: 24.888323,
  },
  {
    city: "Tampere",
    name: "Bistro C (Ravintola C)",
    address: "Rautatienkatu 20, 33100 Tampere",
    lat: 61.467918,
    lon: 23.755426,
  },
  {
    city: "Tampere",
    name: "Gastropub Tuulensuu",
    address: "Hämeenpuisto 23, 33210 Tampere",
    lat: 61.506562,
    lon: 23.779421,
  },
  {
    city: "Tampere",
    name: "Ravintola Tampella",
    address: "Kelloportinkatu 1, 33100 Tampere",
    lat: 61.500043,
    lon: 23.709789,
  },
  {
    city: "Tampere",
    name: "Panimoravintola Plevna",
    address: "Itäinenkatu 8, 33210 Tampere",
    lat: 61.474652,
    lon: 23.786298,
  },
  {
    city: "Tampere",
    name: "Restaurant Näsinneula",
    address: "Laiturikatu 1, 33230 Tampere",
    lat: 61.523204,
    lon: 23.782111,
  },
  {
    city: "Turku",
    name: "Kaskis",
    address: "Kaskenkatu 6A, 20700 Turku",
    lat: 60.438182,
    lon: 22.193102,
  },
  {
    city: "Turku",
    name: "Smör",
    address: "Läntinen Rantakatu 3, 20100 Turku",
    lat: 60.421601,
    lon: 22.326218,
  },
  {
    city: "Turku",
    name: "Tintå",
    address: "Läntinen Rantakatu 9, 20100 Turku",
    lat: 60.479422,
    lon: 22.302759,
  },
  {
    city: "Turku",
    name: "Restaurant NOOA",
    address: "Läntinen Rantakatu 57, 20100 Turku",
    lat: 60.436624,
    lon: 22.234482,
  },
  {
    city: "Turku",
    name: "Restaurant Kakolanruusu",
    address: "Graniittilinnankatu 2F, 20100 Turku",
    lat: 60.442078,
    lon: 22.250809,
  },
]

export const customerDropoffs: CustomerDropoffData[] = [
  {
    customerId: "CUST-001",
    city: "Helsinki",
    label: "Oodi Library",
    dropoffAddress: "Töölönlahdenkatu 4, 00100 Helsinki",
    lat: 60.194942,
    lon: 24.999988,
  },
  {
    customerId: "CUST-002",
    city: "Helsinki",
    label: "Kamppi",
    dropoffAddress: "Urho Kekkosen katu 1, 00100 Helsinki",
    lat: 60.152269,
    lon: 25.019008,
  },
  {
    customerId: "CUST-003",
    city: "Helsinki",
    label: "Hakaniemi Market Hall",
    dropoffAddress: "Hämeentie 1, 00530 Helsinki",
    lat: 60.132306,
    lon: 24.925345,
  },
  {
    customerId: "CUST-004",
    city: "Helsinki",
    label: "Tripla",
    dropoffAddress: "Fredikanterassi 1, 00520 Helsinki",
    lat: 60.20046,
    lon: 24.899587,
  },
  {
    customerId: "CUST-005",
    city: "Helsinki",
    label: "Kallio Library",
    dropoffAddress: "Viides linja 11, 00530 Helsinki",
    lat: 60.209032,
    lon: 24.981496,
  },
  {
    customerId: "CUST-006",
    city: "Helsinki",
    label: "Meilahti Hospital",
    dropoffAddress: "Haartmaninkatu 4, 00290 Helsinki",
    lat: 60.106174,
    lon: 24.977057,
  },
  {
    customerId: "CUST-007",
    city: "Helsinki",
    label: "Helsinki Ice Hall",
    dropoffAddress: "Nordenskiöldinkatu 11–13, 00250 Helsinki",
    lat: 60.208934,
    lon: 24.838932,
  },
  {
    customerId: "CUST-008",
    city: "Helsinki",
    label: "Ateneum",
    dropoffAddress: "Kaivokatu 2, 00100 Helsinki",
    lat: 60.156721,
    lon: 24.899788,
  },
  {
    customerId: "CUST-009",
    city: "Helsinki",
    label: "Seurasaari",
    dropoffAddress: "Seurasaari, 00250 Helsinki",
    lat: 60.225822,
    lon: 24.924668,
  },
  {
    customerId: "CUST-010",
    city: "Helsinki",
    label: "Ruoholahti",
    dropoffAddress: "Itämerenkatu 14, 00180 Helsinki",
    lat: 60.236538,
    lon: 24.905538,
  },
  {
    customerId: "CUST-011",
    city: "Tampere",
    label: "Tampere Railway Station",
    dropoffAddress: "Rautatienkatu 25, 33100 Tampere",
    lat: 61.522149,
    lon: 23.870403,
  },
  {
    customerId: "CUST-012",
    city: "Tampere",
    label: "Nokia Arena",
    dropoffAddress: "Kansikatu 3, 33100 Tampere",
    lat: 61.516551,
    lon: 23.726787,
  },
  {
    customerId: "CUST-013",
    city: "Tampere",
    label: "Tampere Hall",
    dropoffAddress: "Yliopistonkatu 55, 33100 Tampere",
    lat: 61.555741,
    lon: 23.712168,
  },
  {
    customerId: "CUST-014",
    city: "Tampere",
    label: "Tampere University",
    dropoffAddress: "Kalevantie 4, 33100 Tampere",
    lat: 61.487581,
    lon: 23.737613,
  },
  {
    customerId: "CUST-015",
    city: "Tampere",
    label: "Särkänniemi",
    dropoffAddress: "Laiturikatu 1, 33230 Tampere",
    lat: 61.527274,
    lon: 23.788591,
  },
  {
    customerId: "CUST-016",
    city: "Tampere",
    label: "Tammela Stadium",
    dropoffAddress: "Salhojankatu 40, 33540 Tampere",
    lat: 61.537652,
    lon: 23.756581,
  },
  {
    customerId: "CUST-017",
    city: "Tampere",
    label: "Laukontori",
    dropoffAddress: "Laukontori, 33200 Tampere",
    lat: 61.543709,
    lon: 23.682621,
  },
  {
    customerId: "CUST-018",
    city: "Tampere",
    label: "Finlayson Area",
    dropoffAddress: "Finlaysoninkuja 21, 33210 Tampere",
    lat: 61.521187,
    lon: 23.736537,
  },
  {
    customerId: "CUST-019",
    city: "Tampere",
    label: "Pyynikki",
    dropoffAddress: "Pyynikinharju, 33230 Tampere",
    lat: 61.541798,
    lon: 23.712543,
  },
  {
    customerId: "CUST-020",
    city: "Turku",
    label: "Turku Railway Station",
    dropoffAddress: "Ratapihankatu 37, 20100 Turku",
    lat: 60.500144,
    lon: 22.182079,
  },
  {
    customerId: "CUST-021",
    city: "Turku",
    label: "Turku Castle",
    dropoffAddress: "Linnankatu 80, 20100 Turku",
    lat: 60.444591,
    lon: 22.340698,
  },
  {
    customerId: "CUST-022",
    city: "Turku",
    label: "University of Turku",
    dropoffAddress: "Vesilinnantie 5, 20014 Turku",
    lat: 60.444076,
    lon: 22.18892,
  },
  {
    customerId: "CUST-023",
    city: "Turku",
    label: "Kupittaa Park",
    dropoffAddress: "Kupittaankatu 1, 20520 Turku",
    lat: 60.446866,
    lon: 22.366969,
  },
  {
    customerId: "CUST-024",
    city: "Turku",
    label: "Forum Marinum",
    dropoffAddress: "Linnankatu 72, 20100 Turku",
    lat: 60.420372,
    lon: 22.188028,
  },
  {
    customerId: "CUST-025",
    city: "Turku",
    label: "Turku Cathedral",
    dropoffAddress: "Tuomiokirkonkatu 1, 20500 Turku",
    lat: 60.469875,
    lon: 22.177707,
  },
]

export const driverBases: DriverBaseData[] = [
  {
    driverId: "DRV-001",
    city: "Helsinki",
    name: "Driver 1",
    baseNotes: "Base near city center",
    baseLat: 60.155715,
    baseLon: 24.866979,
  },
  {
    driverId: "DRV-002",
    city: "Helsinki",
    name: "Driver 2",
    baseNotes: "Base near city center",
    baseLat: 60.124697,
    baseLon: 24.936306,
  },
  {
    driverId: "DRV-003",
    city: "Tampere",
    name: "Driver 3",
    baseNotes: "Base near city center",
    baseLat: 61.445219,
    baseLon: 23.780192,
  },
  {
    driverId: "DRV-004",
    city: "Tampere",
    name: "Driver 4",
    baseNotes: "Base near city center",
    baseLat: 61.473032,
    baseLon: 23.66364,
  },
  {
    driverId: "DRV-005",
    city: "Turku",
    name: "Driver 5",
    baseNotes: "Base near city center",
    baseLat: 60.428467,
    baseLon: 22.356638,
  },
]

export const parseFinnishAddress = (
  fullAddress: string,
  metadata: Partial<Pick<AddressFixture, "label" | "lat" | "lon">> = {},
): AddressFixture => {
  const match = fullAddress.match(/^(.*),\s*(\d{5})\s+(.+)$/)

  if (!match) {
    throw new Error(`Address does not match expected Finnish format: ${fullAddress}`)
  }

  return {
    street: match[1],
    postalCode: match[2],
    city: match[3],
    fullAddress,
    ...metadata,
  }
}

export const customerDropoffAddresses: AddressFixture[] = customerDropoffs.map(customer =>
  parseFinnishAddress(customer.dropoffAddress, {
    label: customer.label,
    lat: customer.lat,
    lon: customer.lon,
  }),
)

export const restaurantAddresses: AddressFixture[] = restaurants.map(restaurant =>
  parseFinnishAddress(restaurant.address, {
    label: restaurant.name,
    lat: restaurant.lat,
    lon: restaurant.lon,
  }),
)

const randomItem = <T>(items: T[]): T => items[Math.floor(Math.random() * items.length)]

export const randomCustomerDropoffAddress = (): AddressFixture => randomItem(customerDropoffAddresses)

export const randomRestaurantAddress = (): AddressFixture => randomItem(restaurantAddresses)

export const getCustomerDropoffAddress = (customerId: string): AddressFixture | undefined => {
  const customer = customerDropoffs.find(dropoff => dropoff.customerId === customerId)
  return customer
    ? parseFinnishAddress(customer.dropoffAddress, {
        label: customer.label,
        lat: customer.lat,
        lon: customer.lon,
      })
    : undefined
}
