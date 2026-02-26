// types/admin/medicine-admin.ts
// This file is ONLY for admin CRUD operations

export interface AdminMedicine {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  manufacturer?: string;
  categoryId: string;           // required for create/update
  category?: { id: string; name: string };  // optional from GET
  seller?: { name: string };
  createdAt: string;
  updatedAt?: string;
}

export interface AdminMedicinesResponse {
  success: boolean;
  data: AdminMedicine[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export interface AdminSingleMedicineResponse {
  success: boolean;
  data: AdminMedicine;
}