import { Router } from 'express'
import { Team } from '~/models/Team'
import { TeamsService } from '../services/TeamsService'

const router = Router()
const teamsController = new TeamsService()

router.get('/', (req, res) => {
  teamsController
    .getAll()
    .then((teams) => {
      res.send(teams)
    })
    .catch((error) => {
      console.error(error)
      res.status(500).send()
    })
})
router.get('/:id', (req, res) => {
  teamsController
    .getById(Number(req.params.id))
    .then((team) => {
      res.send(team)
    })
    .catch((error) => {
      console.error(error)
      res.status(500).send()
    })
})
router.post('/', (req, res) => {
  teamsController
    .create(req.body)
    .then((team) => {
      res.send(team)
    })
    .catch((error) => {
      console.error(error)
      res.status(500).send()
    })
})
router.put('/', (req, res) => {
  teamsController
    .update(req.body)
    .then((team) => {
      res.send(team)
    })
    .catch((error) => {
      console.error(error)
      res.status(500).send()
    })
})
router.delete('/:id', (req, res) => {
  teamsController.delete
})

export default router
