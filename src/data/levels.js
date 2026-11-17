// Course levels, easiest first. Each level only uses characters the learner
// has been taught so far (enforced by tests). Early levels are short, simple
// sentences; later levels grow into longer, more complex prose.
export const LEVELS = [
  {
    id: 1,
    title: 'Home Row',
    blurb: 'Rest your fingers on A S D F and J K L ; and type simple sentences.',
    minAccuracy: 80,
    text: "a lad has a flag; dad has a salad; a glad lass asks dad; dad adds a flask; a sad gal falls; all lads dash; dad's flask falls; a lass has half a salad; ask a glad lad; all gals had a fall; dad shall add gas; a lad asks dad; all salads shall fall; dad's glad lass has a flag; a sad lad had a flask; ask dad; dad asks a lass; all lads shall dash",
  },
  {
    id: 2,
    title: 'Top Row',
    blurb: 'Reach up for Q W E R T Y U I O P and write real sentences.',
    minAccuracy: 82,
    text: "the pilot is ready; try to type your story; i will write it today; she is quite proud of the tower; we hope to eat pie at four; the tiger is quite quiet; your pet is pretty; the tutor said to type with pride; pop is outside; the girl tried to ride a horse; i see the poppy top; the wise old writer put the paper there; our guest rose early to wrap the gift; you pour the tea; the dog is loud; take the toys outside",
  },
  {
    id: 3,
    title: 'Bottom Row',
    blurb: 'Stretch down to Z X C V B N M and add commas and periods.',
    minAccuracy: 84,
    text: "the quick brown fox jumps over the lazy dog. a calm monkey ate bananas, mangoes, and plums. we can move, jump, and zoom across the bumpy track. maxine vowed to beat the clock, and she did. my brave cousin climbed the mountain, then he waved from the top. when the sun came up, the farmers carried baskets of vegetables to the market. a zebra and a camel walked beside the river, and nobody was in a hurry.",
  },
  {
    id: 4,
    title: 'Capital Letters',
    blurb: 'Hold Shift with your opposite pinky to make capitals.',
    minAccuracy: 86,
    text: 'The Quick Brown Fox Jumps Over The Lazy Dog. Maria and Jack went to Paris, London, and Rome. Zoe Baker won the Grand Prix in Monaco. Every Friday, Oliver and Quinn visit Boston. Tom Hill drives the Red Falcon, and Amy Cruz drives the Blue Viper. In July, Grandma Rosa took Peter and Nina to Spain, where they met Captain Diaz and sailed across the Mediterranean Sea.',
  },
  {
    id: 5,
    title: 'Numbers',
    blurb: 'Reach for the number row without looking down.',
    minAccuracy: 88,
    text: 'In 2025 we typed 1234567890 times. Room 404 has 12 desks, 30 chairs, and 7 lamps. Call 555-0198 or 555-0147 after 9 and before 10. The race has 58 laps, 305 miles, and 20 cars. Car 44 started in 3rd place, car 16 in 5th, and car 1 in 12th. By lap 40 the leader was 8 seconds ahead, but a pit stop of 2.5 seconds dropped him to 4th. At 6 o\'clock, 75 fans cheered as car 27 crossed the line in 1 hour and 32 minutes.',
  },
  {
    id: 6,
    title: 'Punctuation',
    blurb: 'Commas, apostrophes, quotes, colons, question marks and exclamation points.',
    minAccuracy: 90,
    text: "Wait, what? Did you see that! Dad said it's time to go; let's hurry! Isn't it fun to type fast? Yes, it is! Pit stops take 2 seconds, so every move counts. Ready, set, go! Don't stop now, you're doing great; keep your eyes on the road ahead. My coach always says: \"Slow down to speed up.\" Is she right? Well, today's practice proved it: when we stayed calm, we made fewer mistakes, and our scores - to everyone's surprise - went up!",
  },
  {
    id: 7,
    title: 'Short Paragraph',
    blurb: 'Put it all together with a real paragraph.',
    minAccuracy: 90,
    text: "Every great driver starts in the slow lane. At first, your fingers feel clumsy, and mistakes happen often. But with a little practice each day, you get faster and smoother. Soon you will glide across the keys like a race car on a clear track, and typing will feel as natural as breathing. Many beginners give up after the first week, yet those who keep going discover something wonderful: the keyboard stops being an obstacle and becomes a tool for sharing ideas, writing stories, and finishing homework in half the time. Patience, it turns out, is the fastest gear.",
  },
  {
    id: 8,
    title: 'Grand Prix',
    blurb: 'The final lap: a full-length passage at race pace.',
    minAccuracy: 92,
    text: "The Grand Prix begins at dawn. Engines roar, crowds cheer, and 20 cars line up on the starting grid. Every driver knows that winning takes more than speed; it takes focus, patience, and plenty of practice. Typing is no different! When you sit down at the keyboard, your goal is to stay calm, keep your hands on the home row, and let your fingers do the work. Don't rush; accuracy comes first, and speed follows naturally. Each lap you complete makes you a little quicker, and each mistake teaches you something new. Although the track ahead may seem long, remember that even the most celebrated champions - those who now appear on podiums around the world - once struggled to find the right key on the first try. They improved because they practiced deliberately, reviewed their errors without frustration, and trusted that steady effort would eventually become effortless skill. By the time you cross the finish line, you will have typed thousands of letters without looking down even once. That is a victory worth celebrating, so take a deep breath, smile, and start your engines!",
  },
];
