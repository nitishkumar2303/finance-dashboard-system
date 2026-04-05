import Record from "../models/record";

export const createRecord = async (req, res) => {
  try {
    const [amount, type, category, date, description] = req.body;
    const record = await Record.create({
      amount,
      type,
      category,
      date,
      description,
      createdBy: req.user,
    });

    res.status(201).send({ success: true, record: record });
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
};

export const getRecord = async (req, res) => {
  try {
    const { type, category } = req.body;
    let query = {};

    if (type) query.type = type;
    if (category) query.category = category;

    const records = await Record.find(query).sort({ date: -1 });

    res
      .status(200)
      .send({ success: true, count: records.length, records: records });
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
};

export const updateRecord = async (req, res) => {
  try {
    let record = await Record.findById(req.params.id);
    if (!record)
      res.status(404).json({ success: false, error: "No record found" });
    record = await Record.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
  } catch (err) {
    res.status(500).json({success: false, error: err.message });
  }
};

export const deleteRecord = async (req, res) => {
  try {
    const record = await Record.findById(req.params.id);

    if (!record)
      return res
        .status(404)
        .send({ success: false, error: "No record found." });

    await record.deleteOne();
    res.status(200).send({ success: true, record: record });
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
};
