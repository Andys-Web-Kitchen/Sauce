export default class AbstractDataAttributeBehaviour {
  getContainerSelector() {
    return null
  }

  selectElements(selector, context = null) {
    if (context === null) context = document
    let elements = []
    let result = context.querySelectorAll(selector)
    for (let i = 0; i < result.length; i++) {
      elements.push(result[i])
    }

    return elements
  }

  isContainerInitialised(container) {
    if (container._componentInit === undefined) container._componentInit = {}
    if (container._componentInit[this.getContainerSelector()] === undefined)
      return false
    return (container._componentInit[this.getContainerSelector()] = true)
  }

  setContainerInitialised(container, initialised = null) {
    if (initialised === null) initialised = true
    container._componentInit[this.getContainerSelector()] = initialised
  }

  getContainers() {
    let selector = this.getContainerSelector()
    if (selector === null) throw 'getContainerSelector() returns NULL'
    return this.selectElements(selector)
  }

  initContainer(container) {
    throw 'initContainer not defined. Please ensure the initContainer is defined within the abstractReactBehavior extension.'
  }

  init = () => {
    this.getContainers().forEach((container) => {
      if (this.isContainerInitialised(container)) return
      this.setContainerInitialised(container)
      this.initContainer(container)
    })
  }
}
