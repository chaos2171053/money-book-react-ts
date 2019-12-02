import React, { ComponentType } from 'react'
import { AppContext } from '../App'


const WithContext = (Component: ComponentType) => {
    return (props: any) => (
        <AppContext.Consumer>
            {
                ({ state }: any) => {
                    return (
                        <Component {...props} data={state}></Component>
                    )
                }
            }
        </AppContext.Consumer>
    )
}
export default WithContext