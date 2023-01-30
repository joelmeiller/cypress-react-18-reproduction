import ReactDOM from 'react-dom/client'
// import ReactDOM from 'react-dom'
import './index.css'
import { App } from './view/App'
import reportWebVitals from './reportWebVitals'

import './translations/initI18next'

// React 17
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(<App />)

// React 18
// ReactDOM.render(<App />, document.getElementById('root'))

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
