import { ProductWithCategoryDTO } from "./product";

export interface HouseholdDTO {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  owner: string;
}

export interface StockDTO {
  actual: number;
  target: number;
  product: ProductWithCategoryDTO;
  name: string;
}

export interface HouseholdWithStockDTO extends HouseholdDTO {
  stock: StockDTO[];
}
