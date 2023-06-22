export class EmailAlreadyRegistered extends Error {
  constructor() {
    super('-Email already exists.')
  }
}
