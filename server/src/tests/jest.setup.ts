import mongoose from 'mongoose'
import { initializeDb } from '../db/db'
import { beforeAll, afterAll, expect } from '@jest/globals'

/**
* @function Determines if the beforeAll of the jest setup file should
* run for the specific test path
*/
const shouldSkipBeforeAll = (): boolean => {
  const currentPath = expect.getState().testPath

  if (currentPath === undefined) {
    throw new Error(`Should skip before all function in the setup file
received an undefined current path`)
  }

  if (currentPath.includes('\\server\\src\\tests\\utils\\')) {
    return true
  }

  return false
}

beforeAll(async () => {
  if (shouldSkipBeforeAll()) {
    return
  }

  await new Promise((resolve, _reject) => {
    initializeDb(() => {
      resolve(null)
    })
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
