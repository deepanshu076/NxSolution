import React, { useEffect, useState } from "react";
import { listUsers, deleteUser } from "@/src/services/users.service";
import UserModal from "@/src/components/admin/modals/UserModal";
import { useToast } from "@/src/components/ui/Toast";
import ConfirmDialog from "@/src/components/ui/ConfirmDialog";

export default function UsersAdmin() {
  const toast = useToast();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<any | null>(null);
  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState<{ open: boolean; id?: string }>({
    open: false,
  });

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await listUsers();
      setUsers(data || []);
    } catch (err: any) {
      toast.error(err.message || "Failed loading users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const onUpdated = (u: any) => {
    setUsers((prev) => prev.map((p) => (p.id === u.id ? u : p)));
  };

  const confirmDelete = async (id?: string) => {
    if (!id) return;
    try {
      await deleteUser(id);
      setUsers((s) => s.filter((x) => x.id !== id));
      toast.success("User deleted");
    } catch (err: any) {
      toast.error(err.message || "Failed to delete user");
    } finally {
      setConfirm({ open: false });
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Users</h2>
        <div>
          <button
            onClick={() => {
              fetchUsers();
            }}
            className="rounded-2xl bg-brand-walnut px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-brand-black"
          >
            Refresh
          </button>
        </div>
      </div>

      <div className="bg-white rounded shadow overflow-hidden">
        <table className="w-full table-fixed">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-t">
                <td className="p-3">{u.full_name || "—"}</td>
                <td className="p-3">{u.email || "—"}</td>
                <td className="p-3">{u.role || "—"}</td>
                <td className="p-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setSelected(u);
                        setOpen(true);
                      }}
                      className="rounded-2xl border border-cool-gray/40 px-3 py-1 text-sm font-bold text-slate-blue transition-colors hover:bg-light-gray"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setConfirm({ open: true, id: u.id })}
                      className="rounded-2xl bg-red-600 px-3 py-1 text-sm font-bold text-white transition-colors hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <UserModal
        open={open}
        onClose={() => setOpen(false)}
        user={selected}
        onUpdated={onUpdated}
      />
      <ConfirmDialog
        isOpen={confirm.open}
        onCancel={() => setConfirm({ open: false })}
        onConfirm={() => confirmDelete(confirm.id)}
        title="Delete user"
        message="This will permanently delete the user."
      />
    </div>
  );
}
