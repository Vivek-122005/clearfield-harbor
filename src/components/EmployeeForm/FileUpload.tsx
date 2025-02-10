
import { Upload } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  label: string;
  onChange: (file: File | null) => void;
  error?: string;
  value?: File | null;
}

export const FileUpload = ({ label, onChange, error, value }: FileUploadProps) => {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        // 2MB limit
        onChange(null);
        return;
      }
      if (!["image/jpeg", "image/png"].includes(file.type)) {
        onChange(null);
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      onChange(file);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div
        className={cn(
          "border-2 border-dashed rounded-lg p-4 text-center hover:bg-gray-50 transition-colors cursor-pointer",
          error ? "border-red-300" : "border-gray-300"
        )}
      >
        <input
          type="file"
          onChange={handleFileChange}
          accept=".jpg,.jpeg,.png"
          className="hidden"
          id={label}
        />
        <label htmlFor={label} className="cursor-pointer">
          <div className="flex flex-col items-center space-y-2">
            {preview ? (
              <img src={preview} alt="Preview" className="w-32 h-32 object-cover rounded" />
            ) : (
              <>
                <Upload className="w-8 h-8 text-gray-400" />
                <span className="text-sm text-gray-500">
                  Upload a file or drag and drop
                </span>
                <span className="text-xs text-gray-400">PNG, JPG up to 2MB</span>
              </>
            )}
          </div>
        </label>
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};
