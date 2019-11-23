import React from 'react'
import { shallow } from 'enzyme'
import TotalPrice from '../TotalPrice'

const props = {
    income: 1000,
    outcome: 2000
}

describe('test TotalPrice component', () => {
    it('component should render correct income and outcome number', () => {
        const wrapper = shallow(<TotalPrice {...props}></TotalPrice>)
        expect(wrapper.find('.income span').text() * 1).toEqual(1000)
        expect(wrapper.find('.outcome span').text() * 1).toEqual(2000)
    })
})