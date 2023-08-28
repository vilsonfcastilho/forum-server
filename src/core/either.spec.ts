import { Either, left, right } from './either'

function doSomething(shouldSuccess: boolean): Either<string, string> {
  if (shouldSuccess) {
    return right('success')
  } else {
    return left('error')
  }
}

test('error result', () => {
  const result = doSomething(false)

  expect(result.isLeft()).toEqual(true)
  expect(result.isRight()).toEqual(false)
})

test('success result', () => {
  const result = doSomething(true)

  expect(result.isLeft()).toEqual(false)
  expect(result.isRight()).toEqual(true)
})
