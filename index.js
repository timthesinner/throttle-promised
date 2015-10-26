//Copyright (c) 2015 TimTheSinner All Rights Reserved.
'use strict';

/**
 * Copyright (c) 2015 TimTheSinner All Rights Reserved.
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 * 
 * http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 * 
 * @author TimTheSinner
 */
var Q = require('q');

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function Throttle(max, minWait, maxWait) {
  this.active = 0;
  this.max = max;
  this.minWait = minWait || 50;
  this.maxWait = maxWait || 500;
}
module.exports = function(properties) {
  if (! properties) {
    return new Throttle();
  } else {
    return new Throttle(properties.max, properties.minWait, properties.maxWait);
  }
}

Throttle.prototype.promise = function(fn) {
  return Q.promise(fn.bind(this, this));
}
    
Throttle.prototype.release = function(cb, res) {
  this.active -= 1;
  cb(res);
}

Throttle.prototype.throttle = function(fn) {
  if (this.active === this.max) {
    return Q.delay(random(this.minWait, this.maxWait)).then(this.throttle.bind(this, fn));
  } else {
    this.active += 1;
    return this.promise(function (self, resolve, reject) {
      fn().then(self.release.bind(self, resolve))
          .fail(self.release.bind(self, reject));
    });
  }
}
