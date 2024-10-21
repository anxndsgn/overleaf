import BatchedUpdateModule from './helpers/batchedUpdate.mjs'

const { batchedUpdateWithResultHandling } = BatchedUpdateModule

const MODEL_NAME = process.argv.pop()

// Todo: handle mjs file once models have been converted to ES module
const { [MODEL_NAME]: Model } = await import(
  `../app/src/models/${MODEL_NAME}.js`
)

function processBatch(batch) {
  for (const doc of batch) {
    const error = new Model(doc).validateSync()
    if (error) {
      const { errors } = error
      console.log(JSON.stringify({ _id: doc._id, errors }))
    }
  }
}

batchedUpdateWithResultHandling(
  Model.collection.name,
  {},
  async nextBatch => {
    await processBatch(nextBatch)
  },
  {}
)