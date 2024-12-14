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
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(true);
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

  const categoryOptions = [
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
    if (!description.trim())
      validationErrors.description = "Description is required";
    if (!categories.length)
      validationErrors.categories = "Select at least one category";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    console.log({ title, description, categories, image });
  };

  const handleReset = () => {
    setTitle("");
    setDescription("");
    setCategories([]);
    setImage(null);
    setErrors({});
  };

  const exportJSON = () => {
    const data = { title, description, categories, image };
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
    setDescription(content);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        <nav className="sticky top-0 bg-white/80 backdrop-blur-lg rounded-lg p-4 mb-6 shadow-sm">
          <h1 className="text-2xl font-bold text-gray-800">Create New Post</h1>
        </nav>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Form Section */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title Input */}
              <div>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter your post title here..."
                  className={`w-full px-4 py-3 text-xl font-bold border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none ${
                    errors.title ? "border-red-500" : "border-gray-200"
                  }`}
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                )}
              </div>

              {/* Category Selector */}
              <div>
                <div className="flex flex-wrap gap-2">
                  {categoryOptions.map((category) => (
                    <button
                      key={category}
                      type="button"
                      onClick={() =>
                        setCategories(
                          categories.includes(category)
                            ? categories.filter((c) => c !== category)
                            : [...categories, category]
                        )
                      }
                      className={`px-4 py-2 rounded-full ${
                        categories.includes(category)
                          ? "bg-purple-500 text-white"
                          : "bg-gray-100 text-gray-700"
                      } transition-colors`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
                {errors.categories && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.categories}
                  </p>
                )}
              </div>

              {/* Description Input */}
              <div>
                <JoditEditor
                  ref={editor}
                  value={description}
                  config={{
                    readonly: false,
                    uploader: {
                      insertImageAsBase64URI: true,
                    },
                    toolbarAdaptive: false,
                  }}
                  tabIndex={1}
                  onBlur={handleEditorChange} // Use onBlur for immediate state update
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.description}
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
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
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
                  className="flex-1 bg-purple-500 text-white py-3 rounded-lg hover:bg-purple-600 transition-colors"
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

              {preview && (
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  {image && (
                    <img
                      src={image}
                      alt="Post preview"
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                  )}
                  <h1 className="text-2xl font-bold mb-4">
                    {title || "Your Title Here"}
                  </h1>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {categories.map((category) => (
                      <span
                        key={category}
                        className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                  <div
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: description }}
                  />
                </div>
              )}

              <div className="mt-6 flex gap-4">
                <button
                  onClick={exportJSON}
                  className="flex-1 flex items-center justify-center gap-2 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <FiDownload className="w-5 h-5" />
                  Export JSON
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-colors">
                  <FiCode className="w-5 h-5" />
                  Copy Markdown
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
