import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../hooks/axiosSecure";
import Swal from "sweetalert2";
import { FaSpinner, FaPlus } from "react-icons/fa";

const ContentManagement = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [statusFilter, setStatusFilter] = useState("");

  const {
    data: blogs = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["blogs", statusFilter],
    queryFn: async () => {
      const res = await axiosSecure.get("/blogs", {
        params: { status: statusFilter },
      });
      return res.data;
    },
  });

  const { mutate: updateStatus } = useMutation({
    mutationFn: ({ id, status }) =>
      axiosSecure.patch(`/blogs/status/${id}`, { status }),
    onSuccess: () => {
      Swal.fire("Success!", "Blog status updated.", "success");
      queryClient.invalidateQueries(["blogs"]);
    },
  });

  const { mutate: deleteBlog } = useMutation({
    mutationFn: (id) => axiosSecure.delete(`/blogs/${id}`),
    onSuccess: () => {
      Swal.fire("Deleted!", "The blog has been deleted.", "success");
      queryClient.invalidateQueries(["blogs"]);
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteBlog(id);
      }
    });
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-full">
        <FaSpinner className="animate-spin text-4xl text-red-600" />
      </div>
    );
  if (isError) return <div className="text-red-600">Error loading blogs.</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Content Management</h1>
        <Link to="/dashboard/add-blogs" className="btn btn-primary">
          <FaPlus /> Add Blog
        </Link>
      </div>

      <div className="mb-4">
        <select
          className="select select-bordered"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">Filter by Status (All)</option>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog, index) => (
              <tr key={blog._id}>
                <th>{index + 1}</th>
                <td>{blog.title}</td>
                <td>
                  <span
                    className={`badge ${
                      blog.status === "published"
                        ? "badge-success"
                        : "badge-warning"
                    }`}
                  >
                    {blog.status}
                  </span>
                </td>
                <td className="space-x-2">
                  {blog.status === "draft" ? (
                    <button
                      onClick={() =>
                        updateStatus({ id: blog._id, status: "published" })
                      }
                      className="btn btn-sm btn-success"
                    >
                      Publish
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        updateStatus({ id: blog._id, status: "draft" })
                      }
                      className="btn btn-sm btn-warning"
                    >
                      Unpublish
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(blog._id)}
                    className="btn btn-sm btn-error"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContentManagement;
