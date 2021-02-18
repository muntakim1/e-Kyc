export default function reducer(file = [], action) {
  switch (action.type) {
    case "Add":
      return [...file, action.payload];
    default:
      return file;
  }
}
