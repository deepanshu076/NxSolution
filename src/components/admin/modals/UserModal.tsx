import React, { useEffect, useState } from "react";
import { useToast } from "@/src/components/ui/Toast";
import { updateUser } from "@/src/services/users.service";

type Props = {
  open: boolean;
  onClose: () => void;
  user: {
    id: string;
    email?: string | null;
    full_name?: string | null;
    role?: string | null;
  } | null;
  onUpdated?: (u: any) => void;
};

export default function UserModal({ open, onClose, user, onUpdated }: Props) {
  const toast = useToast();
  const [role, setRole] = useState<string>(user?.role ?? "");
  const [fullName, setFullName] = useState<string>(user?.full_name ?? "");
  useEffect(() => {
    setRole(user?.role ?? "");
    setFullName(user?.full_name ?? "");
  }, [user]);

  if (!open || !user) return null;

  const save = async () => {
    try {
      const updated = await updateUser(user.id, { role, full_name: fullName });
      toast.success("User updated");
      onUpdated?.(updated);
      onClose();
    } catch (err: any) {
      toast.error(err.message || "Failed to update user");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white rounded shadow p-6">
        <h3 className="text-xl font-bold mb-4">Edit User</h3>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium">Full name</label>
            <input
              className="mt-1 block w-full border rounded p-2"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Role</label>
            <select
              className="mt-1 block w-full border rounded p-2"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>
        <div className="mt-4 flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="rounded-2xl border border-cool-gray/40 px-4 py-2 text-sm font-bold text-slate-blue transition-colors hover:bg-light-gray"
          >
            Cancel
          </button>
          <button
            onClick={save}
            className="rounded-2xl bg-brand-walnut px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-brand-black"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
