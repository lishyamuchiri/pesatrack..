
import React from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const RecentTransactions = () => {
  const transactions = [
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
    >
      <Card className="backdrop-blur-xl bg-white/10 border-white/20">
        <CardHeader>
          <CardTitle className="text-white">Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {transactions.map((transaction, index) => (
              <motion.div
                key={index}
                whileHover={{ x: 5 }}
                className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300"
              >
                <div>
                  <p className="text-white font-medium">{transaction.name}</p>
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
  );
};

export default RecentTransactions;
