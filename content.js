/* ==========================================================================
   ✏️  EDIT EVERYTHING HERE
   --------------------------------------------------------------------------
   This file holds all the words, photos and little details on the page.
   You never need to touch index.html / style.css / script.js.

   • Text: change anything between the quotes "like this".
   • Photos: put new photos in the /photos folder and change the file name,
     e.g.  src: "photos/my-new-pic.jpg"
   • To add/remove an item from a list, copy/delete a whole { ... }, line
     (keep the comma at the end of each one).
   • Save the file and refresh the browser to see changes.
   ========================================================================== */

const CONTENT = {

  /* ---------- the basics ---------- */
  herName: "Muskan Sharma",                 // used in the big title + letter
  fromName: "Baldeep",  // how you sign off
  birthdayDate: "nov · 19 · 2003",    // shown on the little date stamps
  togetherSince: "2023-09-14",        // YYYY-MM-DD → powers the "days together" counter
  pageTitle: "Happy Birthday, my love ♡",

  // Optional background song: drop an .mp3 into /photos and put its path here,
  // e.g. "photos/our-song.mp3". Leave "" to hide the music button.
  music: "",

  /* ---------- lock screen (shown before anything else) ----------
     Cute, not secure: anyone reading this file can see the answer. */
  lock: {
    enabled: true,
    title: "this present is locked",
    question: "when did we become us? 💞",
    answerDate: "2023-09-14",            // YYYY-MM-DD — accepts 14/09/2023, 14-9-23, 14 sept 2023, 14092023…
    placeholder: "dd / mm / yyyy",
    button: "unlock ♡",
    wrongMessages: ["nope 🙅‍♀️ try again", "hmm… are you sure? 🤨", "wow. you forgot?? 😤", "i'm telling everyone 😭", "ok ok, one more try 🥺"],
    hint: "hint: a september day in 2023 🍂",
    hintAfter: 2,                        // show the hint after this many wrong tries
    rememberDevice: true,                // don't ask again on the same laptop
  },

  /* ---------- phone block ---------- */
  phoneBlock: {
    enabled: true,
    emoji: "💻",
    title: "not on a phone, sundari!",
    text: "this present is too big for a tiny screen. open the same link on a laptop ♡",
  },

  /* ---------- hero (top of the page) ---------- */
  hero: {
    kicker: "a tiny website, made just for you",
    titleLine1: "Happy Birthday,",
    titleLine2: "my love",            // gets the wobbly pink highlight
    subtitle: "priority: you. always you.",
    scrollCue: "scroll for the good stuff",
    photos: [
      { src: "photos/photo-05.jpg", caption: "us, obviously" },
      { src: "photos/photo-03.jpg", caption: "my favourite face" },
      { src: "photos/photo-19.jpg", caption: "certified goofball" },
    ],
  },

  /* ---------- No. 1 — about you ---------- */
  about: {
    kicker: "no. 1",
    title: "about you",
    sub: "a highly classified dossier",
    photo: "photos/photo-06.jpg",
    stamp: "TOO CUTE",
    fields: [
      { label: "name", value: "Muskan Sharma" },
      { label: "status", value: "23 years cuter (somehow)" },
      { label: "known for", value: "stealing my food + my heart" },
      { label: "weakness", value: "naked nuttela and matilda, apparently" },
    ],
    titlesHeading: "official titles",
    titles: [
      { emoji: "🥇", label: "cutest sleeper" },
      { emoji: "🧸", label: "cuddle engineer" },
      { emoji: "🍪", label: "snack connoisseur" },
      { emoji: "💃", label: "main character" },
    ],
    quote: "the world is a little lighter, a little louder and a lot softer with you in it.",
  },

  /* ---------- No. 2 — receipts of us (photo scrapbook) ---------- */
  scrapbook: {
    kicker: "no. 2",
    title: "receipts of us",
    sub: "evidence, in case anyone asks",
    // type: "video" for a video clip. Captions are optional.
    items: [
      { src: "photos/photo-04.jpg", caption: "D block moments" },
      { src: "photos/photo-10.jpg", caption: "late night walks" },
      { src: "photos/photo-11.jpg", caption: "traditional & glowing" },
      { src: "photos/video-01.mp4", caption: "press play ♡", type: "video" },
      { src: "photos/photo-14.jpg", caption: "flower power 🌼" },
      { src: "photos/photo-20.jpg", caption: "that smile tho" },
      { src: "photos/photo-26.jpg", caption: "peace ✌️ & love" },
      { src: "photos/photo-07.jpg", caption: "larping sasu maa" },
    ],
    favourite: { src: "photos/photo-13.jpg", caption: "this one's my favourite ~ look at us." },
  },

  /* ---------- photo reels (sliding filmstrips under the scrapbook) ----------
     • label: the handwritten title above the reel
     • direction: "left" or "right" (which way the reel slides)
     • style: "dark" (classic film) or "pink" (pink film)
     • photos: file names in the photos folder. Small preview copies live in
       photos/thumbs/ — if a photo has no thumb there, the full photo is used.
     • After adding, replacing or RENAMING photos, double-click make-thumbs.bat
       (in this folder) so the previews match your photos again.
  */
  reels: [
    {
      label: "more of you →",
      direction: "left",
      style: "dark",
      photos: [
        "photos/photo-01.jpg", "photos/photo-02.jpg", "photos/photo-08.jpg",
        "photos/photo-09.jpg", "photos/photo-12.jpg", "photos/photo-15.jpg",
        "photos/photo-16.jpg", "photos/photo-17.jpg", "photos/photo-21.jpg",
        "photos/photo-22.jpg", "photos/photo-24.jpg", "photos/photo-25.jpg",
        "photos/photo-27.jpg", "photos/photo-28.jpg",
        // new ones
        "photos/new-10.jpg", "photos/new-11.jpg",
        "photos/new-12.jpg", "photos/new-13.jpg", "photos/new-14.jpg",
        "photos/new-15.jpg", "photos/new-16.jpg", "photos/new-17.jpg",
        "photos/new-18.jpg", "photos/new-23.jpg", "photos/new-24.jpg",
        "photos/new-25.jpg", "photos/new-26.jpg", "photos/new-27.jpg",
        "photos/new-28.jpg", "photos/new-29.jpg", "photos/new-30.jpg",
        "photos/new-32.jpg", "photos/new-33.jpg", "photos/new-34.jpg",
        "photos/new-35.jpg", "photos/new-36.jpg", "photos/new-37.jpg",
        "photos/new-39.jpg", "photos/new-40.jpg",
      ],
    },
    {
      label: "← just us two",
      direction: "right",
      style: "pink",
      photos: [
        "photos/photo-03.jpg", "photos/new-01.jpg", "photos/photo-05.jpg",
        "photos/new-02.jpg", "photos/new-03.jpg", "photos/photo-10.jpg",
        "photos/new-05.jpg", "photos/new-06.jpg", "photos/photo-13.jpg",
        "photos/new-07.jpg", "photos/new-08.jpg", "photos/photo-04.jpg",
        "photos/new-09.jpg", "photos/new-19.jpg", "photos/photo-19.jpg",
        "photos/new-20.jpg", "photos/new-21.jpg", "photos/new-22.jpg",
        "photos/new-38.jpg", "photos/new-41.jpg", "photos/new-42.jpg",
        "photos/new-44.jpg", "photos/new-45.jpg",
      ],
    },
    {
      label: "im sorry :p",
      direction: "left",
      style: "dark",
      photos: [
        "photos/goof-01.jpg", "photos/goof-02.jpg", "photos/goof-03.jpg",
        "photos/goof-04.jpg", "photos/goof-05.jpg", "photos/goof-06.jpg",
        "photos/goof-07.jpg", "photos/goof-08.jpg", "photos/goof-09.jpg",
        "photos/goof-10.jpg", "photos/goof-11.jpg", "photos/goof-12.jpg",
        "photos/goof-13.jpg", "photos/goof-14.jpg", "photos/goof-15.jpg",
        "photos/goof-16.jpg", "photos/goof-17.jpg",
      ],
    },
  ],

  /* ---------- No. 3 — the cake ---------- */
  cake: {
    kicker: "no. 3",
    title: "the cake",
    sub: "tap each candle to blow it out",
    candles: 5,                         // how many candles (1–9 looks good)
    sidePhoto: { src: "photos/photo-23.jpg", caption: "practice round 🍰" },
    leftText: "candles left",           // "3 candles left"
    wishTitle: "make a wish!",
    wishText: "i already made mine. it was you. it's always you. ✨",
    relight: "light them again",
  },

  /* ---------- No. 4 — pinned with love (sticky notes) ---------- */
  notes: {
    kicker: "no. 4",
    title: "pinned with love",
    sub: "little wishes for your new year · hover (or tap) a note",
    // color: pink | yellow | mint | lilac | peach | cream
    items: [
      { text: "may your coffee always arrive warm ☕", color: "yellow" },
      { text: "may every playlist shuffle to your favourite song", color: "pink" },
      { text: "may you never run out of snacks (or me) 🍫", color: "mint" },
      { text: "may your selfies always catch the golden hour", color: "lilac" },
      { text: "may you laugh until your cheeks hurt — often", color: "peach" },
      { text: "may every single wish this year come true", color: "cream" },
      { text: "may you always know how loved you are", color: "pink" },
      { text: "may we have a million more of these birthdays", color: "yellow" },
    ],
  },

  /* ---------- No. 5 — the letter (envelope on watercolor hearts) ---------- */
  letter: {
    kicker: "no. 5",
    title: "the small print",
    sub: "there's a letter for you. go on, open it.",
    envelopeLabel: "for you ♡",
    tapHint: "tap to open",
    readHint: "tap the letter to read",
    greeting: "Meri sundari,",
    // The letter, top to bottom. Three kinds of lines:
    //   "some text"                                  → a paragraph
    //   { photo: "photos/x.jpg", caption: "..." }    → a taped photo (caption optional)
    //   { photos: [ {photo, caption}, {photo, caption} ] } → photos side by side
    // The first paragraph also peeks out of the envelope.
    paragraphs: [
      "Happy birthday, I love you so so soooo much.",
      "Tera fourth bday since the relationship started 🥳🥳🥳🥳, pehla manaya diwali pr ghar pr,",
      { photo: "photos/letter-01.jpg", caption: "ye ek december photo, kyuki usse pehle ki koi photo he nhi teri" },
      "Fir next bday tu gayi friends ke saath jharne pr, weird 🤮, mere saath hoti to jyada maza aaya pr thik koi na,",
      { photo: "photos/letter-04.jpg", caption: "Ye jo hoodie gift ki thi 🥰." },
      "Fir last bday mere saath tha, pr kuch kiya he nhi humne, koi photos bhi nhi hai 😖",
      { photo: "photos/letter-05.jpg", caption: "Ye hai ek chulbuli si tibetian market ki" },
      "Or ab aagaya ye bday bhi, socha tha iss baar mast manayenge, pr ghar reh gayi gaamdi, pr koi na, aajayegi tab dekh lenge.",
      "I wish ese 1000 bdays aate rahe, tu har saal ese he or sundar banti jaye or meko or bohot bohot bohot saara pyaar krta rahu 😘😘😘😘.",
      { photos: [
          { photo: "photos/letter-02.jpg", caption: "From fighting over" },
          { photo: "photos/letter-03.jpg", caption: "To" },
      ] },
      "this journey has been the most amazing thing that will ever happen to me, and i hope it goes on forever and ever.",
      "I wish this year tu or bohot bohot successful ho, or khush rahe and puri duniya ko ekdum bright rakhe. Sundar to tu hai he, i dont think isse jyada sundar hona or possible hai bhi, but i know tu hai to effortlessly kr he legi 😏.",
      "Abhi humari trips baaki hai, teko bohot saare gifts dene hai, tere saath duniya ghumni hai, tere saath shaadi krni hai, 7-8 bachhe krne hai, ek pyaare se apne ghar me rehna hai, roz sochta hu in sab ke baare me, mann he mann khush hota rehta hu, ek din ye sab bhi sach hojayega. Teri koi chhoti si baat yaad aajayegi jisse me hasna shuru krdunga, koi baat yaad aayegi jisse gussa aajata hai meko, koi baat yaad aayegi jisse mera ek ghanta sochne me nikal jayega ki boli kya ye. Ese he tere baare me soch soch kr din, hafte, mahine, saal nikal gaye mere. Pr ek cheez constant thi, mera mann tere se dur jaane ke liye kabhi nhi mana. Bhale jitne jhagde hue ho, break up tak hue ho, majboori se dur rehna pada ho, mere mann me humesha tere paas rehne ki iccha rehti thi. Jab kahi akela hou, tab achanak tera haath pakadne ka mann krta hai, achanak teko hug krne ka mann krta hai, teri khushbu ki yaad aajati hai, teri baate kaano me sunai deti hai, yahi sab ke wajah se me itna sure or itna pakka rehta hu ki ye ladki he chahiye meko. I really love you soooo much.",
      "I wish mene pi rakhi hoti, to me itna sharma na raha hota, or deep lafzo me tere liye mera pyaar ka izhaar kr raha hota. Koi na vo bhi krlenge moka mila to 😋.",
      "I hope that 23rd for you will be filled with blessings, new friends, new opportunities but one thing will remain the same, tera sexy sa bf 😎",
      { photo: "photos/letter-06.jpg" },
    ],
    // optional bullet list (leave list empty [] to hide it)
    listIntro: "",
    list: [],
    signoff: "I love you,",
    signName: "Baldeep pal singh kalsi",
    ps: "9998255137 (call me 🤙🫦)",
  },

  /* ---------- footer ---------- */
  footer: {
    line: "made with all of me, for you",
    edition: "a one-of-one edition",
    backToTop: "back to the top ↑",
  },
};
