// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {

  var stringify = '';
   if (Array.isArray(obj)) {
    stringify += '[';
    obj.forEach(function(ele) {
      stringify += stringifyJSON(ele);
      stringify += ',';
    })
    if(stringify[stringify.length - 1] === ','){
      stringify = stringify.slice(0,stringify.length - 1);
    }
    stringify += ']';
  }

  else if (typeof obj === 'object' && obj) {
    stringify += '{';

    for (var key in obj) {
      if (!_.isFunction(obj[key]) && obj[key] !== undefined) {
        stringify += '"' + key + '"' + ':';
        stringify += stringifyJSON(obj[key]);
        stringify += ',';
      }
    }
    if(stringify[stringify.length - 1] === ','){
      stringify = stringify.slice(0,stringify.length - 1);
    }
    stringify += '}'

  }
  else if (typeof obj === 'string') {
    return '"' + obj + '"';
  }
  else if (typeof obj === 'number') {
    return String(obj);
  }
  else if (typeof obj === 'boolean') {
    return String(obj);
  }
  else {
    return 'null';
  }
  return '' + stringify;

};

var test = {'hi': 5, 'hello': ['test',8]}