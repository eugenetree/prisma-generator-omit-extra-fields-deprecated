import { generatorHandler, GeneratorOptions } from '@prisma/generator-helper'
import { logger } from '@prisma/sdk'
import path from 'path'
import { getExplicitlyTypedHandlersCode } from './helpers/getExplicitlyTypedHandlersCode'
import { getImplicitlyTypedHandlerCode } from './helpers/getImplicitlyTypedHandlerCode'
import { getModelFieldsCode } from './helpers/getModelFieldsCode'
import { writeFileSafely } from './utils/writeFileSafely'

const { version } = require('../package.json')

generatorHandler({
  onManifest() {
    return {
      version,
      defaultOutput: '../generated',
      prettyName: 'prisma-omit-extra-fields',
    }
  },
  onGenerate: async (options: GeneratorOptions) => {
    let resultCode = '';

    options.dmmf.datamodel.models.forEach((model) => {
      resultCode += `
          ${getModelFieldsCode({ modelName: model.name, modelFields: model.fields })}

  
          ${getImplicitlyTypedHandlerCode({ modelName: model.name })};\n\n


          ${getExplicitlyTypedHandlersCode({ modelName: model.name, modelFields: model.fields })}

          // - - - - - - - - //
        `
    })

    const writeLocation = path.join(options.generator.output?.value!, `test.ts`)
    await writeFileSafely(writeLocation, resultCode)
  },
})