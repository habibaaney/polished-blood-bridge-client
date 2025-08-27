import { useState, useRef } from "react";
import JoditEditor from "jodit-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/axiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AddBlog = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (newBlog) => axiosSecure.post("/blogs", newBlog),
    onSuccess: () => {
      Swal.fire(
        "Success!",
        "Blog post has been created as a draft.",
        "success"
      );
      queryClient.invalidateQueries(["blogs"]);
    },
    onError: () => {
      Swal.fire("Error!", "Could not create the blog post.", "error");
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      return Swal.fire("Error", "Please fill all fields.", "error");
    }

    // Create blog post object without thumbnail
    const newBlog = {
      title,
      content,
    };

    // Call the mutation to save the blog post
    mutate(newBlog);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Add New Blog Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="label">
            <span className="label-text">Blog Title</span>
          </label>
          <input
            type="text"
            placeholder="Enter title here"
            className="input input-bordered w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="label">
            <span className="label-text">Blog Content</span>
          </label>
          <JoditEditor
            ref={editor}
            value={content}
            tabIndex={1}
            onBlur={(newContent) => setContent(newContent)}
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={isPending}>
          {isPending ? "Creating..." : "Create Blog Post"}
        </button>
      </form>
    </div>
  );
};

export default AddBlog;
