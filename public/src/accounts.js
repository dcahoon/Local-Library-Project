function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id);
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((acct1, acct2) => acct1.name.last > acct2.name.last ? 1 : -1);
}

function getTotalNumberOfBorrows(account, books) {
  let borrows = 0;
  books.forEach((book) => {
    const borrowArray = book.borrows;
    borrowArray.forEach((borrow) => {
      if (borrow.id === account.id) {
        borrows++;
      };
    });
  });
  return borrows;
}

function getBooksPossessedByAccount(account, books, authors) {
  let booksInPosession = [];
  books.forEach((book) => {
    const borrowArray = book.borrows;
    borrowArray.forEach((borrow) => {
      if(borrow.id === account.id && borrow.returned == false) {
        const author = authors.find((auth) => book.authorId == auth.id);
        const newBookObject = {...book, author};
        booksInPosession.push(newBookObject);
      }
    });
  }); 
  return booksInPosession;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
