import { getSampleDMMF } from './__fixtures__/getSampleDMMF'
import { getModelFieldsCode } from '../helpers/getModelFieldsCode';


test('model fields generation', async () => {
	const sampleDMMF = await getSampleDMMF()

	sampleDMMF.datamodel.models.forEach((model) => {
		expect(getModelFieldsCode({modelName: model.name, modelFields: model.fields})).toMatchSnapshot(model.name);
	})
})
