
import React, { useState } from "react";
import { motion } from "framer-motion";
import VoiceRecorder from "./VoiceRecorder";
import PhotoUpload from "./PhotoUpload";
import DashboardHeader from "./dashboard/DashboardHeader";
import StatsSection from "./dashboard/StatsSection";
import ActionButtons from "./dashboard/ActionButtons";
import ChartsSection from "./dashboard/ChartsSection";
import RecentTransactions from "./dashboard/RecentTransactions";

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard = ({ onLogout }: DashboardProps) => {
  const [showVoiceRecorder, setShowVoiceRecorder] = useState(false);
  const [showPhotoUpload, setShowPhotoUpload] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto space-y-6"
      >
        <DashboardHeader onLogout={onLogout} />
        <StatsSection />
        <ActionButtons
          onVoiceRecorderOpen={() => setShowVoiceRecorder(true)}
          onPhotoUploadOpen={() => setShowPhotoUpload(true)}
        />
        <ChartsSection />
        <RecentTransactions />
      </motion.div>

      {/* Modals */}
      <VoiceRecorder
        isOpen={showVoiceRecorder}
        onClose={() => setShowVoiceRecorder(false)}
      />
      <PhotoUpload
        isOpen={showPhotoUpload}
        onClose={() => setShowPhotoUpload(false)}
      />
    </div>
  );
};

export default Dashboard;
