import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Home } from './containers/Home'
import Create from './containers/Create'
import { flatternArr, ID, parseToYearAndMonth } from './utility'
import axios from 'axios'

interface Category {
  id: string,
  name: string,
  type: string,
  iconName: string
}

interface PriceItem {
  id: string,
  title: string,
  price: number,
  date: string,
  cid: string

}
export interface PriceItemWithCategory extends PriceItem {
  category: Category
}
interface IProps {

}
export interface IAppState {
  categories: { [key: string]: Category },
  items: { [key: string]: PriceItem }
}

export interface IAppPageState extends IAppState {
  isLoading: boolean,
  currentDate: {
    year: number,
    month: number
  }
}
export const AppContext = React.createContext({})

export class App extends Component<IProps, IAppPageState> {
  actions: {};
  constructor(props: IProps) {
    super(props);
    this.state = {
      categories: {},
      items: {},
      isLoading: false,
      currentDate: parseToYearAndMonth()
    }
    const withLoading = (cb: Function) => {
      return (...args: any) => {
        this.setState({
          isLoading: true
        })
        return cb(...args)
      }
    }
    this.actions = {
      selectNewMonth: withLoading(async (year: number, month: number) => {
        const getURLWithData = `/items?monthCategory=${year}-${month}&_sort=timestamp&_order=desc`
        const items = await axios.get(getURLWithData)
        this.setState({
          items: flatternArr(items.data),
          currentDate: { year, month },
          isLoading: false,
        })
        return items
      }),
      deleteItem: withLoading(async (item: { id: string }) => {
        const deleteItem = await axios.delete(`/items/${item.id}`)
        delete this.state.items[item.id]
        this.setState({
          items: this.state.items,
          isLoading: false
        })
        return deleteItem
      }),
      createItem: withLoading(async (data: any, categoryId: string) => {
        const newId = ID()
        const parsedDate = parseToYearAndMonth(data.date)
        data.monthCategory = `${parsedDate.year}-${parsedDate.month}`
        data.timestamp = new Date(data.date).getTime()
        const newItem = await axios.post('/items', { ...data, id: newId, cid: categoryId })
        this.setState({
          items: { ...this.state.items, [newId]: newItem.data },
          isLoading: false,
        })
        return newItem.data
      }),
      updateItem: withLoading(async (item: PriceItem, updatedCategoryId: string) => {
        const modifiedItem = {
          ...item,
          cid: updatedCategoryId,
          timestamp: new Date(item.date).getTime()
        }
        const updatedItem = await axios.put(`/items/${modifiedItem.id}`, modifiedItem)
        this.setState({
          items: { ...this.state.items, [modifiedItem.id]: modifiedItem },
          isLoading: false,
        })
        return updatedItem.data
      }),
      getInitalData: withLoading(async () => {
        const { currentDate } = this.state
        const getURLWithData = `/items?monthCategory=${currentDate.year}-${currentDate.month}&_sort=timestamp&_order=desc`
        const promiseArr = await Promise.all([axios.get('/categories'), axios.get(getURLWithData)])
        this.setState({
          isLoading: false
        })
        const [categories, items] = promiseArr
        this.setState({
          items: flatternArr(items.data),
          categories: flatternArr(categories.data)
        })
        return items
      })
    }
  }
  render() {
    return (
      <AppContext.Provider value={{
        state: this.state,
        actions: this.actions
      }}>
        <Router>
          <div className="App">
            <div className="containers pb-5">
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
