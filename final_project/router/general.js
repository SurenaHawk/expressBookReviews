const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
let fs = require('fs');


public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (username && password) {
        if (!isValid(username)) { 
        users.push({"username":username,"password":password});
        return res.status(200).json({message: "Customer successfully registred. Now you can login"});
        } else {
        return res.status(404).json({message: "User already exists!"});    
        }
    }
    return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
// public_users.get('/',function (req, res) {
//     res.send(JSON.stringify(books,null,4));
// });


public_users.get('/', async function (req, res) {
    let allBooks = await books;
    res.send(JSON.stringify(allBooks,null,4));
});

// Get book details based on ISBN
// public_users.get('/isbn/:isbn',function (req, res) {
//     const isbn = req.params.isbn
//     res.send(books[isbn])
// });
  
public_users.get('/isbn/:isbn', function (req, res) {
    const isbn = req.params.isbn
    getBookDetails(isbn).then((bookDetails) => {
        res.send(bookDetails)
    })
});

function getBookDetails(isbn){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (books.hasOwnProperty(isbn)){
                resolve(books[isbn])
            }
            else{
                reject("No book found")
            }
        }, 1000);
    });
}

// Get book details based on author
// public_users.get('/author/:author',function (req, res) {
//     const author = req.params.author;
//     for (let bookKeys in books){
//         let book = books[bookKeys]
//         if(book.author === author){
//             res.send(book)
//         }
//     }
// });

public_users.get('/author/:author',function (req, res) {
    const author = req.params.author;
    getBookDetailsByAuthor(author).then((bookDetails) => {
        res.send(bookDetails)
    })
});

function getBookDetailsByAuthor(author){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            for (book in books){
                if (book.author === author){
                    resolve(books[author])
                }
                else{
                    reject("No book found")
                }
            }
        }, 1000);
    });
}

// Get all books based on title
// public_users.get('/title/:title',function (req, res) {
//     const title = req.params.title;
//     for (let bookKeys in books){
//         let book = books[bookKeys]
//         if(book.title === title){
//             res.send(book)
//         }
//     }
// });

public_users.get('/author/:author',function (req, res){
    const author = req.params.author;
    getBookDetailsByAuthor(author).then((bookDetails) => {
        res.send(bookDetails)
        console.log(bookDetails)
    })
});

function getBookDetailsByAuthor(author){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            for (book in books){
                if (book.author === author){
                    resolve(books[author])
                }
                else{
                    reject("No book found")
                }
            }
        }, 1000);
    });
}

console.log("Before calling promise");

console.log("After calling promise");



//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn
    let book = books[isbn]
    res.send(book.reviews)
});

module.exports.general = public_users;
