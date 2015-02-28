var _ = require('lodash');
var Handlebars = require('handlebars');
var Entities = require('html-entities').XmlEntities;

entities = new Entities();

module.exports.symbols = function(options) {

  console.log(options.fn(this));

  // var t = options.fn(this);
  // t = t.replace(/{{br}}/gi, '<br>');

  return entities.decode(options.fn(this));
}

module.exports.if_odd = function(val, options) {
  var fnTrue=options.fn, fnFalse=options.inverse;
  return val % 2 ? fnTrue() : fnFalse();
}

module.exports.group_by_team = function(data, options) {
  var groupedData = _.groupBy(data, function(d){
    return d.match_localteam_name
  });
}

module.exports.group_by_date = function(array, options) {

  var groupedData = _.groupBy(array, function(d){
    return d.match_date
  });

  return options.fn( groupedData );
}


module.exports.if = function(conditional, options) {

  function parseBool2( str ){
    var boolmap = { 
      'NO'    : false,
      'No'    : false,
      'no'    : false,
      'FALSE' : false,
      'False' : false,
      'false' : false,
      'YES'   : true ,
      'Yes'   : true ,
      'yes'   : true ,
      'TRUE'  : true ,
      'True'  : true ,
      'true'  : true 
    };

    return ( str in boolmap && boolmap.hasOwnProperty(str)) ? 
      boolmap[ str ] :  !!str ;
  };

  if (parseBool2(conditional)) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
}


module.exports.everyNth = function(context, every, options) {
  var fn = options.fn, inverse = options.inverse;
  var ret = "";
  if(context && context.length > 0) {
    for(var i=0, j=context.length; i<j; i++) {
      var modZero = i % every === 0;
      ret = ret + fn(_.extend({}, context[i], {
        isModZero: modZero,
        isModZeroNotFirst: modZero && i > 0,
        isLast: i === context.length - 1
      }));
    }
  } else {
    ret = inverse(this);
  }
  return ret;
};

module.exports.stripes = function(array, even, odd, fn, elseFn) {
  if (array && array.length > 0) {
    var buffer = "";
    for (var i = 0, j = array.length; i < j; i++) {
      var item = array[i];
 
      // we'll just put the appropriate stripe class name onto the item for now
      item.stripeClass = (i % 2 == 0 ? even : odd);
 
      // show the inside of the block
      buffer += fn(item);
    }
 
    // return the finished buffer
    return buffer;
  }
  else {
    return elseFn();
  }
});