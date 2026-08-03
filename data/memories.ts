export type Memory = {
  text: string;
  img?: string;
};

export const memories: Partial<Record<number, Memory>> = {
  1: { text: "Den 24 juli 1996 föddes du, och världen blev genast lite ljusare 🌟", img: "/memories/memory1.jpg" },
  2: { text: "Jag tror faktiskt att du har förgyllt livet för alla runt dig ända sedan dess 💞", img: "/memories/memory2.jpg" },
  3: { text: "Det vet jag av egen erfarenhet.", img: "/memories/memory3.jpg" },
  4: { text: "Du har nog alltid varit den galnaste av oss syskon, på allra bästa sätt 🤪", img: "/memories/memory4.jpg" },
  5: { text: "Och att få bo tillsammans med dig bevisade verkligen det.", img: "/memories/memory5.jpg" },
  6: { text: "Det fanns liksom aldrig en tråkig dag i lägenheten.", img: "/memories/memory6.jpg" },
  7: { text: "Samtidigt har du alltid varit en förebild för mig.", img: "/memories/memory7.jpg" },
  8: { text: "Du har stått ut med alla mina faser och svängar genom livet.", img: "/memories/memory8.jpg" },
  9: { text: "Även när vi varit långt ifrån varandra har det alltid känts som att vi är ett team 👩🏼‍🤝‍👩🏻", img: "/memories/memory9.jpg" },
  10: { text: "Men jag vet också att det inte bara är mitt liv du förgyller.", img: "/memories/memory10.jpg" },
  11: { text: "Vår syskonskara hade inte varit hel utan dig.", img: "/memories/memory11.jpg" },
  12: { text: "I slutändan känns det ändå alltid som att det är vi fyra mot världen.", img: "/memories/memory12.jpg" },
  13: { text: "Och det stannar inte där, du är också en helt fantastisk moster.", img: "/memories/memory13.jpg" },
  14: { text: "Leah och Elton är så lyckligt lottade som får ha dig i sina liv.", img: "/memories/memory14.jpg" },
  15: { text: "Till och med de allra minsta dras till dig 🐕", img: "/memories/memory15.jpg" },
  16: { text: "Och Prince är bara ännu ett bevis på att man helt enkelt inte får nog av dig.", img: "/memories/memory16.jpg" },
  17: { text: "Du har hunnit göra så mycket i ditt liv, du har verkligen levt.", img: "/memories/memory17.jpg" },
  18: { text: "Du har vågat stort, drömt stort och gjort stora saker.", img: "/memories/memory18.jpg" },
  19: { text: "Det känns ofta som att du möter livet med full kraft.", img: "/memories/memory19.jpg" },
  20: { text: "Du kastar dig in i nya äventyr på ett sätt som inspirerar inte bara mig!", img: "/memories/memory20.jpg" },
  21: { text: "Och oavsett var du är lämnar du alltid avtryck efter dig.", img: "/memories/memory21.jpg" },
  22: { text: "Vem kunde ha fått en bättre syster än mig?", img: "/memories/memory22.jpg" },
  23: { text: "Du är så tokig och jag skattar inte med någon annan som jag skrattar med dig.", img: "/memories/memory23.jpg" },
  24: { text: "Varje stund tillsammans blir ett minne man inte glömmer.", img: "/memories/memory24.jpg" },
  25: { text: "Du har gett mig den bästa uppväxten och livet känns spå mycket större med dig!", img: "/memories/memory26.jpg" },
  26: { text: "Du får familjen att kännas ännu mer som hemma.", img: "/memories/memory25.jpg" },
  27: { text: "Och jag hoppas att du själv ser hur mycket du betyder för så många.", img: "/memories/memory27.jpg" },
  28: { text: "För tänk att den där lilla tjejen skulle få så stor betydelse i så många liv.", img: "/memories/memory28.jpg" },
  29: { text: "Jag älskar dig så mycket att jag nästan spricker ❤️‍🔥", img: "/memories/memory29.jpg" },
  30: { text: "Grattis på din dag! Du förtjänar all kärlek som finns ❤️", img: "/memories/memory30.jpg" },
};

export const fallbackMemory: Memory = {
  text: "A beautiful memory.",
};
