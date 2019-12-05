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
    this.actions = {
      selectNewMonth: async (year: number, month: number) => {
        this.setState({
          isLoading: true,
        })
        const getURLWithData = `/items?monthCategory=${year}-${month}&_sort=timestamp&_order=desc`
        const items = await axios.get(getURLWithData)
        this.setState({
          items: flatternArr(items.data),
          currentDate: { year, month },
          isLoading: false,
        })
        return items
      },
      deleteItem: async (item: { id: string }) => {
        await axios.delete(`/items/${item.id}`)
        delete this.state.items[item.id]
        this.setState({
          items: this.state.items
        })
      },
      createItem: (data: any, categoryId: string) => {
        const newId = ID()
        const parsedDate = parseToYearAndMonth(data.date)
        data.monthCategory = `${parsedDate.year}-${parsedDate.month}`
        data.timestamp = new Date(data.date).getTime()
        const newItem = { ...data, id: newId, cid: categoryId }
        this.setState({
          items: { ...this.state.items, [newId]: newItem }
        })
      },
      updateItem: (item: PriceItem, updatedCategoryId: string) => {
        const modifiedItem = {
          ...item,
          cid: updatedCategoryId,
          timestamp: new Date(item.date).getTime()
        }
        this.setState({
          items: { ...this.state.items, [modifiedItem.id]: modifiedItem }
        })
      },
      getInitalData: () => {
        const { currentDate, isLoading } = this.state
        const getURLWithData = `/items?monthCategory=${currentDate.year}-${currentDate.month}&_sort=timestamp&_order=desc`
        const promiseArr = [axios.get('/categories'), axios.get(getURLWithData)]
        this.setState({
          isLoading: true
        })
        Promise.all(promiseArr).then(arr => {
          this.setState({
            isLoading: false
          })
          const [categories, items] = arr
          this.setState({
            items: flatternArr(items.data),
            categories: flatternArr(categories.data)
          })
        })
      }
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
