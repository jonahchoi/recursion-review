// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
  //Create a functions for each type
  //Call other functions within a function

  //function that checks the current character
  var currentIndex = 0;

  var parseObject = function() {
    if(json[currentIndex] === '{') {
      currentIndex++;
      var obj = {};

      while(json[currentIndex] !== '}') {
        //take the key,
        var key = parseString();
        //console.log('key', key)
        //Remove whitespace + colon
        removeWhitespaces();
        removeColon();
        removeWhitespaces();
        //console.log('after key:', json[currentIndex]);
        //take the value
        var value = parseObject();
        //console.log('value', value)
        //assign key/value pair to object
        obj[key] = value;

        removeComma();
        removeWhitespaces();
      }
      currentIndex++;
      return obj;
    }
    else if (json[currentIndex] === '[') {
      return parseArray();
    }
    else if(json[currentIndex] === '"') {
      return parseString();
    }
    else if(!isNaN(json[currentIndex]) || json[currentIndex] === '-') {
      return parseNumber();
    }
    else {
      return parseNull();
    }

  }

  var parseArray = function() {
    var arr = [];

    currentIndex++;

    while (json[currentIndex] !== ']') {
      var value = parseObject();
      arr.push(value);
      removeComma();
      removeWhitespaces();
    }
    currentIndex++;
    return arr;

  }
  var parseString = function() {
    var string = '';
    // if char is "
    if (json[currentIndex] === '"') {
      //then skip "
      currentIndex ++;
      //take every character until the next "
      while (json[currentIndex] !== '"') {
        string += json[currentIndex];
        currentIndex++;
      }
    }
    currentIndex++;
    return string;

  }

  var parseNumber = function() {
    var num = '';
    while (!isNaN(json[currentIndex]) || json[currentIndex] === '.' || json[currentIndex] === '-') {
      num += json[currentIndex];
      currentIndex++;
    }
    return parseFloat(num);
  }
  var parseNull = function() {
    if(json.slice(currentIndex, currentIndex+4) === 'null') {
      currentIndex += 4;
      return null;
    }
    else if(json.slice(currentIndex, currentIndex+4) === 'true') {
      currentIndex += 4;
      return true;
    }
    else if(json.slice(currentIndex, currentIndex+5) === 'false') {
      currentIndex += 5;
      return false;
    }

  }

  var removeColon = function() {
    if(json[currentIndex] === ':') {
      currentIndex++;
    }
  }
  var removeComma = function() {
    if(json[currentIndex] === ',') {
      currentIndex++;
    }
  }
  var removeWhitespaces = function() {

    while (json[currentIndex] === ' ') {
      currentIndex++;
    }

  }

  return parseObject();


};

var parseableStrings = [
  // basic stuff
  '[]',
  '{"foo": ""}',
  '{}',
  '{"foo": "bar"}',
  '["one", "two"]',
  '{"a": "b", "c": "d"}',
  '[null,false,true]',
  '{"foo": true, "bar": false, "baz": null}',
  '[1, 0, -1, -0.3, 0.3, 1343.32, 3345, 0.00011999999999999999]',
  '{"boolean, true": true, "boolean, false": false, "null": null }',

  // basic nesting
  '{"a":{"b":"c"}}',
  '{"a":["b", "c"]}',
  '[{"a":"b"}, {"c":"d"}]',
  '{"a":[],"c": {}, "b": true}',
  '[[[["foo"]]]]',

    // escaping
  '["\\\\\\"\\"a\\""]',
  '["and you can\'t escape thi\s"]',
];


// var testJson = [{"name":"Kanye","grammys":21},{"name":"Jay-Z","grammys":[{'number':24,'age':40}]}];
// var testJson = {"test": [1,2,3], "string": "hi", "nested": [{'name':null}]};
// var testJson = [[1, 0, -1, -0.3, 0.3, 1343.32, 3345, 0.00011999999999999999], 2]
parseableStrings.forEach(function(str) {
  var actual = parseJSON(str);
  var expected = JSON.parse(str);
  console.log(actual);
  console.log(expected);

  console.log(JSON.stringify(actual) === JSON.stringify(expected));
})
//var test = JSON.stringify(testJson);




