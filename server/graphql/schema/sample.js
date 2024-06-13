module.exports = `
  type BOOK_TYPE {
    title: String
    author: String
  }

  type Book{
    data: BOOK_TYPE
  }

  type Query {    
      Book: Book
  }
`;
