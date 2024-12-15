"use client";
import JoditEditor from "jodit-react";
import React, { useState, useRef, useCallback } from "react";
import {
  FiUpload,
  FiX,
  FiEye,
  FiEyeOff,
  FiCode,
  FiDownload,
} from "react-icons/fi";

const AddPost = () => {
  const editor = useRef(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [description, setDescription] = useState(""); // Added state for description
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(true);
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

  const tagsOptions = [
    "Technology",
    "Travel",
    "Food",
    "Lifestyle",
    "Fashion",
    "Health",
  ];

  const handleImageDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleImageUpload(file);
  };

  const handleImageUpload = (file) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = {};
    if (!title.trim()) validationErrors.title = "Title is required";
    if (!content.trim()) validationErrors.content = "Content is required";
    if (!categories.length)
      validationErrors.categories = "Select at least one tags";
    if (!description.trim())
      validationErrors.description = "Description is required"; // Validate description

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    console.log({ title, description, content, categories, image });
  };

  const handleReset = () => {
    setTitle("");
    setDescription(""); // Reset description
    setContent("");
    setCategories([]);
    setImage(null);
    setErrors({});
  };

  const exportJSON = () => {
    const data = { title, description, content, categories, image };
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "post-data.json";
    a.click();
  };

  const handleEditorChange = useCallback((content) => {
    setContent(content);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br p-6">
      <div className="max-w-7xl mx-auto">
        <nav className="sticky top-0 backdrop-blur-lg rounded-lg p-4 mb-6 shadow-sm">
          <h1 className="text-2xl font-bold text-gray-800">Create New Post</h1>
        </nav>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Form Section */}
          <div className="dark:bg-zinc-950 rounded-xl p-6 shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title Input */}
              <div>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter your post title here..."
                  className={`w-full bg-transparent  px-4 py-3 text-xl font-bold border rounded-lg `}
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                )}
              </div>

              {/* Description Input */}
              <div>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter a short description of the blog..."
                  className={`w-full bg-transparent  px-4 py-3 text-lg border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none ${
                    errors.description ? "border-red-500" : "border-gray-200"
                  }`}
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.description}
                  </p>
                )}
              </div>

              {/* Tags Selector */}
              <div>
                <div className="flex flex-wrap gap-2">
                  {tagsOptions.map((tags) => (
                    <button
                      key={tags}
                      type="button"
                      onClick={() =>
                        setCategories(
                          categories.includes(tags)
                            ? categories.filter((c) => c !== tags)
                            : [...categories, tags]
                        )
                      }
                      className={`px-4 py-2 rounded-full ${
                        categories.includes(tags)
                          ? "bg-purple-500 "
                          : " text-gray-700"
                      } transition-colors`}
                    >
                      {tags}
                    </button>
                  ))}
                </div>
                {errors.categories && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.categories}
                  </p>
                )}
              </div>

              {/* Content Input */}
              <div>
                <JoditEditor
                  ref={editor}
                  value={content}
                  config={{
                    readonly: false,
                    uploader: {
                      insertImageAsBase64URI: true,
                    },
                    toolbarAdaptive: false,
                    height: "450px",
                    width: "100%",
                    enableDragAndDropFileToEditor: true,
                    removeButtons: ["brush", "file"],
                    showXPathInStatusbar: false,
                    style: {
                      background: "#007C41",
                    },
                  }}
                  tabIndex={1}
                  onBlur={handleEditorChange} // Use onBlur for immediate state update
                />

                {errors?.content && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.content.message || "Error with the content"}
                  </p>
                )}
              </div>

              {/* Image Upload */}
              <div
                onDrop={handleImageDrop}
                onDragOver={(e) => e.preventDefault()}
                className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center"
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={(e) => handleImageUpload(e.target.files[0])}
                  accept="image/*"
                  className="hidden"
                />
                {image ? (
                  <div className="relative">
                    <img
                      src={image}
                      alt="Preview"
                      className="max-h-48 mx-auto rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => setImage(null)}
                      className="absolute top-2 right-2 p-1 bg-red-500  rounded-full hover:bg-red-600"
                    >
                      <FiX className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="cursor-pointer"
                  >
                    <FiUpload className="w-8 h-8 mx-auto text-gray-400" />
                    <p className="mt-2 text-gray-500">
                      Drag & drop an image or click to browse
                    </p>
                  </div>
                )}
              </div>

              {/* Buttons */}
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-purple-500 py-3 rounded-lg hover:bg-purple-600 transition-colors"
                >
                  Publish Post
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Reset
                </button>
              </div>
            </form>
          </div>

          {/* Preview Section */}
          <div className="lg:block">
            <div className="sticky top-24">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Preview</h2>
                <button
                  onClick={() => setPreview(!preview)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  {preview ? (
                    <FiEyeOff className="w-5 h-5" />
                  ) : (
                    <FiEye className="w-5 h-5" />
                  )}
                </button>
              </div>

              {/* Show Preview */}
              {preview && (
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                    {title}
                  </h3>
                  <p className="text-xl text-gray-700 mb-4">{description}</p>
                  <div
                    className="post-content text-gray-800"
                    dangerouslySetInnerHTML={{ __html: content }}
                  />
                  {image && (
                    <div className="mt-4">
                      <img
                        src={image}
                        alt="Post Image"
                        className="max-h-72 w-full object-cover rounded-lg"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
