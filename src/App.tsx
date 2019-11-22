import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import PriceList from './components/PriceList'
import ViewTab from './components/ViewTab'
import { LIST_VIEW } from './utility'
import MonthPicker from './components/MonthPick'

const items = [
  {
    id: 1,
    title: '去香港旅游',
    price: 97,
    date: '2019-11-20',
    category: {
      id: 1,
      name: '旅行',
      type: 'outcome',
      iconName: 'ios-plane'
    }
  }
]

const onModifyItem = (item: { id: number }) => {
  alert(item.id)
}
const onTabChange = (view: string) => {
  console.log(view)
}

const onChange = (year: number, month: number) => {
  console.log(year, month)
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <PriceList items={items} onModifyItem={onModifyItem} onDeleteItem={onModifyItem} />
        <ViewTab activeTab={LIST_VIEW} onTabChange={onTabChange} />
        <MonthPicker year={2019} month={11} onChange={onChange}></MonthPicker>
      </div>
    )
  }
}

export default App
