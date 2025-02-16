const Emotion = require("../model/Emotion");
const asyncHandler = require("express-async-handler");

const emotionCtrl = {
  //!Add Emotion
  addEmotion: asyncHandler(async (req, res) => {
    const { emotion, note } = req.body;

    // Verifica se já existe uma emoção cadastrada no dia
    const today = moment().startOf("day"); // Define o começo do dia atual
    const existingEmotion = await Emotion.findOne({
      userId: req.user._id,
      createdAt: { $gte: today.toDate() }, // Busca emoções cadastradas hoje
    });

    if (existingEmotion) {
      return res.status(400).json({ message: "Você já adicionou uma emoção hoje!" });
    }

    // Criar a emoção
    const newEmotion = await Emotion.create({
      emotion,
      note,
      userId: req.user._id,
    });

    res.json({
      message: "Emoção registrada com sucesso!",
      emotion: newEmotion,
    });
  }),

  //!Get All Emotions
  getEmotions: asyncHandler(async (req, res) => {
    const emotions = await Emotion.find({ userId: req.user._id });

    if (!emotions.length) {
      throw new Error("No emotions found");
    }

    res.json({ emotions });
  }),

  //!Update Emotion
  updateEmotion: asyncHandler(async (req, res) => {
    const { emotionId, emotion, note } = req.body;

    const existingEmotion = await Emotion.findById(emotionId);

    if (!existingEmotion) {
      throw new Error("Emotion not found");
    }

    // Verifica se o usuário está autorizado a atualizar essa emoção
    if (existingEmotion.userId.toString() !== req.user._id.toString()) {
      throw new Error("Not authorized to update this emotion");
    }

    // Atualizar os campos
    existingEmotion.emotion = emotion || existingEmotion.emotion;
    existingEmotion.note = note || existingEmotion.note;

    const updatedEmotion = await existingEmotion.save();

    res.json({
      message: "Emotion updated successfully",
      emotion: updatedEmotion,
    });
  }),

  deleteEmotion: asyncHandler(async (req, res) => {
    const { emotionId } = req.params;
  
    const emotion = await Emotion.findById(emotionId);
  
    if (!emotion) {
      throw new Error("Emotion not found");
    }
  
    if (emotion.userId.toString() !== req.user._id.toString()) {
      throw new Error("Not authorized to delete this emotion");
    }
  
    await Emotion.deleteOne({ _id: emotionId });
  
    res.json({
      message: "Emotion deleted successfully",
    });
  }),
};




module.exports = emotionCtrl;
