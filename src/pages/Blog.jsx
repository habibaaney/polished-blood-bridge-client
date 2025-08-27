import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/axiosPublic";
import { Link } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";

const Blog = () => {
  const axiosPublic = useAxiosPublic();
  const [selectedBlog, setSelectedBlog] = useState(null);

  const {
    data: blogs = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["published-blogs"],
    queryFn: async () => {
      try {
        const res = await axiosPublic.get("/blogs?status=published");
        console.log("Fetched published blogs:", res.data);
        return res.data;
      } catch (err) {
        console.error("Error fetching published blogs:", err);
        throw err;
      }
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FaSpinner className="animate-spin text-4xl text-red-600" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-600 font-bold mt-10">
        Failed to load blog posts.
        <div className="text-xs mt-2">
          {error?.response?.data?.message || error?.message || "Unknown error"}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
        Our Blog
      </h1>
      {blogs.length === 0 ? (
        <p className="text-center text-gray-500">
          No blog posts have been published yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div key={blog._id} className="card bg-base-100 shadow-xl">
              <div className="card-body justify-end">
                <h2 className="card-title">{blog.title}</h2>
                <div className="card-actions">
                  <button
                    className="btn btn-primary"
                    onClick={() => setSelectedBlog(blog)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Blog Details Modal */}
      {selectedBlog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent">
          <div className="bg-white dark:bg-gray-50 rounded-lg shadow-lg max-w-lg w-full p-6 relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-2xl"
              onClick={() => setSelectedBlog(null)}
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4">{selectedBlog.title}</h2>
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: selectedBlog.content }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;
