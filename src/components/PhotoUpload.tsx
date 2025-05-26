
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Camera, Upload, X, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface PhotoUploadProps {
  isOpen: boolean;
  onClose: () => void;
}

const PhotoUpload = ({ isOpen, onClose }: PhotoUploadProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFile = async (file: File) => {
    if (file && file.type.startsWith("image/")) {
      setIsUploading(true);
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      await savePhoto(file);
    } else {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file",
        variant: "destructive",
      });
    }
  };

  const savePhoto = async (file: File) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Error",
          description: "You must be logged in to upload photos",
          variant: "destructive",
        });
        setIsUploading(false);
        return;
      }

      // Upload image file to storage
      const fileName = `photo_${Date.now()}_${file.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('photos')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('photos')
        .getPublicUrl(fileName);

      // Save record to database
      const { error: dbError } = await supabase
        .from('uploaded_photos')
        .insert({
          user_id: user.id,
          image_url: publicUrl,
          file_name: file.name,
          file_size: file.size,
        });

      if (dbError) throw dbError;

      toast({
        title: "Photo uploaded successfully!",
        description: "Your receipt has been saved",
      });
    } catch (error) {
      console.error('Error saving photo:', error);
      toast({
        title: "Error",
        description: "Failed to upload photo",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  const triggerFileInput = () => {
    if (!isUploading) {
      fileInputRef.current?.click();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md"
          >
            <Card className="backdrop-blur-xl bg-white/10 border-white/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">Upload Receipt</CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onClose}
                    className="text-gray-400 hover:text-white"
                  >
                    <X size={20} />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleChange}
                  className="hidden"
                />

                {!uploadedImage ? (
                  <motion.div
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    onClick={triggerFileInput}
                    className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 ${
                      dragActive
                        ? "border-emerald-400 bg-emerald-500/10"
                        : "border-white/30 hover:border-white/50 hover:bg-white/5"
                    } ${isUploading ? "opacity-50 cursor-not-allowed" : ""}`}
                    whileHover={!isUploading ? { scale: 1.02 } : {}}
                    whileTap={!isUploading ? { scale: 0.98 } : {}}
                  >
                    <motion.div
                      animate={dragActive ? { scale: [1, 1.1, 1] } : {}}
                      transition={{ duration: 0.5 }}
                      className="mx-auto w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mb-4"
                    >
                      <Camera className="text-white" size={24} />
                    </motion.div>
                    <p className="text-white font-medium mb-2">
                      {isUploading
                        ? "Uploading..."
                        : dragActive
                        ? "Drop your image here"
                        : "Upload Receipt Photo"}
                    </p>
                    <p className="text-gray-400 text-sm">
                      {isUploading ? "Please wait..." : "Drag and drop or click to browse"}
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-4"
                  >
                    <div className="relative rounded-2xl overflow-hidden">
                      <img
                        src={uploadedImage}
                        alt="Uploaded receipt"
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-2 right-2 bg-emerald-500 rounded-full p-2">
                        <Check className="text-white" size={16} />
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-white font-medium">Receipt uploaded!</p>
                      <p className="text-gray-400 text-sm">
                        Saved to your account
                      </p>
                    </div>
                    <Button
                      onClick={triggerFileInput}
                      disabled={isUploading}
                      variant="outline"
                      className="w-full bg-white/5 border-white/20 text-white hover:bg-white/10"
                    >
                      <Upload className="mr-2" size={16} />
                      Upload Another
                    </Button>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PhotoUpload;
