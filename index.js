var fs = require('fs'),
    path = require('path'),
    cwd = process.cwd()

var defaults = {
    styles: ['css', 'styl', 'sass', 'less'],
    scripts: ['js', 'coffee'],
    templates: ['html', 'jade', 'mustache', 'handlebars'],
    images: ['jpg', 'png', 'gif'],
    files: [],
    indent: 2,
    debug: false
}

module.exports = function (jsonPath, options) {

    if (typeof jsonPath === 'object') {
        options = jsonPath
        jsonPath = 'component.json'
    }
    
    jsonPath = path.relative(cwd, jsonPath)
    options = merge(defaults, options || {})
    
    var project = read(jsonPath),
        map = {},
        justUpdated = false,
        dbTimeout = null

    for (var key in options) {
        if (Array.isArray(options[key])) {
            options[key].forEach(function (ext) {
                map[ext] = key  
            })
        }
    }

    function addFile (file) {
        var type = getType(file),
            files = project[type]
        if (!files) {
            files = project[type] = []
        }
        var i = findFile(files, file)
        if (i < 0) {
            files.push(file)
            write()
        }
    }

    function deleteFile (file) {
        var type = getType(file),
            files = project[type]
        if (!Array.isArray(files)) return
        var i = findFile(files, file)
        if (i >= 0) {
            files.splice(i, 1)
            write()
        }
    }

    function getType (file) {
        var ext = path.extname(file).slice(1)
        return map[ext]
    }

    function read () {
        return JSON.parse(fs.readFileSync(jsonPath, 'utf-8'))
    }

    function write () {
        fs.writeFileSync(jsonPath, JSON.stringify(project, null, 2), 'utf-8')
    }

    function debounce () {
        justUpdated = true
        clearTimeout(dbTimeout)
        dbTimeout = setTimeout(function () {
            justUpdated = false
        }, 100)
    }

    return function (event) {

        var p = path.relative(cwd, event.path)
        
        if (event.type === 'added') {
            if (options.log) console.log('component.json: +' + p)
            debounce()
            addFile(p)
        }
        if (event.type === 'deleted') {
            if (options.log) console.log('component.json: -' + p)
            debounce()
            deleteFile(p)
        }
        if (event.type === 'changed' && p === jsonPath && !justUpdated) {
            if (options.log) console.log('component.json: ^')
            project = read()
        }

    }

}

function findFile (list, file) {
    var index = -1
    list.some(function (f, i) {
        if (path.relative(cwd, f) === file) {
            index = i
            return true
        }
    })
    return index
}

function merge (a, b) {
    var res = {}, key
    for (key in a) {
        res[key] = a[key]
    }
    for (key in b) {
        res[key] = b[key]
    }
    return res
}