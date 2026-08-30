import bcrypt from "bcrypt";
import connectDB from "../src/db/index.js";
import { User } from "../src/models/user.model.js";
import { Follow } from "../src/models/follow.model.js";
import { Post } from "../src/models/post.model.js";
import { Comment } from "../src/models/comment.model.js";
import { Like } from "../src/models/like.model.js";
import { Bookmark } from "../src/models/bookmark.model.js";

const PASSWORD = "SeedUser123!";
const hoursAgo = (hours) => new Date(Date.now() - hours * 60 * 60 * 1000);

const PEOPLE = [
    { username: "maya.chen", email: "maya.chen@example.com", fullname: "Maya Chen", bio: "Chasing light. Film and street notes from Taipei and elsewhere.", avatar: "https://randomuser.me/api/portraits/women/65.jpg" },
    { username: "arjun.rao", email: "arjun.rao@example.com", fullname: "Arjun Rao", bio: "Building things. Breaking them. Writing it down.", avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
    { username: "lena.brooks", email: "lena.brooks@example.com", fullname: "Lena Brooks", bio: "Essays, paperbacks, and too much coffee.", avatar: "https://randomuser.me/api/portraits/women/44.jpg" },
    { username: "nico.vale", email: "nico.vale@example.com", fullname: "Nico Vale", bio: "Cook. Host. Always tasting.", avatar: "https://randomuser.me/api/portraits/men/11.jpg" },
    { username: "samira.k", email: "samira.k@example.com", fullname: "Samira Khalil", bio: "Product designer. Type, grids, and quiet interfaces.", avatar: "https://randomuser.me/api/portraits/women/21.jpg" },
    { username: "eli.park", email: "eli.park@example.com", fullname: "Eli Park", bio: "Guitars, late trains, and demo tapes.", avatar: "https://randomuser.me/api/portraits/men/75.jpg" },
    { username: "rafael.mendes", email: "rafael.mendes@example.com", fullname: "Rafael Mendes", bio: "Always between airports. Maps in my pocket.", avatar: "https://randomuser.me/api/portraits/men/22.jpg" },
    { username: "june.okada", email: "june.okada@example.com", fullname: "June Okada", bio: "Space, material, and how people move through both.", avatar: "https://randomuser.me/api/portraits/women/12.jpg" },
    { username: "theo.nilsen", email: "theo.nilsen@example.com", fullname: "Theo Nilsen", bio: "Easy miles. Hard mornings.", avatar: "https://randomuser.me/api/portraits/men/52.jpg" },
    { username: "amina.hassan", email: "amina.hassan@example.com", fullname: "Amina Hassan", bio: "Classrooms, libraries, and the long work of patience.", avatar: "https://randomuser.me/api/portraits/women/33.jpg" },
    { username: "cole.whitaker", email: "cole.whitaker@example.com", fullname: "Cole Whitaker", bio: "Short films. Long takes.", avatar: "https://randomuser.me/api/portraits/men/41.jpg" },
    { username: "priya.nair", email: "priya.nair@example.com", fullname: "Priya Nair", bio: "Plants, soil, and the slow season.", avatar: "https://randomuser.me/api/portraits/women/47.jpg" },
    { username: "marcus.feld", email: "marcus.feld@example.com", fullname: "Marcus Feld", bio: "Espresso, milk art, and neighborhood gossip.", avatar: "https://randomuser.me/api/portraits/men/18.jpg" },
    { username: "yara.solis", email: "yara.solis@example.com", fullname: "Yara Solis", bio: "Ink, color, and characters who talk back.", avatar: "https://randomuser.me/api/portraits/women/68.jpg" },
    { username: "benji.ortiz", email: "benji.ortiz@example.com", fullname: "Benji Ortiz", bio: "Two wheels. Open roads.", avatar: "https://randomuser.me/api/portraits/men/29.jpg" },
    { username: "hana.kim", email: "hana.kim@example.com", fullname: "Hana Kim", bio: "Shipping quietly. Thinking out loud here.", avatar: "https://randomuser.me/api/portraits/women/9.jpg" },
    { username: "owen.clarke", email: "owen.clarke@example.com", fullname: "Owen Clarke", bio: "Notes from the field. Questions more than answers.", avatar: "https://randomuser.me/api/portraits/men/64.jpg" },
    { username: "zara.malik", email: "zara.malik@example.com", fullname: "Zara Malik", bio: "Clothes as language. Cities as moodboards.", avatar: "https://randomuser.me/api/portraits/women/57.jpg" },
    { username: "dmitri.volkov", email: "dmitri.volkov@example.com", fullname: "Dmitri Volkov", bio: "Endgames, openings, and the quiet in between.", avatar: "https://randomuser.me/api/portraits/men/7.jpg" },
    { username: "isla.fern", email: "isla.fern@example.com", fullname: "Isla Fern", bio: "Garden first, inbox second.", avatar: "https://randomuser.me/api/portraits/women/28.jpg" },
];

const POSTS = [
    { user: "maya.chen", hours: 2, content: "Golden hour on Dihua Street. Nobody posed. That is usually when it works.", images: ["https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1400&q=80"], tags: ["street", "film"] },
    { user: "maya.chen", hours: 30, content: "Rain on a market tarp. I took forty frames and kept one.", images: ["https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=1400&q=80"], tags: ["travel"] },
    { user: "maya.chen", hours: 90, content: "Unpopular take: the photo you almost missed is usually the one worth keeping.", images: [], tags: ["notes"] },

    { user: "arjun.rao", hours: 5, content: "Shipped a tiny CLI that does one thing well. The best kind of Saturday.", images: [], tags: ["build"] },
    { user: "arjun.rao", hours: 40, content: "Whiteboard after a long debug. The answer was a missing await. Of course it was.", images: ["https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1400&q=80"], tags: ["code"] },
    { user: "arjun.rao", hours: 120, content: "If the abstraction needs a paragraph to explain, it is not an abstraction yet.", images: [], tags: ["engineering"] },

    { user: "lena.brooks", hours: 8, content: "Finished a novel on the train and sat with the last page for three stops. That is the whole point.", images: [], tags: ["books"] },
    { user: "lena.brooks", hours: 52, content: "Morning light, a cheap notebook, and a sentence that finally sat still.", images: ["https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1400&q=80"], tags: ["writing"] },

    { user: "nico.vale", hours: 3, content: "Tomato, salt, olive oil, bread. If you need more than that tonight, you are overthinking dinner.", images: ["https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=1400&q=80"], tags: ["food"] },
    { user: "nico.vale", hours: 28, content: "First service of the week. The kitchen was loud in the good way.", images: ["https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1400&q=80"], tags: ["kitchen"] },
    { user: "nico.vale", hours: 100, content: "A sauce is just patience you can taste.", images: [], tags: ["cooking"] },

    { user: "samira.k", hours: 12, content: "Removed three buttons from the settings page. Nobody noticed, which is the highest compliment.", images: [], tags: ["design"] },
    { user: "samira.k", hours: 70, content: "Type on a quiet screen. This is still my favorite kind of work.", images: ["https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1400&q=80"], tags: ["type"] },

    { user: "eli.park", hours: 6, content: "New demo at 2am. The chorus is almost honest.", images: [], tags: ["music"] },
    { user: "eli.park", hours: 48, content: "Guitars on the floor, tea going cold, and a take I might actually keep.", images: ["https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=1400&q=80"], tags: ["studio"] },

    { user: "rafael.mendes", hours: 4, content: "Lisbon in the late afternoon. The city leans into the light like it knows you are watching.", images: ["https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=1400&q=80"], tags: ["travel", "lisbon"] },
    { user: "rafael.mendes", hours: 36, content: "One bag. No itinerary past Thursday. Best kind of week.", images: [], tags: ["travel"] },
    { user: "rafael.mendes", hours: 110, content: "Ferry wake, somewhere between islands. I stopped checking the map.", images: ["https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80"], tags: ["sea"] },

    { user: "june.okada", hours: 18, content: "A corridor that makes you slow down without a sign. That is design doing its job.", images: ["https://images.unsplash.com/photo-1487956382158-bb926046304a?auto=format&fit=crop&w=1400&q=80"], tags: ["architecture"] },
    { user: "june.okada", hours: 80, content: "Concrete is only cold if you refuse to listen to it.", images: [], tags: ["materials"] },

    { user: "theo.nilsen", hours: 1, content: "14k before breakfast. The city was still deciding whether to wake up.", images: ["https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=1400&q=80"], tags: ["run"] },
    { user: "theo.nilsen", hours: 44, content: "Easy run. Hard not to check splits. Working on it.", images: [], tags: ["training"] },

    { user: "amina.hassan", hours: 9, content: "A student asked a better question than the one I had prepared. Best hour of the week.", images: [], tags: ["teaching"] },
    { user: "amina.hassan", hours: 60, content: "Library after hours. The building keeps its own kind of quiet.", images: ["https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1400&q=80"], tags: ["books"] },

    { user: "cole.whitaker", hours: 14, content: "We cut thirty seconds and the scene finally breathed. Editing is mostly listening.", images: [], tags: ["film"] },
    { user: "cole.whitaker", hours: 95, content: "Golden hour on set, and for once nobody was looking at a monitor.", images: ["https://images.unsplash.com/photo-1485846234645-a62698f42074?auto=format&fit=crop&w=1400&q=80"], tags: ["cinema"] },

    { user: "priya.nair", hours: 7, content: "The basil recovered. I did not. We are even.", images: ["https://images.unsplash.com/photo-1466692476866-aef57dfb3f0f?auto=format&fit=crop&w=1400&q=80"], tags: ["garden"] },
    { user: "priya.nair", hours: 55, content: "Soil under the nails is a better status update than most apps.", images: [], tags: ["plants"] },

    { user: "marcus.feld", hours: 2, content: "First cortado of the day. If you need me, I am behind the machine.", images: ["https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1400&q=80"], tags: ["coffee"] },
    { user: "marcus.feld", hours: 33, content: "Regular asked for the usual and then changed it. We still made it work.", images: [], tags: ["cafe"] },

    { user: "yara.solis", hours: 11, content: "Ink wash that went further than the sketch. I am going to follow it.", images: ["https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1400&q=80"], tags: ["art"] },
    { user: "yara.solis", hours: 72, content: "Characters keep interrupting dinner. I should probably write that down.", images: [], tags: ["illustration"] },

    { user: "benji.ortiz", hours: 16, content: "Coastal road, tailwind, and a stop for water that turned into an hour.", images: ["https://images.unsplash.com/photo-1541625602330-2277a4c46182?auto=format&fit=crop&w=1400&q=80"], tags: ["cycling"] },
    { user: "benji.ortiz", hours: 85, content: "Chain cleaned. Kit laid out. Tomorrow is just turning the pedals.", images: [], tags: ["ride"] },

    { user: "hana.kim", hours: 10, content: "Wrote the spec in plain language. Engineering said thank you. I will remember this.", images: [], tags: ["product"] },
    { user: "hana.kim", hours: 64, content: "Desk, plant, and a ticket I have been avoiding. Starting now.", images: ["https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&q=80"], tags: ["work"] },

    { user: "owen.clarke", hours: 20, content: "Interview ran long because the person finally said the true sentence. That is the job.", images: [], tags: ["reporting"] },
    { user: "owen.clarke", hours: 88, content: "Notebooks from last month. Half of it is directions. The other half is doubt.", images: ["https://images.unsplash.com/photo-1456324504439-367cee3b3c32?auto=format&fit=crop&w=1400&q=80"], tags: ["notes"] },

    { user: "zara.malik", hours: 15, content: "A coat that makes the whole street look composed. I want that kind of quiet confidence.", images: ["https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1400&q=80"], tags: ["style"] },
    { user: "zara.malik", hours: 76, content: "Tailoring is just care you can wear.", images: [], tags: ["fashion"] },

    { user: "dmitri.volkov", hours: 22, content: "Lost a long endgame I should have drawn. The lesson was patience, again.", images: [], tags: ["chess"] },
    { user: "dmitri.volkov", hours: 98, content: "Board by the window. Two hours disappeared. No complaints.", images: ["https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&w=1400&q=80"], tags: ["chess"] },

    { user: "isla.fern", hours: 13, content: "Tomatoes are finally blushing. I have been checking them like they might vanish.", images: ["https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=1400&q=80"], tags: ["garden"] },
    { user: "isla.fern", hours: 50, content: "Weeded until the light went. Hands ache in the good way.", images: [], tags: ["plants"] },
];

const FOLLOW_PAIRS = [
    ["arjun.rao", "maya.chen"], ["lena.brooks", "maya.chen"], ["nico.vale", "maya.chen"],
    ["samira.k", "maya.chen"], ["rafael.mendes", "maya.chen"], ["cole.whitaker", "maya.chen"],
    ["yara.solis", "maya.chen"], ["hana.kim", "maya.chen"], ["owen.clarke", "maya.chen"],
    ["maya.chen", "rafael.mendes"], ["eli.park", "rafael.mendes"], ["theo.nilsen", "rafael.mendes"],
    ["benji.ortiz", "rafael.mendes"], ["zara.malik", "rafael.mendes"], ["june.okada", "rafael.mendes"],
    ["maya.chen", "nico.vale"], ["marcus.feld", "nico.vale"], ["isla.fern", "nico.vale"],
    ["priya.nair", "nico.vale"], ["lena.brooks", "nico.vale"], ["arjun.rao", "nico.vale"],
    ["hana.kim", "arjun.rao"], ["samira.k", "arjun.rao"], ["dmitri.volkov", "arjun.rao"],
    ["owen.clarke", "arjun.rao"], ["eli.park", "arjun.rao"],
    ["maya.chen", "lena.brooks"], ["amina.hassan", "lena.brooks"], ["owen.clarke", "lena.brooks"],
    ["yara.solis", "lena.brooks"], ["samira.k", "lena.brooks"],
    ["arjun.rao", "samira.k"], ["hana.kim", "samira.k"], ["june.okada", "samira.k"],
    ["zara.malik", "samira.k"], ["yara.solis", "samira.k"],
    ["maya.chen", "eli.park"], ["cole.whitaker", "eli.park"], ["benji.ortiz", "eli.park"],
    ["theo.nilsen", "eli.park"],
    ["maya.chen", "june.okada"], ["samira.k", "june.okada"], ["cole.whitaker", "june.okada"],
    ["rafael.mendes", "theo.nilsen"], ["benji.ortiz", "theo.nilsen"], ["marcus.feld", "theo.nilsen"],
    ["lena.brooks", "amina.hassan"], ["priya.nair", "amina.hassan"], ["hana.kim", "amina.hassan"],
    ["maya.chen", "cole.whitaker"], ["eli.park", "cole.whitaker"], ["owen.clarke", "cole.whitaker"],
    ["isla.fern", "priya.nair"], ["nico.vale", "priya.nair"], ["amina.hassan", "priya.nair"],
    ["maya.chen", "marcus.feld"], ["theo.nilsen", "marcus.feld"], ["nico.vale", "marcus.feld"],
    ["lena.brooks", "yara.solis"], ["zara.malik", "yara.solis"], ["samira.k", "yara.solis"],
    ["theo.nilsen", "benji.ortiz"], ["rafael.mendes", "benji.ortiz"], ["eli.park", "benji.ortiz"],
    ["arjun.rao", "hana.kim"], ["samira.k", "hana.kim"], ["owen.clarke", "hana.kim"],
    ["lena.brooks", "owen.clarke"], ["maya.chen", "owen.clarke"], ["dmitri.volkov", "owen.clarke"],
    ["samira.k", "zara.malik"], ["yara.solis", "zara.malik"], ["rafael.mendes", "zara.malik"],
    ["arjun.rao", "dmitri.volkov"], ["hana.kim", "dmitri.volkov"], ["owen.clarke", "dmitri.volkov"],
    ["priya.nair", "isla.fern"], ["nico.vale", "isla.fern"], ["amina.hassan", "isla.fern"],
    ["maya.chen", "samira.k"], ["nico.vale", "marcus.feld"], ["rafael.mendes", "maya.chen"],
];

const COMMENTS = [
    { postUser: "maya.chen", postIndex: 0, user: "rafael.mendes", hours: 1, content: "The color on that wall is doing all the work. Beautiful." },
    { postUser: "maya.chen", postIndex: 0, user: "cole.whitaker", hours: 1, content: "This feels like a still from a film I want to watch." },
    { postUser: "maya.chen", postIndex: 0, user: "samira.k", hours: 0.5, content: "The crop is so quiet. Love it." },
    { postUser: "nico.vale", postIndex: 0, user: "marcus.feld", hours: 2, content: "I can taste this from here. Saving this for tonight." },
    { postUser: "nico.vale", postIndex: 0, user: "isla.fern", hours: 1.5, content: "Those tomatoes look like they actually saw the sun." },
    { postUser: "nico.vale", postIndex: 1, user: "lena.brooks", hours: 20, content: "Loud in the good way is the whole craft, I think." },
    { postUser: "rafael.mendes", postIndex: 0, user: "maya.chen", hours: 3, content: "Lisbon always looks like it was designed for this hour." },
    { postUser: "rafael.mendes", postIndex: 0, user: "zara.malik", hours: 2, content: "The tiles, the light, the whole mood. I need to go back." },
    { postUser: "rafael.mendes", postIndex: 2, user: "benji.ortiz", hours: 80, content: "This is why I keep a camera in the jersey pocket." },
    { postUser: "arjun.rao", postIndex: 1, user: "hana.kim", hours: 30, content: "Missing await is a rite of passage. Shipping anyway is the point." },
    { postUser: "arjun.rao", postIndex: 0, user: "samira.k", hours: 4, content: "One-thing CLIs are underrated. Send it over?" },
    { postUser: "lena.brooks", postIndex: 0, user: "amina.hassan", hours: 6, content: "Sitting with the last page is a skill. Proud of you for not rushing it." },
    { postUser: "lena.brooks", postIndex: 1, user: "owen.clarke", hours: 40, content: "This is exactly how a morning should look." },
    { postUser: "eli.park", postIndex: 1, user: "cole.whitaker", hours: 40, content: "The room looks like a song already." },
    { postUser: "eli.park", postIndex: 0, user: "maya.chen", hours: 5, content: "Send the demo when it is ready. No rush." },
    { postUser: "theo.nilsen", postIndex: 0, user: "benji.ortiz", hours: 0.8, content: "Those empty streets are the prize. Nice work." },
    { postUser: "june.okada", postIndex: 0, user: "samira.k", hours: 12, content: "This is the kind of space I try to design for and rarely get." },
    { postUser: "priya.nair", postIndex: 0, user: "isla.fern", hours: 5, content: "Basil is dramatic. Glad it came around." },
    { postUser: "marcus.feld", postIndex: 0, user: "nico.vale", hours: 1, content: "That crema is showing off." },
    { postUser: "yara.solis", postIndex: 0, user: "lena.brooks", hours: 8, content: "I would hang this. The wash is doing something brave." },
    { postUser: "hana.kim", postIndex: 0, user: "arjun.rao", hours: 7, content: "Plain language specs should be the default. Thank you for writing one." },
    { postUser: "benji.ortiz", postIndex: 0, user: "theo.nilsen", hours: 10, content: "Tailwind days are undefeated." },
    { postUser: "zara.malik", postIndex: 0, user: "yara.solis", hours: 11, content: "The silhouette is everything. This is so composed." },
    { postUser: "dmitri.volkov", postIndex: 1, user: "arjun.rao", hours: 70, content: "Two hours by a window sounds like a perfect afternoon." },
    { postUser: "isla.fern", postIndex: 0, user: "priya.nair", hours: 9, content: "They look ready. Do not wait too long or the birds will vote." },
    { postUser: "cole.whitaker", postIndex: 1, user: "maya.chen", hours: 70, content: "Nobody on a monitor is the dream. You got it." },
    { postUser: "amina.hassan", postIndex: 0, user: "lena.brooks", hours: 7, content: "The better question is the whole art of teaching." },
    { postUser: "owen.clarke", postIndex: 0, user: "hana.kim", hours: 15, content: "The true sentence is the whole craft. Glad you waited for it." },
    { postUser: "samira.k", postIndex: 0, user: "hana.kim", hours: 8, content: "Removing buttons is a kind of courage." },
    { postUser: "maya.chen", postIndex: 2, user: "owen.clarke", hours: 70, content: "This is also true of interviews." },
];

const LIKE_POSTS = [
    { postUser: "maya.chen", postIndex: 0, users: ["rafael.mendes", "cole.whitaker", "samira.k", "arjun.rao", "yara.solis", "hana.kim", "owen.clarke", "zara.malik"] },
    { postUser: "maya.chen", postIndex: 1, users: ["rafael.mendes", "june.okada", "cole.whitaker"] },
    { postUser: "maya.chen", postIndex: 2, users: ["lena.brooks", "owen.clarke", "arjun.rao"] },
    { postUser: "nico.vale", postIndex: 0, users: ["marcus.feld", "isla.fern", "priya.nair", "maya.chen", "lena.brooks", "theo.nilsen"] },
    { postUser: "nico.vale", postIndex: 1, users: ["marcus.feld", "rafael.mendes"] },
    { postUser: "rafael.mendes", postIndex: 0, users: ["maya.chen", "zara.malik", "benji.ortiz", "eli.park", "theo.nilsen", "june.okada"] },
    { postUser: "rafael.mendes", postIndex: 2, users: ["benji.ortiz", "maya.chen", "theo.nilsen"] },
    { postUser: "arjun.rao", postIndex: 0, users: ["hana.kim", "samira.k", "dmitri.volkov"] },
    { postUser: "arjun.rao", postIndex: 1, users: ["hana.kim", "eli.park", "owen.clarke"] },
    { postUser: "lena.brooks", postIndex: 0, users: ["amina.hassan", "owen.clarke", "maya.chen", "yara.solis"] },
    { postUser: "eli.park", postIndex: 1, users: ["cole.whitaker", "maya.chen", "benji.ortiz"] },
    { postUser: "theo.nilsen", postIndex: 0, users: ["benji.ortiz", "marcus.feld", "rafael.mendes"] },
    { postUser: "june.okada", postIndex: 0, users: ["samira.k", "maya.chen", "cole.whitaker"] },
    { postUser: "priya.nair", postIndex: 0, users: ["isla.fern", "nico.vale", "amina.hassan"] },
    { postUser: "marcus.feld", postIndex: 0, users: ["nico.vale", "theo.nilsen", "maya.chen", "arjun.rao"] },
    { postUser: "yara.solis", postIndex: 0, users: ["lena.brooks", "zara.malik", "samira.k"] },
    { postUser: "hana.kim", postIndex: 0, users: ["arjun.rao", "samira.k", "owen.clarke"] },
    { postUser: "benji.ortiz", postIndex: 0, users: ["theo.nilsen", "rafael.mendes", "eli.park"] },
    { postUser: "zara.malik", postIndex: 0, users: ["yara.solis", "samira.k", "rafael.mendes"] },
    { postUser: "dmitri.volkov", postIndex: 1, users: ["arjun.rao", "hana.kim"] },
    { postUser: "isla.fern", postIndex: 0, users: ["priya.nair", "nico.vale", "amina.hassan"] },
    { postUser: "cole.whitaker", postIndex: 1, users: ["maya.chen", "eli.park", "owen.clarke"] },
    { postUser: "amina.hassan", postIndex: 1, users: ["lena.brooks", "priya.nair"] },
    { postUser: "owen.clarke", postIndex: 0, users: ["hana.kim", "lena.brooks", "maya.chen"] },
    { postUser: "samira.k", postIndex: 1, users: ["hana.kim", "arjun.rao", "june.okada"] },
];

const BOOKMARKS = [
    { user: "samira.k", postUser: "maya.chen", postIndex: 0 },
    { user: "hana.kim", postUser: "arjun.rao", postIndex: 0 },
    { user: "marcus.feld", postUser: "nico.vale", postIndex: 0 },
    { user: "maya.chen", postUser: "rafael.mendes", postIndex: 0 },
    { user: "isla.fern", postUser: "priya.nair", postIndex: 0 },
    { user: "theo.nilsen", postUser: "benji.ortiz", postIndex: 0 },
    { user: "lena.brooks", postUser: "yara.solis", postIndex: 0 },
    { user: "arjun.rao", postUser: "hana.kim", postIndex: 0 },
];

const run = async () => {
    await connectDB();

    const existing = await User.find({ username: { $in: PEOPLE.map((person) => person.username) } }).select("username");
    if (existing.length) {
        console.log(`Seed already present (${existing.length} users). Aborting.`);
        console.log("Log in with any seeded username and password:", PASSWORD);
        process.exit(0);
    }

    const passwordHash = await bcrypt.hash(PASSWORD, 10);
    const users = await User.insertMany(
        PEOPLE.map((person, index) => ({
            ...person,
            password: passwordHash,
            createdAt: hoursAgo(200 + index * 8),
            updatedAt: hoursAgo(20 + index),
        })),
    );
    const idByUsername = Object.fromEntries(users.map((user) => [user.username, user._id]));

    const createdPosts = await Post.insertMany(
        POSTS.map((post) => ({
            content: post.content,
            images: post.images || [],
            tags: post.tags || [],
            author: idByUsername[post.user],
            createdAt: hoursAgo(post.hours),
            updatedAt: hoursAgo(post.hours),
        })),
    );

    const postsByUser = {};
    createdPosts.forEach((post, index) => {
        const username = POSTS[index].user;
        postsByUser[username] = postsByUser[username] || [];
        postsByUser[username].push(post);
    });

    const seenFollows = new Set();
    const followDocs = FOLLOW_PAIRS
        .filter(([from, to]) => {
            if (from === to) return false;
            const key = `${from}->${to}`;
            if (seenFollows.has(key)) return false;
            seenFollows.add(key);
            return true;
        })
        .map(([from, to], index) => ({
            followerId: idByUsername[from],
            followeeId: idByUsername[to],
            createdAt: hoursAgo(10 + index),
            updatedAt: hoursAgo(10 + index),
        }));
    await Follow.insertMany(followDocs);

    const commentDocs = COMMENTS.map((item) => {
        const post = postsByUser[item.postUser][item.postIndex];
        return {
            content: item.content,
            postId: post._id,
            author: idByUsername[item.user],
            createdAt: hoursAgo(item.hours),
            updatedAt: hoursAgo(item.hours),
        };
    });
    const createdComments = await Comment.insertMany(commentDocs);

    const likeDocs = [];
    LIKE_POSTS.forEach((item) => {
        const post = postsByUser[item.postUser][item.postIndex];
        item.users.forEach((username) => {
            if (String(idByUsername[username]) === String(post.author)) return;
            likeDocs.push({
                likedBy: idByUsername[username],
                postId: post._id,
                commentId: null,
                createdAt: hoursAgo(item.postIndex + 1),
                updatedAt: hoursAgo(item.postIndex + 1),
            });
        });
    });
    createdComments.slice(0, 12).forEach((comment, index) => {
        const liker = users[(index * 3 + 2) % users.length];
        if (String(liker._id) === String(comment.author)) return;
        likeDocs.push({
            likedBy: liker._id,
            postId: null,
            commentId: comment._id,
            createdAt: hoursAgo(index + 0.5),
            updatedAt: hoursAgo(index + 0.5),
        });
    });
    await Like.insertMany(likeDocs);

    await Bookmark.insertMany(
        BOOKMARKS.map((item) => ({
            bookmarkedBy: idByUsername[item.user],
            postId: postsByUser[item.postUser][item.postIndex]._id,
            createdAt: hoursAgo(8),
            updatedAt: hoursAgo(8),
        })),
    );

    console.log(JSON.stringify({
        users: users.length,
        posts: createdPosts.length,
        imagePosts: POSTS.filter((post) => post.images?.length).length,
        textPosts: POSTS.filter((post) => !post.images?.length).length,
        follows: followDocs.length,
        comments: createdComments.length,
        likes: likeDocs.length,
        bookmarks: BOOKMARKS.length,
        password: PASSWORD,
        sampleLogins: ["maya.chen", "nico.vale", "rafael.mendes", "arjun.rao"],
    }, null, 2));

    process.exit(0);
};

run().catch((error) => {
    console.error(error);
    process.exit(1);
});
