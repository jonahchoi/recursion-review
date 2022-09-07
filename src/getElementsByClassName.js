// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className
) {
  //start with empty array
  var arr = [];

  //declare function to find element
  //take parameter = element
  var findElement = function(element) {
    //If element classlist has className
    if (element.classList && element.classList.contains(className)) {
      arr.push(element);
    }
    //For loop, through childNodes,
    element.childNodes.forEach(function(child) {
      //recurse each child element
      findElement(child);
    })
  }
  findElement(document.body);
  //return array
  return arr;
};
