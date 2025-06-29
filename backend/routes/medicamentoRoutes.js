const express = require('express');
const router = express.Router();

const medicamentoController = require('../controllers/medicamentoController');

router.get('/', medicamentoController.getAll);
router.get('/:CodMedicamento', medicamentoController.getOne);
router.post('/', medicamentoController.create);
router.put('/:CodMedicamento', medicamentoController.update);
router.delete('/:CodMedicamento', medicamentoController.remove);

module.exports = router;
