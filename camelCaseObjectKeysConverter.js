const convertKeysToCamelCase = module.exports = (target, ...sources) => {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key) => {
      if (isObject(source[key])) {
        const camelCasedKey = camelCase(key);
        const camelCasedObject = convertKeysToCamelCase({}, source[key]);
        Object.assign(target, { [camelCasedKey]: camelCasedObject });
      } else if (isArray(source[key])) {
        const camelCasedArray = source[key].map(item => convertKeysToCamelCase({}, item));
        const camelCasedKey = camelCase(key);
        Object.assign(target, { [camelCasedKey]: camelCasedArray });
      } else {
        const camelCasedKey = camelCase(key);
        Object.assign(target, { [camelCasedKey]: source[key] });
      }
    });
  }
  return convertKeysToCamelCase(target, ...sources);
}

function isObject(item) {
  return (item && typeof item === 'object' && !Array.isArray(item));
}

function isArray(item) {
  return (item && typeof item === 'object' && Array.isArray(item));
}

function camelCase(str) {
  return str
    .replace(/[\s-_]+/g, ' ')
    .replace(/[A-Z]([A-Z]+?)/g, l => l.toLowerCase())
    .replace(/\s(.)/g, l => l.toUpperCase())
    .replace(/\s/g, '')
    .replace(/^(.)/, l => l.toLowerCase());
}
