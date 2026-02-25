"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Loader2, User, Mail, Phone, MapPin, ShieldCheck, Calendar, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: "CUSTOMER" | "SELLER" | "ADMIN";
  phone: string;
  address: string;
  status: "ACTIVE" | "BANNED";
  createdAt: string;
  updatedAt: string;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/me`, {
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch profile");
      }

      const json = await res.json();
      if (!json.success || !json.data) {
        throw new Error("Invalid profile response");
      }

      const user = json.data;
      setProfile(user);
      setFormData({
        name: user.name || "",
        phone: user.phone || "",
        address: user.address || "",
      });
    } catch (err) {
      setError((err as Error).message || "Could not load profile");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.phone.trim() || !formData.address.trim()) {
      toast.error("Please fill all required fields");
      return;
    }

    setSaving(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/me`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          address: formData.address.trim(),
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.message || "Failed to update profile");
      }

      toast.success("Profile updated successfully!");
      setProfile(prev => prev ? { ...prev, ...formData } : null);
      setIsEditing(false);
    } catch (err) {
      toast.error((err as Error).message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50/50 flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-gray-50/50 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <h1 className="text-3xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-gray-700 mb-6">{error || "Failed to load profile"}</p>
          <Button onClick={fetchProfile} className="bg-primary hover:bg-primary/90">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-3">
            My Profile
          </h1>
          <p className="text-lg text-gray-600">
            Manage and update your personal information
          </p>
        </div>

        <Card className="border border-gray-200 shadow-xl rounded-2xl overflow-hidden">
          <CardHeader className="bg-linear-to-r from-primary/5 to-secondary/10 px-8 py-10 border-b">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              {/* Avatar */}
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-primary/10 flex items-center justify-center border-4 border-white shadow-lg">
                <span className="text-6xl md:text-8xl text-primary font-bold">
                  {profile.name?.[0]?.toUpperCase() || profile.email?.[0]?.toUpperCase() || "?"}
                </span>
              </div>

              <div className="text-center md:text-left">
                <h2 className="text-3xl md:text-4xl font-bold text-primary">
                  {profile.name || "User"}
                </h2>
                <p className="text-xl text-gray-600 mt-2">{profile.email}</p>

                <div className="mt-6 flex flex-wrap gap-3 justify-center md:justify-start">
                  <Badge className="bg-primary/10 text-primary hover:bg-primary/20 px-4 py-1.5 text-base">
                    {profile.role}
                  </Badge>
                  <Badge
                    className={`px-4 py-1.5 text-base ${
                      profile.status === "ACTIVE"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {profile.status}
                  </Badge>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-8 md:p-10">
            {isEditing ? (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-700 font-medium">
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="h-11"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-gray-700 font-medium">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="h-11"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address" className="text-gray-700 font-medium">
                    Full Address
                  </Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className="h-11"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-8">
                  <Button
                    type="submit"
                    disabled={saving}
                    className="flex-1 bg-primary hover:bg-primary/90 text-white py-6 text-lg"
                  >
                    {saving ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsEditing(false)}
                    disabled={saving}
                    className="flex-1 border-gray-300 py-6 text-lg"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            ) : (
              <div className="space-y-10">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="p-4 bg-primary/10 rounded-xl">
                        <User className="h-7 w-7 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Full Name</p>
                        <p className="text-xl font-medium mt-1">
                          {profile.name || "Not set"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="p-4 bg-primary/10 rounded-xl">
                        <Mail className="h-7 w-7 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Email Address</p>
                        <p className="text-xl font-medium mt-1 break-all">
                          {profile.email}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="p-4 bg-primary/10 rounded-xl">
                        <Phone className="h-7 w-7 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Phone Number</p>
                        <p className="text-xl font-medium mt-1">
                          {profile.phone || "Not set"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="p-4 bg-primary/10 rounded-xl">
                        <MapPin className="h-7 w-7 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Full Address</p>
                        <p className="text-xl font-medium mt-1">
                          {profile.address || "Not set"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="p-4 bg-primary/10 rounded-xl">
                        <ShieldCheck className="h-7 w-7 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Account Status</p>
                        <Badge
                          className={`mt-2 px-4 py-1 text-base ${
                            profile.status === "ACTIVE"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {profile.status}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="p-4 bg-primary/10 rounded-xl">
                        <Calendar className="h-7 w-7 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Joined On</p>
                        <p className="text-xl font-medium mt-1">
                          {new Date(profile.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-10 border-t border-gray-200 flex justify-center md:justify-start">
                  <Button
                    onClick={() => setIsEditing(true)}
                    className="bg-primary hover:bg-primary/90 text-white px-10 py-6 text-lg shadow-md"
                  >
                    <Edit2 className="mr-2 h-5 w-5" />
                    Edit Profile
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}