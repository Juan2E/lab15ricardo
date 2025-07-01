const express = require('express');
const router = express.Router();

const autorController = require('../controllers/autorController');

router.get('/', autorController.getAll);
router.get('/:AutorID', autorController.getOne);
router.post('/', autorController.create);
router.put('/:AutorID', autorController.update);
router.delete('/:AutorID', autorController.remove);

module.exports = router;
