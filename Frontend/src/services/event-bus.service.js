// export const SHOW_MSG = 'show-msg'

// function createEventEmitter() {
//     const listenersMap = {}
//     return {
//         on(evName, listener){
//             listenersMap[evName] = (listenersMap[evName])? [...listenersMap[evName], listener] : [listener]
//             return ()=>{
//                 listenersMap[evName] = listenersMap[evName].filter(func => func !== listener)
//             }
//         },
//         emit(evName, data) {
//             if (!listenersMap[evName]) return
//             listenersMap[evName].forEach(listener => listener(data))
//         }
//     }
// }
// export const eventBus = createEventEmitter()

// export function showUserMsg(msg) {
//     eventBus.emit(SHOW_MSG, msg)
// }

// export function showSuccessMsg(txt) {
//     showUserMsg({txt, type: 'success'})
// }

// export function showErrorMsg(txt) {
//     showUserMsg({txt, type: 'error'})
// }
// window.showUserMsg = showUserMsg

function createEventEmitter() {
    const listenersMap = {}
    // Trick for DEBUG
    window.mapmap = listenersMap
    return {
        on(evName, listener) {
            listenersMap[evName] = (listenersMap[evName]) ? [...listenersMap[evName], listener] : [listener]
            return () => {
                listenersMap[evName] = listenersMap[evName].filter(func => func !== listener)
            }
        },
        emit(evName, data) {
            if (!listenersMap[evName]) return
            listenersMap[evName].forEach(listener => listener(data))
        }
    }
}

export const eventBusService = createEventEmitter()

export function showUserMsg(msg, styles = {}) {
    eventBusService.emit('show-user-msg', { ...msg, styles })
}

export function showSuccessMsg(txt, styles = {}) {
    showUserMsg({ txt, type: 'success' }, styles)
}

export function showErrorMsg(txt, styles = {}) {
    showUserMsg({ txt, type: 'error' }, styles)
}