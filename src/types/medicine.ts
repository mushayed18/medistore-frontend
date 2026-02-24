export interface Review {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
  customer: {
    name: string;
  };
}

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
  reviews: Review[];
}

export interface SingleMedicineResponse {
  success: boolean;
  data: Medicine;
}
