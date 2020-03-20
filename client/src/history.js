// note, history is installed with react-router-dom
// we create our own browser history object, instead of having BrowserRouter create it for
// us.  This allows for easier programmatic navigation
import { createBrowserHistory } from 'history'
export default createBrowserHistory();