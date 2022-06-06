export interface ProductCategoryDto {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  parent: string | null;
}

export interface ProductCategoryWithStockDTO extends ProductCategoryDto {
  actual: number;
  target: number;
}
