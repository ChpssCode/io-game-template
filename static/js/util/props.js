function addPropsWithValueToElem(o, elem) {
  for (const [s_prop, u_value] of Object.entries(o)) {
    addPropWithValueToElem(s_prop, u_value, elem)
  }
}

function addPropWithValueToElem(s_prop, u_value, elem) {
  elem[s_prop] = u_value
}