
public_users.get('/async/books', function (req, res) {
    const getAllBooks = (callback) => {
      setTimeout(() => {
        callback(null, books);
      }, 1000); // Simulating a delay
    };
  
    getAllBooks((error, result) => {
      if (error) {
        return res.status(500).json({ message: "Error fetching books" });
      }
      return res.status(200).json(result);
    });
  });
  

public_users.get('/async/isbn/:isbn', function (req, res) {
    const isbn = req.params.isbn;
  
    const searchByISBN = new Promise((resolve, reject) => {
      setTimeout(() => {
        const book = books[isbn];
        if (book) {
          resolve(book);
        } else {
          reject("Book not found");
        }
      }, 1000); // Simulating a delay
    });
  
    searchByISBN
      .then((book) => res.status(200).json(book))
      .catch((error) => res.status(404).json({ message: error }));
  });
  

public_users.get('/async/author/:author', async function (req, res) {
    const author = req.params.author;
  
    const searchByAuthor = async () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const booksByAuthor = Object.values(books).filter(book => book.author === author);
          if (booksByAuthor.length > 0) {
            resolve(booksByAuthor);
          } else {
            reject("No books found by this author");
          }
        }, 1000); // Simulating a delay
      });
    };
  
    try {
      const result = await searchByAuthor();
      return res.status(200).json(result);
    } catch (error) {
      return res.status(404).json({ message: error });
    }
  });
  

public_users.get('/async/title/:title', function (req, res) {
    const title = req.params.title;
  
    const searchByTitle = (title, callback) => {
      setTimeout(() => {
        const booksByTitle = Object.values(books).filter(book => book.title === title);
        if (booksByTitle.length > 0) {
          callback(null, booksByTitle);
        } else {
          callback("No books found with this title", null);
        }
      }, 1000); // Simulating a delay
    };
  
    searchByTitle(title, (error, result) => {
      if (error) {
        return res.status(404).json({ message: error });
      }
      return res.status(200).json(result);
    });
  });
  