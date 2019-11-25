import React from 'react'
import { mount, ReactWrapper } from 'enzyme'
import MonthPicker from '../MonthPicker'
import ReactDOM from 'react-dom'

let props = {
    year: 2019,
    month: 11,
    onChange: jest.fn()
}

let wrapper: ReactWrapper

describe('test MonthPicker component', () => {
    beforeEach(() => {
        wrapper = mount(<MonthPicker {...props} />)
    })
    it('should render the component to match the snapshot', () => {
        expect(wrapper).toMatchSnapshot()
    })
    it('render the correct year and month, show correct dropdown status', () => {
        const text = wrapper.find('.dropdown-toggle').first().text()
        expect(text).toEqual('2019年11月')
        expect(wrapper.find('.dropdown-menu').length).toEqual(0)
        expect(wrapper.state('isOpen')).toEqual(false)
        expect(wrapper.state('selectYear')).toEqual(props.year)
    })
    it('after click the button, dropdown should show, year list&month list should have the correct items', () => {
        wrapper.find('.dropdown-toggle').simulate('click')
        expect(wrapper.state('isOpen')).toEqual(true)
        expect(wrapper.find('.dropdown-menu').length).toEqual(1)
        expect(wrapper.find('.years-range .dropdown-item').length).toEqual(9)
        expect(wrapper.find('.months-range .dropdown-item').length).toEqual(12)
        expect(wrapper.find('.years-range .dropdown-item.active').text())
            .toEqual('2019年')
        expect(wrapper.find('.months-range .dropdown-item.active').text())
            .toEqual('11月')
        //the first year should be the current year minus 4
        expect(wrapper.find('.years-range .dropdown-item').first().text())
            .toEqual(`${props.year - 4}年`)
        expect(wrapper.find('.months-range .dropdown-item').first().text())
            .toEqual('01月')
    })

    it('after the dropdown is shown, click the document should close the dropdown', () => {
        let eventMap: { [key: string]: any } = {
        }
        document.addEventListener = jest.fn((event, cb) => {
            eventMap[event] = cb
        })
        const wrapper = mount(<MonthPicker {...props} />)
        wrapper.find('.dropdown-toggle').simulate('click')
        expect(wrapper.state('isOpen')).toEqual(true)
        expect(wrapper.find('.dropdown-menu').length).toEqual(1)
        eventMap.click({
            target: ReactDOM.findDOMNode(wrapper.instance())
        })
        expect(wrapper.state('isOpen')).toEqual(false)

        wrapper.find('.dropdown-toggle').simulate('click')
        expect(wrapper.state('isOpen')).toEqual(true)
        eventMap.click({
            target: document,
        })
        expect(wrapper.state('isOpen')).toEqual(false)
    })
})