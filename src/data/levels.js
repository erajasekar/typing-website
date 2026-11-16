// Course levels, easiest first. Each level only uses characters the learner
// has been taught so far (enforced by tests).
export const LEVELS = [
  {
    id: 1,
    title: 'Home Row',
    blurb: 'Rest your fingers on A S D F and J K L ; and learn where they live.',
    minAccuracy: 80,
    text: "asdf jkl; fdsa ;lkj asdf jkl; fdsa ;lkj gh hg gh hg ask dad sad lad fad gag hag lag sag flag glad hall shall flash slash salad alfalfa gash half hash lash dash all fall hall jag; a sad lad had a flask; dad has a glad salad; all gals dash; ask a lad ask a gal",
  },
  {
    id: 2,
    title: 'Top Row',
    blurb: 'Reach up for Q W E R T Y U I O P without losing the home row.',
    minAccuracy: 82,
    text: 'type your quit power write tree wire pipe quiet pretty trophy pirate poetry router property worry outputs powerful tour pour four your hour joke wise tire fire hire; the pilot is ready; try your dusty tire; i will type with pride; pop is quite hot; we owe you a pretty rope',
  },
  {
    id: 3,
    title: 'Bottom Row',
    blurb: 'Stretch down to Z X C V B N M and the comma and period.',
    minAccuracy: 84,
    text: 'the quick brown fox jumps over the lazy dog. zebra brave vivid maximum cabin number never zoom exam climb vacuum common crazy knack. a calm monkey ate bananas, mangoes, and plums. we can move, jump, and zoom across the bumpy track. maxine vowed to beat the clock, and she did.',
  },
  {
    id: 4,
    title: 'Capital Letters',
    blurb: 'Hold Shift with your opposite pinky to make capitals.',
    minAccuracy: 86,
    text: 'The Quick Brown Fox Jumps Over The Lazy Dog. Maria and Jack went to Paris, London, and Rome. Zoe Baker won the Grand Prix in Monaco. Every Friday, Oliver and Quinn visit Boston. Tom Hill drives the Red Falcon, and Amy Cruz drives the Blue Viper.',
  },
  {
    id: 5,
    title: 'Numbers',
    blurb: 'Reach for the number row without looking down.',
    minAccuracy: 88,
    text: 'In 2025 we typed 1234567890 times. Room 404 has 12 desks, 30 chairs, and 7 lamps. Call 555-0198 or 555-0147 after 9 and before 10. The race has 58 laps, 305 miles, and 20 cars. Car 44 started in 3rd place, car 16 in 5th, and car 1 in 12th.',
  },
  {
    id: 6,
    title: 'Punctuation',
    blurb: "Commas, apostrophes, question marks and exclamation points.",
    minAccuracy: 90,
    text: "Wait, what? Did you see that! Dad said it's time to go; let's hurry! Isn't it fun to type fast? Yes, it is! Pit stops take 2 seconds, so every move counts. Ready, set, go! Don't stop now, you're doing great; keep your eyes on the road ahead.",
  },
  {
    id: 7,
    title: 'Short Paragraph',
    blurb: 'Put it all together with a real paragraph.',
    minAccuracy: 90,
    text: 'Every great driver starts in the slow lane. At first, your fingers feel clumsy, and mistakes happen often. But with a little practice each day, you get faster and smoother. Soon you will glide across the keys like a race car on a clear track, and typing will feel as natural as breathing.',
  },
  {
    id: 8,
    title: 'Grand Prix',
    blurb: 'The final lap: a full-length paragraph at race pace.',
    minAccuracy: 92,
    text: "The Grand Prix begins at dawn. Engines roar, crowds cheer, and 20 cars line up on the starting grid. Every driver knows that winning takes more than speed; it takes focus, patience, and plenty of practice. Typing is no different! When you sit down at the keyboard, your goal is to stay calm, keep your hands on the home row, and let your fingers do the work. Don't rush; accuracy comes first, and speed follows naturally. Each lap you complete makes you a little quicker, and each mistake teaches you something new. By the time you cross the finish line, you will have typed thousands of letters without looking down even once. That is a victory worth celebrating, so take a deep breath, smile, and start your engines!",
  },
];
