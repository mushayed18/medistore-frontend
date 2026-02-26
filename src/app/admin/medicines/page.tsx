"use client";

import { useEffect, useState } from "react";
import { Loader2, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MedicineTable from "@/components/admin/medicines/MedicineTable";
import MedicineForm from "@/components/admin/medicines/MedicineForm";
import { getMedicines } from "@/services/admin/medicine";
import { getCategories } from "@/services/category";
import { AdminMedicine, AdminMedicinesResponse } from "@/types/admin/medicine-admin";

interface Category {
  id: string;
  name: string;
}

export default function AdminMedicinesPage() {
  const [medicines, setMedicines] = useState<AdminMedicine[]>([]);
  const [meta, setMeta] = useState<AdminMedicinesResponse["meta"] | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editMedicine, setEditMedicine] = useState<AdminMedicine | null>(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const fetchData = async (page = currentPage, searchTerm = search) => {
    setLoading(true);
    setError("");

    try {
      const [medicinesRes, categoriesRes] = await Promise.all([
        getMedicines(page, 10, searchTerm),
        getCategories(),
      ]);

      setMedicines(medicinesRes.data || []);
      setMeta(medicinesRes.meta || null);
      setCategories(categoriesRes || []);
    } catch (err) {
      setError((err as Error).message || "Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Re-fetch when search or page changes
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchData(1, search); // reset to page 1 on new search
      setCurrentPage(1);
    }, 500); // debounce search

    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const handleFormSuccess = () => {
    fetchData(currentPage, search);
    setFormOpen(false);
    setEditMedicine(null);
  };

  const handleEdit = (medicine: AdminMedicine) => {
    setEditMedicine(medicine);
    setFormOpen(true);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    fetchData(newPage, search);
  };

  return (
    <div className="min-h-screen bg-gray-50/50 py-10">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-primary">Manage Medicines</h1>
            <p className="text-gray-600 mt-2">Create, update, and manage all medicines</p>
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

        {/* Search Bar */}
        <div className="mb-6 relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="text-center py-16 text-red-600">
            <p className="text-xl font-medium">{error}</p>
            <Button
              onClick={() => fetchData(currentPage, search)}
              className="mt-6 bg-primary hover:bg-primary/90 text-white cursor-pointer"
            >
              Try Again
            </Button>
          </div>
        ) : (
          <>
            <MedicineTable
              medicines={medicines}
              onRefresh={() => fetchData(currentPage, search)}
              onEdit={handleEdit}
            />

            {/* Pagination */}
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

        {/* Create/Edit Modal */}
        <MedicineForm
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