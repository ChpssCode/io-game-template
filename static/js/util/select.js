function addOptionWithValueToSelect(s_text, elem_sel) {
  const option = document.createElement("option")
  option.text = s_text
  elem_sel.add(option)
  return elem_sel
}