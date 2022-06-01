export interface ProductCategoryDto {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  parent: string | null;
}
