export interface Category {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryResponse {
  success: boolean;
  data: Category[];
}

export interface SingleCategoryResponse {
  success: boolean;
  data: Category;
}