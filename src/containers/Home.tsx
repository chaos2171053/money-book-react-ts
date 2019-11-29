import React, { Component } from 'react';
import PriceList from '../components/PriceList'
import ViewTab from '../components/ViewTab'
import { LIST_VIEW, CHART_VIEW, TYPE_INCOME, TYPE_OUTCOME, parseToYearAndMonth, padLeft } from '../utility'
import MonthPicker from '../components/MonthPicker'
import TotalPrice from '../components/TotalPrice';
import CreateBtn from '../components/CreateBtn'
import { Tab, Tabs } from '../components/Tabs'
import Ionicon from 'react-ionicons'

interface Category {
    id: number,
    name: string,
    type: string,
    iconName: string
}
declare interface CategoriesMap {
    [key: number]: Category;
}

export interface PriceItem {
    id: number,
    title: string,
    price: number,
    date: string,
    cid: number,
    category: { id: number, name: string, type: string, iconName: string }
}


export const categoies: CategoriesMap = {
    1: {
        id: 1,
        name: '旅行',
        type: 'outcome',
        iconName: 'ios-plane'
    },
    2: {
        id: 1,
        name: '看火影',
        type: 'income',
        iconName: 'ios-plane'
    }
}
export const items: Array<any> = [
    {
        id: 1,
        title: '去香港旅游',
        price: 97,
        date: '2019-10-20',
        cid: 1
    },
    {
        id: 2,
        title: '去香港旅游',
        price: 200,
        date: '2019-11-20',
        cid: 1
    },
    {
        id: 3,
        title: '去香港旅游',
        price: 666,
        date: '2019-12-20',
        cid: 2
    }
]

export const newItem =
{
    id: 4,
    title: '去香港旅游',
    price: 98,
    date: '2019-11-20',
    cid: 1
}

const tabsText = [LIST_VIEW, CHART_VIEW]

// const onModifyItem = (item: { id: number }) => {
//     alert(item.id)
// }
// const onTabChange = (view: string) => {
//     console.log(view)
// }

// const onChange = (year: number, month: number) => {
//     console.log(year, month)
// }


interface IProps {

}

interface IState {
    items: Array<any>,
    currentDate: {
        year: number,
        month: number
    },
    tabView: string
}


export class Home extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = {
            items,
            currentDate: parseToYearAndMonth(),
            tabView: tabsText[0],
        }
    }

    changeView = (index: number) => {
        this.setState({
            tabView: tabsText[index],
        })
    }
    changeDate = (year: number, month: number) => {
        this.setState({
            currentDate: { year, month }
        })
    }
    modifyItem = (modifidItem: { title: string, id: number }) => {
        const modifidItems = this.state.items.map(item => {
            if (item.id === modifidItem.id) {
                return { ...item, title: 'update' }
            } else {
                return item
            }

        })
        this.setState({
            items: modifidItems
        })
    }

    createItem = () => {
        this.setState({
            items: [newItem, ...this.state.items]
        })
    }

    deteteItem = (deletedItem: { id: number }) => {
        const filterItems = this.state.items.filter(item => item.id !== deletedItem.id)
        this.setState({ items: filterItems })
    }

    render() {
        const { items, currentDate, tabView } = this.state
        const itemsWithCategory = items.map((item) => {
            item.category = categoies[item.cid]
            return item
        }).filter(item => {

            return item.date.includes(`${currentDate.year}-${padLeft(currentDate.month)}`)
        })
        let totalIncome = 0, totalOutcome = 0
        itemsWithCategory.forEach(item => {
            if (item.category.type === TYPE_OUTCOME) {
                totalOutcome += item.price
            } else {
                totalIncome += item.price
            }
        })



        return (
            <React.Fragment>
                <div className="row">
                    <div className="col">
                        <MonthPicker year={currentDate.year} month={currentDate.month} onChange={this.changeDate}></MonthPicker>
                    </div>
                    <div className="col">
                        <TotalPrice
                            income={totalIncome}
                            outcome={totalOutcome}
                        />
                    </div>
                </div>
                <div className="content-area py-3 px-3">
                    <Tabs activeIndex={0} onTabChange={this.changeView}>
                        <Tab>
                            <Ionicon
                                className="rounded-circle mr-2"
                                fontSize="25px"
                                color={'#007bff'}
                                icon='ios-paper'
                            />
                            列表模式
                        </Tab>
                        <Tab>
                            <Ionicon
                                className="rounded-circle mr-2"
                                fontSize="25px"
                                color={'#007bff'}
                                icon='ios-pie'
                            />
                            图表模式
                        </Tab>
                    </Tabs>
                    {/* <ViewTab activeTab={tabView} onTabChange={() => this.changeView(0)} /> */}
                    <CreateBtn onClick={this.createItem}></CreateBtn>
                    {
                        tabView === LIST_VIEW && <PriceList items={itemsWithCategory} onModifyItem={this.modifyItem} onDeleteItem={this.deteteItem} />

                    }
                    {
                        tabView === CHART_VIEW &&
                        <h1>这里是图表</h1>
                    }

                </div>
            </React.Fragment>
        )
    }
}


