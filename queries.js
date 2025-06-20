// Basic CRUD Operations

// Find all books in a specific genre
db.books.find({ genre: "Fiction" })

// Find books published after a certain year
db.books.find({ published_year: { $gt: 2000 } })

// Find books by a specific author
db.books.find({ author: "George Orwell" })

// Update the price of a specific book
db.books.updateOne(
  { title: "1984" },
  { $set: { price: 13.99 } }
)

// Delete a book by its title
db.books.deleteOne({ title: "Moby Dick" })

// Advanced Queries

// Books that are in stock and published after 2010
db.books.find({
  in_stock: true,
  published_year: { $gt: 2010 }
})

// Projection (title, author, price only)
db.books.find(
  {},
  { title: 1, author: 1, price: 1, _id: 0 }
)

// Sorting by price

// Ascending:
db.books.find().sort({ price: 1 })

// Descending:
db.books.find().sort({ price: -1 })

// Pagination (5 per page)

// Page 1:
db.books.find().limit(5)

// Page 2:
db.books.find().skip(5).limit(5)

// Aggregation Pipelines

// Average price of books by genre
db.books.aggregate([
  {
    $group: {
      _id: "$genre",
      average_price: { $avg: "$price" }
    }
  }
])

// Author with the most books
db.books.aggregate([
  {
    $group: {
      _id: "$author",
      book_count: { $sum: 1 }
    }
  },
  { $sort: { book_count: -1 } },
  { $limit: 1 }
])

// Group books by publication decade
db.books.aggregate([
  {
    $group: {
      _id: { $subtract: ["$published_year", { $mod: ["$published_year", 10] }] },
      count: { $sum: 1 }
    }
  },
  { $sort: { _id: 1 } }
])

// Indexing

// Create an index on the title field
db.books.createIndex({ title: 1 })

// Create a compound index on author and published_year
db.books.createIndex({ author: 1, published_year: -1 })

// Use explain() to analyze performance
db.books.find({ title: "1984" }).explain("executionStats")







