function addClassToElem(s_class, elem) {
  elem.classList.add(s_class)
}

function addClassesToElem(a, elem) {
  a.forEach(s_class => {
    elem.classList.add(s_class)
  })
}