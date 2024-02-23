import { Column, Model, Table, BelongsTo } from "sequelize-typescript";
import { UserModel } from "src/users/model";
@Table({
  tableName: "Address",
})
export class AddressModel extends Model {
  @Column
  index: number;

  @Column
  city: string;

  @Column
  district: string;

  @Column
  street: string;

  @Column
  building: string;

  @BelongsTo(() => UserModel, "clientId")
  client: UserModel;
}
