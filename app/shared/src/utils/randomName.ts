import generate from "server-name-gen";

export const randomName = (customNoun?: string) => {
  if (customNoun) {
    const randomName = generate({ words: 3 }).raw;
    randomName[2] = customNoun;
    return randomName.join("-");
  } else {
    return generate({
      words: 3,
      alliterative: true,
      blocklist: ["slave"],
    }).dashed;
  }
};
