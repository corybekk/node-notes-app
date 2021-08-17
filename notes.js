const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body) => {
    const notes = loadNote() //load the notes
    const duplicateNote = notes.find((note) => note.title === title)
    // *** see above for cleaner and more efficitient version ****
    // const duplicateNotes = notes.filter((note) => note.title === title)
    // *** see above for cleaner version ****
    // const duplicateNotes = notes.filter(function (note) { //uses array filter function. each record in notes will be passed the the function
    //     return note.title === title
    // })

    debugger

    if (!duplicateNote){
        notes.push({ // add to the notes
            title:title,
            body:body
        })
        saveNotes(notes) //write notes to json file
        console.log(chalk.green.inverse('note added'))
    } else {
        console.log(chalk.red.inverse('note already exists'))
    }
}

const deleteNote = (title) =>{
    const notes = loadNote()
    const notesToKeep = notes.filter((note) => note.title !== title)
    // **** see above for cleaner version ****
    // const notesToKeep = notes.filter( function(note){
    //     if (note.title !== title){ //filter out titles that match the title thats being deleted
    //         return note
    //     }
    // })

    if (notesToKeep.length < notes.length) {
        console.log(chalk.green.inverse('note deleted'))
        saveNotes(notesToKeep)
    } else {
        console.log(chalk.red.inverse('no note found'))
    }
    
}

const listNotes = () => {
    console.log(chalk.green.bold('Your Notes:'))
    const notesJSON = loadNote()
    notesJSON.forEach((note) => {
        console.log(note.title)
    });

}

const readNote = (title) => {
    const notesJSON = loadNote()
    const foundNote = notesJSON.find( (note) => title === note.title)
    
    if (!foundNote){
        console.log(chalk.redBright('no note found'))
    } else{
        console.log(chalk.greenBright(foundNote.title) + ':' + foundNote.body)
    }
}

const saveNotes = (notes) =>{
    dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json',dataJSON)
}

const loadNote = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    }
    catch(error){
        return [] //if no file exists, create empty arry which the new notes will be pushed too
    }
}

module.exports = {
    addNote: addNote,
    deleteNote: deleteNote,
    listNotes: listNotes,
    readNote: readNote,
}
