const client = require("./client");

async function createNFBook (ISBN, title, author, genre, summary, publisher, yearPublished, bookCover, physicalDescription) {
  try {
    const {rows: [bookNF]} = await client.query(
      `
    INSERT INTO "nfBooks" ("ISBN", title, author, genre, summary, publisher, "yearPublished", "bookCover", "physicalDescription")
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING *;
    `,
      [ISBN, title, author, genre, summary, publisher, yearPublished, bookCover, physicalDescription]
    );

    return bookNF;
  } catch (error) {
    throw error;
  }
}

async function getAllNFBooks() {
  try {
    const {rows} = await client.query(
      `
      SELECT *
      FROM "nfBooks";
       `
    );

    return rows;
  } catch (error) {
    throw error;
  }
}

async function getAllNFBooksByISBN(ISBN) {
  try {
    const {rows:[bookNF]} = await client.query (`
      SELECT * FROM "nfBooks"
      WHERE "ISBN" = $1
    `, [ISBN]);
    return bookNF
  } catch (error) {
    throw error;
  }
}

async function updateNFBook({ISBN, ...fields}) {
  try {
    const toUpdate = {}
    for(let column in fields) {
      if(fields[column] !== undefined) toUpdate[column] = fields[column];
    }
    let bookNF;
    if (util.dbFields(fields).insert.length > 0) {
      const {rows} = await client.query(`
          UPDATE "nfBooks"
          SET ${ util.dbFields(toUpdate).insert }
          WHERE id=${ISBN}
          RETURNING *;
      `, Object.values(toUpdate));
      bookNF = rows[0];
      return bookNF;
    }
  } catch (error) {
    throw error;
  }
}

async function destroyNFBook(ISBN) {
  try {
    const {rows: [bookNF]} = await client.query(`
        DELETE FROM "nfBooks" 
        WHERE id = $1
        RETURNING *;
    `, [ISBN]);
    return bookNF;
  } catch (error) {
    throw error;
  }
}


module.exports = {
  createNFBook,
  getAllNFBooks,
  getAllNFBooksByISBN,
  updateNFBook,
  destroyNFBook
};