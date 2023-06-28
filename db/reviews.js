const client = require("./index");

async function createReview(content, score, userId, nfBookId, fictionBookId, graphicBookId, bookClubBookId, childrensBookId) {
  try {
    const {rows: [review]} = await client.query(
      `
    INSERT INTO reviews (content, score, "user_id", "nfBook_id", "fictionBook_id", "graphicBook_id", "bookClubBook_id", "childrensBook_id" )
    VALUES($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *;
    `,
      [content, score, userId, nfBookId, fictionBookId, graphicBookId, bookClubBookId, childrensBookId]
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

// async function updateReview({id, ...fields}) {
//   try {
//     const toUpdate = {}
//     for(let column in fields) {
//       if(fields[column] !== undefined) toUpdate[column] = fields[column];
//     }
//     let review;
//     if (util.dbFields(fields).insert.length > 0) {
//       const {rows} = await client.query(`
//           UPDATE reviews
//           SET ${ util.dbFields(toUpdate).insert }
//           WHERE id=${id}
//           RETURNING *;
//       `, Object.values(toUpdate));
//       review = rows[0];
//       return review;
//     }
//   } catch (error) {
//     throw error;
//   }
// }

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
  // updateReview,
  destroyReview
};