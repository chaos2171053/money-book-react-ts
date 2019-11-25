import React from 'react'
import { shallow } from 'enzyme'
import ViewTab from '../ViewTab'
import { LIST_VIEW } from '../../utility'


const props = {
    activeTab: LIST_VIEW,
    onTabChange: jest.fn()
}

let wrapper: any
describe('test ViewTab component', () => {
    beforeEach(() => {
        wrapper = shallow(<ViewTab {...props} />)
    })
    it('should render the component to match snapshot', () => {
        expect(wrapper).toMatchSnapshot()
    })
    it('should render correct tab items length ', () => {
        const navItems = wrapper.find('.nav-item')
        expect(navItems.length).toEqual(2)
    })
    // it('should trigger the correct function callbacks', () => {

    //     const navItems = wrapper.find('.nav-item')

    //     expect(navItems.first().find('a').first().hasClass('active')).toEqual(true)
    //     expect(navItems.last().find('a').first().hasClass('active')).toEqual(false)

    //     wrapper.find('.active').first().simulate('click', { preventDefault: () => { } })
    //     //navItems.last().find('a').first().simulate('click', { preventDefault: () => { } })

    //     expect(navItems.first().find('a').first().hasClass('active')).toEqual(false)
    //     expect(navItems.last().find('a').first().hasClass('active')).toEqual(true)

    // })

})