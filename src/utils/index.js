export const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const getCoordinates = (min, max) => {
  let isCorrect = false;
  let x, y;

  while (!isCorrect) {
    x = getRandomIntInclusive(min, max);
    y = getRandomIntInclusive(min, max);

    if (x !== y) {
      isCorrect = true;
    }
  }

  return { x, y };
};
