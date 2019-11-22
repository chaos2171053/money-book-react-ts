import React, { Component } from 'react'
import { padLeft, range } from '../utility'

interface IProps {
    year: number,
    month: number
}
interface IState {
    isOpen: boolean
}

export default class EditForm extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = {
            isOpen: false
        }
    }

    toogleDropwodn = (event: { preventDefault: Function }) => {
        event.preventDefault()
        this.setState({
            isOpen: !this.state.isOpen
        })
    }



    render() {
        const { year, month } = this.props
        const { isOpen } = this.state
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
                                        className="dropdown-item"
                                        href="javascript;">
                                        {item}年
                                    </a>
                                )}
                            </div>
                            <div className="col">
                                {monthRange.map((item, index) =>
                                    <a href="javascript;"
                                        key={index}
                                        className="dropdown-item">
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