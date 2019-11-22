import React from 'react'

interface IProps {
    income: number,
    outcome: number
}

const TotalPrice = (props: IProps) => (
    <div className="row">
        <div className="col">
            <h5 className="income">收入：<span>{props.income}</span></h5>
        </div>
        <div className="col">
            <h5 className="outcome">支出：<span>{props.outcome}</span></h5>
        </div>
    </div>
)

export default TotalPrice