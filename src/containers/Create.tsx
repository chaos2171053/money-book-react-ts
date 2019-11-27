import React from 'react'
import PriceForm from '../components/PriceForm'

const Create = ({
    match
}: { [key: string]: any } = {}) => {
    return (
        <div>
            this is a new page{match.params.id}
            <PriceForm onFormSubmit={() => { }} onCancelSubmit={() => { }}></PriceForm>
        </div>
    )
}

export default Create