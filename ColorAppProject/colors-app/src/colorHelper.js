import chroma from "chroma-js";

const levels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

const generatePalette = starterPalette => {
  let newPalette = {
    paletteName: starterPalette.paletteName,
    id: starterPalette.id,
    emoji: starterPalette.emoji,
    colors: {}
  };

  for (let level of levels) {
    newPalette.colors[level] = [];
    /*
     * This will create like
     * 50th index : new array
     * 100th index: new array
     * 200th index: new array
     * so index : new array
     * this index are 50, 100 etc coming from levels
     */
  }
  for (let color of starterPalette.colors) {
      let scale = getSc
  }
};

/*
 * This function basically returns basically three colors.
 * starting from darkening our hex color, then
 * our passed color as middle value
 * and ending at white color
 * so if we pass lets say 2345, it will be 2345 with a bit
 * darkened, then 2345 and finally white
 */
const getRange = hexColor => {
  const end = "#fff";
  return [
    chroma(hexColor)
      .darken(1.4)
      .hex(),
    hexColor,
    end
  ];
};

const generateScale = (hexColor, numberofColors) => {
  return chroma
    .scale(getRange(hexColor))
    .mode("lab")
    .colors(numberofColors);
};
