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
     * look at the doc to see what it will look like called pic
     * Array
     */
  }
  for (let color of starterPalette.colors) {
    /*
     * So here what we are doing is that
     * we are generating a scale of colors for each single color in
     * the outermost loop,
     * and after wards, adding it to the array
     * the lightest color will go to 50th index,
     * second lightest color will go to 100th index,
     * the darkest will go to 900th index and so on
     *
     * The reason we are reversing it, we want to have the ligher
     * colors at the begining, and brigher/darker color at the
     * end of array. The way we are generating colors are in
     * opposite (remember we pass as range the darker version of the color,
     * then the color and white, so the scale generates from dark to light, the opposite
     * way)
     *
     * So by the time scale finishes running the funciton, it will have ligher colors
     * at the begining, and brigher color at the end
     */
    let scale = getScale(color.color, 10).reverse();
    /*
     * So what we are doing here is that for every color in the palette
     * we are generating a range of colors, and then lets say we have color 'x',
     * so x will have some ligher colors and brighter colors after generating. We take the ligher colors
     * of x and push it to lower indexes like 50th, 100th etc, and brighter to higher indexes
     * We do that for every colors, so for color y, color z etc
     */
    for (let i in scale) {
      newPalette.colors[levels[i]].push({
        name: `${color.name} ${levels[i]}`,
        // this means replace a space globally with a -
        id: color.name.toLowerCase().replace(/ /g, "-"),
        hex: scale[i],
        rgb: chroma(scale[i]).css(),
        rgba: chroma(scale[i]).css("rgba")
      });
    }
  }
  return newPalette;
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

/*
 * this is where we are generating the colors
 * we pass in a range that we get from getRange function
 * and it generates the scale based on that range
 */
const getScale = (hexColor, numberofColors) => {
  return chroma
    .scale(getRange(hexColor))
    .mode("lab")
    .colors(numberofColors);
};

export { generatePalette };
