export const getId = (id) => `wiooh-${id}`;

export const flatten = (object, separator = '.') => {
  return Object.assign(
    {},
    ...(function _flatten(child, path = []) {
      return [].concat(
        ...Object.keys(child || {}).map((key) =>
          typeof child[key] === 'object'
            ? _flatten(child[key], path.concat([key]))
            : {[path.concat([key]).join(separator)]: child[key]},
        ),
      );
    })(object),
  );
};
