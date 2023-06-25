function filterArrayIndexByValue(a, u_item) {
  const idx = a.indexOf(u_item)
  if (idx !== -1) {
    a.splice(idx, 1)
  }
  return a
}
