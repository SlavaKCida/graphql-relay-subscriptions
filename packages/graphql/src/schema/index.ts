import { builder } from '../builder'
import './user'
import './post'
import { writeFileSync } from 'fs'
import { resolve } from 'path'
import { printSchema } from 'graphql'

export const schema = builder.toSchema({})
const schemaFilePath = resolve(__dirname, '../../../../schema.graphql')

console.log('schemaFilePath', schemaFilePath)

writeFileSync(schemaFilePath, printSchema(schema))
