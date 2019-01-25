let Asyncable = require('../src/pattern/asyncable')

test('', (done) => {
  let a = new Asyncable()

  a.promise().then(()=> {
    expect(true).toBe(true);

    done()
  })

  setTimeout(function () {
    a.then()
  }, 10)


});
