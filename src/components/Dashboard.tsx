
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  LogOut,
  Mic,
  Camera,
  TrendingUp,
  TrendingDown,
  Wallet,
  Plus,
  BarChart3,
  PieChart,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import IncomeExpenseChart from "./IncomeExpenseChart";
import ExpenseBreakdownChart from "./ExpenseBreakdownChart";
import VoiceRecorder from "./VoiceRecorder";
import PhotoUpload from "./PhotoUpload";

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard = ({ onLogout }: DashboardProps) => {
  const { toast } = useToast();
  const [showVoiceRecorder, setShowVoiceRecorder] = useState(false);
  const [showPhotoUpload, setShowPhotoUpload] = useState(false);

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

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
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto space-y-6"
      >
        {/* Header */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-400 to-purple-400 bg-clip-text text-transparent">
              PesaTrack Dashboard
            </h1>
            <p className="text-gray-400 mt-2">
              Track your finances with ease
            </p>
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

        {/* Stats Cards */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
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
                      <p className="text-gray-400 text-sm font-medium">
                        {stat.title}
                      </p>
                      <p className="text-2xl font-bold text-white mt-1">
                        {stat.value}
                      </p>
                      <p
                        className={`text-sm font-medium mt-1 ${
                          stat.change.startsWith("+")
                            ? "text-emerald-400"
                            : "text-red-400"
                        }`}
                      >
                        {stat.change}
                      </p>
                    </div>
                    <div
                      className={`p-3 rounded-2xl ${stat.bg} group-hover:scale-110 transition-transform duration-300`}
                    >
                      <stat.icon
                        className={`text-white bg-gradient-to-r ${stat.color} bg-clip-text`}
                        size={24}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={() => setShowVoiceRecorder(true)}
              className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white px-8 py-6 rounded-2xl shadow-lg transition-all duration-300 flex items-center gap-3"
            >
              <Mic size={20} />
              Record Voice
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={() => setShowPhotoUpload(true)}
              className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-8 py-6 rounded-2xl shadow-lg transition-all duration-300 flex items-center gap-3"
            >
              <Camera size={20} />
              Upload Photo
            </Button>
          </motion.div>
        </motion.div>

        {/* Charts Section */}
        <motion.div
          variants={itemVariants}
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

        {/* Recent Transactions */}
        <motion.div variants={itemVariants}>
          <Card className="backdrop-blur-xl bg-white/10 border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    name: "Grocery Shopping",
                    amount: "-$125.50",
                    type: "expense",
                    date: "Today",
                  },
                  {
                    name: "Freelance Payment",
                    amount: "+$850.00",
                    type: "income",
                    date: "Yesterday",
                  },
                  {
                    name: "Rent Payment",
                    amount: "-$1,200.00",
                    type: "expense",
                    date: "2 days ago",
                  },
                ].map((transaction, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ x: 5 }}
                    className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300"
                  >
                    <div>
                      <p className="text-white font-medium">
                        {transaction.name}
                      </p>
                      <p className="text-gray-400 text-sm">{transaction.date}</p>
                    </div>
                    <p
                      className={`font-semibold ${
                        transaction.type === "income"
                          ? "text-emerald-400"
                          : "text-red-400"
                      }`}
                    >
                      {transaction.amount}
                    </p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
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
