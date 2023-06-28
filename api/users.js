const express = require('express');
const usersRouter = express.Router();
const { createUser, getAllUsers, getUserByUsername, getUserById, updateUser, destroyUser } = require('../db/users');

const jwt = require('jsonwebtoken');

usersRouter.get('/', async (req, res, next) => {
  try {
    const users = await getAllUsers();
  
    res.send({ users });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

usersRouter.post('/login', async (req, res, next) => {
  const { username, password } = req.body;

  // request must have both
  if (!username || !password) {
    next({
      name: "MissingCredentialsError",
      message: "Please supply both a username and password"
    });
  }

  try {
    const user = await getUserByUsername(username);

    if (user && user.password == password) {
      const token = jwt.sign({ 
        id: user.id, 
        username
      }, process.env.JWT_SECRET, {
        expiresIn: '1w'
      });

      res.send({ 
        message: "you're logged in!",
        token 
      });
    } else {
      next({ 
        name: 'IncorrectCredentialsError', 
        message: 'Username or password is incorrect'
      });
    }
  } catch(error) {
    console.log(error);
    next(error);
  }
});

usersRouter.post('/register', async (req, res, next) => {
  const { name, username, password, email, avatar, location, website, favoriteBooks, aboutMe, isAdmin} = req.body;

  try {
    const _user = await getUserByUsername(username);
  
    if (_user) {
      next({
        name: 'UserExistsError',
        message: 'A user by that username already exists'
      });
    }

    const user = await createUser({name, username, password, email, avatar, location, website, favoriteBooks, aboutMe, isAdmin});

    const token = jwt.sign({ 
      id: user.id, 
      username
    }, process.env.JWT_SECRET, {
      expiresIn: '1w'
    });

    res.send({ 
      message: "thank you for signing up",
      token 
    });
  } catch ({ name, message }) {
    next({ name, message });
  } 
});

usersRouter.put("/:id", async (req, res) => {
  try {
    console.log(req.params.id)
    const userId = Number(req.params.id)
    const updatedData = req.body
    const NewlyUpdatedUser = await updateUser(userId, updatedData)
    res.send(NewlyUpdatedUser)
  } catch (error) {
    throw (error)
  }
});

usersRouter.delete("/:id", async (req, res, next) => {
  try {
    console.log(req.params.id)
    const deletedUser = await destroyUser(Number(req.params.id))
    res.send(deletedUser)
  } catch (error) {
    next (error)
  }
});

module.exports = usersRouter;