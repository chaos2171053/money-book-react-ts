import React, { Component } from 'react'
import PriceForm from '../components/PriceForm'
import { Tabs, Tab } from '../components/Tabs'
import { TYPE_OUTCOME, TYPE_INCOME } from '../utility'
import { CategorySelect, Category } from '../components/CategorySelect'
import WithContext from '../components/WithContext'
import { RouteComponentProps, withRouter } from 'react-router-dom'
const tabsText = [TYPE_OUTCOME, TYPE_INCOME]
interface IProps {
    data: {
        items: {},
        categories: {}
    },
    match: {
        params: {
            id?: string
        }
    }
}
interface IState {
    selectedTab: string,
    selectedCategory: object,
    validationPassed: boolean
}
class CreatePage extends Component<IProps & RouteComponentProps, IState>{
    constructor(props: IProps & RouteComponentProps) {
        super(props)
        this.state = {
            validationPassed: false,
            selectedTab: TYPE_OUTCOME,
            selectedCategory: {
                id: '',
                name: '',
                type: '',
                iconName: ''
            },
        }
    }
    tabChange = (index: number) => {
        this.setState({
            selectedTab: tabsText[index]
        })
    }
    selectCategory = (category: Category) => {
        this.setState({
            selectedCategory: category
        })
    }

    cancelSubmit = () => {
        this.props.history.push('/')
    }

    render() {
        const { data } = this.props
        const { items, categories } = data
        const id = Object.keys(this.props.match.params).length ? this.props.match.params.id : ''
        const editItem = (id && items[id]) ? items[id] : {}
        const { selectedTab, selectedCategory, validationPassed } = this.state
        const filterCategories = Object.keys(categories)
            .filter(id => categories[id].type === selectedTab)
            .map(id => categories[id])
        const tabIndex = tabsText.findIndex(text => text === selectedTab)
        return (
            <div className="create-page py-3 px-3 rounded mt-3" style={{ background: '#fff' }}>
                <Tabs activeIndex={tabIndex} onTabChange={this.tabChange}>
                    <Tab>支出</Tab>
                    <Tab>收入</Tab>
                </Tabs>
                <CategorySelect
                    categories={filterCategories}
                    selectedCategory={selectedCategory}
                    onSelectCategory={this.selectCategory}
                />
                <PriceForm onFormSubmit={() => { }} onCancelSubmit={this.cancelSubmit} ></PriceForm>
                {!validationPassed &&
                    <div className="alert alert-danger mt-5" role="alert">
                        请选择分类信息
                    </div>
                }
            </div >
        )
    }
}
export default WithContext(withRouter(CreatePage))