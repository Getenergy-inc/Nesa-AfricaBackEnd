import { DataTypes } from "sequelize";
import {sequelize} from "../../config/database.js";

const MerchandiseOrder = sequelize.define("MerchandiseOrder", {

  order_id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  item: { type: DataTypes.STRING, allowNull: false },
  shipping: { type: DataTypes.JSON, allowNull: false },
  paid_from_wallet: { type: DataTypes.BOOLEAN, defaultValue: false },

});

export default MerchandiseOrder;
