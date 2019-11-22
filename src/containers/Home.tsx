import React, { Component } from 'react';
import PriceList from '../components/PriceList'
import ViewTab from '../components/ViewTab'
import { LIST_VIEW, CHART_VIEW, TYPE_INCOME, TYPE_OUTCOME, parseToYearAndMonth } from '../utility'
import MonthPicker from '../components/MonthPicker'
import TotalPrice from '../components/TotalPrice';
import CreateBtn from '../components/CreateBtn'


interface Category {
    id: number,
    name: string,
    type: string,
    iconName: string
}
declare interface CategoriesMap {
    [key: number]: Category;
}


const categoies: CategoriesMap = {
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
const items = [
    {
        id: 1,
        title: '去香港旅游',
        price: 97,
        date: '2019-11-20',
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
        date: '2019-11-20',
        cid: 2
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


export default class Home extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = {
            items,
            currentDate: parseToYearAndMonth(),
            tabView: LIST_VIEW
        }
    }

    render() {
        const { items, currentDate, tabView } = this.state
        const itemsWithCategory = items.map((item) => {
            item.category = categoies[item.cid]
            return item
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
                        <MonthPicker year={currentDate.year} month={currentDate.month} onChange={onChange}></MonthPicker>
                    </div>
                    <div className="col">
                        <TotalPrice
                            income={totalIncome}
                            outcome={totalOutcome}
                        />
                    </div>
                </div>
                <div className="content-area py-3 px-3">
                    <ViewTab activeTab={tabView} onTabChange={onTabChange} />
                    <CreateBtn onClick={() => { }}></CreateBtn>
                    <PriceList items={items} onModifyItem={onModifyItem} onDeleteItem={onModifyItem} />
                </div>
            </React.Fragment>
        )
    }
}


