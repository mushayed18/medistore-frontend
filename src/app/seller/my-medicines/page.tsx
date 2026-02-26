"use client";

import { useEffect, useState } from "react";
import { Loader2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import MyMedicineTable from "@/components/seller/my-medicines/MyMedicineTable";
import { getMyMedicines } from "@/services/seller/medicine";
import { getCategories } from "@/services/category";
import { AdminMedicine, AdminMedicinesResponse } from "@/types/admin/medicine-admin";
import MyMedicineForm from "@/components/seller/my-medicines/MyMedicineForm";

interface Category {
  id: string;
  name: string;
}

export default function SellerMyMedicines() {
  const [medicines, setMedicines] = useState<AdminMedicine[]>([]);
  const [meta, setMeta] = useState<AdminMedicinesResponse["meta"] | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editMedicine, setEditMedicine] = useState<AdminMedicine | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchData = async (page = currentPage) => {
    setLoading(true);
    setError("");

    try {
      const [medicinesRes, categoriesRes] = await Promise.all([
        getMyMedicines(page, 10), // no search param anymore
        getCategories(),
      ]);

      setMedicines(medicinesRes.data || []);
      setMeta(medicinesRes.meta || null);
      setCategories(categoriesRes || []);
    } catch (err) {
      setError((err as Error).message || "Failed to load your medicines");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFormSuccess = () => {
    fetchData(currentPage);
    setFormOpen(false);
    setEditMedicine(null);
  };

  const handleEdit = (medicine: AdminMedicine) => {
    setEditMedicine(medicine);
    setFormOpen(true);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    fetchData(newPage);
  };

  return (
    <div className="min-h-screen bg-gray-50/50 py-10">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10">
          <div>
            <h1 className="text-4xl font-bold text-primary">My Medicines</h1>
            <p className="text-gray-600 mt-2">Manage your own medicine inventory</p>
          </div>

          <Button
            onClick={() => {
              setEditMedicine(null);
              setFormOpen(true);
            }}
            className="bg-primary hover:bg-primary/90 text-white cursor-pointer"
          >
            <Plus className="mr-2 h-5 w-5" />
            Add New Medicine
          </Button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="text-center py-16 text-red-600">
            <p className="text-xl font-medium">{error}</p>
            <Button
              onClick={() => fetchData(currentPage)}
              className="mt-6 bg-primary hover:bg-primary/90 text-white cursor-pointer"
            >
              Try Again
            </Button>
          </div>
        ) : (
          <>
            <MyMedicineTable
              medicines={medicines}
              onRefresh={() => fetchData(currentPage)}
              onEdit={handleEdit}
            />

            {meta && meta.totalPages > 1 && (
              <div className="flex justify-center items-center gap-6 mt-12">
                <Button
                  variant="outline"
                  disabled={meta.page === 1}
                  onClick={() => handlePageChange(meta.page - 1)}
                  className="cursor-pointer"
                >
                  Previous
                </Button>

                <span className="text-lg font-medium text-primary">
                  Page {meta.page} of {meta.totalPages}
                </span>

                <Button
                  variant="outline"
                  disabled={!meta.hasNextPage}
                  onClick={() => handlePageChange(meta.page + 1)}
                  className="cursor-pointer"
                >
                  Next
                </Button>
              </div>
            )}
          </>
        )}

        <MyMedicineForm
          open={formOpen}
          onOpenChange={(open) => {
            setFormOpen(open);
            if (!open) setEditMedicine(null);
          }}
          onSuccess={handleFormSuccess}
          initialData={editMedicine ?? undefined}
          categories={categories}
        />
      </div>
    </div>
  );
}