import { Model } from 'sequelize';

interface ProductAttributes {
  id: number;
  userId: number;
  productNumber: string;
  altNumber1: string;
  altNumber2: string;
  altNumber3: string;
  altNumber4: string;
  altNumber5: string;
  altNumber6: string;
  quantity: number;
  productType: string;
  brand: string;
  description: string;
  ebayLink: string;
  websiteLink: string;
  quickSpecsLink: string;
  relatedTags: string;
  reasonForRemoval: string;
}

export default (sequelize: any, DataTypes: any) => {
  class Product extends Model<ProductAttributes>
    implements ProductAttributes {
    id: number;

    userId: number;

    productNumber: string;

    altNumber1!: string;

    altNumber2!: string;

    altNumber3!: string;

    altNumber4!: string;

    altNumber5!: string;

    altNumber6!: string;

    quantity: number;

    productType: string;

    brand: string;

    description!: string;

    updatedAt: Date

    ebayLink!: string;

    websiteLink!: string;

    quickSpecsLink!: string;

    relatedTags!: string;

    reasonForRemoval!: string;

    static associate(models: any) {
      Product.belongsTo(models.user, { foreignKey: 'userId' });
      Product.hasMany(models.quotedProduct, { foreignKey: 'productId' });
      Product.hasMany(models.inventory, { foreignKey: 'productId' });
    }
  }

  Product.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      validate: { len: [0, 10000] },
    },
    altNumber1: {
      type: DataTypes.STRING(10000),
      allowNull: true,
      unique: false,
      validate: { len: [0, 10000] },
    },
    altNumber2: {
      type: DataTypes.STRING(10000),
      allowNull: true,
      unique: false,
      validate: { len: [0, 10000] },
    },
    altNumber3: {
      type: DataTypes.STRING(10000),
      allowNull: true,
      unique: false,
      validate: { len: [0, 10000] },
    },
    altNumber4: {
      type: DataTypes.STRING(10000),
      allowNull: true,
      unique: false,
      validate: { len: [0, 10000] },
    },
    altNumber5: {
      type: DataTypes.STRING(10000),
      allowNull: true,
      unique: false,
      validate: { len: [0, 10000] },
    },
    altNumber6: {
      type: DataTypes.STRING(10000),
      allowNull: true,
      unique: false,
      validate: { len: [0, 10000] },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productType: {
      type: DataTypes.STRING(10000),
      allowNull: true,
      validate: { len: [0, 10000] },
    },
    brand: {
      type: DataTypes.STRING(10000),
      allowNull: true,
      validate: { len: [0, 10000] },
    },
    description: {
      type: DataTypes.STRING(20000),
      allowNull: false,
      validate: { len: [0, 10000] },
    },
    ebayLink: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    websiteLink: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    quickSpecsLink: {
      type: DataTypes.STRING(10000),
      allowNull: true,
    },
    relatedTags: {
      type: DataTypes.STRING(10000),
      allowNull: true,
    },
    reasonForRemoval: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'product',
    paranoid: true,
  });

  return Product;
};
