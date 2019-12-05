import React, { Component } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom'
import PriceList from '../components/PriceList'
import { LIST_VIEW, CHART_VIEW, TYPE_OUTCOME } from '../utility'
import MonthPicker from '../components/MonthPicker'
import TotalPrice from '../components/TotalPrice';
import CreateBtn from '../components/CreateBtn'
import { Tab, Tabs } from '../components/Tabs'
import Ionicon from 'react-ionicons'
import WithContext from '../components/WithContext';
import Loader from '../components/Loader'
interface Category {
    id: string,
    name: string,
    type: string,
    iconName: string
}

export interface PriceItem {
    id: string,
    title: string,
    price: number,
    date: string,
    cid: string,
    category: { id: string, name: string, type: string, iconName: string }
}



const tabsText = [LIST_VIEW, CHART_VIEW]

interface IProps extends RouteComponentProps {
    data: {
        items: {
            [key: string]: PriceItem
        },
        categories: {
            [key: string]: Category
        },
        currentDate: {
            year: number,
            month: number
        },
        isLoading: boolean
    },
    actions: {
        deleteItem: Function,
        getInitalData: Function,
        selectNewMonth: Function
    }
}

interface IState {
    tabView: string
}


class HomePage extends Component<IProps, IState> {
    static defaultProps = {
        data: {
            items: {},
            categories: {},
            currentDate: {
                year: 0,
                month: 0
            },
            isLoading: false
        }
    }
    constructor(props: IProps) {
        super(props)
        this.state = {
            // items,
            tabView: tabsText[0],
        }
    }
    componentDidMount() {
        this.props.actions.getInitalData()
    }

    changeView = (index: number) => {
        this.setState({
            tabView: tabsText[index],
        })
    }
    changeDate = (year: number, month: number) => {
        this.props.actions.selectNewMonth(year, month)
    }
    modifyItem = (modifidItem: { title: string, id: string }) => {
        this.props.history.push(`/edit/${modifidItem.id}`)
    }

    createItem = () => {
        this.props.history.push('/create')
    }

    deteteItem = (deletedItem: { id: string }) => {
        this.props.actions && this.props.actions.deleteItem(deletedItem)
    }

    render() {
        const { data } = this.props

        let { items, categories, currentDate, isLoading } = data
        const { tabView } = this.state
        const itemsWithCategory = Object.keys(items).map((id: string) => {
            items[id].category = categories[items[id].cid]
            return items[id]
        })
        let totalIncome = 0, totalOutcome = 0

        itemsWithCategory && itemsWithCategory.forEach(item => {
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
                    {isLoading &&
                        <Loader />
                    }
                    {!isLoading &&
                        <React.Fragment>
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
                            <CreateBtn onClick={this.createItem}></CreateBtn>
                            {
                                itemsWithCategory && tabView === LIST_VIEW && <PriceList items={itemsWithCategory} onModifyItem={this.modifyItem} onDeleteItem={this.deteteItem} />

                            }
                            {tabView === LIST_VIEW && itemsWithCategory.length === 0 &&
                                <div className="alert alert-light text-center no-record">
                                    您还没有任何记账记录
                    </div>
                            }
                            {
                                tabView === CHART_VIEW &&
                                <h1>这里是图表</h1>
                            }

                        </React.Fragment>
                    }
                </div>
            </React.Fragment>

        )
    }
}

export const Home = WithContext(withRouter(HomePage))



