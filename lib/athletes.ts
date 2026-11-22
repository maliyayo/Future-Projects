/**
 * Athlete content. Every fact here is sourced from public records (ESPN, NFL.com,
 * floridagators.com, seminoles.com, Wikipedia cross-checked). See /RESEARCH.md for
 * sources and verification notes before changing any number.
 */

export type StatTable = { caption: string; columns: string[]; rows: (string | number)[][]; totals?: (string | number)[]; note?: string };
export type Milestone = { year: string; date?: string; title: string; body: string; era: "high-school" | "college" | "pro" | "beyond" };
export type Athlete = {
  slug: string;
  index: string;
  name: string;
  first: string;
  last: string;
  number: string;
  numberNote: string;
  position: string;
  league: string;
  team: string;
  teamShort: string;
  college: string;
  hometown: string;
  hook: string;
  dek: string;
  highlights: { value: string; label: string }[];
  portrait: string;
  portraitAlt: string;
  altImage: string;
  altImageAlt: string;
  heroFocus: string;
  vitals: { label: string; value: string }[];
  headline: { lead: string; em: string };
  narrative: string[];
  quote?: { text: string; by: string; source: string; href: string };
  counters: { to: number; decimals?: number; suffix?: string; label: string }[];
  proStats: StatTable;
  collegeStats: StatTable;
  testing: { caption: string; items: { label: string; value: string }[]; note: string };
  timeline: Milestone[];
  brand: { ethos: string; pillars: { title: string; body: string }[]; fit: string[] };
  media: { kind: "Photo" | "Press" | "Profile" | "Stats"; title: string; source: string; href?: string; image?: string }[];
  profiles: { label: string; href: string }[];
};

export const athletes: Athlete[] = [
  {
    slug: "quinton-dunbar",
    index: "01",
    name: "Quinton Dunbar",
    first: "Quinton",
    last: "Dunbar",
    number: "47",
    numberNote: "Washington, 2015–17",
    position: "Cornerback",
    league: "NFL",
    team: "Washington Redskins · Seattle Seahawks",
    teamShort: "Washington",
    college: "University of Florida",
    hometown: "Miami, FL",
    hook: "The Miami receiver who reinvented himself as an NFL cornerback in a single training camp.",
    dek: "Undrafted in 2015. Converted from wide receiver to cornerback that August. Four years later, one of the league's best cover corners.",
    highlights: [
      { value: "UDFA", label: "to NFL starter" },
      { value: "10", label: "career interceptions" },
      { value: "4", label: "INTs in 2019, a career high" },
    ],
    portrait: "/img/quinton-1.webp",
    portraitAlt: "Quinton Dunbar in his Washington uniform",
    altImage: "/img/quinton-2.webp",
    altImageAlt: "Quinton Dunbar in Washington practice gear",
    heroFocus: "50% 30%",
    vitals: [
      { label: "Height / Weight", value: "6'2\" · 202 lb" },
      { label: "College", value: "Florida, 2010–14" },
      { label: "Entry", value: "2015 · Undrafted FA" },
      { label: "NFL Seasons", value: "6 (2015–20)" },
      { label: "Hometown", value: "Miami, FL" },
      { label: "Representation", value: "IAG Client" },
    ],
    headline: { lead: "Built for the", em: "other side of the ball." },
    narrative: [
      "Quinton Dunbar's football story starts on the field at Booker T. Washington High School in Miami, where he made the All-Dade first team as a wide receiver and became a four-star recruit. He chose the University of Florida, and over five seasons in Gainesville (2010–14) he became one of the Gators' most dependable targets: 111 catches for 1,500 yards and 8 touchdowns in 49 games, including a catch in 32 consecutive games, the third-longest streak in school history.",
      "The 2015 NFL Draft came and went without his name being called. Washington signed him as an undrafted free agent receiver wearing No. 17. Then training camp changed everything. Coaches watched the 6-foot-2 Dunbar jam gunners in punt-coverage drills and saw a cornerback: long arms, real speed and the instincts of a player who knew exactly what receivers wanted to do. In early August 2015, they moved him to defense.",
      "Most conversions like that take years. Dunbar's took months. He started the season on the practice squad, was promoted to the active roster in late September, made his NFL debut in October and recorded his first career interception that November. By January 2016 he was playing in his first NFL playoff game, at a position he had been learning for less than six months.",
      "Washington rewarded the rise on January 1, 2018 with a three-year, $10.5 million extension. In 2018 he became a full-time starter, and in 2019 he put together the best season of his career: a team-leading four interceptions in 11 starts, with Pro Football Focus grading him the No. 2 cornerback in the league in coverage, as reported by NFL.com.",
      "That season put him firmly on the league's radar. In March 2020 the Seattle Seahawks traded a fifth-round pick for him, and he opened the season as a starter before a knee injury ended his year. He finished his NFL career with 64 games, 31 starts, 10 interceptions and 40 passes defended, numbers built by a player the league once passed over entirely.",
      "Dunbar's career is the clearest proof of what Infinity Athletic Group believes: talent is only the beginning. The athletes who last are the ones willing to rebuild themselves, and the ones with a team around them that sees the whole person, not just the position.",
    ],
    quote: {
      text: "I was excited. The coaches see the potential, so I'm all for it.",
      by: "Quinton Dunbar, on his move to cornerback",
      source: "ESPN, August 2015",
      href: "https://www.espn.com/blog/washington-commanders/post/_/id/18743/quinton-dunbar-embraces-switch-to-corner-for-washington-redskins",
    },
    counters: [
      { to: 64, label: "NFL games" },
      { to: 10, label: "Interceptions" },
      { to: 40, label: "Passes defended" },
      { to: 180, label: "Total tackles" },
    ],
    proStats: {
      caption: "NFL regular season · defense",
      columns: ["Season", "Team", "G", "GS", "Tkl", "INT", "PD", "Sack"],
      rows: [
        ["2015", "WAS", 11, 2, 13, 1, 5, "0.0"],
        ["2016", "WAS", 14, 2, 26, 1, 5, "1.0"],
        ["2017", "WAS", 15, 4, 35, 1, 8, "0.0"],
        ["2018", "WAS", 7, 6, 39, 2, 9, "0.0"],
        ["2019", "WAS", 11, 11, 37, 4, 8, "0.0"],
        ["2020", "SEA", 6, 6, 30, 1, 5, "0.0"],
      ],
      totals: ["Career", "", 64, 31, 180, 10, 40, "1.0"],
      note: "Source: ESPN and NFL.com career stats (figures agree).",
    },
    collegeStats: {
      caption: "University of Florida · receiving",
      columns: ["Season", "G", "GS", "Rec", "Yds", "TD"],
      rows: [
        ["2010", 1, 0, 0, 0, 0],
        ["2011", 12, 5, 14, 216, 2],
        ["2012", 13, 8, 36, 383, 4],
        ["2013", 12, 12, 40, 548, 0],
        ["2014", 11, 8, 21, 353, 2],
      ],
      totals: ["Career", 49, 33, 111, "1,500", 8],
      note: "Source: University of Florida official game logs. Longest catch: 83 yards vs. Georgia, 2013.",
    },
    testing: {
      caption: "2015 Florida Pro Day",
      items: [
        { label: "40-yard dash", value: "4.44s" },
        { label: "Vertical", value: "35\"" },
        { label: "Broad jump", value: "10'0\"" },
        { label: "Short shuttle", value: "4.16s" },
        { label: "3-cone", value: "7.10s" },
        { label: "Bench (225)", value: "7 reps" },
      ],
      note: "Reported pro-day results (DraftScout).",
    },
    timeline: [
      { year: "2011", date: "Nov 19, 2011", era: "college", title: "First touchdown, start of the streak", body: "A 29-yard touchdown against Furman, and the first game of what became a 32-game streak with a catch." },
      { year: "2013", date: "Jan 2, 2013", era: "college", title: "Sugar Bowl stage", body: "Five catches for 77 yards against Louisville in the Sugar Bowl." },
      { year: "2014", date: "Oct 4, 2014", era: "college", title: "32 straight games with a catch", body: "The third-longest streak in University of Florida history." },
      { year: "2015", date: "May 2015", era: "pro", title: "Signed as an undrafted free agent", body: "Washington signs him as a wide receiver wearing No. 17." },
      { year: "2015", date: "Aug 2015", era: "pro", title: "Wide receiver to cornerback", body: "Coaches move him to defense during training camp, impressed by his length, speed and physicality." },
      { year: "2018", date: "Jan 1, 2018", era: "pro", title: "Three-year, $10.5M extension", body: "Washington commits to the converted corner with $5.25 million guaranteed." },
      { year: "2019", date: "2019 season", era: "pro", title: "Career year", body: "A team-leading four interceptions in 11 starts; PFF's No. 2 cornerback in coverage, per NFL.com." },
      { year: "2020", date: "Mar 2020", era: "pro", title: "Traded to Seattle", body: "The Seahawks trade a fifth-round pick to add him to their secondary; he opens 2020 as a starter." },
    ],
    brand: {
      ethos: "Reinvention, versatility and Miami grit. Dunbar's story speaks to anyone who has been overlooked and refused to stay that way.",
      pillars: [
        { title: "Hometown Miami", body: "A Booker T. Washington alum with a natural connection to South Florida youth football, schools and community programs." },
        { title: "The Conversion Story", body: "One of the NFL's rare successful receiver-to-cornerback conversions, a ready-made narrative for training, mindset and resilience content." },
        { title: "Two-Way Football IQ", body: "He has played both sides of the matchup, making him a credible voice for film study, clinics and position camps." },
      ],
      fit: ["Youth football camps & clinics", "Training & performance brands", "Miami community activations", "Speaking: resilience & reinvention", "Football education content"],
    },
    media: [
      { kind: "Photo", title: "Washington, game day", source: "IAG archive", image: "/img/quinton-1.webp" },
      { kind: "Photo", title: "Training camp, 2015", source: "IAG archive", image: "/img/quinton-2.webp" },
      { kind: "Press", title: "Quinton Dunbar embraces switch to corner", source: "ESPN", href: "https://www.espn.com/blog/washington-commanders/post/_/id/18743/quinton-dunbar-embraces-switch-to-corner-for-washington-redskins" },
      { kind: "Press", title: "Washington signs Dunbar to three-year extension", source: "NFL.com", href: "https://www.nfl.com/news/redskins-sign-quinton-dunbar-to-three-year-extension-0ap3000000901656" },
      { kind: "Press", title: "Seahawks reshape secondary, acquire Dunbar", source: "ESPN", href: "https://www.espn.com/nfl/story/_/id/28944167/seahawks-reshape-defensive-backfield-acquire-cb-quinton-dunbar-redskins" },
      { kind: "Stats", title: "Career statistics", source: "NFL.com", href: "https://www.nfl.com/players/quinton-dunbar/stats/" },
    ],
    profiles: [
      { label: "ESPN", href: "https://www.espn.com/nfl/player/_/id/2516049/quinton-dunbar" },
      { label: "NFL.com", href: "https://www.nfl.com/players/quinton-dunbar/" },
      { label: "Florida Gators", href: "https://floridagators.com/sports/football/roster/quinton-dunbar/1892" },
    ],
  },
  {
    slug: "rashad-greene",
    index: "02",
    name: "Rashad Greene",
    first: "Rashad",
    last: "Greene",
    number: "13",
    numberNote: "Jacksonville, 2015–18",
    position: "Wide Receiver · Punt Returner",
    league: "NFL",
    team: "Jacksonville Jaguars",
    teamShort: "Jacksonville",
    college: "Florida State University",
    hometown: "Albany, GA · Fort Lauderdale, FL",
    hook: "A national champion and Florida State's all-time leader in receptions and receiving yards.",
    dek: "Nine catches for 147 yards in the BCS National Championship Game. A record-setting Seminoles career. A touchdown in his NFL debut.",
    highlights: [
      { value: "BCS", label: "National Champion, 2013" },
      { value: "270", label: "career catches at FSU" },
      { value: "73", label: "yard punt-return TD, rookie year" },
    ],
    portrait: "/img/rashad-1.webp",
    portraitAlt: "Rashad Greene in his Jacksonville Jaguars uniform holding his helmet",
    altImage: "/img/rashad-2.webp",
    altImageAlt: "Rashad Greene, arms crossed, in a Jaguars jersey",
    heroFocus: "45% 25%",
    vitals: [
      { label: "Height / Weight", value: "5'11\" · 186 lb" },
      { label: "College", value: "Florida State, 2011–14" },
      { label: "Entry", value: "2015 Draft · Rd 5, No. 139" },
      { label: "NFL", value: "Jacksonville, 2015–18" },
      { label: "Hometown", value: "Albany, GA" },
      { label: "Representation", value: "IAG Client" },
    ],
    headline: { lead: "The record book", em: "has his name in it." },
    narrative: [
      "Rashad Greene was born in Albany, Georgia, and finished high school at St. Thomas Aquinas in Fort Lauderdale, one of the most storied programs in Florida. As a senior he caught 43 passes for 943 yards and 13 touchdowns, then helped Aquinas finish a perfect 15-0 season with six catches for 148 yards and two scores in the state title game.",
      "At Florida State he made an impact immediately. As a freshman in 2011 he was named MVP of the Champs Sports Bowl in an 18-14 win over Notre Dame. By 2013 he was the leading receiver on one of the great teams in college football history, catching 76 passes for 1,128 yards and earning first-team All-ACC honors.",
      "His defining moment came on January 6, 2014, in the BCS National Championship Game against Auburn. Greene led the Seminoles with nine catches for 147 yards, including a 49-yard reception on the game-winning final drive. Florida State won 34-31 and the national title.",
      "He came back for his senior season as a team captain and put together a 99-catch, 1,365-yard year, passing Ron Sellers to become Florida State's career leader in both receptions and receiving yards. He finished with 270 catches, 3,830 yards and 29 touchdowns, and a second straight first-team All-ACC selection.",
      "The Jacksonville Jaguars drafted him in the fifth round of the 2015 NFL Draft, 139th overall. He caught a touchdown pass in his NFL debut, and that December returned a punt 73 yards for a touchdown against the Colts. Over three active seasons in Jacksonville he added 30 catches and 448 punt-return yards, working back from an Achilles injury that cost him 2017.",
      "Greene's second act has been as deliberate as his first. In 2020 he completed his bachelor's degree in sport management at Florida State with a 3.25 GPA in his major, and Florida State Athletics reported that he and his wife, Jasmine, co-own All About Me Childcare in Tallahassee. It's the kind of whole-life plan Infinity Athletic Group builds every career around.",
    ],
    counters: [
      { to: 270, label: "FSU receptions" },
      { to: 3830, label: "FSU receiving yards" },
      { to: 29, label: "FSU touchdowns" },
      { to: 448, label: "NFL punt-return yards" },
    ],
    proStats: {
      caption: "NFL regular season · receiving & returns",
      columns: ["Season", "Team", "G", "Rec", "Yds", "TD", "PR", "PR Yds", "PR TD"],
      rows: [
        ["2015", "JAX", 9, 19, 93, 2, 18, 301, 1],
        ["2016", "JAX", 8, 5, 32, 0, 21, 131, 0],
        ["2017", "JAX", "IR", "-", "-", "-", "-", "-", "-"],
        ["2018", "JAX", 8, 6, 60, 0, 2, 16, 0],
      ],
      totals: ["Career", "", 25, 30, 185, 2, 41, 448, 1],
      note: "Source: ESPN and NFL.com career stats (figures agree). Also 5 kick returns for 105 yards (2018).",
    },
    collegeStats: {
      caption: "Florida State University · receiving",
      columns: ["Season", "Class", "G", "Rec", "Yds", "TD"],
      rows: [
        ["2011", "FR", 9, 38, 596, 7],
        ["2012", "SO", 14, 57, 741, 6],
        ["2013", "JR", 14, 76, "1,128", 9],
        ["2014", "SR", 14, 99, "1,365", 7],
      ],
      totals: ["Career", "", 51, 270, "3,830", 29],
      note: "Season rows sum exactly to career totals.",
    },
    testing: {
      caption: "2015 NFL Scouting Combine",
      items: [
        { label: "40-yard dash", value: "4.53s" },
        { label: "Vertical", value: "36.5\"" },
        { label: "Broad jump", value: "10'2\"" },
        { label: "Short shuttle", value: "4.12s" },
        { label: "3-cone", value: "6.88s" },
        { label: "Hand size", value: "9\"" },
      ],
      note: "NFL Scouting Combine results.",
    },
    timeline: [
      { year: "2010", date: "Dec 2010", era: "high-school", title: "Perfect season", body: "Six catches, 148 yards and two touchdowns as St. Thomas Aquinas finishes 15-0 with the state title." },
      { year: "2011", date: "Dec 29, 2011", era: "college", title: "Champs Sports Bowl MVP", body: "As a freshman, named MVP in Florida State's 18-14 win over Notre Dame." },
      { year: "2013", date: "2013 season", era: "college", title: "First-team All-ACC", body: "Leads the Seminoles with 76 catches for 1,128 yards." },
      { year: "2014", date: "Jan 6, 2014", era: "college", title: "National champion", body: "Nine catches for 147 yards, including a 49-yard catch on the winning drive, as FSU beats Auburn 34-31." },
      { year: "2014", date: "2014 season", era: "college", title: "Florida State's record holder", body: "Team captain; 99 catches; passes Ron Sellers for the school's career receptions and receiving-yards records." },
      { year: "2015", date: "May 2015", era: "pro", title: "Drafted by Jacksonville", body: "Fifth round, 139th overall, in the 2015 NFL Draft." },
      { year: "2015", date: "Dec 13, 2015", era: "pro", title: "73-yard punt-return touchdown", body: "His signature NFL play, against the Indianapolis Colts." },
      { year: "2020", date: "May 2020", era: "beyond", title: "Degree earned", body: "Completes his Florida State bachelor's degree in sport management." },
    ],
    brand: {
      ethos: "Championship pedigree with a family-first, entrepreneurial second act. Greene's story connects winning on the biggest stage with building something lasting at home.",
      pillars: [
        { title: "Seminole Legacy", body: "A national champion and the program's career receptions and receiving-yards leader, with deep credibility across the FSU fan base." },
        { title: "Entrepreneur & Family Man", body: "Reported by Florida State Athletics (2020) as co-owner, with his wife Jasmine, of All About Me Childcare in Tallahassee: an authentic platform for family, education and community." },
        { title: "Finish What You Start", body: "Went back to finish his sport-management degree after the NFL, a powerful message for student-athletes." },
      ],
      fit: ["Florida State & Tallahassee activations", "Family & education brands", "Student-athlete speaking", "Receiver & return-specialist camps", "Small-business partnerships"],
    },
    media: [
      { kind: "Photo", title: "Jacksonville, portrait", source: "IAG archive", image: "/img/rashad-1.webp" },
      { kind: "Photo", title: "Jaguars media day", source: "IAG archive", image: "/img/rashad-2.webp" },
      { kind: "Press", title: "Greene balances family, business and school to earn FSU degree", source: "Florida State Athletics", href: "https://seminoles.com/football-star-greene-balances-family-business-and-school-to-earn-fsu-degree/" },
      { kind: "Press", title: "2014 BCS National Championship Game", source: "Wikipedia", href: "https://en.wikipedia.org/wiki/2014_BCS_National_Championship_Game" },
      { kind: "Stats", title: "Career statistics", source: "NFL.com", href: "https://www.nfl.com/players/rashad-greene/stats/career" },
      { kind: "Profile", title: "Player profile", source: "ESPN", href: "https://www.espn.com/nfl/player/_/id/2576785/rashad-greene" },
    ],
    profiles: [
      { label: "ESPN", href: "https://www.espn.com/nfl/player/_/id/2576785/rashad-greene" },
      { label: "NFL.com", href: "https://www.nfl.com/players/rashad-greene/" },
      { label: "Florida State", href: "https://seminoles.com/football-star-greene-balances-family-business-and-school-to-earn-fsu-degree/" },
    ],
  },
];

export const getAthlete = (slug: string) => athletes.find((a) => a.slug === slug);
export const nextAthlete = (slug: string) => {
  const i = athletes.findIndex((a) => a.slug === slug);
  return athletes[(i + 1) % athletes.length];
};
