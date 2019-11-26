import React from 'react'
import CategorySelect from '../CategorySelect'
import Ionicon from 'react-ionicons'
import { mount, ReactWrapper, shallow } from 'enzyme'
import { object } from 'prop-types'

export const categories = [
    {
        id: 1,
        name: '去香港旅游',
        type: 'outcome',
        iconName: 'ios-plane'
    },
    {
        id: 2,
        name: '运动',
        type: 'income',
        iconName: 'logon-yen'
    },
    {
        id: 3,
        name: '去香港旅游',
        type: 'outcome',
        iconName: 'ios-plane'
    }
]

let props = {

    categories,
    onSelectCategory: jest.fn()
}
let propsWithCategoty = Object.assign({}, props, {
    selectedCategory: categories[0],
})

describe('test CategorySelect Component', () => {
    it('renders with categories should render the correct items', () => {
        const wrapper: ReactWrapper = mount(<CategorySelect {...props}></CategorySelect>)
        expect(wrapper.find('.category-item').length).toEqual(categories.length)
        expect(wrapper.find('.category-item.active').length).toEqual(0)
        const firstIcon = wrapper.find('.category-item').first().find(Ionicon)
        expect(firstIcon.length).toEqual(1)
        expect(firstIcon.props().icon).toEqual(categories[0].iconName)
    })
    it('renders selectedCategory with categoty item with highlight', () => {
        const wrapper: ReactWrapper = mount(<CategorySelect {...propsWithCategoty}></CategorySelect>)
        expect(wrapper.find('.category-item').first().hasClass('active')).toEqual(true)
    })
    it('click the item shourld add active class and trigger the callback', () => {
        const wrapper: ReactWrapper = mount(<CategorySelect {...propsWithCategoty}></CategorySelect>)
        wrapper.find('.category-item').at(1).simulate('click')

        expect(wrapper.find('.category-item').at(1).hasClass('active')).toEqual(true)
        expect(wrapper.find('.category-item').first().hasClass('active')).toEqual(false)
        expect(propsWithCategoty.onSelectCategory).toHaveBeenCalledWith(categories[1])

        // const wrapper = shallow(<CategorySelect {...propsWithCategoty} />)
        // wrapper.find('.category-item').at(1).simulate('click', { preventDefault: () => { } })
        // expect(propsWithCategoty.onSelectCategory).toHaveBeenCalledWith(categories[1])
    })
})