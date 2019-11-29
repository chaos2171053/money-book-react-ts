import React from 'react'
import { mount, ReactWrapper } from 'enzyme'
import { Tabs, Tab } from '../Tabs'


let props = {
    activeIndex: 0,
    onTabChange: jest.fn()
}
let wrapper: ReactWrapper
describe('test Tabs compotent', () => {
    beforeEach(() => {
        wrapper = mount(
            <Tabs {...props}>
                <Tab>这是第一个Tab</Tab>
                <Tab>这是第二个Tab</Tab>
            </Tabs>)
    })
    it('should render the component to match snapshot', () => {
        expect(wrapper).toMatchSnapshot()
    })
    it('should render correct tab item', () => {
        expect(wrapper.find('Tab').length).toEqual(2)
    })
})