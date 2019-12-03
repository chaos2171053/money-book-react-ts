import React from 'react'
import { AppContext } from '../App'


const WithContext = (Component: any) => {
    return (props: any) => (
        <AppContext.Consumer>
            {
                ({ state, actions }: any) => {
                    return (
                        <Component {...props} data={state} actions={actions}></Component>
                    )
                }
            }
        </AppContext.Consumer>
    )
}
export default WithContext