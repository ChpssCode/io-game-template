function createDivAndAppendToElem(elem) {
  const div = document.createElement('div')
  return elem.appendChild(div)
}

function createDivWithIdAndAppendToElem(id, elem) {
  const div = document.createElement('div')
  div.id = id
  return elem.appendChild(div)
}

function createButtonWithIdAndAppendToElem(id, elem) {
  const btn = document.createElement('button')
  btn.id = id
  return elem.appendChild(btn)
}

function createLabelWithIdAndAppendToElem(id, elem) {
  const lbl = document.createElement('label')
  lbl.id = id
  return elem.appendChild(lbl)
}

function createInputWithIdAndAppendToElem(id, elem) {
  const input = document.createElement('input')
  input.id = id
  return elem.appendChild(input)
}

function createSelectWithIdAndAppendToElem(id, elem) {
  const sel = document.createElement('select')
  sel.id = id
  return elem.appendChild(sel)
}

function createImgAndAppendToDiv(elem) {
  const img = document.createElement('img')
  return elem.appendChild(img)
}