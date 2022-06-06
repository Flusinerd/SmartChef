import { ProductCategoryDto } from "./product-category";

export interface ProductDTO {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  gtin: string;
  name: string;
  description?: string;
  amount: number;
  unit: UNITS;
}

export interface ProductWithCategoryDTO extends ProductDTO {
  category: ProductCategoryDto;
}

export interface CreateProductDto {
  gtin: string;
  name: string;
  amount: number;
  unit: string;
  manufacturer: string;
  description?: string;
  category_id: string;
}

export enum UNITS {
  GRAM = "GRAM",
  KILOGRAM = "KILOGRAM",
  LITER = "LITER",
  MILLILITER = "MILLILITER",
  PIECE = "PIECE",
}
