import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select, RTE } from "../index";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm() {
  // Initializing the form with react-hook-form, including default values
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "", // Default to post's title if editing, else empty
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active", // Default status is "active"
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.user.userData); // Fetch user data from Redux store

  const submit = async (data) => {
    // Check if editing a post
    if (post) {
      const file = data.image[0]
        ? appwriteService.uploadFile(data.image[0]) // Upload new file if provided
        : null;

      if (file) {
        appwriteService.deleteFile(post.featuredImage); // Delete old featured image
      }

      // Update post details
      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });

      if (dbPost) {
        navigate(`/post/${dbPost.id}`); // Redirect to the updated post's page
      }
    } else {
      // For new post creation
      const file = data.image[0]
        ? appwriteService.uploadFile(data.image[0]) // Upload featured image
        : null;

      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId; // Add featured image ID to the data
        const dbPost = await appwriteService.createPost({
          ...data,
          userId: userData.$id, // Associate post with current user
        });
        if (dbPost) {
          navigate(`/post/${dbPost.id}`); // Redirect to the created post's page
        }
      }
    }
  };

  // Function to transform title into a slug
  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/^[a-zA-Z\d\s]+/g, "-") // Remove unwanted characters
        .replace(/\s/g, "-"); // Replace spaces with dashes

    return "";
  }, []);

  // Watch for title changes and auto-generate slug
  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title, { shouldValidate: true })); // Set slug value based on title
      }
    });

    return () => {
      subscription.unsubscribe(); // Cleanup subscription
    };
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      {/* Left section: Form inputs */}
      <div className="w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })} // Title is required
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })} // Slug is required
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true, // Validate after updating slug
            });
          }}
        />
        <RTE
          label="Content :"
          name="content"
          control={control} // Rich text editor with react-hook-form
          defaultValue={getValues("content")}
        />
      </div>

      {/* Right section: File upload, status, and submit */}
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif" // Only accept image files
          {...register("image", { required: !post })} // Image is required for new posts
        />
        {post && (
          <div className="w-full mb-4">
            {/* Display current featured image if editing */}
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]} // Status options
          label="Status"
          className="mb-4"
          {...register("status", { required: true })} // Status is required
        />
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined} // Green button for editing
          className="w-full"
        >
          {post ? "Update" : "Submit"} {/* Dynamic button text */}
        </Button>
      </div>
    </form>
  );
}
