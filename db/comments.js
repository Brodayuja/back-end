const client = require("./index");

async function createComments (userid, content, username, reviewid) {
  try {
    const {rows: [comment]} = await client.query(
      `
    INSERT INTO comments (userid, content, username, reviewid)
    VALUES($1, $2, $3, $4)
    RETURNING *;
    `,
      [userid, content, username, reviewid]
    );

    return comment;
  } catch (error) {
    throw error;
  }
}

async function getAllComments() {
  try {
    const {rows} = await client.query(
      `
      SELECT comments.*, reviews.id AS "reviewid"
      FROM comments
      JOIN reviews ON comments."reviewid" = reviews.id"
      WHERE "reviewid" = $1
       `, [reviews.id]
    );

    return rows;
  } catch (error) {
    throw error;
  }
}

async function getAllCommentsById(comment_id) {
  try {
    const { rows } = await client.query(
      `
      SELECT *
      FROM comments
      WHERE id = $1;
      `,
      [comment_id]
    );

    if (rows.length === 0) {
      throw new Error('Review not found');
    }

    return rows[0];
  } catch (error) {
    throw error;
  }
}


async function updateComments(id, fields = {}) {
  // build the set string 
  const fieldsKeys = Object.keys(fields)
  console.log(fieldsKeys, "fieldsKeys in update all books")
  
  const mapOfStrings = fieldsKeys.map(
    (key, index) => `"${ key }"=$${ index + 1 }`
  )
  console.log (mapOfStrings, "map of string in update all books")
  
  const setString =  mapOfStrings.join(', ');
  console.log (setString, "set string on update all books")
  // return early if this is called without fields
  if (setString.length === 0) {
    return;
  }

  try {
    const { rows: [ comment ] } = await client.query(`
      UPDATE comments
      SET ${ setString }
      WHERE id=${ id }
      RETURNING *;
    `, Object.values(fields));

    return comment;
  } catch (error) {
    throw error;
  }
}

async function destroyComments() {
  try {
    const {rows: [comment]} = await client.query(`
        DELETE FROM comments
        WHERE id = $1
        RETURNING *;
    `, []);
    if (rows.length) {
    return comment;
  }
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createComments,
  getAllCommentsById,
  getAllComments,
  updateComments,
  destroyComments
};