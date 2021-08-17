// *** Example command: node app.js add --title="test1" --body="TEST1"

const chalk = require('chalk')
const yargs = require('yargs')
const notes = require('./notes.js')

const command = process.argv[2] // reads the 3rd arg from command line which will be the command we will use

//customize yargs version
yargs.version('1.1.0')

//create add command
yargs.command({
    command: 'add', // node app.js add
    describe: 'add new note',
    builder: {
        title:{ // new yargs property. can call it like yargs.title
            describe: 'Note title', //cmd: node app.js add --title='value'
            demandOption: true, //makes title a required arg
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){ // the above command properties get passed as args when running the cmd.
        // console.log('adding a new note:', argv.title)
        // console.log('adding a new body:', argv.body)
        notes.addNote(argv.title, argv.body)
    }
})

yargs.command({
    command: 'remove',
    describe: 'remove a note',
    builder: {
        title :{
            describe: 'note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notes.deleteNote(argv.title)
    }
})

yargs.command({
    command: 'list',
    describe: 'list notes',
    handler(){
        notes.listNotes()
    }
})

yargs.command({
    command: 'read',
    describe: 'read a note',
    builder: {
        title:{
            describe: 'read a note',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        console.log('read note')
        notes.readNote(argv.title)
    }
})

yargs.parse()