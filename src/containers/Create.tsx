import React, { Component } from 'react'
import PriceForm from '../components/PriceForm'
import { testCategories } from '../testData'
import { Tabs, Tab } from '../components/Tabs'
import { TYPE_OUTCOME } from '../utility'
import CategorySelect from '../components/CategorySelect'
interface Ipros {
    match: { [key: string]: any }
}

export default class Create extends Component<Ipros>{
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