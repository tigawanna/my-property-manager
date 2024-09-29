export const floors = {
    basement:"basement",
    ground:"G",
    first:"M1",
    second:"M2",
    third:"M3",
    fourth:"M4",
    fifth:"M5",
    sixth:"M6",
    seventh:"M7",
} as const

export type PropertyFloorNames = keyof typeof floors
export type PropertyFloorPrefixes = typeof floors[PropertyFloorNames]


