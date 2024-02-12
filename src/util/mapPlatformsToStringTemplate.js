
const mapPlatformsToStringTemplate = (stringTemplate, platforms) => {
  const { idScopes = [] } = stringTemplate;
  return {
    ...stringTemplate,
    idScopes: (idScopes.length === 1 && idScopes[0] === '') ? [] : // condition needs to be taken off once the bug in webtoolkit is fixed
      idScopes.map(
        id => {
          const platformName = platforms.find(platform => platform.id === id)?.name;
          return {
            label: platformName,
            value: id
          };
        }
      )
  };
};

export default mapPlatformsToStringTemplate;
