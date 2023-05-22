import { createRoot } from 'react-dom/client'
import { App } from './components/App'

const rootId: string = 'root'

document.body.innerHTML = `<div id="${rootId}"></div>`

const rootDomEl = document.getElementById(rootId)

if (rootDomEl !== null) {
  const root = createRoot(rootDomEl)
  root.render(<App />)
} else {
  throw new Error('The doom root element is non-existent')
}
