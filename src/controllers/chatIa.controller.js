import chat from "../openIA.js";

export const chatWithIa = async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({
      success: false,
      msg: "Le prompt est obligatoire",
    });
  }

  try {
    const Ia_res = await chat(prompt);

    return res.status(200).json({
      success: true,
      msg: Ia_res,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      msg: "Erreur serveur, veuillez recommencer",
    });
  }
};
