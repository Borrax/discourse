import { createRoot } from 'react-dom/client'

const rootId: string = 'root'

document.body.innerHTML = `<div id="${rootId}"></div>`

const rootDomEl = document.getElementById(rootId)

if (rootDomEl !== null) {
  const root = createRoot(rootDomEl)
  root.render(<h1>Hello there</h1>)
} else {
  throw new Error('The doom root element is non-existent')
}
