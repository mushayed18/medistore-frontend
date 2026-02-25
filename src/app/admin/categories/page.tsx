"use client";

import { useEffect, useState } from "react";
import { Loader2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import CategoryList from "@/components/admin/categories/CategoryList";
import CategoryForm from "@/components/admin/categories/CategoryForm";

interface Category {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export default function ManageCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [createOpen, setCreateOpen] = useState(false);

  const fetchCategories = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/categories`, {
        cache: "no-store",
      });

      if (!res.ok) throw new Error("Failed to fetch categories");

      const json = await res.json();
      if (!json.success) throw new Error("Invalid response");

      setCategories(json.data || []);
    } catch (err) {
      setError((err as Error).message || "Could not load categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50/50 py-10">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10">
          <div>
            <h1 className="text-4xl font-bold text-primary">Manage Categories</h1>
            <p className="text-gray-600 mt-2">Create, update, and delete medicine categories</p>
          </div>

          <Button
            onClick={() => setCreateOpen(true)}
            className="bg-primary hover:bg-primary/90 text-white cursor-pointer"
          >
            <Plus className="mr-2 h-5 w-5" />
            Add New Category
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
              onClick={fetchCategories}
              className="mt-6 bg-primary hover:bg-primary/90 text-white"
            >
              Try Again
            </Button>
          </div>
        ) : (
          <CategoryList categories={categories} onRefresh={fetchCategories} />
        )}

        {/* Create New Category Modal */}
        <CategoryForm
          open={createOpen}
          onOpenChange={setCreateOpen}
          onSuccess={() => {
            fetchCategories();
            setCreateOpen(false);
          }}
        />
      </div>
    </div>
  );
}