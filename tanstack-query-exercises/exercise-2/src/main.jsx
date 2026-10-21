import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider, useQuery, useMutation, useQueryClient,} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { fetchUsers, createUser, deleteUser } from "./api/users";
import React, { useState } from "react";
import './styles.css';

const queryClient = new QueryClient();

// Get the user list from the server and store it in the users cache.
function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });
}

// Create a user, then reload the list from the server.
function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });
}


// Delete a user and update the list before the server responds.
function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,
    // Cancel the users request before changing the cache.
    onMutate: async (userId) => {
      await queryClient.cancelQueries({
        queryKey: ["users"],
      });
      // Save the list so we can restore it if delete fails.
      const previousUsers = queryClient.getQueryData(["users"]);
      // Remove the user from the screen right away.
      queryClient.setQueryData(["users"], (oldUsers) => {
        if (!oldUsers) {
          return oldUsers;
        }
        return oldUsers.filter((user) => user.id !== userId);
      });
      // Keep the old list for the error handler.
      return { previousUsers };
    },
    // Put the user back if the server could not delete them.
    onError: (_error, _userId, context) => {
      if (context?.previousUsers) {
        queryClient.setQueryData(
          ["users"],
          context.previousUsers
        );
      }
    },
    // Get the latest list after the delete finishes.
    onSettled: () => {
      return queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });
}

function App() {
  // Keep the form values while the user fills out the form.
  const { data: users, isPending, isError, error,} = useUsers();
  const createUserMutation = useCreateUser();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const deleteUserMutation = useDeleteUser();

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10 text-slate-900">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold">
          User Management
        </h1>
        <p className="mt-2 text-slate-600">
          Manage users using TanStack Query.
        </p>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            createUserMutation.mutate({ name, email, role },
              {onSuccess: () => {setName("");setEmail("");setRole("");},}
            );
          }}
          className="mt-6 grid gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <h2 className="text-xl font-semibold">Create User</h2>
          <input
            className="rounded-lg border border-slate-300 px-3 py-2"
            placeholder="Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
          <input
            className="rounded-lg border border-slate-300 px-3 py-2"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <select
            className="rounded-lg border border-slate-300 px-3 py-2"
            value={role}
            onChange={(event) => setRole(event.target.value)}
            required
          >
            <option value="">Select role</option>
            <option value="Developer">Developer</option>
            <option value="Designer">Designer</option>
            <option value="Manager">Manager</option>
          </select>
          <button
            type="submit"
            disabled={createUserMutation.isPending}
            className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {createUserMutation.isPending ? "Creating..." : "Create User"}
          </button>
          {createUserMutation.isSuccess && (
            <p className="text-sm text-green-700">
              User created successfully.
            </p>
          )}
          {createUserMutation.isError && (
            <p className="text-sm text-red-600">
              {createUserMutation.error.message}
            </p>
          )}
        </form>
        {isPending && (
          <p className="mt-6 rounded-lg bg-white p-4">
            Loading users...
          </p>
        )}
        {isError && (
          <p className="mt-6 rounded-lg bg-red-50 p-4 text-red-700">
            {error.message}
          </p>
        )}
        {users && (
          <section className="mt-6 space-y-3">
            <h2 className="text-xl font-semibold">
              Users ({users.length})
            </h2>
            {users.map((user) => (
              <article key={user.id} className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <div>
                  <h3 className="font-semibold">{user.name}</h3>
                  <p className="mt-1 text-sm text-slate-600">
                    {user.email}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    {user.role}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => deleteUserMutation.mutate(user.id)}
                  disabled={deleteUserMutation.isPending}
                  className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {deleteUserMutation.isPending && deleteUserMutation.variables === user.id ? "Deleting..." : "Delete"}
                </button>
              </article>
            ))}
          </section>
        )}
        {deleteUserMutation.isSuccess && (
          <p className="mt-4 text-sm text-green-700">
            User deleted successfully.
          </p>
        )}

        {deleteUserMutation.isError && (
          <p className="mt-4 text-sm text-red-600">
            {deleteUserMutation.error.message}
          </p>
        )}
      </div>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <App />
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);
