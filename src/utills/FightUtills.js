const checkAdvantage = (userElement, enemyElement, setAdv) => {
  if (userElement === "water" && enemyElement === "fire") {
    setAdv(true);
  } else if (userElement === "fire" && enemyElement === "grass") {
    setAdv(true);
  } else if (userElement === "grass" && enemyElement === "water") {
    setAdv(true);
  } else if (userElement === "bug" && enemyElement === "grass") {
    setAdv(true);
  } else if (userElement === "poison" && enemyElement === "grass") {
    setAdv(true);
  } else if (userElement === "electric" && enemyElement === "water") {
    setAdv(true);
  } else if (userElement === "ground" && enemyElement === "fire") {
    setAdv(true);
  } else if (userElement === "fairy" && enemyElement === "fighting") {
    setAdv(true);
  } else if (userElement === "psychic" && enemyElement === "poison") {
    setAdv(true);
  } else if (userElement === "fighting" && enemyElement === "normal") {
    setAdv(true);
  } else if (userElement === "rock" && enemyElement === "bug") {
    setAdv(true);
  } else if (userElement === "ghost" && enemyElement === "psychic") {
    setAdv(true);
  }
};

const enemyAtt = (enemyAtt, userDef, userHp) => {
  let hpAfterAttack = 0;
  let loweredDefense = userDef * 0.85;
  if (enemyAtt < loweredDefense) {
    hpAfterAttack = userHp - 15;
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
    hpAfterAttack = enemyHp - 15;
  } else {
    let actualAttack = userAtt - loweredDefense;
    hpAfterAttack = enemyHp - actualAttack;
  }
  return hpAfterAttack;
};

const userSpecialAtt = (userAtt, enemyDef, enemyHp) => {
  let hpAfterAbility = 0;
  let loweredDefense = enemyDef * 0.65;
  if (userAtt < loweredDefense) {
    hpAfterAbility = enemyHp - 30;
  } else {
    let actualPower = userAtt - loweredDefense;
    hpAfterAbility = enemyHp - actualPower;
  }
  return hpAfterAbility;
};

const usePotion = (userHp, potionHeal, maxPosibleHp) => {
  let hpAfterHealing = userHp + potionHeal;
  if (hpAfterHealing < maxPosibleHp) {
    return hpAfterHealing;
  } else if (hpAfterHealing >= maxPosibleHp) {
    return maxPosibleHp;
  }
};

export { checkAdvantage, enemyAtt, userAtt, usePotion, userSpecialAtt };
