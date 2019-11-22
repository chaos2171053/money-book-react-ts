import React from 'react'
import Ionicon from 'react-ionicons'

interface IProps {
    onClick: () => void
}

const CreateBtn = (props: IProps) => (
    <button
        className="btn btn-primary btn-block d-flex justify-content-center align-items-center"
        onClick={() => { props.onClick() }}
    >
        <Ionicon
            className="rounded-circle"
            fontSize="30px"
            color='#fff'
            icon='ios-add-circle'
        />
        创建一条新的记账记录
  </button>
)

export default CreateBtn