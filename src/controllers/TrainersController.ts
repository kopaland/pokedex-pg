import { Router } from 'express'
import { Trainer } from '~/models/Trainer'
import { TrainersService } from '../services/TrainersService'

const router = Router()
const trainersController = new TrainersService()

router.get('/', (req, res) => {
  trainersController
    .getAll()
    .then((trainers) => {
      res.send(trainers)
    })
    .catch((error) => {
      console.error(error)
      res.status(500).send()
    })
})
router.get('/:id', (req, res) => {
  trainersController
    .getById(Number(req.params.id))
    .then((trainer) => {
      res.send(trainer)
    })
    .catch((error) => {
      console.error(error)
      res.status(500).send()
    })
})
router.post('/', (req, res) => {
  trainersController.create(req.body)
  .then((trainer) => {
    res.send(trainer)
  })
  .catch((error) => {
    console.error(error)
    res.status(500).send()
  })
})
router.patch('/', (req, res) => {
  trainersController.update(req.body)
  .then((trainer) => {
    res.send(trainer)
  })
  .catch((error) => {
    console.error(error)
    res.status(500).send()
  })
})
router.delete('/:id', (req, res) => {
  trainersController
    .delete(Number(req.params.id))
    .then(() => {
      res.send()
    })
    .catch((error) => {
      console.error(error)
      res.status(500).send()
    })
})

export default router
