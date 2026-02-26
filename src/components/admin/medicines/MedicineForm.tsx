"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { AdminMedicine } from "@/types/admin/medicine-admin";

interface CategoryOption {
  id: string;
  name: string;
}

interface MedicineFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
  initialData?: AdminMedicine;
  categories: CategoryOption[];
}

export default function MedicineForm({
  open,
  onOpenChange,
  onSuccess,
  initialData,
  categories,
}: MedicineFormProps) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    manufacturer: "",
    categoryId: "",
  });
  const [loading, setLoading] = useState(false);

  const isEdit = !!initialData?.id;

  useEffect(() => {
    if (open) {
      setForm({
        name: initialData?.name || "",
        description: initialData?.description || "",
        price: initialData?.price?.toString() || "",
        stock: initialData?.stock?.toString() || "",
        manufacturer: initialData?.manufacturer || "",
        categoryId: initialData?.categoryId || "",
      });
    }
  }, [open, initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name.trim() || !form.description.trim() || !form.price || !form.stock || !form.categoryId) {
      toast.error("Please fill all required fields");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        name: form.name.trim(),
        description: form.description.trim(),
        price: Number(form.price),
        stock: Number(form.stock),
        manufacturer: form.manufacturer.trim() || undefined,
        categoryId: form.categoryId,
      };

      if (isEdit) {
        const { updateMedicine } = await import("@/services/admin/medicine");
        await updateMedicine(initialData!.id!, payload);
        toast.success("Medicine updated successfully");
      } else {
        const { createMedicine } = await import("@/services/admin/medicine");
        await createMedicine(payload);
        toast.success("Medicine created successfully");
      }

      onSuccess();
      onOpenChange(false);
    } catch (err) {
      toast.error((err as Error).message || "Operation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-150">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Medicine" : "Add New Medicine"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="categoryId">Category *</Label>
              <select
                id="categoryId"
                name="categoryId"
                value={form.categoryId}
                onChange={handleChange}
                required
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">Select category</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              rows={4}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="price">Price (৳) *</Label>
              <Input
                id="price"
                name="price"
                type="number"
                step="0.01"
                value={form.price}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="stock">Stock *</Label>
              <Input
                id="stock"
                name="stock"
                type="number"
                value={form.stock}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="manufacturer">Manufacturer (optional)</Label>
              <Input
                id="manufacturer"
                name="manufacturer"
                value={form.manufacturer}
                onChange={handleChange}
              />
            </div>
          </div>

          <DialogFooter className="gap-3 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
              className="cursor-pointer"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="bg-primary hover:bg-primary/90 cursor-pointer">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isEdit ? "Updating..." : "Creating..."}
                </>
              ) : isEdit ? (
                "Update Medicine"
              ) : (
                "Create Medicine"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}