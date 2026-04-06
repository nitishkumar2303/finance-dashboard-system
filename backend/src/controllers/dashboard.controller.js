import mongoose from "mongoose";
import Record from "../models/Record.model.js";

export const getDashboardSummary = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);

    const totals = await Record.aggregate([
      { $match: { createdBy: userId } },
      {
        $group: {
          _id: null,
          totalIncome: {
            $sum: { $cond: [{ $eq: ["$type", "INCOME"] }, "$amount", 0] },
          },
          totalExpense: {
            $sum: { $cond: [{ $eq: ["$type", "EXPENSE"] }, "$amount", 0] },
          },
        },
      },
    ]);

    const categoryExpenses = await Record.aggregate([
      { $match: { createdBy: userId, type: "EXPENSE" } },
      { $group: { _id: "$category", total: { $sum: "$amount" } } },
      { $sort: { total: -1 } },
    ]);

    const monthlyTrends = await Record.aggregate([
      { $match: { createdBy: userId } },
      {
        $group: {
          _id: {
            year: { $year: "$date" },
            month: { $month: "$date" },
          },
          income: {
            $sum: { $cond: [{ $eq: ["$type", "INCOME"] }, "$amount", 0] },
          },
          expense: {
            $sum: { $cond: [{ $eq: ["$type", "EXPENSE"] }, "$amount", 0] },
          },
        },
      },

      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);

    const recentActivity = await Record.find({ createdBy: userId })
      .sort({ date: -1 })
      .limit(5);

    const summaryData =
      totals.length > 0 ? totals[0] : { totalIncome: 0, totalExpense: 0 };
    const netBalance = summaryData.totalIncome - summaryData.totalExpense;

    res.status(200).json({
      success: true,
      data: {
        totalIncome: summaryData.totalIncome,
        totalExpense: summaryData.totalExpense,
        netBalance: netBalance,
        categoryExpenses: categoryExpenses,
        monthlyTrends: monthlyTrends,
        recentActivity: recentActivity,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
