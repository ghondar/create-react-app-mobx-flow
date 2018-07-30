// @flow

import { types } from 'mobx-state-tree'

const Bird = types
  .model('BirdStore', {
    birds: types.array(types.string)
  })
  .actions(self => ({
    addBird(bird: string) {
      self.birds.push(bird)
    },
    addPrefix(value: number) {
      self.birds.forEach((bird: string, i: number) => {
        self.birds[i] = value + bird
      })
    }
  }))
  .views(self => ({
    get birdCount() {
      return self.birds.length
    }
  }))

export default Bird
