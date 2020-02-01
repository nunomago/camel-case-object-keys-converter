const converter = require("./camelCaseObjectKeysConverter");

const snakeCasedObj = {
  simple_object: "simple",
  parent_object: {
    child_object: "child"
  },
  parent_array: [
    { simple_object_2: "simple2" },
    {
      parent_object2: {
        child_object2: "child2"
      }
    }
  ]
};
const camelCasedObj = converter({}, snakeCasedObj);
console.log(camelCasedObj);
