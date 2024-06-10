const tf = require("@tensorflow/tfjs-node");

async function loadModel() {
    const model="https://storage.googleapis.com/cancer-prediction/model.json"
    return tf.loadGraphModel(model);
}

module.exports = loadModel;