import React, { Component } from 'react'
import Ionicon from 'react-ionicons'

interface Category {
    id: number,
    name: string,
    type: string,
    iconName: string
}

interface IProps {
    categories: Array<Category>,
    selectedCategory: Category
    onSelectCategory: Function
}

interface IState {
    selectedCategoryId?: number
}



class CategorySelect extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = {
            selectedCategoryId: props.selectedCategory && props.selectedCategory.id
        }
    }
    selectCatory = (event: any, category: Category) => {
        this.setState({
            selectedCategoryId: category.id
        })
        event.preventDefault()
        this.props.onSelectCategory(category)
    }
    render() {
        const { categories } = this.props
        const { selectedCategoryId } = this.state
        return (
            <div className="category-select-component">
                <div className="row">
                    {categories.map((category, index) => {
                        const activeClassName = (selectedCategoryId && (selectedCategoryId === category.id)) ? 'category-item col-3 active' : 'category-item col-3'
                        return (
                            <div className={activeClassName} key={index} onClick={(event) => this.selectCatory(event, category)}>
                                <Ionicon clasName="rounded-circle" fontSize="50px" color="#555" icon={category.iconName}></Ionicon>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default CategorySelect