import * as express from 'express';
import validate from '../../middleware/JoiValidator';
import logger from '../../utils/logging/Logger';
import authenticationMiddleware from '../../middleware/Auth';
import QuoteController from './QuoteController';
import QuoteValidation from './QuoteValidation';

const router = express.Router();

/**
 * This route will fetch all Inventory by product number.
 */
router.get('/:id',
  authenticationMiddleware, validate(QuoteValidation.GetQuote), (req, res, next) => {
    logger.info('GET ALL QUOTES');

    QuoteController.GetByID(Number(req.params.id))
      .then((Quote) => res.status(200).json(Quote))
      .catch((err) => next(err));
  });

/**
 * This route will add new inventory
 */
router.post('/', validate(QuoteValidation.PostQuote),
  (req, res, next) => {
    logger.info('POST QUOTE');
    QuoteController.Add(req.body)
      .then((response) => {
        res.status(201).json(response);
      })
      .catch((err) => next(err));
  });

/**
* This route will update a inventory
*/
router.put('/', authenticationMiddleware, validate(QuoteValidation.PutQuote),
  (req, res, next) => {
    logger.info('PUT QUOTE');

    QuoteController.Edit(req.body)
      .then((response) => {
        res.status(201).json(response);
      })
      .catch((err) => next(err));
  });

/**
* This route will delete a product by product number
*/
router.delete('/:id',
  authenticationMiddleware,
  validate(QuoteValidation.DeleteQuote), (req, res, next) => {
    logger.info('DELETE QUOTE');

    QuoteController.DeleteByID(Number(req.params.id))
      .then((response) => {
        res.status(201).json(response);
      })
      .catch((err) => next(err));
  });

export default router;