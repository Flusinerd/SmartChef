export interface ProductDTO{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    gtin: string;
    name: string;
    description?: string;
    amount: number;
    unit: UNITS;
}

export enum UNITS{
    GRAM = 'GRAM',
    KILOGRAM = 'KILOGRAM',
    LITER = 'LITER',
    MILILITER = 'MILILITER',
    PIECE = 'PIECE',
}