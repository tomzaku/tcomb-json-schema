import optionGenerate from './src/optionGenerate'
import transform from './src/transformTcomb'
function transformOption(schema, uiSchema) {
  return {
    options: optionGenerate({ schema, uiSchema }),
    type: transform(schema),
  }
}
export default transformOption