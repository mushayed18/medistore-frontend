"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CategoryForm from "./CategoryForm";
import toast from "react-hot-toast";
import { deleteCategory } from "@/services/category";

interface Category {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

interface Props {
  categories: Category[];
  onRefresh: () => void;
}

export default function CategoryList({ categories, onRefresh }: Props) {
  const [editOpen, setEditOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const handleEdit = (category: Category) => {
    setSelectedCategory(category);
    setEditOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteCategory(id);
      toast.success("Category deleted successfully");
      onRefresh();
    } catch (err) {
      toast.error((err as Error).message || "Failed to delete category");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-10 text-gray-500">
                No categories found
              </TableCell>
            </TableRow>
          ) : (
            categories.map((cat) => (
              <TableRow key={cat.id} className="hover:bg-gray-50">
                <TableCell className="font-medium">{cat.name}</TableCell>
                <TableCell className="text-gray-600">
                  {cat.description || <span className="text-gray-400">No description</span>}
                </TableCell>
                <TableCell className="text-gray-600">
                  {new Date(cat.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(cat)}
                      className="cursor-pointer text-primary hover:text-primary/80 hover:bg-primary/10"
                    >
                      <Pencil size={18} />
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(cat.id)}
                      className="cursor-pointer text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 size={18} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* Edit/Create Form Modal */}
      <CategoryForm
        open={editOpen}
        onOpenChange={(open) => {
          setEditOpen(open);
          if (!open) setSelectedCategory(null);
        }}
        onSuccess={() => {
          onRefresh();
          setEditOpen(false);
          setSelectedCategory(null);
        }}
        initialData={selectedCategory || undefined}
      />
    </div>
  );
}