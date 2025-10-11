
<details>
<summary>👉🏻 Expense List Directory Structure</summary>

```
📦 app
 ┣ 📂 expense/list/
 ┃ ┣ 📜 page.jsx                    # Main Expenses Page
 ┃ ...
 📂 components
 ┣ 📂 expenses/
 ┃ ┃ ┣ 📜 ExpenseDistribution.jsx   # Visualizes category-wise distribution using PieChart
 ┃ ┃ ┣ 📜 ExpenseList.jsx           # Fetches and displays expense records
 ┃ ┃ ┣ 📜 ExpenseSummary.jsx        # Shows total expenses for selected period
 ┃ ┃ ┣ 📜 ExpenseFilters.jsx        # Handles filtering by date/category
 ┃ ┃ ┗ 📜 ExpenseStats.jsx          # Calculates statistics and passes them to visual components
 ┃ ┗ 📂 utils
 ┃   ┣ 📜 formatters.ts             # Currency/date formatting helpers
 ┃   ┗ 📜 colors.ts                 # Category color palette
 ┗ ...
```

</details>
