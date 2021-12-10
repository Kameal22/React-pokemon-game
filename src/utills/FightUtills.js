export const checkElement = (userElement, enemyElement, setAdv, adv) => {
  if (
    (userElement === "water" && enemyElement === "fire") ||
    enemyElement === "rock" ||
    enemyElement === "ground"
  ) {
    setAdv(!adv);
  }
};

// DZIAŁA ALE PO KOLEJNYM KLIKNIĘCIU > JEBANY LAG

//grass, fire, water, bug, normal, poison, electric, ground, fairy, psychic, fighting, rock, ghost,
