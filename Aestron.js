class DomManipulator {
  constructor(selector) {
    if (typeof selector === 'string') {
      this.elements = Array.from(document.querySelectorAll(selector));
    } else if (selector instanceof HTMLElement) {
      this.elements = [selector];
    } else if (Array.isArray(selector)) {
      this.elements = selector.filter(item => item instanceof HTMLElement);
    } else {
      throw new Error('Invalid selector');
    }
  }

  addClass(className) {
    this.elements.forEach(element => element.classList.add(className));
    return this;
  }

  removeClass(className) {
    this.elements.forEach(element => element.classList.remove(className));
    return this;
  }

  toggleClass(className) {
    this.elements.forEach(element => element.classList.toggle(className));
    return this;
  }

  text(value) {
    if (value !== undefined) {
      this.elements.forEach(element => element.textContent = value);
      return this;
    } else {
      return this.elements[0].textContent;
    }
  }

  html(value) {
    if (value !== undefined) {
      this.elements.forEach(element => element.innerHTML = value);
      return this;
    } else {
      return this.elements[0].innerHTML;
    }
  }

  on(event, callback) {
    this.elements.forEach(element => element.addEventListener(event, callback));
    return this;
  }

  off(event, callback) {
    this.elements.forEach(element => element.removeEventListener(event, callback));
    return this;
  }

  animate(animationName) {
    const animationClasses = {
      fadeIn: 'fade-in',
      fadeOut: 'fade-out',
      slideUp: 'slide-up',
      slideDown: 'slide-down',
      slideLeft: 'slide-left',
      slideRight: 'slide-right',
      zoomIn: 'zoom-in',
      zoomOut: 'zoom-out'
    };

    if (animationClasses[animationName]) {
      this.elements.forEach(element => element.classList.add(animationClasses[animationName]));
    } else {
      throw new Error(`Invalid animation name: ${animationName}`);
    }

    return this;
  }

  stopAnimation(animationName) {
    const animationClasses = {
      fadeIn: 'fade-in',
      fadeOut: 'fade-out',
      slideUp: 'slide-up',
      slideDown: 'slide-down',
      slideLeft: 'slide-left',
      slideRight: 'slide-right',
      zoomIn: 'zoom-in',
      zoomOut: 'zoom-out'
    };

    if (animationClasses[animationName]) {
      this.elements.forEach(element => element.classList.remove(animationClasses[animationName]));
    } else {
      throw new Error(`Invalid animation name: ${animationName}`);
    }

    return this;
  }

  css(property, value) {
    this.elements.forEach(element => {
      element.style[property] = value;
    });
    return this;
  }
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

function $(selector) {
  return new DomManipulator(selector);
}

window.Aestron = {
  DomManipulator,
  $
};

