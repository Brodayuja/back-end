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
            "ISBN" BIGINT NOT NULL,
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
            "ISBN" BIGINT NOT NULL,
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
            "ISBN" BIGINT NOT NULL,
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
            "ISBN" BIGINT NOT NULL,
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
            "ISBN" BIGINT NOT NULL,
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
            username VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            avatar VARCHAR(2083),
            location VARCHAR(255),
            website VARCHAR(2083),
            "favoriteBooks" VARCHAR(255),
            "aboutMe" TEXT,
            "is_admin" BOOLEAN DEFAULT false
        )`);
        console.log("????")
        await client.query(`
        CREATE TABLE reviews (
            id SERIAL PRIMARY KEY,
            content VARCHAR(255) NOT NULL,
            score INT NOT NULL,
            "user_id" INT REFERENCES users(id),
            "nfBook_id" INT REFERENCES "nfBooks"(id),
            "fictionBook_id" INT REFERENCES "fictionBooks"(id),
            "graphicBook_id" INT REFERENCES "graphicNovelsAndMangaBooks"(id),
            "bookClubBook_id" INT REFERENCES "bookClubPicksBooks"(id),
            "childrensBook_id" INT REFERENCES "childrensBooks"(id)
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
    
    await createNFBook (9780593242384, "Better Living Through Birding: Notes from a Black Man in the Natural World", "Christian Cooper", "Nonfiction", "Christian Cooper is a self-described Blerd (Black nerd), an avid comics fan, and an expert birder who devotes every spring to gazing upon the migratory birds that stop to rest in Central Park, just a subway ride away from where he lives in New York City. When birdwatching in the park one morning in May 2020, Cooper was engaged in the ritual that had been a part of his life since he was ten years old. But when a routine encounter with a dog-walker escalates age old racial tensions, Cooper's viral video of the incident would send shock waves through the nation. In Better Living Through Birding, Cooper tells the story of his extraordinary life leading up to the now-infamous encounter in Central Park and shows how a life spent looking up at the birds prepared him, in the most uncanny of ways, to be a gay, Black man in American today. From sharpened senses that work just as well in a protest as in a park, to what a bird like the Common Grackle can teach us about self-acceptance, Better Living Through Birding exults in the pleasures of a life lived in pursuit of the natural world and invites you to discover your own. Equal parts memoir, travelogue, and primer on the art of birding, this is Cooper's story of learning to claim and defend space for himself and others like him, from his days as a writer for Marvel Comics, where Cooper introduced the first gay storyline, to vivid and life-changing birding expeditions through Africa, Australia, the Americas and the Himalayas. Better Living Through Birding is Cooper's invitation into the wonderful world of birds, and what they can teach us about life, if only we would stop and listen.--Provided by publisher", "Random House", 2023, "https://coverart.oclc.org/ImageWebSvc/oclc/+-+4693611986_140.jpg?allowDefault=false&client=WorldcatOrgUI", "282 p.")

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
    
    await createFictionBook (9781982173432, "The True Love Experiment", "Christina Lauren", "Romance", "Felicity 'Fizzy' Chen is lost. Sure, she's got an incredible career as a beloved romance novelist with a slew of bestsellers under her belt, but when she's asked to give a commencement address, it hits her: she hasn't been practicing what she's preached. Fizzy hasn't ever really been in love. Lust? Definitely. But that swoon-worthy, can't-stop-thinking-about-him, all-encompassing feeling? Nope. Nothing. What happens when the optimism she's spent her career encouraging in readers starts to feel like a lie? Connor Prince, documentary filmmaker and single father, loves his work in large part because it allows him to live near his daughter. But when his profit-minded boss orders him to create a reality TV show, putting his job on the line, Connor is out of his element. Desperate to find his romantic lead, a chance run-in with an exasperated Fizzy offers Connor the perfect solution. What if he could show the queen of romance herself falling head-over-heels for all the world to see? Fizzy gives him a hard pass--unless he agrees to her list of demands. When he says yes, and production on The True Love Experiment begins, Connor wonders if that perfect match will ever be in the cue cards for him, too.", "Gallery Books", 2023, "https://coverart.oclc.org/ImageWebSvc/oclc/+-+1472670986_140.jpg?allowDefault=false&client=WorldcatOrgUI", "409 p.")

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
    
    await createGraphicNovelBook (9781779501127, "Watchmen", "Alan Moore", "Dave Gibbons", "Graphic Novel", "Considered the greatest graphic novel in the history of the medium, the Hugo Award-winning story chronicles the fall from grace of a group of superheroes plagued by all-too-human failings. Along the way, the concept of the superhero is dissected as an unknown assassin stalks the erstwhile heroes.--Publisher", "DC Comics", 2019, "https://coverart.oclc.org/ImageWebSvc/oclc/+-+3280506566_140.jpg?allowDefault=false&client=WorldcatOrgUI", "414 pages, 34 unnumbered pages : chiefly illustrations (chiefly color) ; 26 cm")

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
    
    await createBookClubPicksBook (9780593321447, "Sea of Tranquility", "Emily St. John Mandel", "Science Fiction/Fantasy", "The award-winning, best-selling author of 'Station Eleven' and 'The glass hotel' returns with a novel of art, time, love, and plague that takes the reader from an island off Vancouver in 1912 to a dark colony of the moon three hundred years later, unfurling a story of humanity across centuries and planets. Edwin St. Andrew is eighteen years old when he crosses the Atlantic by steamship, exiled from polite society following an ill-conceived diatribe at a dinner party. He enters the forest, spellbound by the beauty of the Canadian wilderness, and suddenly hears the notes of a violin echoing in an airship terminal--an experience that shocks him to his core. Two centuries later a famous writer named Olive Llewellyn is on a book tour. She's traveling all over Earth, but her home is the second moon colony, a place of white stone, spired towers, and artificial beauty. Within the text of Olive's best-selling pandemic novel lies a strange passage: a man plays his violin for change in the echoing corridor of an airship terminal as the trees of a forest rise around him. When Gaspery-Jacques Roberts, a detective in the black-skied Night City, is hired to investigate an anomaly in the North American wilderness, he uncovers a series of lives upended: the exiled son of an earl driven to madness, a writer trapped far from home as a pandemic ravages Earth, and a childhood friend from the Night City who, like Gaspery himself, has glimpsed the chance to do something extraordinary that will disrupt the time line of the universe.-- Provided by publisher", "Alfred A. Knopf", 2022, "https://coverart.oclc.org/ImageWebSvc/oclc/+-+8194826076_140.jpg?allowDefault=false&client=WorldcatOrgUI", "255 p.")

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
    await createChildrensBook (9781646140893, "The Last Cuentista", "Donna Barba Higuera", "no illustrator", "Science Fiction", "2022 Newbery Award Winner. The Last Cuentista is a mesmerizing science fiction tale for the ages, sprinkled with Mexican folklore. Petra Pena’s journey through space and time is a stunning reminder of the power of stories, and how those stories shape both our past and future. This brilliant space epic is a must-read for fans of The Giver.", "Levine Querido", 2021, "https://coverart.oclc.org/ImageWebSvc/oclc/+-+6966040876_140.jpg?allowDefault=false&client=WorldcatOrgUI", "Ages: 9-12", "320 p.")

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

        await createReview ("Breathtaking, mind blowing, complex, serene, intelligent! Those are the first words pop into my mind when I finish the fascinating journey and one of the best books of 2022!", 5, 1, null, null, null, 2, null)

        await createReview("I REALLY enjoyed this book!!! Fizzy was a funny and fiesty MC, Connor was a perfect book boyfriend, the plot was creative and I loved the character and plot crossovers from THE SOULMATE EQUATION.", 4, 2, null, 2, null, null, null)
        
        await createReview("This book is such a great mix of memoir, travelogue, and birding. Filled with empathy, humor, nature, and hard-won wisdom, I recommend this to readers who enjoy well-written non-fiction.", 5, 3, 2, null, null, null, null)
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