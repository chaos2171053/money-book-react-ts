import React from 'react'

const Create = ({
    match
}: { [key: string]: any } = {}) => {
    return (
        <div>
            this is a new page{match.params.id}
        </div>
    )
}

export default Create