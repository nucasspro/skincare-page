import * as ReactDOM from 'react-dom'

type ReactDOMWithCompat = typeof ReactDOM & {
  default?: typeof ReactDOM
  findDOMNode?: (component: unknown) => Element | Text | null
}

const ReactDOMNamespace = ReactDOM as ReactDOMWithCompat

if (!ReactDOMNamespace.default) {
  ReactDOMNamespace.default = ReactDOMNamespace
}

const isDomNode = (value: unknown): value is Element | Text =>
  typeof value === 'object' && value !== null && 'nodeType' in (value as Record<string, unknown>)

if (!ReactDOMNamespace.findDOMNode) {
  ReactDOMNamespace.findDOMNode = (component: unknown) => {
    if (!component) {
      return null
    }

    if (isDomNode(component)) {
      return component
    }

    if (
      typeof component === 'object' &&
      component !== null &&
      'current' in component &&
      isDomNode((component as { current: unknown }).current)
    ) {
      return (component as { current: Element | Text }).current
    }

    return null
  }
}

export default ReactDOMNamespace
export * from 'react-dom'
