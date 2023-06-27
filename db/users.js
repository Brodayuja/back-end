const client = require('./index');
const bcrypt = require('bcrypt');
const SALT_COUNT = 10;

async function createUser (name, username, password, email, avatar, location, website, favoriteBooks, aboutMe, isAdmin) {
  const hashedPassword = await bcrypt.hash(password, SALT_COUNT)
  console.log("is hashPassword working?", hashedPassword)
  try {
    const {rows: [user]} = await client.query(
      `
    INSERT INTO users (name, username, password, email, avatar, location, website, "favoriteBooks", "aboutMe", "is_admin")
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    RETURNING *;
    `,
      [name, username, hashedPassword, email, avatar, location, website, favoriteBooks, aboutMe, isAdmin]
    );
      console.log("is query working?", user)
    return user;
  } catch (error) {
    throw error;
  }
}

async function getAllUsers() {
  try {
    const {rows} = await client.query(
      `
      SELECT *
      FROM users;
      `
      );
      
      return rows;
    } catch (error) {
      throw error;
    }
  }
  
async function getUserByUsername(userName) {
  // first get the user
  try {
    const {rows} = await client.query(`
      SELECT *
      FROM users
      WHERE username = $1;
    `, [userName]);
    // if it doesn't exist, return null
    if (!rows || !rows.length) return null;
    // if it does:
    // delete the 'password' key from the returned object
    const [user] = rows;
    // delete user.password;
    return user;
  } catch (error) {
    console.error(error)
  }
}

async function getUser({username, password}) {
  if (!username || !password) {
    return;
  }

  try {
    const user = await getUserByUsername(username);
    if(!user) return;
    const hashedPassword = user.password;
    const passwordsMatch = await bcrypt.compare(password, hashedPassword);
    if(!passwordsMatch) return;
    delete user.password;
    return user;
  } catch (error) {
    throw error;
  }
}

async function getUserById(userId) {
  // first get the user
  try {
    const {rows: [user]} = await client.query(`
      SELECT *
      FROM users
      WHERE id = $1;
    `, [userId]);
    // if it doesn't exist, return null
    if (!user) return null;
    // if it does:
    // delete the 'password' key from the returned object
    delete user.password; 
    return user;  
  } catch (error) {
    throw error;
  }
}
module.exports = {
  createUser,
  getAllUsers,
  getUser,
  getUserById,
  getUserByUsername,
}