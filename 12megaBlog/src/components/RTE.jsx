import React from "react";
import { Editor } from "@tinymce/tinymce-react"; // Import TinyMCE Editor
import { Controller } from "react-hook-form"; // Import Controller from react-hook-form for form integration

/**
 * RTE Component - A Rich Text Editor integrated with react-hook-form
 * @param {string} name - The field name for react-hook-form
 * @param {object} control - The control object from react-hook-form
 * @param {string} label - The label displayed above the editor
 * @param {string} defaultValue - The initial value of the editor content
 */

export default function RTE({ name, control, label, defaultValue = "" }) {
  return (
    <div className="w-full">
      {/* Render the label if provided */}
      {label && <label className="inline-block mb-1 pl-1">{label}</label>}

      {/* Integrate TinyMCE Editor with react-hook-form using Controller */}
      <Controller
        name={name || "Content"} // Default name if not provided
        control={control} // react-hook-form control object
        render={({ field: { onChange } }) => (
          <Editor
            // Set initial value for the editor
            initialValue={defaultValue}
            init={{
              initialValue: defaultValue, // Optional: Initialize content value
              height: 500, // Set the editor height (in pixels)
              menubar: true, // Enable the menubar
              plugins: [
                // Plugins to extend the editor's functionality
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
              ],
              toolbar:
                // Define toolbar actions for the editor
                "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
              content_style:
                // Default styling for the content within the editor
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
            // Handle changes in the editor's content
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  );
}