const router = require("express").Router();
const booksData = require("../resources/files/data.json");
const bodyParser = require('body-parser');
const path = require("path");
const fs = require('fs');

router.use(bodyParser.urlencoded({ extended: true }));

router.get("/", (req, res) =>
    res.render("index.ejs", { title: "Gestión de Libros", data: booksData.books })
);

router.get("/get-book/:id", (req, res) => {
    const { id } = req.params;

    if (booksData.books.hasOwnProperty(id)) {
        const book = booksData.books[id];

        return res.status(200).json({ state: true, data: book });
    }

    return res.status(200).json({ state: false });
});

router.get("/add-book", (req, res) => {
    res.render("new-book.ejs", { title: "Agregar Libro" });
});

router.post('/add-book', (req, res) => {
    const { id, name, pages, status } = req.body;


    // Verifica si los campos requeridos están presentes en la solicitud
    if (!id || !name || !pages || !status) {
        return res.status(400).send('Faltan datos del libro');
    }

    // Verifica si las páginas son un número válido
    if (isNaN(pages)) {
        return res.status(400).send('El número de páginas debe ser un número válido');
    }

    // Agrega el nuevo libro al objeto JSON
    booksData.books[id] = {
        id,
        name,
        pages: parseInt(pages),
        status
    };

    // Escribe los datos actualizados de vuelta al archivo JSON
    const filePath = path.join(__dirname, '../resources/files/data.json');
    fs.writeFile(filePath, JSON.stringify(booksData, null, 2), err => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error interno del servidor');
        }

        res.redirect("/");
    });
});

router.get("/loan-book/:id", (req, res) => {
    const { id } = req.params;

    if (booksData.books.hasOwnProperty(id)) {
        const book = booksData.books[id];
        // Verifica si el estado del libro es 'available'
        if (book.status === 'available') {
            // Cambia el estado del libro a 'unavailable'
            book.status = 'unavailable';
            // Escribe los datos actualizados de vuelta al archivo JSON
            const filePath = path.join(__dirname, '../resources/files/data.json');
            fs.writeFile(filePath, JSON.stringify(booksData, null, 2), err => {
                if (err) {
                    console.error(err);
                    return res.status(500).send('Error interno del servidor');
                }
                // Envía una respuesta JSON indicando éxito
                res.redirect("/");
            });
        } else {
            return res.status(400).send('El libro ya está prestado');
        }
    } else {
        return res.status(404).send('Libro no encontrado');
    }
});

router.get("/return-book/:id", (req, res) => {
    const { id } = req.params;

    if (booksData.books.hasOwnProperty(id)) {
        const book = booksData.books[id];
        // Verifica si el estado del libro es 'unavailable'
        if (book.status === 'unavailable') {
            // Cambia el estado del libro a 'available'
            book.status = 'available';
            // Escribe los datos actualizados de vuelta al archivo JSON
            const filePath = path.join(__dirname, '../resources/files/data.json');
            fs.writeFile(filePath, JSON.stringify(booksData, null, 2), err => {
                if (err) {
                    console.error(err);
                    return res.status(500).send('Error interno del servidor');
                }
                // Envía una respuesta JSON indicando éxito
                res.redirect("/");
            });
        } else {
            return res.status(400).send('El libro ya está disponible');
        }
    } else {
        return res.status(404).send('Libro no encontrado');
    }
});

router.get("/edit-book/:id", (req, res) => {
    const { id } = req.params;
    const book = booksData.books[id];
    
    if (!book) {
        // Si el libro no se encuentra, devuelve un error 404
        return res.status(404).send('Libro no encontrado');
    }

    res.render("edit-book.ejs", { title: "Editar Libro", book });
});


router.post("/edit-book/:id", (req, res) => {
    const { id } = req.params;
    const { name, pages } = req.body;
    
    // Verificar si el libro está en estado 'unaviable'
    if (booksData.books[id].status === 'unaviable') {
        return res.status(403).send('No se puede editar un libro en estado unaviable');
    }

    // Actualizar los datos del libro
    booksData.books[id].name = name;
    booksData.books[id].pages = pages;

    // Guardar los cambios en el archivo JSON
    const filePath = path.join(__dirname, '../resources/files/data.json');
    fs.writeFile(filePath, JSON.stringify(booksData, null, 2), err => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error interno del servidor');
        }

        // Redirigir a la lista de libros después de editar
        res.redirect('/');
    });
});

router.get("/delete-book", (req, res) => {
    const { id } = req.params;
    const book = booksData.books[id];

    res.render("delete-book.ejs", { title: "Eliminar Libro", book });
});

router.post("/delete-book", (req, res) => {
    const { id } = req.body;

    // Verificar si el libro está en estado 'unavailable'
    if (booksData.books[id].status === 'unavailable') {
        res.status(403).send('NO ES POSIBLE ELIMINAR ESE LIBRO');
        return res.redirect('/'); // Redirigir a la página principal
    }

    // Eliminar el libro del objeto JSON
    delete booksData.books[id];

    // Escribir los datos actualizados en el archivo JSON
    const filePath = path.join(__dirname, '../resources/files/data.json');
    fs.writeFile(filePath, JSON.stringify(booksData, null, 2), err => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error interno del servidor');
        }

        // Redirigir a la lista de libros después de eliminar
        res.redirect('/');
    });
});

module.exports = router;
