
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

interface DashboardHeaderProps {
  onLogout: () => void;
}

const DashboardHeader = ({ onLogout }: DashboardHeaderProps) => {
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
      className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
    >
      <div>
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-400 to-purple-400 bg-clip-text text-transparent">
          PesaTrack Dashboard
        </h1>
        <p className="text-gray-400 mt-2">Track your finances with ease</p>
      </div>
      <Button
        onClick={onLogout}
        variant="outline"
        className="bg-white/5 border-white/20 text-white hover:bg-white/10 transition-all duration-300"
      >
        <LogOut className="mr-2" size={16} />
        Logout
      </Button>
    </motion.div>
  );
};

export default DashboardHeader;
