const { unmask } = require('./lib')

console.log(unmask({
  name: "sdf",
  object: {
    name: 234,
    bool: true,
    obj: [{
        complex: 1234,
        masked: "sdfe",
        very: { name: 234 }
      },
      {
        complex: 1234,
        masked: "sdfe",
        very: { name: 1234 }
      },
    ]
  }
}, 1))
