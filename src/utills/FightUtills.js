export const checkElement = (userElement, enemyElement, setAdv, adv) => {
  if (userElement === "water" && enemyElement === "fire") {
    setAdv(!adv);
  }
};

//grass, fire, water, bug, normal, poison, electric, ground, fairy, psychic, fighting, rock, ghost,
