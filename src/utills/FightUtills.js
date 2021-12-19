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

const userAtt = (userAtt, enemyDef, enemyHp) => {
  let hpAfterAttack = 0;
  let loweredDefense = enemyDef * 0.85;
  if (userAtt < loweredDefense) {
    hpAfterAttack = enemyHp - 10;
  } else {
    let actualAttack = userAtt - loweredDefense;
    hpAfterAttack = enemyHp - actualAttack;
  }
  return hpAfterAttack;
};

const userSpecialAtt = (userAtt, enemyDef, enemyHp) => {
  let hpAfterAttack = 0;
  let loweredDefense = enemyDef * 0.65;
  if (userAtt < loweredDefense) {
    hpAfterAttack = enemyHp - 25;
  } else {
    let actualPower = userAtt - loweredDefense;
    hpAfterAttack = enemyHp - actualPower;
  }
};

const usePotion = (userHp, potionHeal) => {
  let hpAfterHealing = userHp + potionHeal;
  return hpAfterHealing;
};

export { checkElement, enemyAtt, userAtt, usePotion, userSpecialAtt };
//grass, fire, water, bug, normal, poison, electric, ground, fairy, psychic, fighting, rock, ghost,
