const client = require("./index");

async function createChildrensBook (ISBN, title, author, illustrator, genre, summary, publisher, yearPublished, bookCover, audience, physicalDescription) {
  try {
    const {rows: [bookJuv]} = await client.query(
      `
    INSERT INTO "childrensBooks" ("ISBN", title, author, illustrator, genre, summary, publisher, "yearPublished", "bookCover", audience, "physicalDescription")
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
    RETURNING *;
    `,
      [ISBN, title, author, illustrator, genre, summary, publisher, yearPublished, bookCover, audience, physicalDescription]
    );

    return bookJuv;
  } catch (error) {
    throw error;
  }
}

async function getAllChildrensBooks() {
  try {
    const {rows} = await client.query(
      `
      SELECT *
      FROM "childrensBooks";
       `
    );

    return rows;
  } catch (error) {
    throw error;
  }
}

async function getAllChildrensBooksByISBN(ISBN) {
  try {
    const {rows:[bookJuv]} = await client.query (`
      SELECT * FROM "childrensBooks"
      WHERE "ISBN" = $1
    `, [ISBN]);
    return bookJuv
  } catch (error) {
    throw error;
  }
}

// async function updateChildrensBook({ISBN, ...fields}) {
//   try {
//     const toUpdate = {}
//     for(let column in fields) {
//       if(fields[column] !== undefined) toUpdate[column] = fields[column];
//     }
//     let bookJuv;
//     if (util.dbFields(fields).insert.length > 0) {
//       const {rows} = await client.query(`
//           UPDATE "childrensBooks"
//           SET ${ util.dbFields(toUpdate).insert }
//           WHERE id=${ISBN}
//           RETURNING *;
//       `, Object.values(toUpdate));
//       bookJuv = rows[0];
//       return bookJuv;
//     }
//   } catch (error) {
//     throw error;
//   }
// }

async function destroyChildrensBook(ISBN) {
  try {
    const {rows: [bookJuv]} = await client.query(`
        DELETE FROM "childrensBooks" 
        WHERE id = $1
        RETURNING *;
    `, [ISBN]);
    return bookJuv;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createChildrensBook,
  getAllChildrensBooks,
  getAllChildrensBooksByISBN, 
  // updateChildrensBook,
  destroyChildrensBook
};