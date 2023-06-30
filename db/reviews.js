const client = require("./index");

async function createReview(content, score, userId, nfBookISBN, fictionBookISBN, graphicBookISBN, bookClubBookISBN, childrensBookISBN, isInappropriate, isNotAccurate) {
  try {
    const {rows: [review]} = await client.query(
      `
    INSERT INTO reviews (content, score, user_id, "nfBook_isbn", "fictionBook_isbn", "graphicBook_isbn", "bookClubBook_isbn", "childrensBook_isbn", "isInappropriate", "isNotAccurate")
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    RETURNING *;
    `,
      [content, score, userId, nfBookISBN, fictionBookISBN, graphicBookISBN, bookClubBookISBN, childrensBookISBN, isInappropriate, isNotAccurate]
    );

    return review;
  } catch (error) {
    throw error;
  }
}

async function getAllReviews() {
  try {
    const {rows} = await client.query(
      `
      SELECT *
      FROM reviews;
    `
    );
console.log(rows, "**")
    return rows;
  } catch (error) {
    throw error;
  }
}

async function getReviewsByUserId({userId}) {
  try {
    const user = await getUserById(userId);
    const { rows: reviewsByUser } = await client.query(`
    SELECT reviews.*, users.id AS "user_id"
    FROM reviews
    JOIN users ON reviews."user_id" = users.id 
    WHERE "user_id" = $1
    `, [user.id]);
    return reviewsByUser
  } catch (error) {
    throw error;
  }
}

async function updateReview(id, fields = {}) {
  // build the set string 
  const fieldsKeys = Object.keys(fields)
  console.log(fieldsKeys, "fieldsKeys in update review")
  
  const mapOfStrings = fieldsKeys.map(
    (key, index) => `"${ key }"=$${ index + 1 }`
  )
  console.log (mapOfStrings, "map of string in update review")
  
  const setString =  mapOfStrings.join(', ');
  console.log (setString, "set string on update review")
  // return early if this is called without fields
  if (setString.length === 0) {
    return;
  }

  try {
    const { rows: [ review ] } = await client.query(`
      UPDATE reviews
      SET ${ setString }
      WHERE id=${ id }
      RETURNING *;
    `, Object.values(fields));

    return review;
  } catch (error) {
    throw error;
  }
}


async function destroyReview(id) {
  try {
    const {rows: [review]} = await client.query(`
        DELETE FROM review
        WHERE id = $1
        RETURNING *;
    `, [id]);
    return review;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createReview,
  getAllReviews,
  getReviewsByUserId,
  updateReview,
  destroyReview
};