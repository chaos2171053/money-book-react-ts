import React, { Component } from 'react'

interface TabProps {
    children: React.ReactNode
}
interface TabsProps {
    activeIndex: number,
    children: React.ReactNode,
    onTabChange: Function
}

interface Istate {
    activeIndex: number
}


export const Tab = (props: TabProps) => (
    <React.Fragment>{props.children}</React.Fragment>
)

export class Tabs extends Component<TabsProps, Istate> {
    constructor(props: TabsProps) {
        super(props);
        this.state = {
            activeIndex: props.activeIndex
        }
    }
    tabChange = ((event: MouseEvent, index: number) => {
        event.preventDefault()
        this.setState({
            activeIndex: index
        })
        this.props.onTabChange(index)
    })
    render() {
        const { children } = this.props
        const { activeIndex } = this.state
        return (
            <ul className="tabs-component nav nav-tabs nav-fill my-4">
                {React.Children.map(children, (child, index) => {
                    const activeClassName = (activeIndex === index) ? 'nav-link active' : 'nav-link'
                    return (
                        <li className="nav-item">
                            <a
                                onClick={(event: any) => { this.tabChange(event, index) }}
                                className={activeClassName}
                                role="button"
                                href='javascript;'
                            >
                                {child}
                            </a>
                        </li>
                    )
                })}
            </ul>
        )
    }
}