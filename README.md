# throttle-promised
Throttle promise execution to a maximum count:
- Execution order is not guaranteed
- Uses random backoff at a configurable rate to re-queue promises

## Getting Started

```shell
npm install throttle-promised --save
```

## Example throttling 100 promises through 10 executors
```js
var _ = require('underscore'),
    throttle = require('throttle-promised')({max:10, minWait:10, maxWait:100});
    
_.each(range(100), function(i) {
  throttle.throttle(function() {
    return Q.promise(function(resolve, reject) {
      setTimeout(function() {
        resolve(i);
      }, 100);
    });
  });
});
```
