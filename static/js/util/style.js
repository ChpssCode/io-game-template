function setElemStyleToValue(elem, s_prop, u_value) {
  //!! - check that the inputted style is valid
  elem.setAttribute("style", `${s_prop}: ${u_value};`)
}
