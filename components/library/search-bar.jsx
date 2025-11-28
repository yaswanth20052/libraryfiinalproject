"use client"

import { useId } from "react"

function SearchBar({ query, onQueryChange, category, onCategoryChange }) {
  const searchId = useId()
  const categoryId = useId()

  return (
    <div className="w-full flex flex-col md:flex-row items-stretch md:items-center gap-3">
      <div className="flex-1">
        <label htmlFor={searchId} className="sr-only">
          Search books
        </label>
        <input
          id={searchId}
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search by title, author, or ISBN"
          className="w-full bg-background text-foreground border border-border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-ring"
        />
      </div>
      <div className="w-full md:w-56">
        <label htmlFor={categoryId} className="sr-only">
          Category
        </label>
        <select
          id={categoryId}
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="w-full bg-background text-foreground border border-border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="">All categories</option>
          <option value="Fiction">Fiction</option>
          <option value="Non-fiction">Non-fiction</option>
          <option value="Technology">Technology</option>
          <option value="History">History</option>
          <option value="Science">Science</option>
        </select>
      </div>
    </div>
  )
}

export default SearchBar
export { SearchBar }
