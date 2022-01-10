import React, { createContext, useState } from "react";
import { useEffect } from "react/cjs/react.development";

export const CharacterContext = createContext();

export function CharacterModifier(props) {
  const [level, levelUp] = useState(1);
  const [exp, expUp] = useState(0);
  const [requiredExp, setRequiredExp] = useState(10);
  const [canLevelUp, setLevelingUp] = useState(false);

  useEffect(() => {
    checkIfCanLevelUp();
  }, [exp]);

  const levelUpFunc = (value) => {
    levelUp(level + value);
    addRequiredExp();
    setLevelingUp(false);
  };

  const expUpFunc = (value) => {
    expUp(exp + value);
  };

  const checkIfCanLevelUp = () => {
    if (exp >= requiredExp) {
      setLevelingUp(true);
    }
  };

  const addRequiredExp = () => {
    setRequiredExp(requiredExp * 2);
  };

  return (
    <CharacterContext.Provider
      value={{
        level,
        levelUpFunc,
        exp,
        expUpFunc,
        requiredExp,
        canLevelUp,
      }}
    >
      {props.children}
    </CharacterContext.Provider>
  );
}
