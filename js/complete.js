window.onload = () => {
  const addBtn = document.querySelector('.add-btn');

  const time = document.querySelector('.time');
  function showTime() {
    setInterval(() => {
      const date = new Date().toUTCString();
      time.innerHTML = date;
    }, 1000);
  }

  showTime();

  class Book {
    constructor(title, author) {
      this.title = title;
      this.author = author;
    }
  }

  class BookImplement {
    constructor() {
      this.bookArray = [];
      this.booksContainer = document.querySelector('.book-from-storage');
      this.parser = new DOMParser();
    }

    removeBook(e, newBookElement) {
      const index = e.target.getAttribute('myIndex');

      function checkBtnclicked(element, i) {
        if (i === parseInt(index, 10)) {
          return false;
        }
        return true;
      }

      this.bookArray = this.bookArray.filter(checkBtnclicked);
      newBookElement.remove();
      localStorage.setItem('bookKey2', JSON.stringify(bookImplemObj.bookArray));
      this.showBooks();
    }

    showBooks() {
      this.booksContainer.innerHTML = '';
      this.bookArray.forEach((e, i) => {
        const newBook = `
          <div class = "popped-books">
            <p>${e.title} by ${e.author} </p>
            <button type="button" class="remove-btn" myIndex ="${i}" >Remove</button>
          </div>
        `;
        const newBookElement = this.parser.parseFromString(newBook, 'text/html').body.firstChild; const removeBtn = newBookElement.querySelector('.remove-btn');
        removeBtn.addEventListener('click', (e) => {
          this.removeBook(e, newBookElement);
        });
        this.booksContainer.append(newBookElement);
      });
    }
  } // End of BookImplement class

  const bookImplemObj = new BookImplement();

  const bookStorage = localStorage.getItem('bookKey2');

  if (bookStorage) {
    bookImplemObj.bookArray = JSON.parse(bookStorage);
    bookImplemObj.showBooks();
  }

  addBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const title = document.querySelector('.title').value;
    const author = document.querySelector('.author').value;
    const book = new Book(title, author);
    bookImplemObj.bookArray.push(book);
    bookImplemObj.showBooks();
    localStorage.setItem('bookKey2', JSON.stringify(bookImplemObj.bookArray));
    document.querySelector('.title').value = '';
    document.querySelector('.author').value = '';
  });
}; // End of Window onload event

// Links
const bookListLink = document.querySelector('.list-anchor');
const addBookLink = document.querySelector('.add-new-anchor');
const contactLink = document.querySelector('.contact-anchor');

// Section
const bookList = document.querySelector('.book-list-section');
const addBook = document.querySelector('.add-new-section');
const contactUs = document.querySelector('.contact-section');

bookListLink.addEventListener('click', () => {
  bookList.classList.remove('hidden');
  bookListLink.classList.add('active');
  addBookLink.classList.remove('active');
  contactLink.classList.remove('active');
  addBook.classList.add('hidden');
  contactUs.classList.add('hidden');
});

addBookLink.addEventListener('click', () => {
  bookList.classList.add('hidden');
  addBook.classList.remove('hidden');
  addBookLink.classList.add('active');
  bookListLink.classList.remove('active');
  contactLink.classList.remove('active');
  contactUs.classList.add('hidden');
});

contactLink.addEventListener('click', () => {
  bookList.classList.add('hidden');
  addBook.classList.add('hidden');
  contactUs.classList.remove('hidden');
  contactLink.classList.add('active');
  addBookLink.classList.remove('active');
  bookListLink.classList.remove('active');
});