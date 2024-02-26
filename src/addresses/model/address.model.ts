import { Column, Table, BelongsTo } from "sequelize-typescript";
import { UserModel } from "src/users/model";
import { AppModel } from "src/common/sequelize/models";

@Table({
  tableName: "Address",
})
export class AddressModel extends AppModel<AddressModel> {
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
