const checkElement = (userElement, enemyElement, setAdv, adv) => {
  if (
    (userElement === "water" && enemyElement === "fire") ||
    enemyElement === "rock" ||
    enemyElement === "ground"
  ) {
    setAdv(!adv);
  }
};

const enemyAtt = (enemyAtt, userDef, userHp) => {
  let hpAfterAttack = 0;
  let loweredDefense = userDef * 0.85;
  if (enemyAtt < loweredDefense) {
    hpAfterAttack = userHp - 10;
  } else {
    let actualAttack = enemyAtt - loweredDefense;
    hpAfterAttack = userHp - actualAttack;
  }
  return hpAfterAttack;
};

export { checkElement, enemyAtt };
//grass, fire, water, bug, normal, poison, electric, ground, fairy, psychic, fighting, rock, ghost,
