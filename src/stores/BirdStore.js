// @flow

import { observable, action, computed } from 'mobx'

class BirdStore {
  @observable birds: Array<string> = []

  @action
  addBird = (bird: string) => {
    this.birds.push(bird)
  }
  addPrefix = (value: number) => {
    this.birds.forEach((bird, i) => {
      this.birds[i] = value + bird
    })
  }

  @computed
  get birdCount() {
    return this.birds.length
  }
}

const store: BirdStore = new BirdStore()

export default store
