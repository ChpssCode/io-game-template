/**
 * Base class for objects that dispatches events.
 * @class EventEmitter
 * @constructor
 * @example
 *     var emitter = new EventEmitter();
 *     emitter.on('myEvent', function(evt){
 *         console.log(evt.message);
 *     });
 *     emitter.emit({
 *         type: 'myEvent',
 *         message: 'Hello world!'
 *     });
 */
class EventEmitter {
    tmpArray = [];
    _listeners = {};

    /**
     * Add an event listener
     * @method on
     * @param  {String} type
     * @param  {Function} listener
     * @return {EventEmitter} The self object, for chainability.
     * @example
     *     emitter.on('myEvent', function(evt){
     *         console.log('myEvt was triggered!');
     *     });
     */
    on(type, listener, context = null) {
        listener.context = context || this;
        if (this._listeners === undefined) {
            this._listeners = {};
        }
        var listeners = this._listeners;
        if (listeners[type] === undefined) {
            listeners[type] = [];
        }
        if (listeners[type].indexOf(listener) === - 1) {
            listeners[type].push(listener);
        }
        return this;
    }

    /**
     * Remove an event listener
     * @method off
     * @param  {String} type
     * @param  {Function} listener
     * @return {EventEmitter} The self object, for chainability.
     * @example
     *     emitter.on('myEvent', handler); // Add handler
     *     emitter.off('myEvent', handler); // Remove handler
     */
    off(type, listener) {
        var listeners = this._listeners;
        if (!listeners || !listeners[type]) {
            return this;
        }
        var index = listeners[type].indexOf(listener);
        if (index !== - 1) {
            listeners[type].splice(index, 1);
        }
        return this;
    }
    /**
     * Check if an event listener is added
     * @method has
     * @param  {String} type
     * @param  {Function} listener
     * @return {Boolean}
     */
    has(type, listener) {
        if (this._listeners === undefined) {
            return false;
        }
        var listeners = this._listeners;
        if (listener) {
            if (listeners[type] !== undefined && listeners[type].indexOf(listener) !== - 1) {
                return true;
            }
        } else {
            if (listeners[type] !== undefined) {
                return true;
            }
        }

        return false;
    }

    /**
     * Emit an event.
     * @method emit
     * @param  {Object} event
     * @param  {String} event.type
     * @return {EventEmitter} The self object, for chainability.
     * @example
     *     emitter.emit({
     *         type: 'myEvent',
     *         customData: 123
     *     });
     */
    emit(event) {
        if (this._listeners === undefined) {
            return this;
        }
        var listeners = this._listeners;
        var listenerArray = listeners[event.type];
        if (listenerArray !== undefined) {
            event.target = this;

            // Need to copy the listener array, in case some listener was added/removed inside a listener
            var tmpArray = this.tmpArray;
            for (var i = 0, l = listenerArray.length; i < l; i++) {
                tmpArray[i] = listenerArray[i];
            }
            for (var i = 0, l = tmpArray.length; i < l; i++) {
                var listener = tmpArray[i];
                listener.call(listener.context, event);
            }
            tmpArray.length = 0;
        }
        return this;
    }
}

const eventEmitter = new EventEmitter();

function addEventsToInventoryAndHotbar() {

  const elem_inventoryModal      = document.getElementById("inventory_modal")
  const elem_inventoryModalTitle = document.getElementById("inventory_modal_title")
  const elem_inventoryModalDesc  = document.getElementById("inventory_modal_desc")

  // Inventory Items
  for (let i = 0; i < N_TOTAL_INVENTORY_ITEMS; i++) {
  
    const id_currentInventoryItem = `inventory_item_${i}`
    const elem_img = document.getElementById(id_currentInventoryItem)

    elem_img.addEventListener('click', () => {
      if (NC_HOTBAR_SELECTED_ITEM) {
        const s_newImageSrc      = elem_img.src 
        const s_selectedItemNum  = NC_HOTBAR_SELECTED_ITEM
        const n_hotbarImage      = s_selectedItemNum[s_selectedItemNum.length - 1] //!! - change how getting this number
        const id_hotbarImageNum  = `hotbar_img_${n_hotbarImage}`
        const elem_imageToChange = document.getElementById(id_hotbarImageNum)
        elem_imageToChange.src   = s_newImageSrc
      }

      NC_SELECTED_INVENTORY_ITEM_ID = i
    });

    const o_current = NC_LIST_OF_IMAGE_NAMES[i]
    elem_img.addEventListener('mouseenter', () => {

        if ((o_current.title) || (o_current.desc)) {

        elem_inventoryModalTitle.textContent = o_current.title
        elem_inventoryModalDesc.textContent  = o_current.desc

        var rect = elem_img.getBoundingClientRect();
        elem_inventoryModal.style.left = `${rect.left}px`
        elem_inventoryModal.style.top  = `${rect.top}px`

        elem_inventoryModal.style.display = "block"

      } else {
        elem_inventoryModal.style.display = "none"
      }
      
    })

    elem_img.addEventListener('mouseleave', () => {
      elem_inventoryModal.style.display = "none"
    })

    /*
    document.addEventListener('scroll', function(e) {

      console.log("cheese")
      
      lastKnownScrollPosition = window.scrollY;
    
      if (!ticking) {
        window.requestAnimationFrame(function() {
          doSomething(lastKnownScrollPosition);
          ticking = false;
        });
    
        ticking = true;
      }
    });
    */
  
  }

  // Hotbar Items
  for (let i = 0; i < NC_HOTBAR_ITEM_COUNT; i++) {
    
    const n = ((i + 1) % NC_HOTBAR_ITEM_COUNT)
    const id_currentHotbarItem   = `item${n}`
    const elem_currentHotbarItem = document.getElementById(id_currentHotbarItem)

    const id = `hotbar_img_${n}`
    const elem_currentHotbarImg = document.getElementById(id)
    elem_currentHotbarItem.addEventListener('click', (e) => {
      console.log(NC_SELECTED_INVENTORY_ITEM_ID)

      const event = {
          type: "userbangedhotbar",
          slotId: i,
      }
      eventEmitter.emit(event);

      if (e.altKey) {
        elem_currentHotbarImg.src = NC_FILEPATH_TO_DEFAULT
      } else {
        toggleActiveHotbarItemById(id)
      }
    })

    elem_currentHotbarItem.addEventListener('dblclick', () => {
      showInventoryVisiblity()
      setActiveHotbarItemById(`hotbar_img_${n}`)
    })

  }

}

eventEmitter.on("userbangedhotbar", function(event){
    const slotId = event.slotId;
    console.log(event, "fired");
})
