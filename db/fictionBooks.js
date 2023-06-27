const client = require("./client");

async function createFictionBook (ISBN, title, author, genre, summary, publisher, yearPublished, bookCover, physicalDescription) {
  try {
    const {rows: [bookFic]} = await client.query(
      `
    INSERT INTO "fictionBooks" ("ISBN", title, author, genre, summary, publisher, "yearPublished", "bookCover", "physicalDescription")
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING *;
    `,
      [ISBN, title, author, genre, summary, publisher, yearPublished, bookCover, physicalDescription]
    );

    return bookFic;
  } catch (error) {
    throw error;
  }
}

async function getAllFictionBooks() {
  try {
    const {rows} = await client.query(
      `
      SELECT *
      FROM "fictionBooks";
       `
    );

    return rows;
  } catch (error) {
    throw error;
  }
}

async function getAllFictionBooksByISBN(ISBN) {
  try {
    const {rows:[bookFic]} = await client.query (`
      SELECT * FROM "fictionBooks"
      WHERE "ISBN" = $1
    `, [ISBN]);
    return bookFic
  } catch (error) {
    throw error;
  }
}

async function updateFictionBook({ISBN, ...fields}) {
  try {
    const toUpdate = {}
    for(let column in fields) {
      if(fields[column] !== undefined) toUpdate[column] = fields[column];
    }
    let bookFic;
    if (util.dbFields(fields).insert.length > 0) {
      const {rows} = await client.query(`
          UPDATE "fictionBooks"
          SET ${ util.dbFields(toUpdate).insert }
          WHERE id=${ISBN}
          RETURNING *;
      `, Object.values(toUpdate));
      bookFic = rows[0];
      return bookFic;
    }
  } catch (error) {
    throw error;
  }
}

async function destroyFictionBook(ISBN) {
  try {
    const {rows: [bookFic]} = await client.query(`
        DELETE FROM "fictionBooks" 
        WHERE id = $1
        RETURNING *;
    `, [ISBN]);
    if (rows.length) {
    return bookFic;
  }
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createFictionBook,
  getAllFictionBooks,
  getAllFictionBooksByISBN,
  updateFictionBook,
  destroyFictionBook
};