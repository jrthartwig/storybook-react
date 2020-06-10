class Util {
    callFunction = (functionParent, functionToCall, ...parameters) => {
        if (functionParent && functionToCall && typeof functionParent[functionToCall] === typeof Function)
            return functionParent[functionToCall](...parameters);
    }
}
export default new Util();