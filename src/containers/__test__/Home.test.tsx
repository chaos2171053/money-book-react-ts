import React from 'react'
import { mount, ReactWrapper } from 'enzyme'

import { Home, items, newItem } from '../Home'

import { LIST_VIEW, CHART_VIEW, TYPE_INCOME, TYPE_OUTCOME, parseToYearAndMonth, padLeft } from '../../utility'
import MonthPicker from '../../components/MonthPicker'
import TotalPrice from '../../components/TotalPrice';
import CreateBtn from '../../components/CreateBtn'
import PriceList from '../../components/PriceList'
import ViewTab from '../../components/ViewTab'

let wrapper: ReactWrapper

describe('test Home container component', () => {
    beforeEach(() => {
        wrapper = mount(<Home></Home>)
    })

    it('should render the default layout', () => {
        expect(wrapper.find(PriceList).length).toEqual(1)
        expect(wrapper.find(PriceList).props().items.length).toEqual(1)
        expect(wrapper.find(ViewTab).props().activeTab).toEqual(LIST_VIEW)
        expect(wrapper.find(MonthPicker).props().year).toEqual(parseToYearAndMonth().year)
        expect(wrapper.find(MonthPicker).props().month).toEqual(parseToYearAndMonth().month)
    })

    it('click the another view tab, should change the default view', () => {
        wrapper.find('.nav-item a').last().simulate('click')
        expect(wrapper.find(ViewTab).props().activeTab).toEqual(CHART_VIEW)
    })
    it('click the new month item, should switch to the correct item', () => {
        wrapper.find('.dropdown-toggle').simulate('click')
        wrapper.find('.months-range .dropdown-item').at(8).simulate('click')
        expect(wrapper.find(MonthPicker).props().month).toEqual(9)
    })
    it('click the new button, should create the new item', () => {
        wrapper.find(CreateBtn).simulate('click')
        expect(wrapper.find(PriceList).props().items.length).toEqual(2)
        expect(wrapper.state('items')[0]).toEqual(newItem)
    })

    it('click modify button, should modify the item', () => {
        wrapper.find(PriceList).children().first().find('button').first().simulate('click')
        expect(wrapper.find(PriceList).props().items[0].title).toEqual('update')
    })
    it('click delete button, should remove the item', () => {
        wrapper.find(PriceList).children().first().find('button').last().simulate('click')
        expect(wrapper.find(PriceList).props().items.length).toEqual(0)
    })
    it('validate total income price', () => {
        let totalIncome = 0

        wrapper.find(PriceList).props().items.forEach(item => {
            if (item.category.type === TYPE_INCOME) {
                totalIncome += item.price
            }

        })
        expect(wrapper.find(TotalPrice).props().income).toEqual(totalIncome)
    })
})