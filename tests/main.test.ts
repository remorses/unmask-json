

import { unmask } from '../src'

console.log(unmask({
  name: "sdf",
  object: {
    name: 234,
    bool: true,
    obj: [
      "sdfg", "asdg"]
  }
}))
