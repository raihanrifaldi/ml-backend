const predictClassification = require("../services/inferenceService");
const crypto = require("crypto");
const storeData = require("../services/storeData");

async function postPredictHandler(request, h) {
    const {image} = request.payload;
    const {model} = request.server.app;

    const { confidenceScore, label, suggestion } = await predictClassification(model, image);
    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();

    const data = {
        "id": id,
        "result": label,
        "suggestion": suggestion,
        "createdAt": createdAt
    }

    const response = h.response({
        status: "succes",
        message: confidenceScore > 99 ? 'Model is predicted succesfully' : 'Model is predicted successfully but under threshold. Please use the correct picture',
        data
    });

    await storeData(id, data);
    response.code(201);

    return response;
}

module.exports = postPredictHandler;