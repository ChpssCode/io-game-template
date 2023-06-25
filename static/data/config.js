const NC_HOTBAR_ITEM_COUNT         = 10
const NC_GRID_INVENTORY_IMAGE_SIZE = 100
const NC_HOTBAR_ITEM_SHORTCUTS     = ["1","2","3","4","5","6","7","8","9","0"]
const NC_FILTER_NAME               = "Show All"

const NC_SELECTED_COLOR    = "#00518f" // hex
const NC_UNSELECTED_COLOR  = "#7e7567" // hex

const NC_INVENTORY_DIVS = [   
  "inventoryUI",
  "spacerAboveHotbarBelowInventory",
  "inspector",
  "inventory"
]

const NC_FILEPATH_TO_DEFAULT = "/asset/img/unselected_hotbar_item.png"

const NC_FILEPATH_TO_LOAD_FROM = "/asset/img/"
const NC_LIST_OF_IMAGES = [
  "spike.png", 
  "wall.png"
]
const NC_LIST_OF_CATEGORIES = [
  "spike",
  "wall"
]
const NC_LIST_OF_IMAGE_NAMES = [
  {
    "name": "test",
    "image": 0,
    "tags": ["spike"],
    "categories": ["spike"],
    "title": "cake1",
    "desc": "apple1"
  },
  {
    "name": "test2",
    "image": 1,
    "tags": ["wall"],
    "categories": ["wall"],
    "title": "cake2",
    "desc": "apple2"
  },
  {
    "name": "cheese",
    "image": 0,
    "tags": ["spike"],
    "categories": ["spike"],
    "title": "cake3",
    "desc": "apple3"
  },
  {
    "name": "cake",
    "image": 0,
    "tags": ["spike"],
    "categories": ["spike"],
    "title": "cake4",
    "desc": "apple4"
  },
  {
    "name": "apple",
    "image": 1,
    "tags": ["wall"],
    "categories": ["wall"],
    "title": "cake5",
    "desc": "apple5"
  },
  {
    "name": "test",
    "image": 0,
    "tags": ["spike"],
    "categories": ["spike"],
    "title": "cake6",
    "desc": "apple6"
  },
  {
    "name": "test",
    "image": 0,
    "tags": ["spike"],
    "categories": ["spike"],
    "title": "cake7",
    "desc": "apple7"
  },
  {
    "name": "test",
    "image": 1,
    "tags": ["wall"],
    "categories": ["wall"],
    "title": "cake8",
    "desc": "apple8"
  },
  {
    "name": "test",
    "image": 0,
    "tags": ["spike"],
    "categories": ["spike"],
    "title": "cake",
    "desc": "apple"
  },
  {
    "name": "test",
    "image": 0,
    "tags": ["spike"],
    "categories": ["spike"],
    "title": "cake",
    "desc": "apple"
  },
  {
    "name": "test",
    "image": 1,
    "tags": ["wall"],
    "categories": ["wall"]
  },
  {
    "name": "test",
    "image": 0,
    "tags": ["spike"],
    "categories": ["spike"],
    "title": "cake",
    "desc": "apple"
  },
  {
    "name": "test",
    "image": 0,
    "tags": ["spike"],
    "categories": ["spike"],
    "title": "cake",
    "desc": "apple"
  },
  {
    "name": "test",
    "image": 1,
    "tags": ["wall"],
    "categories": ["wall"]
  },
  {
    "name": "test",
    "image": 0,
    "tags": ["spike"],
    "categories": ["spike"],
    "title": "cake",
    "desc": "apple"
  },
  {
    "name": "test",
    "image": 0,
    "tags": ["spike"],
    "categories": ["spike"],
    "title": "cake",
    "desc": "apple"
  },
  {
    "name": "test",
    "image": 1,
    "tags": ["wall"],
    "categories": ["wall"],
    "title": "cake",
    "desc": "apple"
  },
  {
    "name": "test",
    "image": 0,
    "tags": ["spike"],
    "categories": ["spike"],
    "title": "cake",
    "desc": "apple"
  },
  {
    "name": "test",
    "image": 0,
    "tags": ["spike"],
    "categories": ["spike"],
    "title": "cake",
    "desc": "apple"
  },
  {
    "name": "test",
    "image": 1,
    "tags": ["wall"],
    "categories": ["wall"],
    "title": "cake",
    "desc": "apple"
  },
  {
    "name": "test",
    "image": 0,
    "tags": ["spike"],
    "categories": ["spike"],
    "title": "cake",
    "desc": "apple"
  },
  {
    "name": "test",
    "image": 0,
    "tags": ["spike"],
    "categories": ["spike"],
    "title": "cake",
    "desc": "apple"
  },
  {
    "name": "test",
    "image": 1,
    "tags": ["wall"],
    "categories": ["wall"],
    "title": "cake",
    "desc": "apple"
  },
  {
    "name": "test",
    "image": 0,
    "tags": ["spike"],
    "categories": ["spike"],
    "title": "cake",
    "desc": "apple"
  },
  {
    "name": "test",
    "image": 0,
    "tags": ["spike"],
    "categories": ["spike"]
  },
  {
    "name": "test",
    "image": 1,
    "tags": ["wall"],
    "categories": ["wall"],
    "title": "cake",
    "desc": "apple"
  },
  {
    "name": "test",
    "image": 0,
    "tags": ["spike"],
    "categories": ["spike"],
    "title": "cake",
    "desc": "apple"
  },
  {
    "name": "test",
    "image": 0,
    "tags": ["spike"],
    "categories": ["spike"],
    "title": "cake",
    "desc": "apple"
  },
  {
    "name": "test",
    "image": 1,
    "tags": ["wall"],
    "categories": ["wall"],
    "title": "cake",
    "desc": "apple"
  },
  {
    "name": "test",
    "image": 0,
    "tags": ["spike"],
    "categories": ["spike"],
    "title": "cake",
    "desc": "apple"
  },
  {
    "name": "test",
    "image": 0,
    "tags": ["spike"],
    "categories": ["spike"],
    "title": "cake",
    "desc": "apple"
  },
  {
    "name": "test",
    "image": 1,
    "tags": ["wall"],
    "categories": ["wall"],
    "title": "cake",
    "desc": "apple"
  },
  {
    "name": "test",
    "image": 0,
    "tags": ["spike"],
    "categories": ["spike"],
    "title": "cake",
    "desc": "apple"
  }
]