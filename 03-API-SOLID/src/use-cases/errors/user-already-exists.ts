export class UsersAlreadyExistsError extends Error {
  constructor() {
    super('Email já existe')
  }
}
