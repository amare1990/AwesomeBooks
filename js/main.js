window.onload = () => {
  //const booksContainer = document.querySelector('.container-book');

  const addBtn = document.querySelector('.add-btn');
  //const parser = new DOMParser();

  class Book {
    constructor(title, author) {
      this.title = title;
      this.author = author;
    }
  }
 
  class BookImplement {
      constructor () {
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
        //syncStorage();
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
        const newBookElement = this.parser.parseFromString(newBook, 'text/html').body.firstChild;
        console.log(newBookElement);
        const removeBtn = newBookElement.querySelector('.remove-btn');
        removeBtn.addEventListener('click', (e) => {
          this.removeBook(e, newBookElement);
          //this.syncStorage();
        });
        this.booksContainer.append(newBookElement);
      });
    }

  } //End of BookImplement class

  const bookImplemObj = new BookImplement();

  const bookStorage = localStorage.getItem('bookKey2');

  if (bookStorage) {
    //method.bookList = JSON.parse(bookStorage);
    bookImplemObj.bookArray = JSON.parse(bookStorage);
    bookImplemObj.showBooks();
  }
 
  //bookImplemObj.showBooks();

  addBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const title = document.querySelector('.title').value;
    const author = document.querySelector('.author').value;
    const book = new Book(title, author);
    bookImplemObj.bookArray.push(book);
    bookImplemObj.showBooks();
    //syncStorage();
    localStorage.setItem('bookKey2', JSON.stringify(bookImplemObj.bookArray));
    document.querySelector('.title').value = '';
    document.querySelector('.author').value = '';
  });

  //localStorage.removeItem('bookKey2');

}; // End of Window onload event

//localStorage.removeItem('bookKey2');