let commandTypes = {
    144: 'note_on',
    128: 'note_off'
}
let notes = {
    1: 'C',
    2: 'Cs',
    3: 'D',
    4: 'Ds',
    5: 'E',
    6: 'F',
    7: 'Fs',
    8: 'G',
    9: 'Gs',
    10: 'A',
    11: 'As',
    0: 'B'
}

export default (callback) => {
    navigator.requestMIDIAccess().then((midiAccess) => {
        Array.from(midiAccess.inputs).forEach((input) => {
            input[1].onmidimessage = (msg) => {
                callback({
                    controller: msg.target.name,
                    type: commandTypes[msg.data[0]] || msg.data[0],
                    note: `${notes[(msg.data[1] + 1) % 12]}_${Math.floor(
                        msg.data[1] / 12
                    )}`
                })
            }
        })
    })
}
