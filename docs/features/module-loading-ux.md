# Module-Loading UX

Right now, the way someone loads a module is a bit weird. One must click somewhere on the canvas, to reveal the (Add Module) button. The button takes focus when mounting, and because it is a <select> element, can it be operated in one of several ways:

1. click on it to open the menu, and click on a menu entry to create a module at the clicked position
2. press Enter or Space to open the menu, and use the keyboard to select an entry
3. type a letter which matches the start of the module that you want

The "type a letter" shortcut was added to slightly speed up the process of adding modules, but it's cumbersome. How do other systems handle this? I know that Max will create a "search" at the current mouse position when you type a certain key. Something that pops open with a navigable list and displays shortcuts would be interesting. But module positioning is still only possible to apply with the mouse. The module loader should be engageable with a key command, which would then pick the best available spot to load a new module.
