
import React from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BarChart3, PieChart } from "lucide-react";
import IncomeExpenseChart from "../IncomeExpenseChart";
import ExpenseBreakdownChart from "../ExpenseBreakdownChart";

const ChartsSection = () => {
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
      className="grid grid-cols-1 lg:grid-cols-2 gap-6"
    >
      <motion.div
        variants={floatingVariants}
        animate="animate"
        whileHover={{ scale: 1.01 }}
      >
        <Card className="backdrop-blur-xl bg-white/10 border-white/20 hover:border-white/30 transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <BarChart3 className="text-emerald-400" size={20} />
              Income vs Expenses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <IncomeExpenseChart />
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        variants={floatingVariants}
        animate="animate"
        style={{ animationDelay: "1s" }}
        whileHover={{ scale: 1.01 }}
      >
        <Card className="backdrop-blur-xl bg-white/10 border-white/20 hover:border-white/30 transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <PieChart className="text-purple-400" size={20} />
              Expense Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ExpenseBreakdownChart />
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default ChartsSection;
