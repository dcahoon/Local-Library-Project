const { partitionBooksByBorrowedStatus } = require("./books");

function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  return books.filter((book) => book.borrows[0].returned === false).length;
}

function getMostCommonGenres(books) {
  const genreArray = books.map((book) => book.genre);
  const popGenres = [];
  for (let i in genreArray) {
    const genreFound = popGenres.find((genre) => genre.name === genreArray[i]);
    if (genreFound) {
      genreFound.count++;
    } else {
      const genreName = genreArray[i];
      const genreCount = 1;
      popGenres.push({name: genreName, count: genreCount});
    }
  }  
  return getTopFive(popGenres);
}

function getMostPopularBooks(books) {
  const borrowArray = [];
  for (let i in books) {
    const borrowObject = {name: books[i].title, count: books[i].borrows.length};
    borrowArray.push(borrowObject);
  }
  return getTopFive(borrowArray);
}

function getMostPopularAuthors(books, authors) {
  const popularAuthors = [];
  for (let i in authors) {
    const booksByAuthor = books.filter((book) => book.authorId === authors[i].id);
    const borrowsForAuthor = booksByAuthor.reduce((acc, book) => acc + book.borrows.length, 0);
    const authorName = `${authors[i].name.first} ${authors[i].name.last}`;
    popularAuthors.push({name: authorName, count: borrowsForAuthor});
  } 
  return getTopFive(popularAuthors);
}

// Helper function
function getTopFive(list) {
  return list.sort((item1, item2) => item2.count - item1.count).slice(0, 5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
