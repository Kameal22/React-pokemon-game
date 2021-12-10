export const checkElement = (userElement, enemyElement, setAdv, adv) => {
  console.log(userElement);
  console.log(enemyElement);
  if (userElement === "water" && enemyElement === "fire") {
    console.log("INCONDITIONAL");
    setAdv(!adv);
  }
};

// DZIAŁA ALE PO KOLEJNYM KLIKNIĘCIU > JEBANY LAG

//grass, fire, water, bug, normal, poison, electric, ground, fairy, psychic, fighting, rock, ghost,
