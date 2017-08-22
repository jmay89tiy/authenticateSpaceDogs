const people = [
  { id: 1, name: 'Joshua May', username: 'jmay89', password: 'password' },
  { id: 2, name: 'doggo13', username: 'doggo13', password: 'bones' }
]

function getUser (indivdualId) {
  const foundUser = people.find(individualUser => Number(individualId) === individualUser.id)
  console.log(foundUser)
  return foundUser
}

function getIndividualByUsername (individualName) {
  const foundUser = people.find(individualUser => individualName === individualUser.username)
  return foundUser
}

function getUsers () {
  return people
}

module.exports = { getUser, getIndividualByUsername, getUsers }