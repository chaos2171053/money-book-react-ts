import React, { Component } from 'react'
import { padLeft, range } from '../utility'

interface IProps {
    year: number,
    month: number,
    onChange: (selectYear: number, monthNumber: number) => void
}
interface IState {
    isOpen: boolean,
    selectYear: number
}

export default class EditForm extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = {
            isOpen: false,
            selectYear: this.props.year
        }
    }

    toogleDropwodn = (event: { preventDefault: Function }) => {
        event.preventDefault()
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    generateDropDownActiveItem = (dropDownItem: number, active: number) => {
        return (dropDownItem === active) ? 'dropdown-item active' : 'dropdown-item'
    }

    selectYear = (event: any, yearNumber: number) => {
        event.preventDefault()
        this.setState({
            selectYear: yearNumber
        })
    }

    selectMonth = (event: any, monthNumber: number) => {
        event.preventDefault()
        this.setState({
            isOpen: false
        })
        this.props.onChange(this.state.selectYear, monthNumber)
    }

    render() {
        const { year, month } = this.props
        const { isOpen, selectYear } = this.state
        const monthRange = range(12, 1)
        const yearRange = range(9, -4).map(item => item + 2018)
        return (
            <div className='dropdown month-picker-component'>
                <h4>选择月份</h4>
                <button className="btn btn-lg btn-secondary dropdown-toggle"
                    onClick={this.toogleDropwodn}>
                    {`${year}年${padLeft(month)}月`}
                </button>
                {isOpen &&
                    <div className="dropdown-menu" style={{ display: 'block' }}>
                        <div className="row ">
                            <div className="col border-right">
                                {yearRange.map((item, index) =>
                                    <a
                                        key={index}
                                        className={this.generateDropDownActiveItem(item, selectYear)}
                                        onClick={(event) => this.selectYear(event, item)}
                                        href="javascript;">
                                        {item}年
                                    </a>
                                )}
                            </div>
                            <div className="col">
                                {monthRange.map((item, index) =>
                                    <a href="javascript;"
                                        key={index}
                                        onClick={(event) => this.selectMonth(event, item)}
                                        className={this.generateDropDownActiveItem(item, month)}>
                                        {padLeft(item)}月
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }
}