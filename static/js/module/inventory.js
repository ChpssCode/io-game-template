function showInventoryVisiblity() {
  B_INVENTORY_VISIBLE = true
  NC_INVENTORY_DIVS.forEach(s_id => {
    document.getElementById(s_id).style.display = "inline-block"
  })
}

function toggleInventoryVisiblity() {
  const t_display = (B_INVENTORY_VISIBLE) ? "none" : "inline-block"
  B_INVENTORY_VISIBLE = toggleBool(B_INVENTORY_VISIBLE)
  NC_INVENTORY_DIVS.forEach(s_id => {
    document.getElementById(s_id).style.display = t_display
  })
}