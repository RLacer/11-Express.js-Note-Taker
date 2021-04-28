
const util = require('util');
const fs = require('fs');
const uuid = require('uuid/v1');
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Store {
    read() {
        return readFileAsync('db/db.json', 'UTF8');
    }

    write(note) {
        return writeFileAsync('db/db.json', JSON.stringify(note))
    }

    getNotes() {
        return this.read().then(notes => {
            let parseNotes;
            try {
                parseNotes = [].concat(JSON.parse(notes));
            } catch (err) {
                parseNotes = [];
            }
            return parseNotes;
        })
    }

    addNote(note) {
        const { title, text } = note;

        if (!title || !text) {
            throw new Error("You must have a title and text!");
        };
        const newNote = {
            title,
            text,
            id: uuid()
        }
        return this.getNotes() 
            .then(notes => [...notes, newNote])
            .then(updatedNotes => this.write(updatedNotes))
            .then( () => newNote);

    }

    removeNote(id) {
        return this.getNotes()
            .then(notes => notes.filter(note => note.id !== id))
            .then(filteredNotes => this.write(filteredNotes));
    }
}

module.exports = new Store();