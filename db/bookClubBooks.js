const client = require("./index");

async function createBookClubPicksBook (ISBN, title, author, genre, summary, publisher, yearPublished, bookCover, physicalDescription) {
  try {
    const {rows: [bookClub]} = await client.query(
      `
    INSERT INTO "bookClubPicksBooks" ("ISBN", title, author, genre, summary, publisher, "yearPublished", "bookCover", "physicalDescription")
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING *;
    `,
      [ISBN, title, author, genre, summary, publisher, yearPublished, bookCover, physicalDescription]
    );

    return bookClub
  } catch (error) {
    throw error;
  }
}

async function getAllBookClubPicksBooks() {
  try {
    const {rows} = await client.query(
      `
      SELECT *
      FROM "bookClubPicksBooks";
       `
    );

    return rows;
  } catch (error) {
    throw error;
  }
}


async function getAllBookClubPicksBooksByISBN(ISBN) {
  try {
    const {rows:[bookClub]} = await client.query (`
      SELECT * FROM "bookClubPicksBooks"
      WHERE "ISBN" = $1
    `, [ISBN]);
    return bookClub
  } catch (error) {
    throw error;
  }
}

// async function updateBookClubPicksBook({ISBN, ...fields}) {
//   try {
//     const toUpdate = {}
//     for(let column in fields) {
//       if(fields[column] !== undefined) toUpdate[column] = fields[column];
//     }
//     let bookClub;
//     if (util.dbFields(fields).insert.length > 0) {
//       const {rows} = await client.query(`
//           UPDATE "bookClubPicksBooks"
//           SET ${ util.dbFields(toUpdate).insert }
//           WHERE id=${ISBN}
//           RETURNING *;
//       `, Object.values(toUpdate));
//       bookClub = rows[0];
//       return bookClub;
//     }
//   } catch (error) {
//     throw error;
//   }
// }

async function destroyBookClubPicksBook(ISBN) {
  try {
    const {rows: [bookClub]} = await client.query(`
        DELETE FROM "bookClubPicksBooks"
        WHERE id = $1
        RETURNING *;
    `, [ISBN]);
    return bookClub;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createBookClubPicksBook,
  getAllBookClubPicksBooks,
  getAllBookClubPicksBooksByISBN,
  // updateBookClubPicksBook,
  destroyBookClubPicksBook
};