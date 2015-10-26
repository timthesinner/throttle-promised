# throttle-promised
Throttle promise execution to a maximum count:
- Execution order is not guaranteed
- Uses random backoff at a configurable rate to re-queue promises

## Getting Started

```shell
npm install throttle-promised --save
```

## Example throttling 100 promises through a gate with 10 executors
```js
var _ = require('underscore'),
    gate = require('throttle-promised')({max:10, minWait:10, maxWait:100});
    
_.each(_.range(100), function(i) {
  gate.throttle(function() {
    return Q.promise(function(resolve, reject) {
      setTimeout(function() {
        resolve(i);
      }, 100);
    });
  }).then(function(i) {//Place the 'then' hook outside the throttle, so work that doesnt need to be gated runs free.
    console.log('Finished processing:', i);
  });
});
```
