export const normalizeClassName = (className) => {
  return className.split(" ").join("-").toLowerCase();
};
