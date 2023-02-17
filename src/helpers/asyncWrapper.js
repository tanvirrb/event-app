/**
 Import it as const _p = require('helpers/asyncWrapper');
 this function can simplify async calls with await.
 It always return an array [err,data]
 if there's error, data will be null. or vice versa
 so, use it like this
 let [err,data] = await _p(something_async());
 if(err) return false;
 // or do the rest
 */
module.exports = async function (_promise) {
  // this promise will always resolve, so that there's no try catch needed
  return new Promise((resolve) => {
    _promise
      .then((value) => {
        resolve([null, value]);
      })
      .catch((err) => {
        resolve([err, null]);
      });
  });
};
