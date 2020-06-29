
const own = Object.getOwnPropertyNames;
const proto = Object.getPrototypeOf;

function getAllPropertyNames(obj) {
  const props = new Set();
  do own(obj).forEach((p) => props.add(p)); while (obj = proto(obj));
  console.log(Array.from(props));
}

module.exports = getAllPropertyNames;
