import { createContext } from "react";

const MockBockContext = createContext({
  mockBooks: [
    {
      id: 1,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      year: 1960,
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/To_Kill_a_Mockingbird_%28first_edition_cover%29.jpg/1024px-To_Kill_a_Mockingbird_%28first_edition_cover%29.jpg",
      description:
        "A powerful exploration of racial injustice and moral growth in the American South.",
    },
    {
      id: 2,
      title: "1984",
      author: "George Orwell",
      year: 1949,
      url: "http://bookcoverarchive.com/wp-content/uploads/amazon/1984.jpg",
      description:
        "A dystopian novel set in a totalitarian society, warning of the dangers of government overreach and surveillance.",
    },
    {
      id: 3,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      year: 1925,
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/The_Great_Gatsby_Cover_1925_Retouched.jpg/440px-The_Great_Gatsby_Cover_1925_Retouched.jpg",
      description:
        "A critique of the American Dream in the Jazz Age, focusing on wealth, love, and disillusionment.",
    },
    {
      id: 4,
      title: "Pride and Prejudice",
      author: "Jane Austen",
      year: 1813,
      url: "https://m.media-amazon.com/images/I/41+UqVzvyjL._SY445_SX342_.jpg",
      description:
        "A classic romance novel examining societal expectations, love, and personal growth in Regency-era England.",
    },
    {
      id: 5,
      title: "The Catcher in the Rye",
      author: "J.D. Salinger",
      year: 1951,
      url: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1398034300i/5107.jpg",
      description:
        "A coming-of-age story featuring a teenage protagonist grappling with alienation and identity in post-war America.",
    },
    {
      id: 6,
      title: "One Hundred Years of Solitude",
      author: "Gabriel García Márquez",
      year: 1967,
      url: "https://upload.wikimedia.org/wikipedia/en/a/a0/Cien_a%C3%B1os_de_soledad_%28book_cover%2C_1967%29.jpg",
      description:
        "A multi-generational saga blending magical realism with the history of Colombia.",
    },
    {
      id: 7,
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      year: 1937,
      url: "https://upload.wikimedia.org/wikipedia/en/4/4a/TheHobbit_FirstEdition.jpg",
      description:
        "A fantasy adventure novel about a hobbit's journey to help dwarves reclaim their homeland from a dragon.",
    },
    {
      id: 8,
      title: "Brave New World",
      author: "Aldous Huxley",
      year: 1932,
      url: "https://upload.wikimedia.org/wikipedia/en/6/62/BraveNewWorld_FirstEdition.jpg",
      description:
        "A dystopian novel exploring a genetically engineered society and the cost of perceived utopia.",
    },
    {
      id: 9,
      title: "The Lord of the Rings",
      author: "J.R.R. Tolkien",
      year: 1954,
      url: "https://upload.wikimedia.org/wikipedia/en/e/e9/First_Single_Volume_Edition_of_The_Lord_of_the_Rings.gif",
      description:
        "An epic high-fantasy trilogy following a hobbit's quest to destroy a powerful ring and save Middle-earth.",
    },
    {
      id: 10,
      title: "Jane Eyre",
      author: "Charlotte Brontë",
      year: 1847,
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Jane_Eyre_title_page.jpg/440px-Jane_Eyre_title_page.jpg",
      description:
        "A Gothic romance novel charting the emotional and spiritual development of its titular character.",
    },
  ],
});

export default MockBockContext;
