"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Loader2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import toast from "react-hot-toast";
import { deleteMedicine } from "@/services/admin/medicine";
import { AdminMedicine } from "@/types/admin/medicine-admin";

interface Props {
  medicines: AdminMedicine[];
  onRefresh: () => void;
  onEdit: (medicine: AdminMedicine) => void;
}

export default function MyMedicineTable({ medicines, onRefresh, onEdit }: Props) {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    setDeletingId(id);

    try {
      await deleteMedicine(id);
      toast.success("Medicine deleted successfully");
      onRefresh();
    } catch (err) {
      toast.error((err as Error).message || "Failed to delete medicine");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Manufacturer</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {medicines.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-10 text-gray-500">
                No medicines found
              </TableCell>
            </TableRow>
          ) : (
            medicines.map((med) => (
              <TableRow key={med.id} className="hover:bg-gray-50 transition">
                <TableCell className="font-medium">{med.name}</TableCell>
                <TableCell>৳{med.price.toFixed(2)}</TableCell>
                <TableCell>
                  <Badge variant={med.stock > 10 ? "default" : "destructive"}>
                    {med.stock}
                  </Badge>
                </TableCell>
                <TableCell>{med.category?.name || "—"}</TableCell>
                <TableCell>{med.manufacturer || "—"}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(med)}
                      className="text-primary hover:text-primary/80 hover:bg-primary/10 cursor-pointer"
                    >
                      <Pencil size={18} />
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(med.id)}
                      disabled={deletingId === med.id}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 cursor-pointer"
                    >
                      {deletingId === med.id ? (
                        <Loader2 size={18} className="animate-spin" />
                      ) : (
                        <Trash2 size={18} />
                      )}
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}