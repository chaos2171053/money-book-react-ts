import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Home } from './containers/Home'
import Create from './containers/Create'
import { flatternArray } from './utility'
import { testCategories, testItems } from './testData'


interface Category {
  id: number,
  name: string,
  type: string,
  iconName: string
}

interface PriceItem {
  id: number,
  title: string,
  price: number,
  date: string,
  cid: number,
  category: { id: number, name: string, type: string, iconName: string }
}
interface IProps {

}
export interface IAppState {
  categories: { [key: string]: Category },
  items: { [key: string]: PriceItem }
}

export const AppContext = React.createContext({})

export class App extends Component<IProps, IAppState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      categories: flatternArray(testCategories),
      items: flatternArray(testItems)
    }
  }
  render() {
    return (
      <AppContext.Provider value={{
        state: this.state
      }}>
        <Router>
          <div className="App">
            <div className="containers pb-5">
              <ul>
                <Link to='/'>Home</Link>
                <Link to='/create'>Create</Link>
                <Link to='/edit/10'>Edit</Link>
              </ul>
              <Route path="/" exact component={Home}></Route>
              <Route path="/create" component={Create}></Route>
              <Route path="/edit/:id" component={Create}></Route>
            </div>
          </div>
        </Router>
      </AppContext.Provider>


    )
  }
}
