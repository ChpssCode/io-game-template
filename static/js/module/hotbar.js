function deselectHotbarItemById(s_targedId) {
  const elem_currentHotbarItem = document.getElementById(s_targedId)
  setElemStyleToValue(elem_currentHotbarItem, "border-color", NC_UNSELECTED_COLOR)
  NC_HOTBAR_SELECTED_ITEM = null
  NC_HOTBAR_UNSELECTED_ITEMS.push(s_targedId)
}

function setActiveHotbarItemById(s_targedId) {
  const elem_currentHotbarItem = document.getElementById(s_targedId)
  setElemStyleToValue(elem_currentHotbarItem, "border-color", NC_SELECTED_COLOR)
  if (NC_HOTBAR_SELECTED_ITEM !== null) {
    const elem_previouslySelected = document.getElementById(NC_HOTBAR_SELECTED_ITEM)
    setElemStyleToValue(elem_previouslySelected, "border-color", NC_UNSELECTED_COLOR)
  }
  NC_HOTBAR_SELECTED_ITEM    = s_targedId
  NC_HOTBAR_UNSELECTED_ITEMS = filterArrayIndexByValue(NC_HOTBAR_UNSELECTED_ITEMS, s_targedId)
}

function toggleActiveHotbarItemById(s_targedId) {
  (
    NC_HOTBAR_SELECTED_ITEM === s_targedId 
      ? deselectHotbarItemById(s_targedId)
      : setActiveHotbarItemById(s_targedId)
  )
}