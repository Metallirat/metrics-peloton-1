export const GREY = "#bbbbbb";
export const colors ={
  purpleplum: "#A44DD0",
  darkslateblue: "#54478cff",
  sapphireblue: "#2c699aff",
  bluemunsell: "#048ba8ff",
  keppel: "#0db39eff",
  darkpastelgreen: "#3DBC45",
  princetonorange: "#E87C24",
  burntsienna: "#ee6c4dff",
  radicalred: "#FF1654",
  vividburgundy: "#9e0031ff",
};
// export const colors = {
//   // maximumbluegreen: "#3fc1c0ff",
//   maximumbluegreen2: "#20bac5ff",
//   // pacificblue: "#00b2caff",
//   pacificblue2: "#04a6c2ff",
//   bluegreen: "#0899baff",
//   cgblue: "#0f80aaff",
//   sapphireblue: "#16679aff",
//   lapislazuli: "#1a5b92ff",
//   usafablue: "#1c558eff",
//   yaleblue: "#1d4e89ff",
//   prussianblue: "#012A4A",
// };
export const getDefaultColorArray = () => {
  const keys = Object.keys(colors);
  const array = [];
  keys.forEach((key) => {
    array.push(colors[key]);
  });
  return array;
};

export const getColorBasedOnArrayLengthAndIndex = (lengthOfArray, index) => {
  if (index >= lengthOfArray) {
    throw new Error("Index is out of range");
  }
  const colorPalette = getDefaultColorArray();
  // Most people only do a few different distances, don't want it to always be the first three colors of the rainbow. This allows spreading through evenly depending on how many different lengths of ride the user has done.
  const skip = Math.max(1, Math.floor(colorPalette.length / lengthOfArray));
  const arrayValue = index * skip;
  const color = colorPalette[arrayValue];

  return color;
};

export const getColorArrayBasedOnLength = (length) => {
  const array = [];
  for (let index = 0; index < length; index++) {
    if (index < getDefaultColorArray().length) {
      // 9 is the max in the getColor function
      array.push(getColorBasedOnArrayLengthAndIndex(length, index));
    } else {
      // Default to a grey
      array.push(GREY);
    }
  }
  return array;
};
