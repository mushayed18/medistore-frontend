export interface Medicine {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  manufacturer: string;
  category: {
    name: string;
  };
  seller: {
    name: string;
  };
}

export interface MedicineResponse {
  success: boolean;
  data: Medicine[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}
