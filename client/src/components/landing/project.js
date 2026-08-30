export const stack = [
    'React 18',
    'Redux Toolkit',
    'Tailwind + shadcn',
    'Express',
    'MongoDB',
    'Cloudinary',
    'JWT cookies',
]

export const productPoints = [
    'Posts with text, images, and tags',
    'Comments, likes, follows, and bookmarks',
    'Search, people discovery, and profile tabs',
    'Two independent apps: client/ (Vite) and server/ (Express)',
]

export const requestSteps = [
    {
        title: 'Cookie JWT',
        body: 'Login sets an httpOnly accessToken cookie. Every axios call sends withCredentials: true.',
    },
    {
        title: 'verifyJWT',
        body: 'Protected routes read the cookie, verify the token, and attach req.user. Counts are never stored on the document.',
    },
    {
        title: 'Aggregate + paginate',
        body: 'postCommonAggregation $lookups likes, comments, and bookmarks, then aggregatePaginate returns the page the feed expects.',
    },
]

export const productFlow = [
    { step: '01', title: 'Register or log in', body: 'JWT lands in a cookie. The SPA checks /user/check-auth on boot.' },
    { step: '02', title: 'Scroll the feed', body: '/home loads posts with infinite scroll. Page 1 replaces; later pages append.' },
    { step: '03', title: 'Engage', body: 'Like, bookmark, or comment on a post. Follow people from Search or People.' },
    { step: '04', title: 'Own your profile', body: 'Tabs for posts, comments, and saved bookmarks — same aggregations, different $match.' },
]

export const talkingPoints = [
    'Like, Follow, and Bookmark are join collections. likes / isLiked / isBookmarked are computed per request.',
    'postCommonAggregation is reused after every post $match so the feed, profile, and post page stay consistent.',
    'Pagination is cursor-ish: slices keep page / nextPage / hasNextPage and reset the list when page === 1.',
    'Auth is cookie-based, not a Bearer header in normal use — CORS allows credentials from the Vite origin.',
]
