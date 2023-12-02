import { useSelector } from "react-redux"

export function Chat (){
    const isLoading = useSelector(storeState => storeState.gigModule.isLoading)
    const { chat } = useSelector((storeState) => storeState.chatModule)

    return (
        <div>CHAT WORKS!</div>
    )
    
}