function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id);
}

function findBookById(books, id) {
  const bookObject = books.find((book) => book.id === id);
  return bookObject;
}

function partitionBooksByBorrowedStatus(books) {
  const borrowed = [];
  const returned = [];
  books.forEach((book) => {
    const borrows = book.borrows;
    borrows[0].returned ? returned.push(book) : borrowed.push(book);
  });
  return [borrowed, returned];
}

function getBorrowersForBook(book, accounts) {
  const borrows = book.borrows;
  const accountArray = [];
  for (let i = 0; i < borrows.length; i++) {
    const account = accounts.find((acct) => acct.id === borrows[i].id);
    const returned = borrows[i].returned;
    accountArray.push({...account, returned});
    if (accountArray.length === 10) return accountArray;
  }
  return accountArray;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
