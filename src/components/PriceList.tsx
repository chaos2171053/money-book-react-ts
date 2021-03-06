import React from 'react'
import Ionicon from 'react-ionicons'
import { PriceItem } from '../containers/Home'


interface IProps {
    items: Array<any>,
    onModifyItem: (item: { id: string, title: string }) => void,
    onDeleteItem: (item: { id: string }) => void
}

const PriceList = (props: IProps) => {
    return (
        <ul className="list-group list-group-flush">
            {
                props.items.map((item: PriceItem) => (
                    <li className="list-group-item d-flex justify-content-between align-items-center" key={item.id}>
                        <span className="col-1">
                            <Ionicon
                                className="rounded-circle"
                                fontSize="30px"
                                style={{ backgroundColor: '#007bff', padding: '5px' }}
                                color={'#fff'}
                                icon={item.category.iconName}>
                                {item.category.name}
                            </Ionicon>
                        </span>
                        <span className="col-5"> {item.title}</span>
                        <span className="col-2 font-weight-bold">
                            {(item.category.type === 'income') ? '+' : '-'}
                            {item.price}元
                        </span>
                        <span className="col-2">{item.date}</span>
                        <button className="col-1" onClick={() => props.onModifyItem(item)}>
                            <Ionicon
                                className="rounded-circle"
                                fontSize="30px"
                                style={{ backgroundColor: '#28a745', padding: '5px' }}
                                color={'#fff'}
                                icon='ios-create-outline'>

                            </Ionicon>
                        </button>
                        <button className="col-1 " onClick={() => props.onDeleteItem(item)} >
                            <Ionicon
                                className="rounded-circle"
                                fontSize="30px"
                                style={{ backgroundColor: '#dc3545', padding: '5px' }}
                                color={'#fff'}
                                icon='ios-close'
                            />
                        </button>
                    </li>
                ))
            }
        </ul>
    )
}
export default PriceList;
