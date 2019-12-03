import React, { Component } from 'react'
import PriceForm from '../components/PriceForm'
import { testCategories } from '../testData'
import { Tabs, Tab } from '../components/Tabs'
import { TYPE_OUTCOME } from '../utility'
import CategorySelect from '../components/CategorySelect'
import WithContext from '../components/WithContext'
import { RouteComponentProps, withRouter } from 'react-router-dom'
interface Ipros {

}
class CreatePage extends Component<Ipros & RouteComponentProps>{
    render() {
        const filterCategories = testCategories.filter(category => {
            return category.type === TYPE_OUTCOME
        })
        return (
            <div className="create-page py-3 px-3 rounded mt-3" style={{ background: '#fff' }}>
                <Tabs activeIndex={0} onTabChange={() => { }}>
                    <Tab>支出</Tab>
                    <Tab>收入</Tab>
                </Tabs>
                <CategorySelect categories={filterCategories}
                    onSelectCategory={() => { }}
                />
                <PriceForm onFormSubmit={() => { }} onCancelSubmit={() => { }} ></PriceForm>
            </div >
        )
    }
}

export default WithContext(withRouter(CreatePage))