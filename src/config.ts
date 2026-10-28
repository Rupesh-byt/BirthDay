export type Photo = {
  src: string;
  caption: string;
  date: string;
  album?: string;
};

export type Album = {
  name: string;
  emoji: string;
  photos: Photo[];
};

export type Song = {
  title: string;
  artist: string;
  src: string;
  cover: string;
};

const songs: Song[] = [
  { title: "Alfaaz", artist: "A song for Shivani", src: "/audio/alfaaz.mp3", cover: "/photos/placeholder.svg" },
];

export const config = {
  name: "Shivani",
  displayName: "Shivani (Aditya)",
  birthdayDate: "10-29",
  heroPhoto: "/photos/Shivani-1.PNG",
  heroMessage:
    "Today is all about you, your smile, your happiness, and all the beautiful moments that make you so special.",
  birthdayMessage:
    "You are one of a kind. May this new chapter bring you endless happiness, beautiful memories, and everything you dream of.",
  letter: `Dear Shivani ❤️,

Today is your special day, and I wish I could give you the whole world. You deserve endless happiness, beautiful memories, countless reasons to smile, and all the love your heart can hold.

I made this little website just for you, with memories, music, photographs, and tiny surprises. I hope every part of it makes you smile.

Never forget how special you are. May your birthday bring you everything that makes your heart happy.

Happy Birthday, Shivani. You deserve a beautiful life filled with love, laughter, and dreams that come true.

With lots of love,
Your special person ❤️`,
  extraLetter: "You make ordinary days feel a little more magical. I'm so glad this little corner of the internet gets to celebrate you.",
  photos: [
    { src: "/photos/Shivani-1.PNG", caption: "My favorite picture ❤️", date: "A special memory", album: "Beautiful smile" },
    { src: "/photos/Shivani-2.JPG", caption: "A smile worth saving", date: "A day to remember", album: "Beautiful smile" },
    { src: "/photos/Shivani-3.JPG", caption: "Photo 03", date: "A favorite photo", album: "Beautiful smile" },
    { src: "/photos/Shivani-4.JPG", caption: "Photo 04", date: "A favorite photo", album: "Beautiful smile" },
    { src: "/photos/Shivani-5.JPG", caption: "Photo 05", date: "A favorite photo", album: "Beautiful smile" },
    { src: "/photos/Shivani-6.JPG", caption: "Photo 06", date: "A favorite photo", album: "Beautiful smile" },
    { src: "/photos/Shivani-7.JPG", caption: "Photo 07", date: "A favorite photo", album: "Beautiful smile" },
    { src: "/photos/Shivani-8.JPG", caption: "Our beautiful memories 💗", date: "A day to remember", album: "Favorite memories" },
    { src: "/photos/Shivani-9.JPG", caption: "Photo 09", date: "A favorite memory", album: "Favorite memories" },
    { src: "/photos/Shivani-10.PNG", caption: "Photo 10", date: "A favorite memory", album: "Favorite memories" },
    { src: "/photos/Shivani-11.JPG", caption: "Photo 11", date: "A favorite memory", album: "Favorite memories" },
    { src: "/photos/Shivani-12.JPG", caption: "Photo 12", date: "A favorite memory", album: "Favorite memories" },
    { src: "/photos/Shivani-13.JPG", caption: "Photo 13", date: "A favorite memory", album: "Cute moments" },
    { src: "/photos/Shivani-14.JPG", caption: "Photo 14", date: "A favorite memory", album: "Cute moments" },
    { src: "/photos/Shivani-15.JPG", caption: "Photo 15", date: "A favorite memory", album: "Cute moments" },
    { src: "/photos/Shivani-16.JPG", caption: "Photo 16", date: "A favorite memory", album: "Cute moments" },
    { src: "/photos/Shivani-17.JPG", caption: "Photo 17", date: "A favorite memory", album: "Cute moments" },
    { src: "/photos/Shivani-18.JPG", caption: "Photo 18", date: "A special day", album: "Special days" },
    { src: "/photos/Shivani-19.JPG", caption: "Photo 19", date: "A special day", album: "Special days" },
    { src: "/photos/IMG_7715.PNG", caption: "Photo 20", date: "A special day", album: "Special days" },
    { src: "/photos/IMG_7880.JPG", caption: "Photo 21", date: "A special day", album: "Special days" },
    { src: "/photos/IMG_7897.PNG", caption: "Photo 22", date: "A special day", album: "Special days" },
    { src: "/photos/IMG_8160.PNG", caption: "Photo 23", date: "A special day", album: "Cute" },
    { src: "/photos/IMG_8163.JPG", caption: "Photo 24", date: "A birthday memory", album: "Cute" },
    { src: "/photos/IMG_8170.JPG", caption: "Photo 25", date: "A birthday memory", album: "Cute" },
    { src: "/photos/IMG_8340.JPG", caption: "Photo 26", date: "A birthday memory", album: "Cute" },
    { src: "/photos/IMG_8341.JPG", caption: "Photo 27", date: "A birthday memory", album: "Cute" },
    { src: "/photos/IMG_8343.JPG", caption: "Photo 28", date: "A birthday memory", album: "Cute" },
    { src: "/photos/Snapchat-2059654325_Original.JPG", caption: "Photo 29", date: "A birthday memory", album: "Cute" },
  ] satisfies Photo[],
  albums: [
    { name: "All memories", emoji: "💗" },
    { name: "Beautiful smile", emoji: "🌸" },
    { name: "Favorite memories", emoji: "📸" },
    { name: "Cute moments", emoji: "🧸" },
    { name: "Special days", emoji: "✨" },
    { name: "Cute", emoji: "🎂" },
  ],
  timeline: [
    { title: "A day at C Block", date: "23 September 2025", message: "One of the first memories that became special to us." },
    { title: "All our friends together", date: "12 October 2025", message: "A lovely day with all our friends together." },
    { title: "The cancelled plan that makes me laugh", date: "3 December 2025", message: "I felt bad when the plan got cancelled, but now it has become one of my funniest memories." },
    { title: "Our first selfie together", date: "15 December 2025", message: "The first selfie with you—one I will always treasure." },
    { title: "The hug I still remember", date: "May 2026", message: "When you hugged me, it became a moment I will always keep close." },
    { title: "More memories to come", date: "Our next chapter", message: "There are still so many lovely little moments waiting for us." },
    { title: "Your special day", date: "29 October", message: "A whole new chapter, and a whole lot to celebrate." },
  ],
  songs,
  giftMessage: "A little reminder that the world is brighter with you in it. Happy Birthday, Shivani! ❤️",
  giftPhoto: "/photos/IMG_8343.JPG",
  finalPhotos: ["/photos/Shivani-8.JPG", "/photos/Shivani-15.JPG", "/photos/IMG_8340.JPG"],
  reasons: [
    "Your smile makes everything brighter.",
    "The little things you do are adorable.",
    "You make ordinary moments memorable.",
    "You have your own special way of making people smile.",
    "You deserve to feel appreciated every single day.",
    "Your laugh is one of the loveliest sounds.",
    "You bring warmth wherever you go.",
    "You notice the little details that matter.",
    "You make being yourself look beautiful.",
    "You have a wonderfully kind heart.",
    "Your enthusiasm is contagious.",
    "You make simple plans feel special.",
    "You are thoughtful in ways people remember.",
    "You have a light all your own.",
    "You make people feel welcome.",
    "Your determination is inspiring.",
    "You make the world feel softer.",
    "You have a beautiful way of seeing things.",
    "You can make a regular day feel like a celebration.",
    "Your little expressions always make me smile.",
    "You deserve every good thing coming your way.",
    "You are wonderfully, unmistakably you.",
    "You make kindness look effortless.",
    "Your presence makes a difference.",
    "You have a heart full of lovely things.",
    "You make every memory a little sweeter.",
    "You are stronger than you give yourself credit for.",
    "Your dreams deserve all the room to grow.",
    "You bring joy in your own unique way.",
    "You are easy to celebrate.",
    "You make even quiet moments feel comfortable.",
    "You care deeply, and it shows.",
    "You have a lovely sense of humor.",
    "You make happiness feel close by.",
    "You are more wonderful than you know.",
    "You bring out the best in a moment.",
    "You have a beautiful way of being brave.",
    "You are a lovely person to root for.",
    "Your ideas make things more interesting.",
    "You make thoughtful gestures feel natural.",
    "You deserve to hear how special you are.",
    "You make smiles happen without even trying.",
    "You have a kind of magic no one else has.",
    "You are a bright spot in someone's day.",
    "You keep growing into someone incredible.",
    "You make the people around you feel lucky.",
    "You are always worth the extra effort.",
    "You make your own kind of beautiful.",
    "You have so much goodness inside you.",
    "You make even little celebrations matter.",
    "You are a wonderful person to know.",
    "Your courage deserves to be celebrated.",
    "You make life feel more colorful.",
    "You bring a little wonder to everyday things.",
    "You are deserving of gentle days and big joys.",
    "You make people feel seen.",
    "Your heart is one of your best qualities.",
    "You are a reason to believe in good things.",
    "You make a lovely impression just by being you.",
    "You are full of possibilities.",
    "You make caring feel like a superpower.",
    "You have a smile that stays in someone's thoughts.",
    "You make being around you feel easy.",
    "You are special in a million small ways.",
    "Your happiness matters so much.",
    "You make lovely things even lovelier.",
    "You have a wonderful way of making memories.",
    "You are a little ray of sunshine.",
    "You deserve a birthday as lovely as you are.",
    "You make the future feel exciting.",
    "You are worthy of all the love you give.",
    "You make every chapter more interesting.",
    "You have a gentle strength about you.",
    "You bring your own sparkle to every room.",
    "You are the best version of yourself.",
    "You make someone grateful for the little things.",
    "You are a lovely reason to celebrate today.",
    "You have so much to be proud of.",
    "You make the world a friendlier place.",
    "You deserve kindness on ordinary days too.",
    "You have a one-of-a-kind heart.",
    "You make every good memory worth keeping.",
    "You are more than enough, just as you are.",
    "You make life feel a little more magical.",
    "You deserve big dreams and the courage to chase them.",
    "You bring comfort just by being there.",
    "You are wonderful in ways words can't quite capture.",
    "You make happiness feel like home.",
    "You have a beautiful story still unfolding.",
    "You make someone smile just by crossing their mind.",
    "You are a gift to the people who know you.",
    "You make the little moments count.",
    "You deserve to be celebrated loudly and loved gently.",
    "You have a sparkle that is entirely your own.",
    "You make every birthday wish worth making.",
    "You are loved for exactly who you are.",
    "Today, tomorrow, and always—you are so special.",
    "Because the world is better with you in it.",
    "You make every new beginning feel full of promise.",
    "You deserve a lifetime of reasons to smile.",
  ],
};

export const albums: Album[] = config.albums.map((album, albumIndex) => ({
  ...album,
  photos: (albumIndex === 0 ? config.photos : config.photos.filter((photo) => photo.album === album.name)).map((photo) => ({
    ...photo,
    caption: photo.caption,
    date: photo.date,
  })),
}));
