const express = require('express');
const router = express.Router();

const tipoMedicController = require('../controllers/tipoMedicController');

router.get('/', tipoMedicController.getAll);
router.get('/:CodTipoMed', tipoMedicController.getOne);
router.post('/', tipoMedicController.create);
router.put('/:CodTipoMed', tipoMedicController.update);
router.delete('/:CodTipoMed', tipoMedicController.remove);

module.exports = router;
