"use client";

import { Badge } from "@/components/ui/badge";
import UserStatusToggle from "./UserStatusToggle";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "ACTIVE" | "BANNED";
}

interface Props {
  users: User[];
  onStatusChange: () => void;
}

export default function UserList({ users, onStatusChange }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-x-auto">
      <table className="w-full min-w-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
              Name
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
              Email
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
              Role
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
              Status
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {users.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center py-12 text-gray-500">
                No users found
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 font-medium text-gray-900">
                  {user.name}
                </td>
                <td className="px-6 py-4 text-gray-600 break-all">
                  {user.email}
                </td>
                <td className="px-6 py-4">
                  <Badge variant="secondary" className="text-sm">
                    {user.role}
                  </Badge>
                </td>
                <td className=" py-4">
                  <Badge
                    variant="outline"
                    className={`px-4 py-1 text-sm font-medium cursor-pointer ${
                      user.status === "ACTIVE"
                        ? "bg-green-100 text-green-800 border-green-300"
                        : "bg-red-100 text-red-800 border-red-300"
                    }`}
                  >
                    {user.status}
                  </Badge>
                </td>
                <td className="pl-6 py-4 text-right">
                  <UserStatusToggle
                    userId={user.id}
                    currentStatus={user.status}
                    onToggle={onStatusChange}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
