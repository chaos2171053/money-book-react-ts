import React, { ComponentClass, FunctionComponent } from 'react'
import { AppContext } from '../App'


const withContext = (Component: ComponentClass | FunctionComponent) => {
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
export default withContext