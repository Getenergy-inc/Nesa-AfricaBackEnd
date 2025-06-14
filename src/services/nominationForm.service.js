import NominationForm from "../models/postgresql/NominationForm.js";

export default {
  async create(data) {
    return await NominationForm.create(data);
  },

  async findAll() {
    return await NominationForm.findAll();
  },

  async findById(id) {
    return await NominationForm.findByPk(id);
  },

  async update(id, data) {
    const form = await NominationForm.findByPk(id);
    if (!form) throw new Error("Nomination form not found");
    await form.update(data);
    return form;
  },

  async delete(id) {
    const form = await NominationForm.findByPk(id);
    if (!form) throw new Error("Nomination form not found");
    await form.destroy();
    return { message: "Nomination form deleted successfully" };
  },
};
