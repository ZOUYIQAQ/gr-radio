const { Sequelize, DataTypes } = require('sequelize')
class AlbumDatabase {
  // 初始化
  constructor() {
    // 创建数据库连接
    this.database = new Sequelize({
      dialect: 'sqlite',
      storage: 'albumbase.db',
      logging: false  // 禁用日志输出
    })
    // 创建数据表
    this.Album = this.database.define('album', {
      album_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
      },
      album_data: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    })
  }
  // 连接数据库
  async sync() {
    await this.database.sync();
  }
  // 添加数据
  async add(album_id, album_data) {
    // 统一类型
    if (typeof album_id !== typeof 0) album_id = parseInt(album_id)
    await this.Album.upsert({
      album_id: album_id,
      album_data: album_data
    })
  }
  // 查询数据
  async get(album_id) {
    // 统一类型
    if (!album_id) return '{}'
    if (typeof album_id !== typeof 0) album_id = parseInt(album_id)
    const album = await this.Album.findOne({
      where: { album_id: album_id }
    })
    return album?.album_data
  }
  // 更新数据
  async update(album_id, album_data) {
    // 统一类型
    if (typeof album_id !== typeof 0) album_id = parseInt(album_id)
    await this.Album.update({ album_data: album_data },
      { where: { album_id: album_id } })
  }
  // 删除数据
  async delete(album_id) {
    // 统一类型
    if (typeof album_id !== typeof 0) album_id = parseInt(album_id)
    await this.Album.destroy({ where: { album_id: album_id } })
  }
  // 关闭数据库连接
  close() {
    this.database.close()
  }
}
async function init_albu_database() {
  const album_data = new AlbumDatabase()
  await album_data.sync()
  return album_data
}

module.exports = init_albu_database