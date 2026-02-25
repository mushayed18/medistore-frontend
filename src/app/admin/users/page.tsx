"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import UserList from "@/components/admin/users/UserList";
import { Button } from "@/components/ui/button";
import { getUsers } from "@/services/user";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "ACTIVE" | "BANNED";
}

interface Meta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export default function ManageUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [meta, setMeta] = useState<Meta | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUsers = async (page = 1) => {
    setLoading(true);
    setError("");

    try {
      const res = await getUsers(page, 10);
      setUsers(res.data || []);
      setMeta(res.meta || null);
    } catch (err) {
      setError((err as Error).message || "Could not load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleStatusChange = () => {
    fetchUsers(meta?.page || 1); // refresh current page
  };

  return (
    <div className="min-h-screen bg-gray-50/50 py-10">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex justify-center items-center mb-10">
          <div>
            <h1 className="text-4xl font-bold text-primary">Manage Users</h1>
            <p className="text-gray-600 mt-2">View and control user accounts</p>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="text-center py-16 text-red-600">
            <p className="text-xl font-medium">{error}</p>
            <Button
              onClick={() => fetchUsers()}
              className="mt-6 bg-primary hover:bg-primary/90 text-white"
            >
              Try Again
            </Button>
          </div>
        ) : (
          <>
            <UserList users={users} onStatusChange={handleStatusChange} />

            {meta && meta.totalPages > 1 && (
              <div className="flex justify-center items-center gap-6 mt-12">
                <Button
                  variant="outline"
                  disabled={meta.page === 1}
                  onClick={() => fetchUsers(meta.page - 1)}
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
                  onClick={() => fetchUsers(meta.page + 1)}
                  className="cursor-pointer"
                >
                  Next
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}