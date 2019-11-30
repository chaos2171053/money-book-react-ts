import React from 'react'
import { AppContext, IAppState } from '../App'

const withContext = (Component: any) => {
    return (props: any) => (
        <AppContext.Consumer>
            {
                ({ state }: { state: IAppState }) => {
                    return (
                        <Component {...props} data={state}></Component>
                    )
                }
            }
        </AppContext.Consumer>
    )
}
export default withContext