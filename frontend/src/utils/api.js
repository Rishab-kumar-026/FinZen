const API_BASE = import.meta.env.VITE_API_BASE

// 1. Fetch Profile
export const fetchUserProfile = async () => {
  try {
    const res = await fetch(`${API_BASE}/user/profile`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) throw new Error("Failed to fetch user profile");
    return await res.json();
  } catch (err) {
    console.error("❌ Error fetching profile:", err);
    return null;
  }
};

// 2. Fetch Cards
export const fetchCardsOverview = async () => {
  try {
    const res = await fetch(`${API_BASE}/cards`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) throw new Error("Failed to fetch cards overview");
    return await res.json();
  } catch (err) {
    console.error("❌ Error fetching cards:", err.message);
    return [];
  }
};

// 3. Fetch Insights
export const fetchInsights = async () => {
  try {
    const res = await fetch(`${API_BASE}/insights`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) throw new Error("Failed to fetch insights");
    return await res.json();
  } catch (err) {
    console.error("❌ Error fetching insights:", err.message);
    return [];
  }
};

// 4. Spending Breakdown
export const fetchSpendingBreakdown = async (filter = "month") => {
  try {
    const res = await fetch(`${API_BASE}/spending-breakdown?filter=${filter}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) throw new Error("Failed to fetch spending breakdown");
    return await res.json();
  } catch (err) {
    console.error("❌ Error fetching spending breakdown:", err);
    return [];
  }
};

// 5. Income Breakdown
export const fetchIncomeBreakdown = async (filter = "month") => {
  try {
    const res = await fetch(`${API_BASE}/income?filter=${filter}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) throw new Error("Failed to fetch income breakdown");
    return await res.json();
  } catch (err) {
    console.error("❌ Income breakdown fetch error:", err);
    return [];
  }
};
//income vs expense

export const fetchIncomeVsExpense = async (filter = "month") => {
  try {
    const res = await fetch(`${API_BASE}/income-vs-expense?filter=${filter}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw new Error("Failed to fetch income vs expense data");

    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("❌ Income vs Expense fetch error:", err.message);
    return [];
  }
};

// Transaction CRUD
export const fetchTransactions = async () => {
  try {
    const res = await fetch(`${API_BASE}/transactions`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) throw new Error("Failed to fetch transactions");
    return await res.json();
  } catch (err) {
    console.error("❌ Error fetching transactions:", err);
    return [];
  }
};

export const addTransaction = async (txn) => {
  try {
    const res = await fetch(`${API_BASE}/transactions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(txn),
    });
    if (!res.ok) throw new Error("Failed to add transaction");
    return await res.json();
  } catch (err) {
    console.error("❌ Error adding transaction:", err);
    return null;
  }
};

export const editTransaction = async (id, txn) => {
  try {
    const res = await fetch(`${API_BASE}/transactions/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(txn),
    });
    if (!res.ok) throw new Error("Failed to edit transaction");
    return await res.json();
  } catch (err) {
    console.error("❌ Error editing transaction:", err);
    return null;
  }
};

export const deleteTransaction = async (id) => {
  try {
    const res = await fetch(`${API_BASE}/transactions/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) throw new Error("Failed to delete transaction");
    return await res.json();
  } catch (err) {
    console.error("❌ Error deleting transaction:", err);
    return null;
  }
};

export const fetchSpendingCoachAdvice = async (transactions = null, followup = null) => {
  try {
    const body = followup
      ? JSON.stringify({ transactions, followup })
      : JSON.stringify(transactions ? { transactions } : {});
    const res = await fetch(`http://localhost:5000/api/spending-coach`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });
    if (!res.ok) throw new Error("Failed to fetch spending coach advice");
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("❌ Error fetching spending coach advice:", err);
    return null;
  }
};

export const fetchPortfolio = async () => {
  try {
    const res = await fetch(`${API_BASE}/portfolio`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) throw new Error("Failed to fetch portfolio");
    return await res.json();
  } catch (err) {
    console.error("❌ Error fetching portfolio:", err);
    return null;
  }
};

export const tradePortfolio = async (asset, amount) => {
  try {
    const res = await fetch(`${API_BASE}/portfolio/trade`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ asset, amount }),
    });
    if (!res.ok) throw new Error("Failed to execute trade");
    return await res.json();
  } catch (err) {
    console.error("❌ Error trading portfolio:", err);
    return null;
  }
};

export const fetchLoanEligibility = async (income, employment, creditScore) => {
  const params = new URLSearchParams({ income, employment, creditScore });
  try {
    const res = await fetch(`${API_BASE}/loan-eligibility?${params.toString()}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) throw new Error("Failed to fetch loan eligibility");
    return await res.json();
  } catch (err) {
    console.error("❌ Error fetching loan eligibility:", err);
    return null;
  }
};

export const fetchGoalBooster = async (goal, current) => {
  const params = new URLSearchParams({ goal, current });
  try {
    const res = await fetch(`${API_BASE}/goal-booster?${params.toString()}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) throw new Error("Failed to fetch goal booster");
    return await res.json();
  } catch (err) {
    console.error("❌ Error fetching goal booster:", err);
    return null;
  }
};

export const updateUserProfile = async (profile) => {
  try {
    const res = await fetch(`${API_BASE}/user/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profile),
    });
    if (!res.ok) throw new Error("Failed to update profile");
    return await res.json();
  } catch (err) {
    console.error("❌ Error updating profile:", err);
    return null;
  }
};
