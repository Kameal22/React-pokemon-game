const checkElement = (userElement, enemyElement, setAdv, adv) => {
  if (
    (userElement === "water" && enemyElement === "fire") ||
    enemyElement === "rock" ||
    enemyElement === "ground"
  ) {
    setAdv(!adv);
  }
};

const enemyNormalAttack = (enemyAtt, userDef, userHp) => {};

export { checkElement };
//grass, fire, water, bug, normal, poison, electric, ground, fairy, psychic, fighting, rock, ghost,
