
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  color: string;
  bg: string;
  index: number;
}

const StatsCard = ({ title, value, change, icon: Icon, color, bg, index }: StatsCardProps) => {
  const floatingVariants = {
    animate: {
      y: [0, -5, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      variants={floatingVariants}
      animate="animate"
      style={{ animationDelay: `${index * 0.5}s` }}
      whileHover={{ scale: 1.02, y: -5 }}
      className="group"
    >
      <Card className="backdrop-blur-xl bg-white/10 border-white/20 hover:border-white/30 transition-all duration-300 cursor-pointer">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">{title}</p>
              <p className="text-2xl font-bold text-white mt-1">{value}</p>
              <p
                className={`text-sm font-medium mt-1 ${
                  change.startsWith("+") ? "text-emerald-400" : "text-red-400"
                }`}
              >
                {change}
              </p>
            </div>
            <div
              className={`p-3 rounded-2xl ${bg} group-hover:scale-110 transition-transform duration-300`}
            >
              <Icon
                className={`text-white bg-gradient-to-r ${color} bg-clip-text`}
                size={24}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StatsCard;
