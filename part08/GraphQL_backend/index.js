const { ApolloServer, gql } = require('apollo-server');
const { v1: uuid } = require('uuid');
let authors = [
  {
    name: 'Robert Martin',
    id: 'afa51ab0-344d-11e9-a414-719c6709cf3e',
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: 'afa5b6f0-344d-11e9-a414-719c6709cf3e',
    born: 1963,
  },
  {
    name: 'Fyodor Dostoevsky',
    id: 'afa5b6f1-344d-11e9-a414-719c6709cf3e',
    born: 1821,
  },
  {
    name: 'Joshua Kerievsky', // birthyear not known
    id: 'afa5b6f2-344d-11e9-a414-719c6709cf3e',
  },
  {
    name: 'Sandi Metz', // birthyear not known
    id: 'afa5b6f3-344d-11e9-a414-719c6709cf3e',
  },
];

/*

 *
 * English:
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
 *

 */

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: 'afa5b6f4-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring'],
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: 'afa5b6f5-344d-11e9-a414-719c6709cf3e',
    genres: ['agile', 'patterns', 'design'],
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: 'afa5de00-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring'],
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: 'afa5de01-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring', 'patterns'],
  },
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: 'afa5de02-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring', 'design'],
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: 'afa5de03-344d-11e9-a414-719c6709cf3e',
    genres: ['classic', 'crime'],
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: 'afa5de04-344d-11e9-a414-719c6709cf3e',
    genres: ['classic', 'revolution'],
  },
];

const typeDefs = gql`
  type Authors {
    name: String!
    born: String
    booksCount: Int!
    id: ID!
  }
  type Books {
    title: String!
    author: String!
    published: Int!
    genres: [String!]!
    id: ID!
  }
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(genre: String): [Books!]!
    allAuthors: [Authors!]!
  }
  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Books
    editAuthor(name: String!, setBornTo: Int!): Authors
  }
`;

const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: (root, args) => {
      const booksByAuthor = books
        .filter((book) => book.genres.includes(args.genre))
        .map((el) => {
          return {
            title: el.title,
            author: el.author,
          };
        });

      return booksByAuthor;
    },
    allAuthors: () => authors,
  },

  Authors: {
    booksCount: (root) => {
      const booksLength = books.filter((book) => book.author === root.name);
      return booksLength.length;
    },
  },
  Mutation: {
    addBook: (root, args) => {
      const existingAuthor = authors.find((a) => a.name === args.author);
      if (!existingAuthor) {
        authors.push({
          name: args.author,
          id: uuid(),
          born: args.born || null,
        });
      }
      const newBook = { ...args, id: uuid() };

      console.log('🚀 ~ newBook', newBook);
      books.push(newBook);

      return {
        title: args.title,
        author: args.author,
      };
    },
    editAuthor: (root, args) => {
      const existingAuthor = authors.find((a) => a.name === args.name);
      if (!existingAuthor) {
        return null;
      }
      const updatedAuthors = { ...existingAuthor, born: args.setBornTo };
      authors = authors.map((author) =>
        author.name === args.name ? updatedAuthors : author
      );
      return updatedAuthors;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
