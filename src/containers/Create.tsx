import React from 'react'
import PriceForm from '../components/PriceForm'
import { testItems } from '../testData'

const Create = ({
    match
}: { [key: string]: any } = {}) => {
    return (
        <div>
            this is a new page{match.params.id}
            <PriceForm onFormSubmit={() => { }} onCancelSubmit={() => { }} item={testItems[0]}></PriceForm>
        </div >
    )
}

export default Create