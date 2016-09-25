var { el } = require('redom');

var Titlebar = require('./titlebar');
var Toolbar = require('./toolbar');
var Editor = require('./editor');

var context = require('../context');
var log = require('../log');

class App {
	constructor() {
		this.el = el('app.loading.toolbar-active',
			this.titlebar = new Titlebar,
			this.toolbar = new Toolbar,
			this.editor = new Editor);

		context.editor = this.editor;

		document.addEventListener('dragover', (event) => {
			event.preventDefault();
		});

		document.addEventListener('drop', (event) => {
			event.preventDefault();
			var files = event.dataTransfer.files;
			if (files.length !== 1) {
				return alert('Must drag & drop only 1 file, currently');
			}

			context.editor.update(files[0].path);
		});
	}

	update(filename) {
		this.el.classList.add('loading');
		this.editor.update(filename);
		this.titlebar.update(filename);
		this.el.classList.remove('loading');
	}

	blur() {
		this.el.classList.add('inactive');
	}

	focus() {
		this.el.classList.remove('inactive');
	}
}

module.exports = App;