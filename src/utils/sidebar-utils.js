export const isAnyPathMatches = (currentPath, paths) => {
  let pathMatch = false;
  paths.map((path) => {
    if (currentPath === path) {
      pathMatch = true;
    }
  });

  return pathMatch;
};
