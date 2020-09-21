SET NAMES 'utf8';


ALTER TABLE IF EXISTS "role_permission" DROP CONSTRAINT IF EXISTS "fk_role_permission_role";
ALTER TABLE IF EXISTS "role_permission" DROP CONSTRAINT IF EXISTS "fk_role_permission_permission";
ALTER TABLE IF EXISTS "user" DROP CONSTRAINT IF EXISTS "fk_user_role";
ALTER TABLE IF EXISTS "cart" DROP CONSTRAINT IF EXISTS "fk_cart_user";
ALTER TABLE IF EXISTS "product" DROP CONSTRAINT IF EXISTS "fk_product_user";
ALTER TABLE IF EXISTS "cart_item" DROP CONSTRAINT IF EXISTS "fk_cart_item_cart";
ALTER TABLE IF EXISTS "cart_item" DROP CONSTRAINT IF EXISTS "fk_cart_item_product";
ALTER TABLE IF EXISTS "order" DROP CONSTRAINT IF EXISTS "fk_order_user";
ALTER TABLE IF EXISTS "order_item" DROP CONSTRAINT IF EXISTS "fk_order_item_order";
ALTER TABLE IF EXISTS "order_item" DROP CONSTRAINT IF EXISTS "fk_order_item_product";
ALTER TABLE IF EXISTS "product_category" DROP CONSTRAINT IF EXISTS "fk_pc_category";
ALTER TABLE IF EXISTS "product_category" DROP CONSTRAINT IF EXISTS "fk_pc_product";
ALTER TABLE IF EXISTS "product_meta" DROP CONSTRAINT IF EXISTS "fk_meta_product";
ALTER TABLE IF EXISTS "product_review" DROP CONSTRAINT IF EXISTS "fk_review_parent";
ALTER TABLE IF EXISTS "product_review" DROP CONSTRAINT IF EXISTS "fk_review_product";
ALTER TABLE IF EXISTS "product_tag" DROP CONSTRAINT IF EXISTS "fk_pt_product";
ALTER TABLE IF EXISTS "product_tag" DROP CONSTRAINT IF EXISTS "fk_pt_tag";
ALTER TABLE IF EXISTS "transaction" DROP CONSTRAINT IF EXISTS "fk_transaction_order";
ALTER TABLE IF EXISTS "transaction" DROP CONSTRAINT IF EXISTS "fk_transaction_user";

DROP TABLE IF EXISTS "role";
CREATE TABLE "role" (
  "id" uuid,
  "title" text,
  "description" text,
  "createdAt" timestamp NOT NULL,
  "updatedAt" timestamp NOT NULL,
  "isDelete" smallint NOT NULL DEFAULT '0',
  PRIMARY KEY ("id")
);


DROP TABLE IF EXISTS "permission";
CREATE TABLE "permission" (
  "id" uuid NOT NULL,
  "title" text NOT NULL,
  "description" text,
  "createdAt" timestamp NOT NULL,
  "updatedAt" timestamp NOT NULL,
  "isDelete" smallint NOT NULL DEFAULT '0',
  PRIMARY KEY ("id")
);


DROP TABLE IF EXISTS "role_permission";
CREATE TABLE "role_permission" (
  "id" uuid,
  "roleId" uuid NOT NULL,
  "permissionId" uuid NOT NULL,
  "createdAt" timestamp NOT NULL,
  "updatedAt" timestamp NOT NULL,
  "isDelete" smallint NOT NULL DEFAULT '0',
  PRIMARY KEY ("id"),
  CONSTRAINT "fk_role_permission_role" FOREIGN KEY ("roleId") REFERENCES "role" ("id"),
  CONSTRAINT "fk_role_permission_permission" FOREIGN KEY ("permissionId") REFERENCES "permission" ("id")
);


DROP TABLE IF EXISTS "user";
CREATE TABLE "user" (
  "id" uuid,
  "firstName" varchar(50) DEFAULT NULL,
  "middleName" varchar(50) DEFAULT NULL,
  "lastName" varchar(50) DEFAULT NULL,
  "mobile" varchar(15) UNIQUE DEFAULT NULL,
  "email" varchar(50) UNIQUE DEFAULT NULL,
  "passwordHash" varchar(100) NOT NULL,
  "admin" smallint NOT NULL DEFAULT '0',
  "vendor" smallint NOT NULL DEFAULT '0',
  "createdAt" timestamp NOT NULL,
  "updatedAt" timestamp NOT NULL,
  "lastLogin" timestamp DEFAULT NULL,
  "intro" text,
  "profile" text,
  "role" uuid,
  "isDelete" smallint NOT NULL DEFAULT '0',
  PRIMARY KEY ("id"),
  CONSTRAINT "fk_user_role" FOREIGN KEY ("role") REFERENCES "role" ("id")
);


DROP TABLE IF EXISTS "cart";
CREATE TABLE "cart" (
  "id" uuid,
  "userId" uuid DEFAULT NULL,
  "content" text,
  "createdAt" timestamp NOT NULL,
  "updatedAt" timestamp NOT NULL,
  "isDelete" smallint NOT NULL DEFAULT '0',
  PRIMARY KEY ("id"),
  CONSTRAINT "fk_cart_user" FOREIGN KEY ("userId") REFERENCES "user" ("id")
);


DROP TABLE IF EXISTS "product";
CREATE TABLE "product" (
  "id" uuid,
  "userId" uuid NOT NULL,
  "title" varchar(75) NOT NULL,
  "metaTitle" varchar(100) DEFAULT NULL,
  "slug" varchar(100) UNIQUE NOT NULL,
  "summary" text,
  "type" smallint NOT NULL DEFAULT '0',
  "sku" varchar(100),
  "price" float NOT NULL DEFAULT '0',
  "discount" float NOT NULL DEFAULT '0',
  "quantity" smallint NOT NULL DEFAULT '0',
  "shop" smallint NOT NULL DEFAULT '0',
  "createdAt" timestamp NOT NULL,
  "updatedAt" timestamp NOT NULL,
  "publishedAt" timestamp DEFAULT NULL,
  "startAt" timestamp DEFAULT NULL,
  "endAt" timestamp DEFAULT NULL,
  "content" text,
  "isDelete" smallint NOT NULL DEFAULT '0',
  PRIMARY KEY ("id"),
  CONSTRAINT "fk_product_user" FOREIGN KEY ("userId") REFERENCES "user" ("id")
);


DROP TABLE IF EXISTS "cart_item";
CREATE TABLE "cart_item" (
  "id" uuid,
  "productId" uuid NOT NULL,
  "cartId" uuid NOT NULL,
  "sku" varchar(100),
  "price" float NOT NULL DEFAULT '0',
  "discount" float NOT NULL DEFAULT '0',
  "quantity" smallint NOT NULL DEFAULT '0',
  "active" smallint NOT NULL DEFAULT '0',
  "createdAt" timestamp NOT NULL,
  "updatedAt" timestamp NOT NULL,
  "content" text,
  "isDelete" smallint NOT NULL DEFAULT '0',
  PRIMARY KEY ("id"),
  CONSTRAINT "fk_cart_item_cart" FOREIGN KEY ("cartId") REFERENCES "cart" ("id"),
  CONSTRAINT "fk_cart_item_product" FOREIGN KEY ("productId") REFERENCES "product" ("id")
);


ALTER TABLE IF EXISTS "category" DROP CONSTRAINT IF EXISTS "fk_category_parent";
DROP TABLE IF EXISTS "category";
CREATE TABLE "category" (
  "id" uuid,
  "parentId" uuid DEFAULT NULL,
  "title" varchar(75) NOT NULL,
  "metaTitle" varchar(100) DEFAULT NULL,
  "slug" varchar(100) NOT NULL,
  "content" text,
  "isDelete" smallint NOT NULL DEFAULT '0',
  "createdAt" timestamp NOT NULL,
  "updatedAt" timestamp NOT NULL,
  PRIMARY KEY ("id"),
  CONSTRAINT "fk_category_parent" FOREIGN KEY ("parentId") REFERENCES "category" ("id")
);


DROP TABLE IF EXISTS "order";
CREATE TABLE "order" (
  "id" uuid,
  "userId" uuid DEFAULT NULL,
  "sessionId" varchar(100) NOT NULL,
  "token" varchar(100) NOT NULL,
  "status" smallint NOT NULL DEFAULT '0',
  "subTotal" float NOT NULL DEFAULT '0',
  "itemDiscount" float NOT NULL DEFAULT '0',
  "tax" float NOT NULL DEFAULT '0',
  "shipping" float NOT NULL DEFAULT '0',
  "total" float NOT NULL DEFAULT '0',
  "promo" varchar(50) DEFAULT NULL,
  "discount" float NOT NULL DEFAULT '0',
  "grandTotal" float NOT NULL DEFAULT '0',
  "createdAt" timestamp NOT NULL,
  "updatedAt" timestamp NOT NULL,
  "note" text,
  "isDelete" smallint NOT NULL DEFAULT '0',
  PRIMARY KEY ("id"),
  CONSTRAINT "fk_order_user" FOREIGN KEY ("userId") REFERENCES "user" ("id")
);


DROP TABLE IF EXISTS "order_item";
CREATE TABLE "order_item" (
  "id" uuid,
  "productId" uuid NOT NULL,
  "orderId" uuid NOT NULL,
  "sku" varchar(100),
  "price" float NOT NULL DEFAULT '0',
  "discount" float NOT NULL DEFAULT '0',
  "quantity" smallint NOT NULL DEFAULT '0',
  "createdAt" timestamp NOT NULL,
  "updatedAt" timestamp NOT NULL,
  "content" text,
  "isDelete" smallint NOT NULL DEFAULT '0',
  PRIMARY KEY ("id"),
  CONSTRAINT "fk_order_item_order" FOREIGN KEY ("orderId") REFERENCES "order" ("id"),
  CONSTRAINT "fk_order_item_product" FOREIGN KEY ("productId") REFERENCES "product" ("id")
);


DROP TABLE IF EXISTS "product_category";
CREATE TABLE "product_category" (
  "productId" uuid NOT NULL,
  "categoryId" uuid NOT NULL,
  "isDelete" smallint NOT NULL DEFAULT '0',
  "createdAt" timestamp NOT NULL,
  "updatedAt" timestamp NOT NULL,
  PRIMARY KEY ("productId","categoryId"),
  CONSTRAINT "fk_pc_category" FOREIGN KEY ("categoryId") REFERENCES "category" ("id"),
  CONSTRAINT "fk_pc_product" FOREIGN KEY ("productId") REFERENCES "product" ("id")
);


DROP TABLE IF EXISTS "product_meta";
CREATE TABLE "product_meta" (
  "id" uuid,
  "productId" uuid NOT NULL,
  "key" varchar(50) NOT NULL,
  "content" text,
  "isDelete" smallint NOT NULL DEFAULT '0',
  "createdAt" timestamp NOT NULL,
  "updatedAt" timestamp NOT NULL,
  PRIMARY KEY ("id"),
  CONSTRAINT "fk_meta_product" FOREIGN KEY ("productId") REFERENCES "product" ("id")
);


DROP TABLE IF EXISTS "product_review";
CREATE TABLE "product_review" (
  "id" uuid,
  "productId" uuid NOT NULL,
  "parentId" uuid DEFAULT NULL,
  "title" varchar(100) NOT NULL,
  "rating" smallint NOT NULL DEFAULT '0',
  "published" smallint NOT NULL DEFAULT '0',
  "createdAt" timestamp NOT NULL,
  "updatedAt" timestamp NOT NULL,
  "publishedAt" timestamp DEFAULT NULL,
  "content" text,
  "isDelete" smallint NOT NULL DEFAULT '0',
  PRIMARY KEY ("id"),
  CONSTRAINT "fk_review_parent" FOREIGN KEY ("parentId") REFERENCES "product_review" ("id"),
  CONSTRAINT "fk_review_product" FOREIGN KEY ("productId") REFERENCES "product" ("id")
);



DROP TABLE IF EXISTS "tag";
CREATE TABLE "tag" (
  "id" uuid,
  "title" varchar(75) NOT NULL,
  "metaTitle" varchar(100) DEFAULT NULL,
  "slug" varchar(100) NOT NULL,
  "content" text,
  "isDelete" smallint NOT NULL DEFAULT '0',
  "createdAt" timestamp NOT NULL,
  "updatedAt" timestamp NOT NULL,
  PRIMARY KEY ("id")
);


DROP TABLE IF EXISTS "product_tag";
CREATE TABLE "product_tag" (
  "productId" uuid NOT NULL,
  "tagId" uuid NOT NULL,
  "isDelete" smallint NOT NULL DEFAULT '0',
  "createdAt" timestamp NOT NULL,
  "updatedAt" timestamp NOT NULL,
  PRIMARY KEY ("productId","tagId"),
  CONSTRAINT "fk_pt_product" FOREIGN KEY ("productId") REFERENCES "product" ("id"),
  CONSTRAINT "fk_pt_tag" FOREIGN KEY ("tagId") REFERENCES "tag" ("id")
);



DROP TABLE IF EXISTS "transaction";
CREATE TABLE "transaction" (
  "id" uuid,
  "userId" uuid NOT NULL,
  "orderId" uuid NOT NULL,
  "code" varchar(100) NOT NULL,
  "type" smallint NOT NULL DEFAULT '0',
  "mode" smallint NOT NULL DEFAULT '0',
  "status" smallint NOT NULL DEFAULT '0',
  "createdAt" timestamp NOT NULL,
  "updatedAt" timestamp NOT NULL,
  "content" text,
  "isDelete" smallint NOT NULL DEFAULT '0',
  PRIMARY KEY ("id"),
  CONSTRAINT "fk_transaction_order" FOREIGN KEY ("orderId") REFERENCES "order" ("id"),
  CONSTRAINT "fk_transaction_user" FOREIGN KEY ("userId") REFERENCES "user" ("id")
);

--from https://github.com/tutorials24x7/shopping-cart-database-mysql/blob/master/shop.sql