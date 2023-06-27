const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

router.get('/health', async (req, res, next)=>{
    try {
        console.log("API is healthy.")
        res.send('healthy')
        
    } catch (error) {
        next(error)
    }
})

//set req.user
router.use(async (req, res, next) => {
  const prefix = 'Bearer ';
  const auth = req.header('Authorization');
  
  if (!auth) { // nothing to see here
    next();
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);
    
    try {
      const parsedToken = jwt.verify(token, JWT_SECRET);
      
      const id = parsedToken && parsedToken.id
      if (id) {
        req.user = await getUserById(id);
        next();
      }
    } catch (error) {
      next(error);
    }
  } else {
    next({
      name: 'AuthorizationHeaderError',
      message: `Authorization token must start with ${ prefix }`
    });
  }
});

router.use((req, res, next) => {
  if (req.user) {
    console.log("User is set:", req.user);
  }
  next();
});


//ROUTER: /api/users
const usersRouter = require('./users');
router.use('/users', usersRouter);

//ROUTER: /api/reviews
const reviewsRouter = require('./reviews');
router.use('/reviews', reviewsRouter);

//ROUTER: /api/nonfiction-books
const nfBooksRouter = require('./nfBooks');
router.use('/nonfiction-books', nfBooksRouter);

//ROUTER: /api/fiction-books
const fictionBooks = require('./fictionBooks');
router.use('/fiction-books', fictionBooks);

//ROUTER: /api/graphic-books
const graphicBooks = require('./graphicBooks');
router.use('/graphic-books', graphicBooks);

//ROUTER: /api/book-club-picks
const bookClubBooks = require('./bookClubBooks');
router.use('/book-club-picks', bookClubBooks);

//ROUTER: /api/childrens-books
const childrensBooks = require('./childrensBooks');
router.use('/childrens-books', childrensBooks);

module.exports = router;