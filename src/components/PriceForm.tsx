import React, { Component } from 'react'
import { isValidDate } from '../utility'

interface ITem {
    title: string,
    price: number | string,
    date: string
    id?: string,
    monthCategory?: string,
    cid?: string,
    timestamp?: number

}

interface IProps {
    item: ITem,
    onFormSubmit: Function,
    onCancelSubmit: Function
}

interface IState {
    // title: string,
    // date: string,
    // price: number | string,
    validatePass: boolean,
    errorMessage: string
}
export default class PriceForm extends Component<IProps, IState> {
    dateInput: any;
    priceInput: any;
    titleInput: any;
    static defaultProps = {
        item: {
            title: '',
            date: '',
            price: ''
        }
    }
    constructor(props: IProps) {
        super(props)
        this.dateInput = React.createRef();
        this.priceInput = React.createRef();
        this.titleInput = React.createRef();
        this.state = {
            // title: props.item ? props.item.title : '',
            // date: props.item ? props.item.date : '',
            // price: props.item ? props.item.price : '',
            validatePass: false,
            errorMessage: ''
        }

    }
    sumbitForm = (event: React.FormEvent) => {
        const { item, onFormSubmit } = this.props
        const editMode = item && !!item.id
        const price = this.priceInput.current.value.trim() * 1
        const date = this.dateInput.current.value.trim()
        const title = this.titleInput.current.value.trim()
        if (price && date && title) {
            if (price < 0) {
                this.setState({
                    validatePass: false,
                    errorMessage: '价格数字必须大于0'
                })
            } else if (!isValidDate(date)) {
                this.setState({
                    validatePass: false,
                    errorMessage: '请填写正确的日期格式'
                })
            } else {
                this.setState({
                    validatePass: true,
                    errorMessage: ''
                })
                if (editMode) {
                    onFormSubmit({ ...item, title, price, date }, editMode)
                } else {
                    onFormSubmit({ title, price, date }, editMode)
                }
            }
        } else {
            this.setState({
                validatePass: false,
                errorMessage: '请输入所有必选项'
            })
        }
        event.preventDefault()
    }
    render() {
        const { item: { title, price, date } } = this.props
        return (
            <form onSubmit={(event: React.FormEvent) => (this.sumbitForm(event))} className='price-form-component' noValidate>
                <div className="form-group">
                    <label htmlFor="title">标题 *</label>
                    <input
                        type="text" className="form-control"
                        id="title" placeholder="请输入标题"
                        defaultValue={title}
                        ref={this.titleInput}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="price">价格 *</label>
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text">¥</span>
                        </div>
                        <input
                            type="number"
                            className="form-control"
                            defaultValue={price}
                            id="price" placeholder="请输入价格"
                            ref={this.priceInput}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="date">日期 *</label>
                    <input
                        type="date" className="form-control"
                        id="date" placeholder="请输入日期"
                        defaultValue={date}
                        ref={this.dateInput}
                    />
                </div>
                <button type="submit" className="btn btn-primary mr-3">提交</button>
                <button className="btn btn-secondary" onClick={() => { this.props.onCancelSubmit() }}> 取消 </button>
                {!this.state.validatePass &&
                    <div className="alert alert-danger mt-5" role="alert">
                        {this.state.errorMessage}
                    </div>
                }
            </form>
        )
    }
}