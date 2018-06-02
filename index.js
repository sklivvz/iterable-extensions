Object.prototype.Select = function*(func) {
  for(value of this) yield func(value)
}

Object.prototype.Where = function*(func) {
  for(value of this) if (func(value)) yield value;
}

Object.prototype.Aggregate = function(seed, func) {
  for(value of this) seed = func(seed, value)
  return seed
}

Object.prototype.Append = function*(other) {
  for (value of this) yield value
  for (value of other) yield value
}

Object.prototype.SelectMany = function*(func) {
  for (outer of this)
    for(inner of func(outer))
      yield inner
}

Object.prototype.Count = function(filter) {
    var src = this;
    if (filter != null) src = this.Where(filter);
    if (typeof src == 'Array') return src.length;
    return src.Aggregate(0, function(count, _) { return count+1; });
}

Object.prototype.Max = function(extractor, comparer) {
    if (extractor == null) extractor = x => x;
    if (comparer == null) comparer = (a,b) => a>b;
    return src.Aggregate(null, (max, value) => {
        const extracted = extractor(value);
        return (max == null || comparer(max,extracted)>0)?extracted:max; 
     });
}

Object.prototype.Min = function(extractor, comparer) {
    if (extractor == null) extractor = x => x;
    if (comparer == null) comparer = (a,b) => a>b;
    return src.Aggregate(null, (max, value) => {
        const extracted = extractor(value);
        return (max == null || comparer(extracted,max)>0)?extracted:max; 
     });
}