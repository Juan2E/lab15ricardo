const express = require('express');
const router = express.Router();

const libroController = require('../controllers/libroController');

router.get('/', libroController.getAll);
router.get('/:LibroID', libroController.getOne);
router.post('/', libroController.create);
router.put('/:LibroID', libroController.update);
router.delete('/:LibroID', libroController.remove);

module.exports = router;

