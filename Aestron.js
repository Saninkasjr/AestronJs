//AestronJs.
class DomManipulator {
  // This constructor function takes in a selector as a parameter and returns an instance of the class with elements matching the selector

constructor(selector) {
  // If the selector is a string, find all elements that match the selector using querySelectorAll method and store them in an array
  if (typeof selector === 'string') {
    this.elements = Array.from(document.querySelectorAll(selector));
  } 
  // If the selector is an HTMLElement, store it in an array
  else if (selector instanceof HTMLElement) {
    this.elements = [selector];
  } 
  // If the selector is an array, filter out all elements that are not an instance of HTMLElement and store them in an array
  else if (Array.isArray(selector)) {
    this.elements = selector.filter(item => item instanceof HTMLElement);
  } 
  // If the selector is none of the above, throw an error
  else {
    throw new Error('Invalid selector');
  }
}

  // Add a class to all elements in the collection
addClass(className) {
  // Loop through all elements in the collection
  this.elements.forEach(element => {
    // Add the class to the element's class list
    element.classList.add(className);
  });
  // Return the collection to enable chaining
  return this;
}

// Remove a class from all elements in the collection
removeClass(className) {
  // Loop through all elements in the collection
  this.elements.forEach(element => {
    // Remove the class from the element's class list
    element.classList.remove(className);
  });
  // Return the collection to enable chaining
  return this;
}

// Toggle a class on all elements in the collection
toggleClass(className) {
  // Loop through all elements in the collection
  this.elements.forEach(element => {
    // Toggle the class on the element's class list
    element.classList.toggle(className);
  });
  // Return the collection to enable chaining
  return this;
}

  // A function to set or get the text content of an element
text(value) {
  if (value !== undefined) { // Check if value is defined
    this.elements.forEach(element => element.textContent = value); // Set text content to the provided value for each element
    return this; // Return the object for chaining
  } else {
    return this.elements[0].textContent; // Return the text content of the first element
  }
}

// A function to set or get the HTML content of an element
html(value) {
  if (value !== undefined) { // Check if value is defined
    this.elements.forEach(element => element.innerHTML = value); // Set HTML content to the provided value for each element
    return this; // Return the object for chaining
  } else {
    return this.elements[0].innerHTML; // Return the HTML content of the first element
  }
}

// A function to attach an event listener to an element
on(event, callback) {
  this.elements.forEach(element => element.addEventListener(event, callback)); // Add event listener to each element
  return this; // Return the object for chaining
}

// A function to remove an event listener from an element
off(event, callback) {
  this.elements.forEach(element => element.removeEventListener(event, callback)); // Remove event listener from each element
  return this; // Return the object for chaining
}

  // A function to add an animation class to an element
animate(animationName) {
  const animationClasses = { // Object containing animation classes
    fadeIn: 'fade-in',
    fadeOut: 'fade-out',
    slideUp: 'slide-up',
    slideDown: 'slide-down',
    slideLeft: 'slide-left',
    slideRight: 'slide-right',
    zoomIn: 'zoom-in',
    zoomOut: 'zoom-out'
  };

  if (animationClasses[animationName]) { // Check if the animation name is valid
    this.elements.forEach(element => element.classList.add(animationClasses[animationName])); // Add animation class to each element
  } else {
    throw new Error(`Invalid animation name: ${animationName}`); // Throw an error for invalid animation name
  }

  return this; // Return the object for chaining
}

// A function to remove an animation class from an element
stopAnimation(animationName) {
  const animationClasses = { // Object containing animation classes
    fadeIn: 'fade-in',
    fadeOut: 'fade-out',
    slideUp: 'slide-up',
    slideDown: 'slide-down',
    slideLeft: 'slide-left',
    slideRight: 'slide-right',
    zoomIn: 'zoom-in',
    zoomOut: 'zoom-out'
  };

  if (animationClasses[animationName]) { // Check if the animation name is valid
    this.elements.forEach(element => element.classList.remove(animationClasses[animationName])); // Remove animation class from each element
  } else {
    throw new Error(`Invalid animation name: ${animationName}`); // Throw an error for invalid animation name
  }

  return this; // Return the object for chaining
}


  // Set a CSS property on all selected elements
css(property, value) {
    this.elements.forEach(element => {
      element.style[property] = value;
    });
    return this;
}

// Append a new element to each selected element
appendElement(tagName, attributes = {}, text = '') {
    const newElement = document.createElement(tagName);
    // Set attributes on the new element
    Object.entries(attributes).forEach(([key, value]) => {
        newElement.setAttribute(key, value);
    });
    newElement.textContent = text;
    // Append the new element to each selected element
    this.elements.forEach(element => {
        element.appendChild(newElement);
    });
    return this;
}

// Get the value of a CSS property for the first selected element
getCssValue(property) {
    return window.getComputedStyle(this.elements[0]).getPropertyValue(property);
}

// Get the position of the first selected element relative to its offset parent
getPosition() {
    const element = this.elements[0];
    const parent = element.offsetParent;
    let position = {
        top: element.offsetTop,
        left: element.offsetLeft
    };

    while (parent !== null) {
        position.top += parent.offsetTop;
        position.left += parent.offsetLeft;
        parent = parent.offsetParent;
    }

    return position;
}

// Find all descendants of the selected elements matching a selector
find(selector) {
    const descendants = this.elements.flatMap(element => Array.from(element.querySelectorAll(selector)));
    // Return a new DomManipulator object containing the matching descendants
    return descendants.length ? new DomManipulator(descendants) : $([]);
}
//testing feature
//{
 
        
//}
//MergerElement creates an element and appends ut to the target selector.
mergeElement(tagName, {
    attributes = {},
    text = '',
    replace = false,
    targetSelector = null,
    code = '',
    css = '',
    textNode = '',
    classes = [],
    dataset = {},
    events = {},
    callback = null,
    children = [],
    style = {},
  } = {}) {
    const newElement = document.createElement(tagName);
    Object.entries(attributes).forEach(([key, value]) => {
      newElement.setAttribute(key, value);
    });
    if (textNode) {
      const textNodeElement = document.createTextNode(textNode);
      newElement.appendChild(textNodeElement);
    } else {
      newElement.textContent = text;
    }
    if (css) {
      newElement.style.cssText = css;
    } else {
      Object.entries(style).forEach(([property, value]) => {
        newElement.style[property] = value;
      });
    }
    if (classes.length) {
      classes.forEach(className => {
        newElement.classList.add(className);
      });
    }
    Object.entries(dataset).forEach(([key, value]) => {
      newElement.dataset[key] = value;
    });
    Object.entries(events).forEach(([event, handler]) => {
      newElement.addEventListener(event, handler);
    });
    children.forEach(child => {
      newElement.appendChild(child);
    });
    if (code) {
      newElement.innerHTML = code;
    }
    if (callback) {
      callback(newElement);
    }
    if (replace && targetSelector) {
      const oldElement = document.querySelector(targetSelector);
      if (oldElement) {
        oldElement.replaceWith(newElement);
        return new DomManipulator(targetSelector);
      }
    } else {
      this.elements.forEach(element => {
        element.appendChild(newElement);
      });
      return this;
    }
    function add(selector, options) {
  const target = document.querySelector(selector);
  if (!target) return;

  if (options.text) {
    target.textContent = options.text;
  }

  if (options.classes && options.classes.length > 0) {
    target.classList.add(...options.classes);
  }

  if (options.attributes) {
    Object.keys(options.attributes).forEach(key => {
      target.setAttribute(key, options.attributes[key]);
    });
  }

  if (options.dataset) {
    Object.keys(options.dataset).forEach(key => {
      target.dataset[key] = options.dataset[key];
    });
  }

  if (options.children && options.children.length > 0) {
    options.children.forEach(child => {
      const childElem = document.createElement(child.tagName);
      if (child.text) {
        childElem.textContent = child.text;
      }
      if (child.attributes) {
        Object.keys(child.attributes).forEach(key => {
          childElem.setAttribute(key, child.attributes[key]);
        });
      }
      if (child.dataset) {
        Object.keys(child.dataset).forEach(key => {
          childElem.dataset[key] = child.dataset[key];
        });
      }
      if (child.events) {
        Object.keys(child.events).forEach(key => {
          childElem.addEventListener(key, child.events[key]);
        });
      }
      target.appendChild(childElem);
    });
  }

  if (options.replace) {
    const newElem = document.createElement(options.tagName);
    if (options.text) {
      newElem.textContent = options.text;
    }
    if (options.classes && options.classes.length > 0) {
      newElem.classList.add(...options.classes);
    }
    if (options.attributes) {
      Object.keys(options.attributes).forEach(key => {
        newElem.setAttribute(key, options.attributes[key]);
      });
    }
    if (options.dataset) {
      Object.keys(options.dataset).forEach(key => {
        newElem.dataset[key] = options.dataset[key];
      });
    }
    if (options.children && options.children.length > 0) {
      options.children.forEach(child => {
        const childElem = document.createElement(child.tagName);
        if (child.text) {
          childElem.textContent = child.text;
        }
        if (child.attributes) {
          Object.keys(child.attributes).forEach(key => {
            childElem.setAttribute(key, child.attributes[key]);
          });
        }
        if (child.dataset) {
          Object.keys(child.dataset).forEach(key => {
            childElem.dataset[key] = child.dataset[key];
          });
        }
        if (child.events) {
          Object.keys(child.events).forEach(key => {
            childElem.addEventListener(key, child.events[key]);
          });
        }
        newElem.appendChild(childElem);
      });
    }
    target.parentNode.replaceChild(newElem, target);
  }
}

  }

// animations start
 fadeIn(duration = 1000) {
         this.elements.forEach(element => {
                 element.style.opacity = 0;
                 element.style.display = "block";
                 let start = null;
                 const step = timestamp => {
                         if (!start) start = timestamp;
                         const progress = timestamp - start;
                         element.style.opacity = Math.min(progress / duration, 1);
                         if (progress < duration) {
                                 window.requestAnimationFrame(step);
                         }
                 };
                 window.requestAnimationFrame(step);
         });
         return this;
 }

 fadeOut(duration = 1000) {
         this.elements.forEach(element => {
                 element.style.opacity = 1;
                 let start = null;
                 const step = timestamp => {
                         if (!start) start = timestamp;
                         const progress = timestamp - start;
                         element.style.opacity = Math.max(1 - progress / duration, 0);
                         if (progress < duration) {
                                 window.requestAnimationFrame(step);
                         } else {
                                 element.style.display = "none";
                         }
                 };
                 window.requestAnimationFrame(step);
         });
         return this;
 }

 slideIn(duration = 1000, distance = "100%") {
         this.elements.forEach(element => {
                 element.style.transform = `translateX(${distance})`;
                 element.style.display = "block";
                 let start = null;
                 const step = timestamp => {
                         if (!start) start = timestamp;
                         const progress = timestamp - start;
                         element.style.transform = `translateX(${Math.min(
           progress / duration,
           1
         ) * parseInt(distance)}px)`;
                         if (progress < duration) {
                                 window.requestAnimationFrame(step);
                         }
                 };
                 window.requestAnimationFrame(step);
         });
         return this;
 }

 slideOut(duration = 1000, distance = "100%") {
         this.elements.forEach(element => {
                 element.style.transform = "translateX(0)";
                 let start = null;
                 const step = timestamp => {
                         if (!start) start = timestamp;
                         const progress = timestamp - start;
                         element.style.transform = `translateX(${Math.max(
           1 - progress / duration,
           0
         ) * parseInt(distance)}px)`;
                         if (progress < duration) {
                                 window.requestAnimationFrame(step);
                         } else {
                                 element.style.display = "none";
                         }
                 };
                 window.requestAnimationFrame(step);
         });
         return this;
 }
}


function createArray(range) {
  if (range.match(/^\d+\.\.\.\d+$/)) { // If the range is numbers
    const [startStr, endStr] = range.split('...');
    const start = parseInt(startStr);
    const end = parseInt(endStr);
    const reverse = start > end;
    const arr = [];

    if (reverse) {
      for (let i = start; i >= end; i--) {
        arr.push(i);
      }
    } else {
      for (let i = start; i <= end; i++) {
        arr.push(i);
      }
    }

    return arr;
  } else if (range.match(/^[a-zA-Z]\.\.\.[a-zA-Z]$/)) { // If the range is letters
    const [start, end] = range.split('...');
    const startCode = start.charCodeAt(0);
    const endCode = end.charCodeAt(0);
    const reverse = startCode > endCode;
    const arr = [];

    if (reverse) {
      for (let i = startCode; i >= endCode; i--) {
        arr.push(String.fromCharCode(i));
      }
    } else {
      for (let i = startCode; i <= endCode; i++) {
        arr.push(String.fromCharCode(i));
      }
    }

    return arr;
  } else { // If the range is invalid
    throw new Error('Invalid range');
  }
}
//functions
function createRipple(event) {
        const button = event.currentTarget;

        const circle = document.createElement("span");
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;

        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
        circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
        circle.classList.add("ripple");

        const ripple = button.getElementsByClassName("ripple")[0];

        if (ripple) {
                ripple.remove();
        }

        button.appendChild(circle);
}
function el(selector) {
  return new DomManipulator(selector);
}
function $(selector) {
        return new DomManipulator(selector);
}
window.Aestron = {
  DomManipulator,
  createArray,
  el,
  $,
  createRipple
};



