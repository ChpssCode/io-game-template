function NC_createElemsWithIdByTypeAndAppendToElemWithPropsAndClasses(a) {

  a.forEach(a_ => {

    const 
      id        = a_[0],
      s_type    = a_[1],
      id_target = a_[2],
      o_props   = a_[3],
      a_classes = a_[4]

    const elem_target = (id_target) 
      ? document.getElementById(id_target) 
      : document.body

    let elem
    switch(s_type) {
      case "button": elem = createButtonWithIdAndAppendToElem(id, elem_target); break
      case "div":    elem = createDivWithIdAndAppendToElem   (id, elem_target); break
      case "input":  elem = createInputWithIdAndAppendToElem (id, elem_target); break
      case "label":  elem = createLabelWithIdAndAppendToElem (id, elem_target); break
      case "select": elem = createSelectWithIdAndAppendToElem(id, elem_target); break
      default: console.error(`unexpected type: ${s_type}`)
    }

    // Props
    addPropsWithValueToElem(o_props, elem)

    // Classes
    addClassesToElem(a_classes, elem)

  })

}

function createHotbarGridItems() {

  //!! dynamic: - elem.style.gridTemplateAreas ='"z z z" "a b c" "d e f"';

  const elem_target = document.getElementById("hotbar")
  for (let i = 0; i < NC_HOTBAR_ITEM_COUNT; i++) {
    
    const n = ((i + 1) % NC_HOTBAR_ITEM_COUNT)
    const id_currentHotbarItem = `item${n}`

    const elem_div = createDivAndAppendToElem(elem_target)
    addClassToElem(id_currentHotbarItem, elem_div) //!! - change to id?
    elem_div.id  = id_currentHotbarItem

    const elem_img = createImgAndAppendToDiv(elem_div)
    elem_img.id  = `hotbar_img_${n}`
    elem_img.alt = `hotbar_item_${n}` //!! - convert to global
    elem_img.src = NC_FILEPATH_TO_DEFAULT
    addClassToElem("hotbar_itembox", elem_img)
    addClassToElem("nodrag", elem_img)
    
    NC_HOTBAR_ITEM_IDS.push(id_currentHotbarItem)
    NC_HOTBAR_UNSELECTED_ITEMS.push(id_currentHotbarItem)
  }

  /* !! - set unselected global state */
  
}

function createInventoryGridItems() {
  const elem_target = document.getElementById("inventory")
  const s_filepath  = NC_FILEPATH_TO_LOAD_FROM
  const n_pxSize    = NC_GRID_INVENTORY_IMAGE_SIZE

  NC_LIST_OF_IMAGE_NAMES.forEach((o, i) => {
    const n = o.image
    const s_imageFileName = NC_LIST_OF_IMAGES[n]
    const s_fullFilepath  = (s_filepath + s_imageFileName)
    const id = `inventory_item_${i}`


    const elem_img = createImgAndAppendToDiv(elem_target)
    elem_img.id          = id
    elem_img.src         = s_fullFilepath
    elem_img.style.width = `${n_pxSize}px`
    addClassToElem("inventoryItem", elem_img)
    addClassToElem("nodrag",        elem_img)
    addClassToElem("noselect",      elem_img)

    N_TOTAL_INVENTORY_ITEMS += 1
    A_VISIBLE_FILTER_INVENTORY_ITEMS.push(i)
  })

}

function addEvents() {
  btnCloseInventoryUI()
  selInventoryFilter()
  inventorySearchFilter()
  addEventsToInventoryAndHotbar()
}

function btnCloseInventoryUI() {
  document.getElementById("btn_close_inventory_ui").addEventListener('click', () => {
    const a_elemIds = NC_INVENTORY_DIVS
    a_elemIds.forEach(id => {
      const elem_current = document.getElementById(id)
      elem_current.style.display = "none"
    })
    B_INVENTORY_VISIBLE = false
  })
}

function selInventoryFilter() {
  const elem_sel = document.getElementById("sel_inventoryFilter")
  elem_sel.addEventListener("change", () => {
            
    const s_filter = elem_sel.value

    A_VISIBLE_FILTER_INVENTORY_ITEMS   = []
    A_INVISIBLE_FILTER_INVENTORY_ITEMS = []

    for (let i = 0; i < N_TOTAL_INVENTORY_ITEMS; i++) {
      const id   = `inventory_item_${i}`
      const elem = document.getElementById(id)
      if (
        (s_filter === "Show All") || //!! - hardcoded, should be nameable and in config
        (NC_LIST_OF_IMAGE_NAMES[i].categories.includes(s_filter))
      ) {
        elem.style.display = "inline-block"
        A_VISIBLE_FILTER_INVENTORY_ITEMS.push(i)
      } else {
        elem.style.display = "none"
        A_INVISIBLE_FILTER_INVENTORY_ITEMS.push(i)
      }
    }

    updateFiltersBasedOnSearch()
  })
}

function inventorySearchFilter() {
  const fld_search = document.getElementById("fld_inventorySearchFilter")
  fld_search.addEventListener("input", () => {
    updateFiltersBasedOnSearch()
  })
}

function updateFiltersBasedOnSearch() {
  const fld_search   = document.getElementById("fld_inventorySearchFilter")
  const s_raw        = fld_search.value
  const s_lowercased = s_raw.toLowerCase()

  let 
    a      = [],
    a_elem = []
  
  A_VISIBLE_FILTER_INVENTORY_ITEMS.forEach(n_id => {
    a.push(NC_LIST_OF_IMAGE_NAMES[n_id])
    const id   = `inventory_item_${n_id}`
    const elem = document.getElementById(id)
    a_elem.push(elem)
  })

  a.forEach((o, i) => {
    const s_name = o.name
    const elem   = a_elem[i]
    if (s_name.includes(s_lowercased))  {
      elem.style.display = "inline-block"
      A_VISIBLE_SEARCH_INVENTORY_ITEMS.push(i)
    } else {
      elem.style.display = "none"
      A_INVISIBLE_SEARCH_INVENTORY_ITEMS.push(i)
    }
  })
}

function updateHTMLUI() {
  const elem = document.getElementById("sel_inventoryFilter")
  addOptionWithValueToSelect(NC_FILTER_NAME, elem)
  NC_LIST_OF_CATEGORIES.forEach(s_category => {
    addOptionWithValueToSelect(
      s_category, 
      document.getElementById("sel_inventoryFilter")
    )
  })
}

document.addEventListener('keydown', (e) => {
  const s_key = e.key
  //!! - if (NC_SHORTCUT_KEYS.includes(s_key)) {
    switch (s_key) {
      case "Escape":
        if (B_INVENTORY_VISIBLE) {
          NC_INVENTORY_DIVS.forEach(s_id => {
            B_INVENTORY_VISIBLE = false
            document.getElementById(s_id).style.display = "none"
          })
        }
        break
      case "e":
        if (! (document.activeElement.id === "fld_inventorySearchFilter") ) {
          toggleInventoryVisiblity()
        }
        break
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
      case "0":
        const id = `hotbar_img_${s_key}`
        toggleActiveHotbarItemById(id)
        break
      case "Tab":
        e.preventDefault()
        const s_id = NC_HOTBAR_SELECTED_ITEM
        if (e.altKey) { // OPTION TAB
          if (s_id) {
            const n_current  = Number(s_id.charAt(s_id.length-1)) //!! - STORE SEPARATE NOT JUST ID BUT ALSO NUMBER
            const n_toSelect = (n_current === 0) 
              ? (NC_HOTBAR_ITEM_COUNT - 1) 
              : (n_current - 1)
            toggleActiveHotbarItemById(`hotbar_img_${n_toSelect}`)
          } else {
            toggleActiveHotbarItemById(`hotbar_img_${0}`)
          }
        } else { // TAB
          if (s_id) {
            const n_current  = Number(s_id.charAt(s_id.length-1)) //!! - STORE SEPARATE NOT JUST ID BUT ALSO NUMBER
            const n_toSelect = ((n_current + 1) % NC_HOTBAR_ITEM_COUNT)
            toggleActiveHotbarItemById(`hotbar_img_${n_toSelect}`)
          } else {
            toggleActiveHotbarItemById(`hotbar_img_${1}`)
          }
        }
        break
    }
  // }
})

function createHotbarModal() {

  // createDivAndAppendToElem()

  // create div
  // set div props and classes
  // title text
  // description text
  // size should adjust to text size
  // location should be set to specific location, ie top || right
  // show on mouse hover -> move to current mouse location, show
  // hide on mouse leave
}

function createInventoryModal() {
  
}