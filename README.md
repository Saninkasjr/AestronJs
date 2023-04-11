# AestronJs
Just the js update part of  project Aestron
Read Me - AestronJs

AestronJs is a lightweight and easy-to-use JavaScript library for manipulating the DOM. It provides a set of methods to add or remove classes, text, and HTML content to elements. You can also add event listeners and animations to your elements.

Installation:

To use AestronJs in your project, you need to include it in your HTML file by adding the following script tag:

html
Copy code
<script src="aestron.js"></script>
Usage:

To use AestronJs, select a new element by using a css selector 
const element = el('.my-class' or '#my-id' or 'tagName'); 
Methods:

AestronJs provides the following methods to manipulate elements:

addClass(className): Adds a class to the element(s).
removeClass(className): Removes a class from the element(s).
toggleClass(className): Toggles a class on the element(s).
text(value): Sets or gets the text content of the element(s).
html(value): Sets or gets the HTML content of the element(s).
on(event, callback): Adds an event listener to the element(s).
off(event, callback): Removes an event listener from the element(s).
animate(animationName): Adds an animation class to the element(s).
stopAnimation(animationName): Removes an animation class from the element(s).
css(property, value): Sets the CSS property to the given value for the element(s).
appendElement(tagName, attributes, text): Appends a new element with the given tag name, attributes, and text content to the selected element(s).
getCssValue(property): Returns the computed value of the specified CSS property for the first element in the selected set.
mergeElement(tagName, options): Creates a new element with the specified tag name and options, and merges it with the selected element(s). The options include attributes, text content, CSS styles, classes, data attributes, events, callback, children, and style properties. The new element can be appended to the selected element(s) or used to replace them.
