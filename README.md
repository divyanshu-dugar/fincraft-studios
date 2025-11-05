
<details>
<summary>👉🏻 Expense List Directory Structure</summary>

```
📦 app
 ┣ 📂 expense/list/
 ┃ ┣ 📜 page.jsx                    # Main Expenses Page
 📂 components
 ┣ 📂 expenses/
 ┃ ┃ ┣ 📜 ExpenseDistribution.jsx   # Visualizes category-wise distribution using PieChart
 ┃ ┃ ┣ 📜 ExpenseFilters.jsx        # Handles filtering expense by date/category
 ┃ ┃ ┣ 📜 ExpenseList.jsx           # Core logic, API calls, state handling
 ┃ ┃ ┣ 📜 ExpenseSummary.jsx        # Bottom total summary
 ┃ ┃ ┗ 📜 ExpenseStats.jsx          # Summary cards
 ┗ 
```

</details>

<details>
<summary>👉🏻 Expense API Routes</summary>

## Authentication - Passport JWT

### expenses

| Method | Endpoint | Description | Headers | Body | Response |
|--------|----------|-------------|---------|------|----------|
| `GET` | `/expenses` | Get user expenses | `Authorization` | - | `[expenses]` |
| `POST` | `/expenses` | Create expense | `Authorization` | `{amount, category, type, date}` | `{expense}` |
| `PUT` | `/expenses/:id` | Update expense | `Authorization` | `{amount, category}` | `{expense}` |
| `DELETE` | `/expenses/:id` | Delete expense | `Authorization` | - | `{message}` |


</details>
