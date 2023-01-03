const Message = require("../Model/Message");

exports.createMessage = async (req, res) => {
  const message = req.body;

  try {
    const result = await Message.create(message);
    console.log(result);
    console.log("hii");
    res.status(200).json({ data: "successful IAnsertion" });
  } catch (err) {
    console.log(err);
    res.status(409).json({
      status: "Failure in  Insertion",
    });
  }
};

exports.getMessage = async (req, res) => {
  const { tagMessage } = req.params;
  console.log(tagMessage);
  try {
    message = await Message.find({
      tag: { $regex: `${tagMessage}`, $options: "i" },
    })
      // .sort({ createdAt: -1 })
      .sort([["createdAt", -1]])
      .exec();
    // message = await message.sort({ createdAt: -1 }).exec();
    res.status(200).json({
      data: message,
    });
  } catch (error) {
    console.log(error);
    res.status(409).json({
      status: "Failure in  Insertion",
    });
  }
};

exports.deleteMessage = async (req, res) => {
  const { id } = req.params;
  try {
    // if (!mongoose.Types.ObjectId.isValid(id))
    //   return res.status(404).send(`No post with id: ${id}`);

    await Message.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully." });
  } catch (error) {
    console.log(error);
    res.status(409).json({
      status: "Failure in  delete",
    });
  }
};
