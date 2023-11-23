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

export function showSuccessMsg(msg, styles = {}) {
    showUserMsg({ ...msg, type: 'success' }, styles)
}

export function showErrorMsg(msg, styles = {}) {
    showUserMsg({ ...msg, type: 'error' }, styles)
}