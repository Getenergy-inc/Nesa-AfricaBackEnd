import nominationFormService from "../services/nominationForm.service.js";
import Nomination from "../models/postgresql/Nomination.js";
import NominationForm from "../models/postgresql/NominationForm.js";
import NominationLink from "../utils/NominationLink.js";

export default {

    async create(req, res) {
        try {
            const { email, ...formData } = req.body;

            // 1. Find related nomination
            const nomination = await Nomination.findOne({ where: { email } });

            if (!nomination) {
                return res.status(404).json({ error: "Nomination not found for the provided email." });
            }

            // 2. Create nomination form with associated user_id and nomination_id
            const form = await nomination.createForm({
                email, // include explicitly
                ...formData,
                user_id: nomination.user_id,
                nomination_id: nomination.id,
            });

            // 3. Verify and update status to accepted
            const token = nomination.token;
            const result = await NominationLink.verifyNominationToken(token);

            if (!result.success) {
                return res.status(400).json({ error: result.message });
            }

            return res.status(201).json({
                message: "Nomination form submitted successfully",
                form,
            });

        } catch (err) {
            console.error("Nomination form creation error:", err);
            return res.status(400).json({ error: err.message });
        }
    },



    async getAll(req, res) {
        try {
            const forms = await nominationFormService.findAll();
            res.json(forms);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    async getOne(req, res) {
        try {
            const form = await nominationFormService.findById(req.params.id);
            if (!form) return res.status(404).json({ error: "Not found" });
            res.json(form);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    async update(req, res) {
        try {
            const form = await nominationFormService.update(req.params.id, req.body);
            res.json(form);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    async delete(req, res) {
        try {
            const result = await nominationFormService.delete(req.params.id);
            res.json(result);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },
};
