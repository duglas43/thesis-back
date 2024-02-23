import { Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'RolePermission',
})
export class RolePermissionModel extends Model {}
