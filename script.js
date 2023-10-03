class Book {
  constructor(title, author, pageCount, readStatus) {
    this.title = title;
    this.author = author;
    this.pageCount = pageCount;
    this.readStatus = readStatus;
  }
  createBookContainer = () => {
    const bookContainer = document.createElement("div");
    bookContainer.className = "bookContainer";
    const title = document.createElement("p");
    title.textContent = `Title: ${this.title}`;
    const author = document.createElement("p");
    author.textContent = `Author: ${this.author}`;
    const pageCount = document.createElement("p");
    pageCount.textContent = `# of pages: ${this.pageCount}`;
    // Create a checkbox element for the read status
    const readStatusLabel = document.createElement("label");
    readStatusLabel.textContent = "Read Status:";
    const readStatusCheckbox = document.createElement("input");
    readStatusCheckbox.type = "checkbox";
    readStatusCheckbox.checked = false;
    readStatusLabel.appendChild(readStatusCheckbox);

    const deleteContainer = document.createElement("div");
    const deleteBookBtn = document.createElement("button");

    deleteContainer.className = "deleteContainer";
    deleteBookBtn.className = "deleteBookBtn";

    deleteBookBtn.textContent = "Delete Book";
    deleteBookBtn.addEventListener("click", () => {
      myLibrary.deleteBook(this.title);
    });
    deleteContainer.appendChild(deleteBookBtn);
    // Append all elements to the bookContainer
    bookContainer.append(
      title,
      author,
      pageCount,
      readStatusLabel,
      deleteContainer
    );

    return bookContainer;
  };
}

// To hold the book containers
class Library {
  constructor() {
    this.books = []; // Create an array to hold books
  }
  createLibrary = () => {
    // Create a container to display all the bookContainers
    const libraryContainer = document.createElement("div");
    libraryContainer.className = "libraryContainer";
    return libraryContainer;
  };
  // Function to add book to array initialized above
  addBook(book) {
    this.books.push(book);
  }
  deleteBook(title) {
    // Filter the books array to exclude the book with the specified title
    this.books = this.books.filter((book) => book.title !== title);

    // Remove the corresponding DOM element
    const bookContainers = document.querySelectorAll(".bookContainer");
    for (const bookContainer of bookContainers) {
      if (
        bookContainer.querySelector("p").textContent.includes(`Title: ${title}`)
      ) {
        bookContainer.parentNode.removeChild(bookContainer);
      }
    }
  }
}
class Header {
  createHeader = () => {
    const header = document.createElement("header");
    header.className = "header";
    header.textContent = "My Library";
    return header;
  };
}

class Footer {
  createFooter = () => {
    const footerContainer = document.createElement("footer");
    footerContainer.className = "footer";
    const footer = document.createElement("p");
    footer.innerHTML = "Copyright © 2023 Thomas Vo ";
    footerContainer.appendChild(footer);
    return footerContainer;
  };
}
class BtnContainer {
  createBtnContainer = () => {
    const btnContainer = document.createElement("div");
    btnContainer.className = "btnContainer";
    return btnContainer;
  };
}

class ModalCreation {
  constructor(modal, titleInput, authorInput, pageCountInput) {
    this.modal = null;
    this.titleInput = null;
    this.authorInput = null;
    this.pagesInput = null;
  }

  createModal = () => {
    this.modal = this.createDialog(); // Create the modal dialog
    const bookForm = this.createBookForm(); // Create the book form
    // Create input fields for Title, Author, and Page Count and retrieve the information
    this.titleInput = this.createUserInput("text", "Title");
    this.authorInput = this.createUserInput("text", "Author");
    this.pageCountInput = this.createUserInput("number", "Page Count");
    this.addBookBtn = this.createAddBookBtn();
    // Append input fields to the form
    bookForm.appendChild(this.titleInput);
    bookForm.appendChild(this.authorInput);
    bookForm.appendChild(this.pageCountInput);
    bookForm.appendChild(this.addBookBtn);
    // Append form to dialog/modal
    this.modal.appendChild(bookForm);
    // Append modal to body
    document.body.appendChild(this.modal);
  };
  // Creates form element
  createBookForm = () => {
    const bookForm = document.createElement("form");
    bookForm.className = "bookForm";
    return bookForm;
  };
  // Creates dialog element
  createDialog = () => {
    const dialog = document.createElement("dialog");
    dialog.className = "modal";
    return dialog;
  };
  createNewBookBtn = () => {
    const newBookBtn = document.createElement("button");
    newBookBtn.className = "newBookBtn";
    newBookBtn.textContent = "New Book";
    newBookBtn.addEventListener("click", () => {
      modalCreation.modal.showModal();
    });
    return newBookBtn;
  };

  // Create a button to add book
  createAddBookBtn = () => {
    const addBookBtn = document.createElement("button");
    addBookBtn.className = "addBookBtn";
    addBookBtn.textContent = "Add Book";
    addBookBtn.addEventListener("click", () => {
      if (this.isFormValid()) {
        const newBook = this.createBook(); // Create a new book
        myLibrary.addBook(newBook); // Add the new book to the library
        // Create a book container for the new book and add it to the library container
        const bookContainer = newBook.createBookContainer();
        libraryContainer.appendChild(bookContainer);
        this.modal.close();
      } else {
        alert("Please fill out all the fields");
      }
      event.preventDefault();
    });

    return addBookBtn;
  };
  isFormValid = () => {
    // Check if all input fields have values
    return (
      this.titleInput.value.trim() !== "" &&
      this.authorInput.value.trim() !== "" &&
      this.pageCountInput.value.trim() !== ""
    );
  };
  createBook = () => {
    // Get the user input from createModal function and create a book object
    const title = this.titleInput.value;
    const author = this.authorInput.value;
    const pageCount = this.pageCountInput.value;
    const newBook = new Book(title, author, pageCount, "Unread");
    this.titleInput.value = null;
    this.authorInput.value = null;
    this.pageCountInput.value = null;
    return newBook;
  };
  // Create the form inputs
  createUserInput = (inputType, placeholder) => {
    const userInput = document.createElement("input");
    userInput.className = "input";
    userInput.setAttribute("type", inputType);
    userInput.setAttribute("placeholder", placeholder);
    return userInput;
  };
}

const header = new Header().createHeader();
const myLibrary = new Library();
const modalCreation = new ModalCreation();
const libraryContainer = myLibrary.createLibrary();
const newBookBtn = new ModalCreation().createNewBookBtn();
const bookContainer = new Book();
const btnContainer = new BtnContainer().createBtnContainer();
const footer = new Footer().createFooter();

document.body.appendChild(header);
modalCreation.createModal();
document.body.appendChild(libraryContainer);
document.body.appendChild(btnContainer);
btnContainer.appendChild(newBookBtn);
bookContainer.createBookContainer();
document.body.appendChild(footer);
