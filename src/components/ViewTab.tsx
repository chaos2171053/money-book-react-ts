import React from 'react'
import { LIST_VIEW, CHART_VIEW } from '../utility'
import Ionicon from 'react-ionicons'

interface IProps {
    activeTab: string,
    onTabChange: (view: string) => void
}

const generateLinkClass = (current: string, view: string) => {
    return (current === view) ? 'nav-link active' : 'nav-lick'
}

const ViewTab = (props: IProps) => (
    <ul className='nav nav-tabs nav-fill my-4'>
        <li className='nav-item'>
            <a
                className={generateLinkClass(props.activeTab, LIST_VIEW)}
                href='javascript;'
                onClick={(event) => { event.preventDefault(); props.onTabChange(LIST_VIEW) }}
            >
                <Ionicon
                    className="rounded-circle mr-2"
                    fontSize="25px"
                    color={'#007bff'}
                    icon='ios-paper'
                />
                列表模式
                </a>
        </li>
        <li className='nav-item'>
            <a
                className={generateLinkClass(props.activeTab, CHART_VIEW)}
                href='javascript;'
                onClick={(event) => { event.preventDefault(); props.onTabChange(CHART_VIEW) }}>
                <Ionicon
                    className="rounded-circle mr-2"
                    fontSize="25px"
                    color={'#007bff'}
                    icon='ios-pie'
                />
                图表模式
                </a>
        </li>
    </ul>
)

export default ViewTab