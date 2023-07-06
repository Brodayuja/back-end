const client = require("./index");
const { createUser, getAllUsers } = require("./users");
const { createNFBook, getAllNFBooks } = require("./nfBooks");
const { createFictionBook, getAllFictionBooks } = require("./fictionBooks")
const { createGraphicNovelBook, getAllGraphicNovelBooks } = require("./graphicBooks");
const { createBookClubPicksBook, getAllBookClubPicksBooks } = require("./bookClubBooks")
const { createChildrensBook, getAllChildrensBooks } = require("./childrensBooks")
const { createReview, getAllReviews } = require("./reviews");

async function dropTables() {
  console.log("Dropping Tables");
  try {
    await client.query(`
      DROP TABLE IF EXISTS reviews;
      DROP TABLE IF EXISTS "nfBooks";
      DROP TABLE IF EXISTS "fictionBooks";
      DROP TABLE IF EXISTS "graphicNovelsAndMangaBooks";
      DROP TABLE IF EXISTS "bookClubPicksBooks";
      DROP TABLE IF EXISTS "childrensBooks";
      DROP TABLE IF EXISTS users;
    `);
    console.log("Finished Dropping Tables.");
  } catch (error) {
    throw error;
  }
}


const createTables = async () => {
    try {
        await client.query(`
        CREATE TABLE "nfBooks" (
            id SERIAL PRIMARY KEY,
            isbn BIGINT NOT NULL UNIQUE,
            title VARCHAR(255) NOT NULL,
            author VARCHAR(255) NOT NULL,
            genre VARCHAR(255) NOT NULL,
            summary TEXT,
            publisher VARCHAR(500),
            "yearPublished" INT NOT NULL,
            "bookCover" VARCHAR(2083),
            "physicalDescription" VARCHAR(255)
        )`);
        await client.query(`
        CREATE TABLE "fictionBooks" (
            id SERIAL PRIMARY KEY,
            isbn BIGINT NOT NULL UNIQUE,
            title VARCHAR(255) NOT NULL,
            author VARCHAR(255) NOT NULL,
            genre VARCHAR(255) NOT NULL,
            summary TEXT,
            publisher VARCHAR(500),
            "yearPublished" INT NOT NULL,
            "bookCover" VARCHAR(2083),
            "physicalDescription" VARCHAR(255)
        )`);
        await client.query(`
        CREATE TABLE "graphicNovelsAndMangaBooks" (
            id SERIAL PRIMARY KEY,
            isbn BIGINT NOT NULL UNIQUE,
            title VARCHAR(255) NOT NULL,
            author VARCHAR(255) NOT NULL,
            artist VARCHAR(255),
            genre VARCHAR(255) NOT NULL,
            summary TEXT,
            publisher VARCHAR(500),
            "yearPublished" INT NOT NULL,
            "bookCover" VARCHAR(2083),
            "physicalDescription" VARCHAR(255)
        )`);
        await client.query(`
        CREATE TABLE "bookClubPicksBooks" (
            id SERIAL PRIMARY KEY,
            isbn BIGINT NOT NULL UNIQUE,
            title VARCHAR(255) NOT NULL,
            author VARCHAR(255) NOT NULL,
            genre VARCHAR(255) NOT NULL,
            summary TEXT,
            publisher VARCHAR(500),
            "yearPublished" INT NOT NULL,
            "bookCover" VARCHAR(2083),
            "physicalDescription" VARCHAR(255)
        )`);
        await client.query(`
        CREATE TABLE "childrensBooks" (
            id SERIAL PRIMARY KEY,
            isbn BIGINT NOT NULL UNIQUE,
            title VARCHAR(255) NOT NULL,
            author VARCHAR(255) NOT NULL,
            illustrator VARCHAR(255) NOT NULL,
            genre VARCHAR(255) NOT NULL,
            summary TEXT,
            publisher VARCHAR(500),
            "yearPublished" INT NOT NULL,
            "bookCover" VARCHAR(2083),
            audience VARCHAR(255),
            "physicalDescription" VARCHAR(255)
        )`);
        await client.query(`
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            username VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            avatar VARCHAR(2083),
            location VARCHAR(255),
            website VARCHAR(2083),
            "favoriteBooks" VARCHAR(255),
            "aboutMe" TEXT,
            is_admin BOOLEAN DEFAULT false,
            is_owner BOOLEAN DEFAULT false
        )`);
        await client.query(`
    
          CREATE TABLE reviews (
          id SERIAL PRIMARY KEY,
          content VARCHAR(1000) NOT NULL,
          score INT NOT NULL,
          user_id INT REFERENCES users(id),
          "nfBook_isbn" BIGINT REFERENCES "nfBooks"(isbn),
          "fictionBook_isbn" BIGINT REFERENCES "fictionBooks"(isbn),
          "graphicBook_isbn" BIGINT REFERENCES "graphicNovelsAndMangaBooks"(isbn),
          "bookClubBook_isbn" BIGINT REFERENCES "bookClubPicksBooks"(isbn),
          "childrensBook_isbn" BIGINT REFERENCES "childrensBooks"(isbn),
          "isInappropriate" BOOLEAN DEFAULT false,
          "isNotAccurate" BOOLEAN DEFAULT false,
          comment VARCHAR(1000)
        )`);
        await client.query(`
        CREATE TABLE reports (
          id SERIAL PRIMARY KEY,
          username VARCHAR(255) REFERENCES users(username),
          user_id INT REFERENCES users(user_id),
          user_name VARCHAR(255) users(name),
          user_email VARCHAR(255) REFERENCES user(email),
          content TEXT NOT NULL,
          "reviewContent" TEXT REFERENCES reviews(content),
          "nfBook_isbn" BIGINT REFERENCES reviews("nfBook_isbn"),
          "fictionBook_isbn" BIGINT REFERENCES reviews("fictionBook_isbn"),
          "graphicBook_isbn" BIGINT REFERENCES reviews("graphicBook_isbn"),
          "bookClubBook_isbn" BIGINT REFERENCES reviews("bookClubBook_isbn"),
          "childrensBook_isbn" BIGINT REFERENCES reviews("childrensBook_isbn"),
          inappropriate BOOLEAN REFERENCES reviews("isInappropriate"),
          not_accurate BOOLEAN REFERENCES reviews("isNotAccurate")
          )`);
        await client.query(`
        CREATE TABLE ownership(
          id SERIAL PRIMARY KEY,
          username VARCHAR(255) REFERENCES users(username),
          user_name VARCHAR(255) REFERENCES users(name),
          user_email VARCHAR(255) REFERENCES users(email),
          "nfBook_isbn" BIGINT REFERENCES reviews("nfBook_isbn"),
          "fictionBook_isbn" BIGINT REFERENCES reviews("fictionBook_isbn"),
          "graphicBook_isbn" BIGINT REFERENCES reviews("graphicBook_isbn"),
          "bookClubBook_isbn" BIGINT REFERENCES reviews("bookClubBook_isbn"),
          "childrensBook_isbn" BIGINT REFERENCES reviews("childrensBook_isbn"),
          "isOwner" BOOLEAN REFERENCES users(is_owner),
          content TEXT NOT NULL
        )`);
        console.log("Finished creating tables.")
    } catch (error) {
        console.log(error)
    }
}
async function createInitialUsers() {
    try {
        console.log("Starting to create initial users.")
        await createUser('Jane', 'testUser1', '12345678', 'testUser1@gmail.com', 'https://image.pngaaa.com/189/734189-middle.png', 'My Town, USA', 'www.loc.gov', 'Gone With the Wind', 'I love to share what I think about the books I read.', false);
        await createUser('John', 'testUser2', '12345678', 'testUser2@gmail.com', 'https://image.pngaaa.com/189/734189-middle.png', 'My Town, USA', 'www.loc.gov', 'Patriot Games', 'I am a book nerd!', false);
        await createUser('Johanna', 'testUser3', '12345678', 'testUser3@gmail.com', 'https://image.pngaaa.com/189/734189-middle.png', 'My Town, USA', 'www.loc.gov', 'How to Succeed', 'I am a life coach, yogi and speaker who is passionate about helping others get the most out of life.', false);

        const allUsers = await getAllUsers();
        console.log("allUsers:", allUsers);
        console.log("Finished creating initial users.");

    } catch (error) {
        throw(error)
    }
}

async function createInitialNFBooks() {
  try {
    console.log("Starting to create nonfiction books.");

    await createNFBook(9780393866704, "The Parrot and the Igloo: Climate and the Science of Denial", "David Lipsky", "Biographies", "A Goodreads Most Anticipated Book of 2023. A USA Today Must-Read Summer Book. A Next Big Idea Must-Read Book. A Library Journal What To Read In 2023 Book. The New York Times best-selling author explores how anti-science became so virulent in American life―through a history of climate denial and its consequences.", "W W Norton and Co, Inc", 2023, "https://coverart.oclc.org/ImageWebSvc/oclc/+-+2955661186_140.jpg?allowDefault=false&client=WorldcatOrgUI", "416 p.");
    
    await createNFBook (9780593242384, "Better Living Through Birding: Notes from a Black Man in the Natural World", "Christian Cooper", "Nonfiction", "Christian Cooper is a self-described Blerd (Black nerd), an avid comics fan, and an expert birder who devotes every spring to gazing upon the migratory birds that stop to rest in Central Park, just a subway ride away from where he lives in New York City. When birdwatching in the park one morning in May 2020, Cooper was engaged in the ritual that had been a part of his life since he was ten years old. But when a routine encounter with a dog-walker escalates age old racial tensions, Cooper's viral video of the incident would send shock waves through the nation. In Better Living Through Birding, Cooper tells the story of his extraordinary life leading up to the now-infamous encounter in Central Park and shows how a life spent looking up at the birds prepared him, in the most uncanny of ways, to be a gay, Black man in American today. From sharpened senses that work just as well in a protest as in a park, to what a bird like the Common Grackle can teach us about self-acceptance, Better Living Through Birding exults in the pleasures of a life lived in pursuit of the natural world and invites you to discover your own. Equal parts memoir, travelogue, and primer on the art of birding, this is Cooper's story of learning to claim and defend space for himself and others like him, from his days as a writer for Marvel Comics, where Cooper introduced the first gay storyline, to vivid and life-changing birding expeditions through Africa, Australia, the Americas and the Himalayas. Better Living Through Birding is Cooper's invitation into the wonderful world of birds, and what they can teach us about life, if only we would stop and listen.--Provided by publisher", "Random House", 2023, "https://coverart.oclc.org/ImageWebSvc/oclc/+-+4693611986_140.jpg?allowDefault=false&client=WorldcatOrgUI", "282 p."),
    
    await createNFBook(9780062316110, 'Sapiens: A Brief History of Humankind', 'Yuval Noah Harari', 'History', 'A thought-provoking exploration of the history of Homo sapiens and the impact of human activities on the world.', 'Vintage', 2014, 'https://coverart.oclc.org/ImageWebSvc/oclc/+-+325120954_140.jpg?allowDefault=false&client=WorldcatOrgUI', '443 p.'),
    
    await createNFBook(9780374533557, 'Thinking, Fast and Slow', 'Daniel Kahneman', 'Psychology', 'A renowned psychologist explores the two systems of thinking that drive our judgments and decisions.', 'Farrar, Straus and Giroux', 2011, 'https://coverart.oclc.org/ImageWebSvc/oclc/+-+344575152_140.jpg?allowDefault=false&client=WorldcatOrgUI', '499 p.'),
    
    await createNFBook(9781476708706, 'The Innovators: How a Group of Hackers, Geniuses, and Geeks Created the Digital Revolution', 'Walter Isaacson', 'Technology', 'A captivating account of the people and innovations that shaped the digital age.', 'Simon & Schuster', 2014, 'https://coverart.oclc.org/ImageWebSvc/oclc/+-+585765123_140.jpg?allowDefault=false&client=WorldcatOrgUI', '542 p.'),
    
    await createNFBook(9798374637441, 'The Emperor of All Maladies: A Biography of Cancer', 'Siddhartha Mukherjee', 'Medicine', 'A comprehensive history of cancer that explores its impact on society and the ongoing quest for a cure.', 'Scribner', 2011, 'https://coverart.oclc.org/ImageWebSvc/oclc/+-+701493284_140.jpg?allowDefault=false&client=WorldcatOrgUI', '571 p.'),
    
    await createNFBook(9780307352156, 'Quiet: The Power of Introverts in a World That Can\'t Stop Talking', 'Susan Cain', 'Psychology', 'An insightful examination of introversion and its often overlooked strengths in a society that values extroversion.', 'Penguin Books', 2013, 'https://coverart.oclc.org/ImageWebSvc/oclc/+-+461831041_140.jpg?allowDefault=false&client=WorldcatOrgUI', '352 p.'),
    
    await createNFBook(9780393354324, 'Guns, Germs, and Steel: The Fates of Human Societies', 'Jared Diamond', 'Anthropology', 'A groundbreaking study of how geography and environmental factors shaped the course of human history.', 'W. W. Norton & Company', 1998, 'https://coverart.oclc.org/ImageWebSvc/oclc/+-+8030891966_140.jpg?allowDefault=false&client=WorldcatOrgUI', '496 p.'),
    
    await createNFBook(9780061234002, 'Freakonomics: A Rogue Economist Explores the Hidden Side of Everything', 'Steven D. Levitt, Stephen J. Dubner', 'Economics', 'An unconventional look at everyday life and the surprising connections between seemingly unrelated phenomena.', 'William Morrow Paperbacks', 2006, 'https://coverart.oclc.org/ImageWebSvc/oclc/+-+6124245066_140.jpg?allowDefault=false&client=WorldcatOrgUI', '315 p.'),
    
    await createNFBook(9780316010665, 'Blink: The Power of Thinking Without Thinking', 'Malcolm Gladwell', 'Psychology', 'Examines the power of intuition and rapid cognition in decision-making processes.', 'Back Bay Books', 2007, 'https://coverart.oclc.org/ImageWebSvc/oclc/+-+68742100_140.jpg?allowDefault=false&client=WorldcatOrgUI', '320 p.'),
    
    await createNFBook(9781476733524, 'The Gene: An Intimate History', 'Siddhartha Mukherjee', 'Science', 'A comprehensive exploration of genetics and the impact of genes on our lives.', 'Scribner', 2016, 'https://coverart.oclc.org/ImageWebSvc/oclc/+-+929117074_140.jpg?allowDefault=false&client=WorldcatOrgUI', '608 p.'),
    
    await createNFBook(9780553380163, 'A Brief History of Time', 'Stephen Hawking', 'Science', 'An accessible overview of cosmology and the nature of the universe.', 'Bantam', 1998, 'https://coverart.oclc.org/ImageWebSvc/oclc/+-+875575858_140.jpg?allowDefault=false&client=WorldcatOrgUI', '256 p.'),
    
    await createNFBook(9780066620992, 'Good to Great: Why Some Companies Make the Leap... and Others Don\'t', 'Jim Collins', 'Business', 'Identifies the factors that enable some companies to achieve sustained success.', 'HarperBusiness', 2001, 'https://coverart.oclc.org/ImageWebSvc/oclc/+-+10008319_140.jpg?allowDefault=false&client=WorldcatOrgUI', '400 p.'),
    
    await createNFBook(9780143117001, 'Collapse: How Societies Choose to Fail or Succeed', 'Jared Diamond', 'History', 'Explores the reasons why some societies have collapsed throughout history.', 'Penguin Books', 2005, 'https://coverart.oclc.org/ImageWebSvc/oclc/+-+993509844_140.jpg?allowDefault=false&client=WorldcatOrgUI', '608 p.'),
    
    await createNFBook(9781400063512, 'The Black Swan: The Impact of the Highly Improbable', 'Nassim Nicholas Taleb', 'Statistics', 'Explores the role of rare and unpredictable events in shaping our world.', 'Random House', 2007, 'https://coverart.oclc.org/ImageWebSvc/oclc/+-+52988362_140.jpg?allowDefault=false&client=WorldcatOrgUI', '444 p.'),
    
    await createNFBook(9780393609394, 'Astrophysics for People in a Hurry', 'Neil deGrasse Tyson', 'Science', 'Provides a concise and accessible introduction to the fundamental concepts of astrophysics.', 'W. W. Norton & Company', 2017, 'https://coverart.oclc.org/ImageWebSvc/oclc/+-+906533404_140.jpg?allowDefault=false&client=WorldcatOrgUI', '222 p.'),
    
    await createNFBook(9780063051331, 'Sapiens: A Graphic History: The Birth of Humankind', 'Yuval Noah Harari, David Vandermeulen, Daniel Casanave', 'History', 'A graphic adaptation of "Sapiens" that explores the history of Homo sapiens in an engaging format.', 'HarperVia', 2021, 'https://coverart.oclc.org/ImageWebSvc/oclc/+-+5981172966_140.jpg?allowDefault=false&client=WorldcatOrgUI', '528 p.'),
    
    await createNFBook(9780316346627, 'The Tipping Point: How Little Things Can Make a Big Difference', 'Malcolm Gladwell', 'Psychology', 'Explores the factors that contribute to social epidemics and the "tipping point" at which they occur.', 'Back Bay Books', 2002, 'https://coverart.oclc.org/ImageWebSvc/oclc/+-+72413000_140.jpg?allowDefault=false&client=WorldcatOrgUI', '301 p.'),
    
    await createNFBook(9780061792809, 'Freakonomics Rev Ed: A Rogue Economist Explores the Hidden Side of Everything', 'Steven D. Levitt, Stephen J. Dubner', 'Economics', 'An updated edition of "Freakonomics" that delves into the hidden side of various social and economic phenomena.', 'William Morrow Paperbacks', 2006, 'https://coverart.oclc.org/ImageWebSvc/oclc/+-+6124245066_140.jpg?allowDefault=false&client=WorldcatOrgUI', '336 p.'),
    
    await createNFBook(9780739461624, 'The World Is Flat: A Brief History of the Twenty-first Century', 'Thomas L. Friedman', 'Business', 'Examines globalization and its impact on the world economy and society.', 'Picador', 2007, 'https://coverart.oclc.org/ImageWebSvc/oclc/+-+129460653_140.jpg?allowDefault=false&client=WorldcatOrgUI', '660 p.'),
    
    await createNFBook(9780143038580, 'The Omnivore\'s Dilemma: A Natural History of Four Meals', 'Michael Pollan', 'Food', 'Explores the complex relationships between food, agriculture, and the environment.', 'Penguin Books', 2007, 'https://coverart.oclc.org/ImageWebSvc/oclc/+-+48154771_140.jpg?allowDefault=false&client=WorldcatOrgUI', '464 p.')
    

    const allCreatedNFBooks = await getAllNFBooks();
    console.log("All NF Books: ", allCreatedNFBooks);
    console.log("Finished creating initial nonfiction books.");
  } catch (error) {
    throw error;
  }
}

async function createInitialFictionBooks() {
  try {
    console.log("Starting to create fiction books.");

    await createFictionBook(9781728270258, "Dead of Winter", "Darcy Coates", "Thriller", "From bestselling author Darcy Coates comes Dead of Winter, a remote cabin in the snowy wilderness thriller that will teach you to trust no one. There are eight strangers. One killer. Nowhere left to run. When Christa joins a tour group heading deep into the snowy expanse of the Rocky Mountains, she's hopeful this will be her chance to put the ghosts of her past to rest. But when a bitterly cold snowstorm sweeps the region, the small group is forced to take shelter in an abandoned hunting cabin. Despite the uncomfortably claustrophobic quarters and rapidly dropping temperature, Christa believes they'll be safe as they wait out the storm. She couldn't be more wrong. Deep in the night, their tour guide goes missing...only to be discovered the following morning, his severed head impaled on a tree outside the cabin. Terrified, and completely isolated by the storm, Christa finds herself trapped with eight total strangers. One of them kills for sport...and they're far from finished. As the storm grows more dangerous and the number of survivors dwindles one by one, Christa must decide who she can trust before this frozen mountain becomes her tomb. Don't have enough scary books on your shelves?-- Provided by publisher", "Poisoned Pen Press", 2023, "https://coverart.oclc.org/ImageWebSvc/oclc/+-+8922931986_140.jpg?allowDefault=false&client=WorldcatOrgUI", "352 p.");
    
    await createFictionBook (9781982173432, "The True Love Experiment", "Christina Lauren", "Romance", "Felicity 'Fizzy' Chen is lost. Sure, she's got an incredible career as a beloved romance novelist with a slew of bestsellers under her belt, but when she's asked to give a commencement address, it hits her: she hasn't been practicing what she's preached. Fizzy hasn't ever really been in love. Lust? Definitely. But that swoon-worthy, can't-stop-thinking-about-him, all-encompassing feeling? Nope. Nothing. What happens when the optimism she's spent her career encouraging in readers starts to feel like a lie? Connor Prince, documentary filmmaker and single father, loves his work in large part because it allows him to live near his daughter. But when his profit-minded boss orders him to create a reality TV show, putting his job on the line, Connor is out of his element. Desperate to find his romantic lead, a chance run-in with an exasperated Fizzy offers Connor the perfect solution. What if he could show the queen of romance herself falling head-over-heels for all the world to see? Fizzy gives him a hard pass--unless he agrees to her list of demands. When he says yes, and production on The True Love Experiment begins, Connor wonders if that perfect match will ever be in the cue cards for him, too.", "Gallery Books", 2023, "https://coverart.oclc.org/ImageWebSvc/oclc/+-+1472670986_140.jpg?allowDefault=false&client=WorldcatOrgUI", "409 p."),
    
    await createFictionBook(9780451524935, '1984', 'George Orwell', 'Dystopian', 'A classic dystopian novel depicting a totalitarian society and the struggle of an individual against the oppressive regime.', 'Signet Classics', 1949, 'https://coverart.oclc.org/ImageWebSvc/oclc/+-+4080960476_140.jpg?allowDefault=false&client=WorldcatOrgUI', '328 p.'),
    
    await createFictionBook(9780060935467, 'To Kill a Mockingbird', 'Harper Lee', 'Classics', 'Set in the 1930s, this novel explores racial injustice and morality through the eyes of a young girl in a small Southern town.', 'Harper Perennial Modern Classics', 1960, 'https://coverart.oclc.org/ImageWebSvc/oclc/+-+0219589986_140.jpg?allowDefault=false&client=WorldcatOrgUI', '336 p.'),
    
    await createFictionBook(9798351145013, 'The Great Gatsby', 'F. Scott Fitzgerald', 'Classics', 'A tragic tale set in the roaring twenties, examining themes of wealth, love, and the American Dream.', 'Scribner', 1925, 'https://coverart.oclc.org/ImageWebSvc/oclc/+-+5571227766_140.jpg?allowDefault=false&client=WorldcatOrgUI', '180 p.'),
    
    await createFictionBook(9780141439518, 'Pride and Prejudice', 'Jane Austen', 'Classics', 'Follows the story of Elizabeth Bennet and her tumultuous relationship with the proud Mr. Darcy in Regency England.', 'Penguin Classics', 1813, 'https://coverart.oclc.org/ImageWebSvc/oclc/+-+8481227766_140.jpg?allowDefault=false&client=WorldcatOrgUI', '480 p.'),
    
    await createFictionBook(9780316769174, 'The Catcher in the Rye', 'J.D. Salinger', 'Classics', 'A coming-of-age novel narrated by Holden Caulfield, a disenchanted teenager navigating the complexities of adolescence and society.', 'Little, Brown and Company', 1951, 'https://coverart.oclc.org/ImageWebSvc/oclc/+-+6229051766_140.jpg?allowDefault=false&client=WorldcatOrgUI', '224 p.'),
    
    await createFictionBook(9780547928227, 'The Hobbit', 'J.R.R. Tolkien', 'Fantasy', 'Chronicles the adventures of Bilbo Baggins as he embarks on a quest to reclaim a treasure guarded by a dragon.', 'HarperCollins', 1937, 'https://coverart.oclc.org/ImageWebSvc/oclc/+-+4594778876_140.jpg?allowDefault=false&client=WorldcatOrgUI', '320 p.'),
    
    await createFictionBook(9780545790352, 'Harry Potter and the Sorcerer\'s Stone', 'J.K. Rowling', 'Fantasy', 'Introduces the magical world of Harry Potter, a young wizard who discovers his true identity and battles the dark forces threatening the wizarding community.', 'Scholastic', 1997, 'https://coverart.oclc.org/ImageWebSvc/oclc/+-+46202428_140.jpg?allowDefault=false&client=WorldcatOrgUI', '336 p.'),
   
    await createFictionBook(9780060883287, 'One Hundred Years of Solitude', 'Gabriel Garcia Marquez', 'Magical Realism', 'Tells the multi-generational story of the Buendia family in the fictional town of Macondo.', 'Harper Perennial Modern Classics', 1967, 'https://coverart.oclc.org/ImageWebSvc/oclc/+-+310425491_140.jpg?allowDefault=false&client=WorldcatOrgUI', '417 p.'),
   
    await createFictionBook(9780547928210, 'The Lord of the Rings: The Fellowship of the Ring', 'J.R.R. Tolkien', 'Fantasy', 'Follows the quest of a group of characters, including Frodo Baggins, to destroy the powerful One Ring and save Middle-earth.', 'HarperCollins', 1954, 'https://coverart.oclc.org/ImageWebSvc/oclc/+-+4541872986_140.jpg?allowDefault=false&client=WorldcatOrgUI', '432 p.'),
    
    await createFictionBook(9780064471046, 'The Chronicles of Narnia: The Lion, the Witch and the Wardrobe', 'C.S. Lewis', 'Fantasy', 'The first book in the beloved fantasy series, where four siblings enter the magical world of Narnia through a wardrobe and embark on a mission to defeat the White Witch.', 'HarperCollins', 1950, 'https://coverart.oclc.org/ImageWebSvc/oclc/+-+201715743_140.jpg?allowDefault=false&client=WorldcatOrgUI', '206 p.'),
    
    await createFictionBook(9781594631931, 'The Kite Runner', 'Khaled Hosseini', 'Contemporary Fiction', 'Set in Afghanistan, this novel explores themes of friendship, betrayal, and redemption against the backdrop of a changing country.', 'Riverhead Books', 2003, 'https://coverart.oclc.org/ImageWebSvc/oclc/+-+895475532_140.jpg?allowDefault=false&client=WorldcatOrgUI', '371 p.'),
   
    await createFictionBook(9780060850524, 'Brave New World', 'Aldous Huxley', 'Dystopian', 'Depicts a futuristic society where genetic engineering, consumerism, and social control are prevalent.', 'Harper Perennial Modern Classics', 1932, 'https://coverart.oclc.org/ImageWebSvc/oclc/+-+1430779686_140.jpg?allowDefault=false&client=WorldcatOrgUI', '288 p.'),
   
    await createFictionBook(9780307387899, 'The Road', 'Cormac McCarthy', 'Post-Apocalyptic', 'Follows a father and his young son as they journey across a desolate landscape in a post-apocalyptic world.', 'Vintage Books', 2006, 'https://coverart.oclc.org/ImageWebSvc/oclc/+-+8485327886_140.jpg?allowDefault=false&client=WorldcatOrgUI', '241 p.'),
   
    await createFictionBook(9780274808328, 'The Da Vinci Code', 'Dan Brown', 'Thriller', 'A fast-paced thriller that combines art, religion, and secret societies as a symbologist races to uncover a hidden secret.', 'Anchor', 2003, 'https://coverart.oclc.org/ImageWebSvc/oclc/+-+481982394_140.jpg?allowDefault=false&client=WorldcatOrgUI', '489 p.'),
   
    await createFictionBook(9780345803788, 'Crazy Rich Asians', 'Kevin Kwan', 'Contemporary Fiction', 'Explores the lives of wealthy Chinese families in Singapore and the clash between old money and new money.', 'Anchor', 2013, 'https://coverart.oclc.org/ImageWebSvc/oclc/+-+1727109966_140.jpg?allowDefault=false&client=WorldcatOrgUI', '527 p.'),
  
    await createFictionBook(9780141439570, 'The Picture of Dorian Gray', 'Oscar Wilde', 'Classics', 'A philosophical novel that tells the story of a young man who remains eternally youthful while a portrait of him ages and reflects his moral corruption.', 'Penguin Classics', 1890, 'https://coverart.oclc.org/ImageWebSvc/oclc/+-+300521212_140.jpg?allowDefault=false&client=WorldcatOrgUI', '176 p.'),
   
    await createFictionBook(9780142001745, 'The Secret Life of Bees', 'Sue Monk Kidd', 'Historical Fiction', 'Set in 1960s South Carolina, this novel follows a young girl who escapes her troubled life and finds solace in the company of beekeeping sisters.', 'Penguin Books', 2002, 'https://coverart.oclc.org/ImageWebSvc/oclc/+-+6598879366_140.jpg?allowDefault=false&client=WorldcatOrgUI', '336 p.'),
   
    await createFictionBook(9780307588371, 'Gone Girl', 'Gillian Flynn', 'Mystery, Thriller', 'A gripping psychological thriller that explores the disappearance of a woman and the twists and turns of her marriage.', 'Broadway Books', 2012, 'https://coverart.oclc.org/ImageWebSvc/oclc/+-+5651389986_140.jpg?allowDefault=false&client=WorldcatOrgUI', '560 p.'),
   
    await createFictionBook(9780425232200, 'The Help', 'Kathryn Stockett', 'Historical Fiction', 'Set in 1960s Mississippi, this novel tells the story of African American maids working in white households and their courage to speak up.', 'Berkley', 2009, 'https://coverart.oclc.org/ImageWebSvc/oclc/+-+024154080_140.jpg?allowDefault=false&client=WorldcatOrgUI', '544 p.'),
   
    await createFictionBook(9780307949486, 'The Girl with the Dragon Tattoo', 'Stieg Larsson', 'Mystery, Thriller', 'Introduces the complex character Lisbeth Salander, a hacker and investigator, as she teams up with a journalist to solve a decades-old disappearance.', 'Vintage Crime/Black Lizard', 2005, 'https://coverart.oclc.org/ImageWebSvc/oclc/+-+642394063_140.jpg?allowDefault=false&client=WorldcatOrgUI', '672 p.')

    const allCreatedFictionBooks = await getAllFictionBooks();
    console.log("All Fiction Books: ", allCreatedFictionBooks);
    console.log("Finished creating initial fiction books.");
  } catch (error) {
    throw error;
  }
}

async function createInitialGraphicNovelBooks() {
  try {
    console.log("Starting to create graphic novel and manga books.");

    await createGraphicNovelBook(9781974732173, "One Piece Vol. 100", "Eiichiro Oda", "Eiichiro Oda", "Manga", "Join Monkey D. Luffy and his swashbuckling crew in their search for the ultimate treasure, One Piece!", "Viz Media", 2022, "https://coverart.oclc.org/ImageWebSvc/oclc/+-+6309678986_140.jpg?allowDefault=false&client=WorldcatOrgUI", "single volume")
    
    await createGraphicNovelBook (9781779501127, "Watchmen", "Alan Moore", "Dave Gibbons", "Graphic Novel", "Considered the greatest graphic novel in the history of the medium, the Hugo Award-winning story chronicles the fall from grace of a group of superheroes plagued by all-too-human failings. Along the way, the concept of the superhero is dissected as an unknown assassin stalks the erstwhile heroes.--Publisher", "DC Comics", 2019, "https://coverart.oclc.org/ImageWebSvc/oclc/+-+3280506566_140.jpg?allowDefault=false&client=WorldcatOrgUI", "414 pages, 34 unnumbered pages : chiefly illustrations (chiefly color) ; 26 cm"),
    
    await createGraphicNovelBook(9781401294052, 'Batman: The Killing Joke', 'Alan Moore', 'Brian Bolland', 'Superhero', 'An iconic Batman story that delves into the relationship between the Dark Knight and his archnemesis, the Joker.', 'DC Comics', 1988, 'https://coverart.oclc.org/ImageWebSvc/oclc/+-+1123039566_140.jpg?allowDefault=false&client=WorldcatOrgUI', '64 p.'),
    
    await createGraphicNovelBook(9781401270667, 'Preacher: Book One', 'Garth Ennis', 'Steve Dillon', 'Action, Supernatural', 'Follows the journey of Jesse Custer, a disillusioned preacher with extraordinary powers, as he searches for God.', 'Vertigo', 1996, 'https://coverart.oclc.org/ImageWebSvc/oclc/+-+416876173_140.jpg?allowDefault=false&client=WorldcatOrgUI', '352 p.'),
    
    await createGraphicNovelBook(9781779511195, 'V for Vendetta', 'Alan Moore', 'David Lloyd', 'Dystopian, Political', 'Set in a totalitarian future, this graphic novel tells the story of V, a freedom fighter who aims to bring down the oppressive regime.', 'DC Comics', 1990, 'https://coverart.oclc.org/ImageWebSvc/oclc/+-+29238871_140.jpg?allowDefault=false&client=WorldcatOrgUI', '296 p.'),
    
    await createGraphicNovelBook(9780785190210, 'The Infinity Gauntlet', 'Jim Starlin', 'George Perez, Ron Lim', 'Superhero', 'Thanos wields the power of the Infinity Gems and sets out to reshape the universe in this epic Marvel story.', 'Marvel Comics', 1992, 'https://coverart.oclc.org/ImageWebSvc/oclc/+-+5328957066_140.jpg?allowDefault=false&client=WorldcatOrgUI', '256 p.'),
    
    await createGraphicNovelBook(9781401284770, 'Sandman: Preludes & Nocturnes', 'Neil Gaiman', 'Sam Kieth, Mike Dringenberg', 'Fantasy, Horror', 'Follows the journey of Dream, also known as Morpheus, the Lord of Dreams, as he seeks to reclaim his lost powers.', 'Vertigo', 1991, 'https://coverart.oclc.org/ImageWebSvc/oclc/+-+33016869_140.jpg?allowDefault=false&client=WorldcatOrgUI', '240 p.'),
   
    await createGraphicNovelBook(9781563899805, 'Y: The Last Man - Unmanned', 'Brian K. Vaughan', 'Pia Guerra', 'Post-Apocalyptic, Adventure', 'The lone male survivor of a global pandemic navigates a world inhabited only by women.', 'Vertigo', 2003, 'https://coverart.oclc.org/ImageWebSvc/oclc/+-+6652146966_140.jpg?allowDefault=false&client=WorldcatOrgUI', '128 p.'),
    
    await createGraphicNovelBook(9781593070946, 'Hellboy: Seed of Destruction', 'Mike Mignola', 'Mike Mignola', 'Supernatural, Horror', 'Introduces the paranormal investigator Hellboy as he battles supernatural threats and investigates his own origins.', 'Dark Horse Comics', 1994, 'https://coverart.oclc.org/ImageWebSvc/oclc/+-+5378177566_140.jpg?allowDefault=false&client=WorldcatOrgUI', '128 p.'),
   
    await createGraphicNovelBook(9781607066019, 'Saga: Volume 1', 'Brian K. Vaughan', 'Fiona Staples', 'Science Fiction, Fantasy', 'Follows the forbidden love story of Alana and Marko, from warring alien species, as they navigate a dangerous galaxy.', 'Image Comics', 2012, 'https://coverart.oclc.org/ImageWebSvc/oclc/+-+1904000576_140.jpg?allowDefault=false&client=WorldcatOrgUI', '160 p.'),
   
    await createGraphicNovelBook(9781506711980, 'Berserk Deluxe Volume 1', 'Kentaro Miura', 'Kentaro Miura', 'Dark Fantasy, Action', 'A lone mercenary named Guts battles supernatural creatures in a medieval-inspired world filled with violence and intrigue.', 'Dark Horse Manga', 2019, 'https://coverart.oclc.org/ImageWebSvc/oclc/+-+1898489356_140.jpg?allowDefault=false&client=WorldcatOrgUI', '696 p.'),
   
    await createGraphicNovelBook(9781421585116, 'My Hero Academia: Volume 1', 'Kohei Horikoshi', 'Kohei Horikoshi', 'Superhero, Action', 'Follows the story of Izuku Midoriya, a young boy without superpowers in a world where almost everyone has them, as he strives to become a hero.', 'VIZ Media LLC', 2014, 'https://coverart.oclc.org/ImageWebSvc/oclc/+-+4271590176_140.jpg?allowDefault=false&client=WorldcatOrgUI', '192 p.'),
    
    await createGraphicNovelBook(9781421585642, 'One-Punch Man: Volume 1', 'ONE', 'Yusuke Murata', 'Superhero, Comedy', 'Depicts the story of Saitama, a seemingly invincible hero who defeats any opponent with a single punch.', 'VIZ Media LLC', 2014, 'https://coverart.oclc.org/ImageWebSvc/oclc/+-+8415270786_140.jpg?allowDefault=false&client=WorldcatOrgUI', '216 p.'),
   
    await createGraphicNovelBook(9781421597126, 'The Promised Neverland: Volume 1', 'Kaiu Shirai', 'Posuka Demizu', 'Mystery, Thriller', 'Follows a group of orphans living in an idyllic orphanage who uncover a dark secret about their existence.', 'VIZ Media LLC', 2017, 'https://coverart.oclc.org/ImageWebSvc/oclc/+-+4680628556_140.jpg?allowDefault=false&client=WorldcatOrgUI', '192 p.'),
   
    await createGraphicNovelBook(9781421543659, 'Death Note: Volume 1', 'Tsugumi Ohba', 'Takeshi Obata', 'Psychological, Supernatural', 'Features a high school student who gains the power to kill anyone by writing their name in a supernatural notebook.', 'VIZ Media LLC', 2005, 'https://coverart.oclc.org/ImageWebSvc/oclc/+-+859115312_140.jpg?allowDefault=false&client=WorldcatOrgUI', '200 p.'),
   
    await createGraphicNovelBook(9781612620244, 'Attack on Titan: Volume 1', 'Hajime Isayama', 'Hajime Isayama', 'Action, Horror', 'Takes place in a world where humanity is on the brink of extinction due to giant humanoid creatures known as Titans.', 'Kodansha Comics', 2012, 'https://coverart.oclc.org/ImageWebSvc/oclc/+-+538974334_140.jpg?allowDefault=false&client=WorldcatOrgUI', '200 p.'),
    
    await createGraphicNovelBook(9781974700523, 'Demon Slayer: Kimetsu no Yaiba, Vol. 1', 'Koyoharu Gotouge', 'Koyoharu Gotouge', 'Action, Fantasy', 'Follows the journey of Tanjiro Kamado, a young demon slayer, as he seeks to avenge his family and cure his sister.', 'VIZ Media LLC', 2016, 'https://coverart.oclc.org/ImageWebSvc/oclc/+-+9850620956_140.jpg?allowDefault=false&client=WorldcatOrgUI', '192 p.'),
   
    await createGraphicNovelBook(9781421594965, 'Tokyo Ghoul: Volume 1', 'Sui Ishida', 'Sui Ishida', 'Horror, Supernatural', 'Takes place in a world where flesh-eating ghouls live among humans and follows the story of a college student who becomes a half-ghoul.', 'VIZ Media LLC', 2014, 'https://coverart.oclc.org/ImageWebSvc/oclc/+-+043491734_140.jpg?allowDefault=false&client=WorldcatOrgUI', '224 p.'),
   
    await createGraphicNovelBook(9781974701599, 'My Hero Academia: Vigilantes, Vol. 1', 'Hideyuki Furuhashi', 'Betten Court', 'Superhero, Action', 'Set in the same universe as "My Hero Academia," it follows a group of individuals who fight crime without official hero licenses.', 'VIZ Media LLC', 2016, 'https://coverart.oclc.org/ImageWebSvc/oclc/+-+4812463456_140.jpg?allowDefault=false&client=WorldcatOrgUI', '216 p.'),
   
    await createGraphicNovelBook(9781421587660, 'Haikyu!!: Volume 1', 'Haruichi Furudate', 'Haruichi Furudate', 'Sports, Drama', 'Revolves around the journey of a high school volleyball team aiming to compete at the national level.', 'VIZ Media LLC', 2014, 'https://coverart.oclc.org/ImageWebSvc/oclc/+-+3513185556_140.jpg?allowDefault=false&client=WorldcatOrgUI', '200 p.'),
   
    await createGraphicNovelBook(9781974708888, 'The Promised Neverland: Gilded Youth', 'Kaiu Shirai', 'Posuka Demizu', 'Mystery, Thriller', 'A side story that delves into the lives of Norman and Emma before their escape from the orphanage.', 'VIZ Media LLC', 2019, 'https://coverart.oclc.org/ImageWebSvc/oclc/+-+7877848656_140.jpg?allowDefault=false&client=WorldcatOrgUI', '208 p.')

    const allCreatedGraphicNovelBooks = await getAllGraphicNovelBooks();
    console.log("All Graphic Novel and Manga Books: ", allCreatedGraphicNovelBooks);
    console.log("Finished creating initial graphic novel and manga books.");
  } catch (error) {
    throw error;
  }
}
async function createInitialBookClubBooks() {
  try {
    console.log("Starting to create book club picks books.");

    await createBookClubPicksBook (9781501117299, "Hang the Moon", "Jeannette Walls", "Historical Fiction", "Most folk thought Sallie Kincaid was a nobody who'd amount to nothing. Sallie had other plans. Sallie Kincaid is the daughter of the biggest man in a small town, the charismatic Duke Kincaid. Born at the turn of the 20th century into a life of comfort and privilege, Sallie remembers little about her mother who died in a violent argument with the Duke. By the time she is just eight years old, the Duke has remarried and had a son, Eddie. While Sallie is her father's daughter, sharp-witted and resourceful, Eddie is his mother's son, timid and cerebral. When Sallie tries to teach young Eddie to be more like their father, her daredevil coaching leads to an accident, and Sallie is cast out. Nine years later, she returns, determined to reclaim her place in the family. That's a lot more complicated than Sallie expected, and she enters a world of conflict and lawlessness. Sallie confronts the secrets and scandals that hide in the shadows of the Big House, navigates the factions in the family and town, and finally comes into her own as a bold, sometimes reckless bootlegger-- Provided by publisher", "Scribner", 2023, "https://coverart.oclc.org/ImageWebSvc/oclc/+-+0942297086_140.jpg?allowDefault=false&client=WorldcatOrgUI", "349 p.")
    
    await createBookClubPicksBook (9780593321447, "Sea of Tranquility", "Emily St. John Mandel", "Science Fiction/Fantasy", "The award-winning, best-selling author of 'Station Eleven' and 'The glass hotel' returns with a novel of art, time, love, and plague that takes the reader from an island off Vancouver in 1912 to a dark colony of the moon three hundred years later, unfurling a story of humanity across centuries and planets. Edwin St. Andrew is eighteen years old when he crosses the Atlantic by steamship, exiled from polite society following an ill-conceived diatribe at a dinner party. He enters the forest, spellbound by the beauty of the Canadian wilderness, and suddenly hears the notes of a violin echoing in an airship terminal--an experience that shocks him to his core. Two centuries later a famous writer named Olive Llewellyn is on a book tour. She's traveling all over Earth, but her home is the second moon colony, a place of white stone, spired towers, and artificial beauty. Within the text of Olive's best-selling pandemic novel lies a strange passage: a man plays his violin for change in the echoing corridor of an airship terminal as the trees of a forest rise around him. When Gaspery-Jacques Roberts, a detective in the black-skied Night City, is hired to investigate an anomaly in the North American wilderness, he uncovers a series of lives upended: the exiled son of an earl driven to madness, a writer trapped far from home as a pandemic ravages Earth, and a childhood friend from the Night City who, like Gaspery himself, has glimpsed the chance to do something extraordinary that will disrupt the time line of the universe.-- Provided by publisher", "Alfred A. Knopf", 2022, "https://coverart.oclc.org/ImageWebSvc/oclc/+-+8194826076_140.jpg?allowDefault=false&client=WorldcatOrgUI", "255 p."),

    await createBookClubPicksBook(9780375842207, 'The Book Thief', 'Markus Zusak', 'Historical Fiction', 'Narrated by Death, this novel follows a young girl named Liesel Meminger in Nazi Germany as she steals books and learns the power of words.', 'Alfred A. Knopf', 2005, 'https://coverart.oclc.org/ImageWebSvc/oclc/+-+1668745376_140.jpg?allowDefault=false&client=WorldcatOrgUI', '552 p.'),
    
    await createBookClubPicksBook(9780062315007, 'The Alchemist', 'Paulo Coelho', 'Fiction', 'Follows the journey of a young shepherd named Santiago as he travels across the desert in search of a hidden treasure and discovers the importance of following one\'s dreams.', 'HarperOne', 1988, 'https://coverart.oclc.org/ImageWebSvc/oclc/+-+918551201_140.jpg?allowDefault=false&client=WorldcatOrgUI', '208 p.'),
    
    await createBookClubPicksBook(9780399590528, 'Educated', 'Tara Westover', 'Memoir', 'Memoir of Tara Westover\'s journey from growing up in a strict and abusive household in rural Idaho to eventually earning a PhD from Cambridge University.', 'Random House', 2018, 'https://coverart.oclc.org/ImageWebSvc/oclc/+-+9425586166_140.jpg?allowDefault=false&client=WorldcatOrgUI', '334 p.'),
    
    await createBookClubPicksBook(9780345804327, 'The Underground Railroad', 'Colson Whitehead', 'Historical Fiction', 'Reimagines the Underground Railroad as a literal underground railway system as Cora, a young slave, escapes from a Georgia plantation and seeks freedom.', 'Doubleday', 2016, 'https://coverart.oclc.org/ImageWebSvc/oclc/+-+7028837386_140.jpg?allowDefault=false&client=WorldcatOrgUI', '306 p.'),
    
    await createBookClubPicksBook(9781400032716, 'The Curious Incident of the Dog in the Night-Time', 'Mark Haddon', 'Mystery', 'Narrated by an autistic teenager named Christopher, this novel follows his investigation into the death of a neighborhood dog and his journey of self-discovery.', 'Vintage Contemporaries', 2003, 'https://coverart.oclc.org/ImageWebSvc/oclc/+-+1108254176_140.jpg?allowDefault=false&client=WorldcatOrgUI', '240 p.'),
        
    await createBookClubPicksBook(9781400052189, 'The Immortal Life of Henrietta Lacks', 'Rebecca Skloot', 'Non-fiction', 'Explores the story of Henrietta Lacks, an African American woman whose cells were unknowingly used for medical research and became instrumental in numerous scientific breakthroughs.', 'Broadway Books', 2010, 'https://coverart.oclc.org/ImageWebSvc/oclc/+-+578095732_140.jpg?allowDefault=false&client=WorldcatOrgUI', '381 p.'),
    
    await createBookClubPicksBook(9780553381689, 'A Game of Thrones', 'George R.R. Martin', 'Fantasy', 'The first book in the epic fantasy series "A Song of Ice and Fire," it introduces a complex world of political intrigue, power struggles, and battles for the Iron Throne.', 'Bantam', 1996, 'https://coverart.oclc.org/ImageWebSvc/oclc/+-+493937544_140.jpg?allowDefault=false&client=WorldcatOrgUI', '694 p.'),
    
    await createBookClubPicksBook(9780553418026, 'The Martian', 'Andy Weir', 'Science Fiction', 'Tells the story of astronaut Mark Watney, who is stranded on Mars and must rely on his ingenuity to survive while awaiting rescue.', 'Broadway Books', 2014, 'https://coverart.oclc.org/ImageWebSvc/oclc/+-+3072325466_140.jpg?allowDefault=false&client=WorldcatOrgUI', '369 p.'),
    
    await createBookClubPicksBook(9780425274866, 'Big Little Lies', 'Liane Moriarty', 'Mystery', 'Set in a small coastal town, this novel explores the lives of three women whose seemingly perfect lives unravel in the midst of a shocking murder.', 'Berkley', 2014, 'https://coverart.oclc.org/ImageWebSvc/oclc/+-+3824427386_140.jpg?allowDefault=false&client=WorldcatOrgUI', '460 p.'),
    
    await createBookClubPicksBook(9781250080400, 'The Nightingale', 'Kristin Hannah', 'Historical Fiction', 'Set in France during World War II, it follows the lives of two sisters and their experiences of love, sacrifice, and survival.', 'St. Martin\'s Press', 2015, 'https://coverart.oclc.org/ImageWebSvc/oclc/+-+5079230976_140.jpg?allowDefault=false&client=WorldcatOrgUI', '440 p.'),
    
    await createBookClubPicksBook(9780735224315, 'Little Fires Everywhere', 'Celeste Ng', 'Fiction', 'Explores the intertwined lives of two families in the suburbs of Ohio, as secrets, conflicts, and cultural differences ignite and shape their destinies.', 'Penguin Press', 2017, 'https://coverart.oclc.org/ImageWebSvc/oclc/+-+1243495576_140.jpg?allowDefault=false&client=WorldcatOrgUI', '338 p.'),
    
    await createBookClubPicksBook(9780735220690, 'Eleanor Oliphant Is Completely Fine', 'Gail Honeyman', 'Fiction', 'Follows the life of Eleanor Oliphant, a socially awkward woman with a troubled past, as she navigates friendship, love, and self-discovery.', 'Penguin Books', 2017, 'https://coverart.oclc.org/ImageWebSvc/oclc/+-+7662835576_140.jpg?allowDefault=false&client=WorldcatOrgUI', '385 p.'),
    
    await createBookClubPicksBook(9780804172448, 'Station Eleven', 'Emily St. John Mandel', 'Science Fiction', 'Set in a post-apocalyptic world, it follows a group of actors and musicians who travel through scattered settlements, preserving the remnants of art and humanity.', 'Vintage', 2014, 'https://coverart.oclc.org/ImageWebSvc/oclc/+-+3707816886_140.jpg?allowDefault=false&client=WorldcatOrgUI', '333 p.'),
    
    await createBookClubPicksBook(9780316168816, 'The Lovely Bones', 'Alice Sebold', 'Fiction', 'Narrated by a teenage girl who was raped and murdered, it explores her afterlife and the impact of her death on her family and community.', 'Little, Brown and Company', 2002, 'https://coverart.oclc.org/ImageWebSvc/oclc/+-+4397280776_140.jpg?allowDefault=false&client=WorldcatOrgUI', '372 p.'),
    
    await createBookClubPicksBook(9780143124542, 'Me Before You', 'Jojo Moyes', 'Romance', 'Tells the story of a young woman who becomes a caregiver for a quadriplegic man and their unexpected bond and life-changing journey together.', 'Penguin Books', 2012, 'https://coverart.oclc.org/ImageWebSvc/oclc/+-+1071227766_140.jpg?allowDefault=false&client=WorldcatOrgUI', '481 p.'),
    
    await createBookClubPicksBook(9780060931391, 'Alas, Babylon', 'Pat Frank', 'Survival skills-Fiction', '"Alas, Babylon" is a post-apocalyptic novel set in Fort Repose, Florida, after a nuclear war. It follows the protagonist, Randy Bragg, as he leads the town\'s survival efforts in the face of food shortages, radiation, and societal collapse.', 'Vintage', 1999, 'https://coverart.oclc.org/ImageWebSvc/oclc/+-+434217_140.jpg?allowDefault=false&client=WorldcatOrgUI', '323 p.')

    const allCreatedBookClubBooks = await getAllBookClubPicksBooks();
    console.log("All Book Club Picks Books: ", allCreatedBookClubBooks);
    console.log("Finished creating initial book club picks books.");
  } catch (error) {
    throw error;
  }
}
async function createInitialChildrensBooks() {
  try {
    console.log("Starting to create childrens books.");

    await createChildrensBook (9780593308431, "Hot Dog", "Doug Salati", "Doug Salati", "Picture Book", "2023 Caldecott Winner. This hot dog has had enough of summer in the city! Enough of sizzling sidewalks, enough of wailing sirens, enough of people's feet right in his face. When he plops down in the middle of a crosswalk, his owner endeavors to get him the breath of fresh air he needs. She hails a taxi, hops a train, and ferries out to the beach. Here, a pup can run! With fluid art and lyrical text that have the soothing effect of waves on sand, the author shows us how to find calm, and how to carry it back with us so we can appreciate the small joys in a day. -- Publisher's description", "Alfred A. Knopf", 2022, "https://coverart.oclc.org/ImageWebSvc/oclc/+-+8984548976_140.jpg?allowDefault=false&client=WorldcatOrgUI", "Ages: 3-8", "40 unnumbered pages : color illustrations ; 27 cm" )
    await createChildrensBook (9781646140893, "The Last Cuentista", "Donna Barba Higuera", "no illustrator", "Science Fiction", "2022 Newbery Award Winner. The Last Cuentista is a mesmerizing science fiction tale for the ages, sprinkled with Mexican folklore. Petra Pena\'s journey through space and time is a stunning reminder of the power of stories, and how those stories shape both our past and future. This brilliant space epic is a must-read for fans of The Giver.", "Levine Querido", 2021, "https://coverart.oclc.org/ImageWebSvc/oclc/+-+6966040876_140.jpg?allowDefault=false&client=WorldcatOrgUI", "Ages: 9-12", "320 p."),

    await createChildrensBook(9780064431781, 'Where the Wild Things Are', 'Maurice Sendak', 'Maurice Sendak', 'Picture Book', 'Follows the adventure of Max, a young boy who travels to a land of wild creatures and becomes their king.', 'HarperCollins', 1963, 'https://coverart.oclc.org/ImageWebSvc/oclc/+-+630749013_140.jpg?allowDefault=false&client=WorldcatOrgUI', 'Ages 4-8', '48p.'),
    
    await createChildrensBook(9780060256654, 'The Giving Tree', 'Shel Silverstein', 'Shel Silverstein', 'Picture Book', 'Tells the story of a young boy and a tree who selflessly gives everything to the boy throughout his life.', 'HarperCollins', 1964, 'https://coverart.oclc.org/ImageWebSvc/oclc/+-+0242928986_140.jpg?allowDefault=false&client=WorldcatOrgUI', 'Ages 4-8', '64p.'),
    
    await createChildrensBook(9780064430173, 'Goodnight Moon', 'Margaret Wise Brown', 'Clement Hurd', 'Bedtime Story', 'A soothing bedtime book that follows a young rabbit saying goodnight to various objects in its room.', 'HarperFestival', 1947, 'https://coverart.oclc.org/ImageWebSvc/oclc/+-+0591899986_140.jpg?allowDefault=false&client=WorldcatOrgUI', 'Ages 2-5', '32p.'),
    
    await createChildrensBook(9780140569322, 'The Very Hungry Caterpillar', 'Eric Carle', 'Eric Carle', 'Picture Book', 'Features a caterpillar\'s journey as it eats its way through various foods before transforming into a butterfly.', 'Philomel Books', 1969, 'https://coverart.oclc.org/ImageWebSvc/oclc/+-+0941056986_140.jpg?allowDefault=false&client=WorldcatOrgUI', 'Ages 2-5', '26p.'),
    
    await createChildrensBook(9780141501598, 'Brown Bear, Brown Bear, What Do You See?', 'Bill Martin Jr.', 'Eric Carle', 'Picture Book', 'Introduces various animals and colors as they are seen by a brown bear.', 'Henry Holt and Co.', 1967, 'https://coverart.oclc.org/ImageWebSvc/oclc/+-+2689935576_140.jpg?allowDefault=false&client=WorldcatOrgUI', 'Ages 2-5', '28p.'),
    
    await createChildrensBook(9780007947164, 'The Cat in the Hat', 'Dr. Seuss', 'Dr. Seuss', 'Picture Book', 'A mischievous cat in a tall striped hat visits two children and creates chaos with his tricks and games.', 'Random House Books for Young Readers', 1957, 'https://coverart.oclc.org/ImageWebSvc/oclc/+-+7209889986_140.jpg?allowDefault=false&client=WorldcatOrgUI', 'Ages 4-8', '61p.'),
    
    await createChildrensBook(9780064400558, 'Charlotte\'s Web', 'E.B. White', 'Garth Williams', 'Chapter Book', 'Follows the unlikely friendship between a pig named Wilbur and a spider named Charlotte, who works to save Wilbur from being slaughtered.', 'Puffin Books', 1952, 'https://coverart.oclc.org/ImageWebSvc/oclc/+-+2880476766_140.jpg?allowDefault=false&client=WorldcatOrgUI', 'Ages 8-12', '184p.'),
    
    await createChildrensBook(9780593527498, 'Matilda', 'Roald Dahl', 'Quentin Blake', 'Chapter Book', 'Tells the story of a brilliant young girl named Matilda who develops telekinetic powers and uses them to overcome obstacles.', 'Puffin Books', 1988, 'https://coverart.oclc.org/ImageWebSvc/oclc/+-+993690014_140.jpg?allowDefault=false&client=WorldcatOrgUI', 'Ages 8-12', '240p.'),
    
    await createChildrensBook(9780312367541, 'A Wrinkle in Time', 'Madeleine L\'Engle', 'Ellen Raskin', 'Chapter Book', 'Follows the adventures of Meg Murry and her younger brother as they travel through space and time to rescue their father.', 'Square Fish', 1962, 'https://coverart.oclc.org/ImageWebSvc/oclc/+-+1107103756_140.jpg?allowDefault=false&client=WorldcatOrgUI', 'Ages 8-12', '232p.'),
    
    await createChildrensBook(9780593378175, 'Wonder', 'R.J. Palacio', 'N/A', 'Chapter Book', 'Features Auggie, a boy with facial differences, as he navigates school and teaches others about empathy and acceptance.', 'Knopf Books for Young Readers', 2012, 'https://coverart.oclc.org/ImageWebSvc/oclc/+-+2531067286_140.jpg?allowDefault=false&client=WorldcatOrgUI', 'Ages 8-12', '316p.'),
    
    await createChildrensBook(9781419741852, 'Diary of a Wimpy Kid', 'Jeff Kinney', 'Jeff Kinney', 'Chapter Book', 'Chronicles the humorous diary of Greg Heffley as he navigates middle school and deals with the challenges of family, friends, and adolescence.', 'Amulet Books', 2007, 'https://coverart.oclc.org/ImageWebSvc/oclc/+-+429924177_140.jpg?allowDefault=false&client=WorldcatOrgUI', 'Ages 8-12', '224p.'),
    
    await createChildrensBook(9780375973963, 'Green Eggs and Ham', 'Dr. Seuss', 'Dr. Seuss', 'Picture Book', 'Features a character who is persistently offered green eggs and ham in various locations and finally agrees to try them.', 'Random House Books for Young Readers', 1960, 'https://coverart.oclc.org/ImageWebSvc/oclc/+-+41499050_140.jpg?allowDefault=false&client=WorldcatOrgUI', 'Ages 2-5', '62p.'),
    
    await createChildrensBook(9780395389492, 'The Polar Express', 'Chris Van Allsburg', 'Chris Van Allsburg', 'Picture Book', 'Tells the story of a young boy who takes a magical train ride to the North Pole on Christmas Eve.', 'Houghton Mifflin Harcourt', 1985, 'https://coverart.oclc.org/ImageWebSvc/oclc/+-+5822925086_140.jpg?allowDefault=false&client=WorldcatOrgUI', 'Ages 4-8', '32p.'),
    
    await createChildrensBook(9780142403877, 'The Gruffalo', 'Julia Donaldson', 'Axel Scheffler', 'Picture Book', 'Follows a mouse as it encounters various predators in the forest and cleverly escapes danger by inventing the terrifying Gruffalo.', 'Puffin Books', 1999, 'https://coverart.oclc.org/ImageWebSvc/oclc/+-+0338489356_140.jpg?allowDefault=false&client=WorldcatOrgUI', 'Ages 3-7', '32p.'),
    
    await createChildrensBook(9780439023528, 'The Hunger Games', 'Suzanne Collins', 'N/A', 'Chapter Book', 'Set in a dystopian future, this novel follows a young girl named Katniss Everdeen as she competes in a brutal televised event called the Hunger Games.', 'Scholastic Press', 2008, 'https://coverart.oclc.org/ImageWebSvc/oclc/+-+371531407_140.jpg?allowDefault=false&client=WorldcatOrgUI', 'Ages 12 and up', '384p.'),
    
    await createChildrensBook(9780142410318, 'Charlie and the Chocolate Factory', 'Roald Dahl', 'Quentin Blake', 'Chapter Book', 'Tells the story of Charlie Bucket and his visit to Willy Wonka\'s chocolate factory, where he encounters magical and eccentric characters.', 'Puffin Books', 1964, 'https://coverart.oclc.org/ImageWebSvc/oclc/+-+1350537776_140.jpg?allowDefault=false&client=WorldcatOrgUI', 'Ages 8-12', '192p.'),
    
    await createChildrensBook(9780545799003, 'The Lightning Thief', 'Rick Riordan', 'John Rocco', 'Chapter Book', 'Introduces Percy Jackson, a young demigod who discovers his true identity and embarks on a quest to prevent a war among the gods.', 'Disney-Hyperion', 2005, 'https://coverart.oclc.org/ImageWebSvc/oclc/+-+585222524_140.jpg?allowDefault=false&client=WorldcatOrgUI', 'Ages 8-12', '377p.')

    const allCreatedChildrensBooks = await getAllChildrensBooks();
    console.log("All Childrens Books: ", allCreatedChildrensBooks);
    console.log("Finished creating initial childrens books.");
  } catch (error) {
    throw error;
  }
}

async function createInitialReviews() {
    try {
        console.log("Starting to create reviews.")

        await createReview ("Breathtaking, mind blowing, complex, serene, intelligent! Those are the first words pop into my mind when I finish the fascinating journey and one of the best books of 2022!", 5, 1, null, null, null, 9780593321447, null, false, false)

        await createReview("I REALLY enjoyed this book!!! Fizzy was a funny and fiesty MC, Connor was a perfect book boyfriend, the plot was creative and I loved the character and plot crossovers from THE SOULMATE EQUATION.", 4, 2, null, 9781982173432, null, null, null, false, false)
        
        await createReview("This book is such a great mix of memoir, travelogue, and birding. Filled with empathy, humor, nature, and hard-won wisdom, I recommend this to readers who enjoy well-written non-fiction.", 5, 3, 9780393866704, null, null, null, null, false, false)
        console.log("###")
        const allCreatedReviews = await getAllReviews();
        console.log("All Reviews", allCreatedReviews);
        console.log("Finished creating initial reviews.")
    } catch (error) {
        throw error
    }
}

async function rebuildDB() {
    try {
        console.log("Starting to rebuild DB.")

        client.connect()
        await dropTables()
        await createTables()
        await createInitialUsers()
        await createInitialNFBooks()
        await createInitialFictionBooks()
        await createInitialGraphicNovelBooks()
        await createInitialBookClubBooks()
        await createInitialChildrensBooks()
        await createInitialReviews()

        console.log("Finished rebuilding DB.")

    } catch (error) {
        throw error
    }
}

module.exports = {
    rebuildDB
}