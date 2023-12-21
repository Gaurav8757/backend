// idGenerator.js

let uniqueIdCounter = 0;

export const generateUniqueId = () => {
  const uniqueId = `br-${uniqueIdCounter}`;
  uniqueIdCounter += 1;
  return uniqueId;
};

let empsIdCounter = 0;
export const generateEmpId = () => {
  const empsId = `emp-${empsIdCounter}`;
  empsIdCounter += 1;
  return empsId;
};
