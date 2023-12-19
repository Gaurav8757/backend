// idGenerator.js

let uniqueIdCounter = 0;

export const generateUniqueId = () => {
  const uniqueId = `br-${uniqueIdCounter}`;
  uniqueIdCounter += 1;
  return uniqueId;
};
