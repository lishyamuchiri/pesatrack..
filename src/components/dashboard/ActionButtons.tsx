
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mic, Camera } from "lucide-react";

interface ActionButtonsProps {
  onVoiceRecorderOpen: () => void;
  onPhotoUploadOpen: () => void;
}

const ActionButtons = ({ onVoiceRecorderOpen, onPhotoUploadOpen }: ActionButtonsProps) => {
  return (
    <motion.div
      variants={{
        hidden: { y: 20, opacity: 0 },
        visible: {
          y: 0,
          opacity: 1,
          transition: {
            type: "spring",
            stiffness: 100,
          },
        },
      }}
      className="flex flex-col sm:flex-row gap-4 justify-center"
    >
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          onClick={onVoiceRecorderOpen}
          className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white px-8 py-6 rounded-2xl shadow-lg transition-all duration-300 flex items-center gap-3"
        >
          <Mic size={20} />
          Record Voice
        </Button>
      </motion.div>
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          onClick={onPhotoUploadOpen}
          className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-8 py-6 rounded-2xl shadow-lg transition-all duration-300 flex items-center gap-3"
        >
          <Camera size={20} />
          Upload Photo
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default ActionButtons;
