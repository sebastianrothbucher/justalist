// to stay compatible with create-react-app, support both module styles and plain names
export default (styles, name) => ((styles || {})[name] || name);