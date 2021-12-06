import React, { createContext, useState } from "react";

export const CharacterContext = createContext();

export function CharacterModifier(props) {
  const [level, levelUp] = useState(1);
  const [exp, expUp] = useState(0);
  const [requiredExp] = useState(10);

  const levelUpFunc = (level) => {
    levelUp(level + 1);
  };

  const expUpFunc = (exp) => {
    expUp(exp + 1);
  };

  return (
    <CharacterContext.Provider
      value={{
        level,
        levelUpFunc,
        exp,
        expUpFunc,
        requiredExp,
      }}
    >
      {props.children}
    </CharacterContext.Provider>
  );
}
