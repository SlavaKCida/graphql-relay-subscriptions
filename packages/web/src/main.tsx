import 'regenerator-runtime'
import { StrictMode } from 'react'
import * as ReactDOM from 'react-dom/client'

import App from './app/app'
import { GraphqlProvider } from './app/GraphlProvider'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <StrictMode>
    <GraphqlProvider>
      <App />
    </GraphqlProvider>
  </StrictMode>
)
