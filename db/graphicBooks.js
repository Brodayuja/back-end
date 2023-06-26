const client = require("./client");

async function createGraphicNovelBook ({ISBN, title, author, artist, genre, summary, publisher, yearPublished, bookCover, physicalDescription}) {
  try {
    const {rows: [bookGN]} = await client.query(
      `
    INSERT INTO "graphicNovelsAndMangaBooks" ("ISBN", title, author, artist, genre, summary, publisher, "yearPublished", "bookCover", "physicalDescription")
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    RETURNING *;
    `,
      [ISBN, title, author, artist, genre, summary, publisher, yearPublished, bookCover, physicalDescription]
    );

    return bookGN;
  } catch (error) {
    throw error;
  }
}

async function getAllGraphicNovelBooks() {
  try {
    const {rows} = await client.query(
      `
      SELECT *
      FROM "graphicNovelsAndMangaBooks";
       `
    );

    return rows;
  } catch (error) {
    throw error;
  }
}

async function getAllGraphicNovelBooksByISBN(ISBN) {
  try {
    const {rows:[bookGN]} = await client.query (`
      SELECT * FROM "graphicNovelsAndMangaBooks"
      WHERE "ISBN" = $1
    `, [ISBN]);
    return bookGN
  } catch (error) {
    throw error;
  }
}

async function updateGraphicNovelBook({ISBN, ...fields}) {
  try {
    const toUpdate = {}
    for(let column in fields) {
      if(fields[column] !== undefined) toUpdate[column] = fields[column];
    }
    let bookGN;
    if (util.dbFields(fields).insert.length > 0) {
      const {rows} = await client.query(`
          UPDATE "graphicNovelsAndMangaBooks"
          SET ${ util.dbFields(toUpdate).insert }
          WHERE id=${ISBN}
          RETURNING *;
      `, Object.values(toUpdate));
      bookGN = rows[0];
      return bookGN;
    }
  } catch (error) {
    throw error;
  }
}

async function destroyGraphicNovelBook(ISBN) {
  try {
    const {rows: [bookGN]} = await client.query(`
        DELETE FROM "graphicNovelsAndMangaBooks" 
        WHERE id = $1
        RETURNING *;
    `, [ISBN]);
    return bookGN;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createGraphicNovelBook,
  getAllGraphicNovelBooks,
  getAllGraphicNovelBooksByISBN,
  updateGraphicNovelBook,
  destroyGraphicNovelBook
};