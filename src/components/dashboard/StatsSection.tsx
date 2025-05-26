
import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Wallet } from "lucide-react";
import StatsCard from "./StatsCard";

const StatsSection = () => {
  const stats = [
    {
      title: "Total Income",
      value: "$5,234.00",
      change: "+12.5%",
      icon: TrendingUp,
      color: "from-emerald-400 to-green-500",
      bg: "bg-emerald-500/10",
    },
    {
      title: "Total Expenses",
      value: "$3,456.78",
      change: "-8.2%",
      icon: TrendingDown,
      color: "from-red-400 to-pink-500",
      bg: "bg-red-500/10",
    },
    {
      title: "Net Savings",
      value: "$1,777.22",
      change: "+15.3%",
      icon: Wallet,
      color: "from-blue-400 to-purple-500",
      bg: "bg-blue-500/10",
    },
  ];

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
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {stats.map((stat, index) => (
        <StatsCard key={stat.title} {...stat} index={index} />
      ))}
    </motion.div>
  );
};

export default StatsSection;
