import React, { Component } from 'react'
import Ionicon from 'react-ionicons'
import { Colors } from '../utility'
export interface Category {
    id: string,
    name: string,
    type: string,
    iconName: string
}

interface IProps {
    categories: Array<Category>,
    selectedCategory: any,
    onSelectCategory: Function
}

// interface IState {
//     selectedCategoryId?: string | null
// }



export class CategorySelect extends Component<IProps> {
    selectCatory = (event: any, category: Category) => {
        this.setState({
            selectedCategoryId: category.id
        })
        event.preventDefault()
        this.props.onSelectCategory(category)
    }
    render() {
        const { categories, selectedCategory } = this.props
        const selectedCategoryId = selectedCategory && selectedCategory.id
        return (
            <div className="category-select-component">
                <div className="row">
                    {categories.map((category, index) => {
                        const iconColor = (category.id === selectedCategoryId) ? Colors.white : Colors.gray
                        const backColor = (category.id === selectedCategoryId) ? Colors.blue : Colors.lightGray
                        const activeClassName = (selectedCategoryId && (selectedCategoryId === category.id)) ? 'category-item col-3 active' : 'category-item col-3'
                        return (
                            <div className={activeClassName} key={index} onClick={(event) => this.selectCatory(event, category)}>
                                <Ionicon
                                    className="rounded-circle"
                                    style={{ backgroundColor: backColor, padding: '5px' }}
                                    fontSize="50px"
                                    color={iconColor}
                                    icon={category.iconName}>

                                </Ionicon>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

