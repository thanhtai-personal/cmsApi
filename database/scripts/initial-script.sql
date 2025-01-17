SET NAMES 'utf8';


ALTER TABLE IF EXISTS "role_permission" DROP CONSTRAINT IF EXISTS "fk_role_permission_role";
ALTER TABLE IF EXISTS "role_permission" DROP CONSTRAINT IF EXISTS "fk_role_permission_permission";
ALTER TABLE IF EXISTS "account" DROP CONSTRAINT IF EXISTS "fk_account_role";
ALTER TABLE IF EXISTS "account" DROP CONSTRAINT IF EXISTS "fk_account_user";
ALTER TABLE IF EXISTS "account" DROP CONSTRAINT IF EXISTS "fk_account_profile_image";
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
  "title" text UNIQUE NOT NULL,
  "description" text,
  "createdAt" timestamptz NOT NULL DEFAULT (NOW() at time zone 'utc'),
  "updatedAt" timestamptz NOT NULL DEFAULT (NOW() at time zone 'utc'),
  "isDelete" smallint NOT NULL DEFAULT '0',
  PRIMARY KEY ("id")
);


DROP TABLE IF EXISTS "permission";
CREATE TABLE "permission" (
  "id" uuid NOT NULL,
  "title" text NOT NULL,
  "description" text,
  "createdAt" timestamptz NOT NULL DEFAULT (NOW() at time zone 'utc'),
  "updatedAt" timestamptz NOT NULL DEFAULT (NOW() at time zone 'utc'),
  "isDelete" smallint NOT NULL DEFAULT '0',
  PRIMARY KEY ("id")
);


DROP TABLE IF EXISTS "role_permission";
CREATE TABLE "role_permission" (
  "id" uuid,
  "roleId" uuid NOT NULL,
  "permissionId" uuid NOT NULL,
  "createdAt" timestamptz NOT NULL DEFAULT (NOW() at time zone 'utc'),
  "updatedAt" timestamptz NOT NULL DEFAULT (NOW() at time zone 'utc'),
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
  "fullName" varchar(150) DEFAULT NULL,
  "createdAt" timestamptz NOT NULL DEFAULT (NOW() at time zone 'utc'),
  "updatedAt" timestamptz NOT NULL DEFAULT (NOW() at time zone 'utc'),
  "intro" text,
  "profile" text,
  "isDelete" smallint NOT NULL DEFAULT '0',
  PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "image";
CREATE TABLE "image" (
  "id" uuid,
  "name" varchar(100),
  "description" text,
  "src" text NOT NULL,
  "createdAt" timestamptz NOT NULL DEFAULT (NOW() at time zone 'utc'),
  "updatedAt" timestamptz NOT NULL DEFAULT (NOW() at time zone 'utc'),
  "isDelete" smallint NOT NULL DEFAULT '0',
  PRIMARY KEY ("id")
);


DROP TABLE IF EXISTS "account";
CREATE TABLE "account" (
  "id" uuid,
  "accountType" varchar(20) NOT NULL DEFAULT 'TTTGalaxy',
  "accountToken" text,
  "mobile" varchar(15) UNIQUE DEFAULT NULL,
  "email" varchar(50) UNIQUE NOT NULL,
  "userName" varchar(50),
  "passwordHash" varchar(100) NOT NULL,
  "admin" smallint NOT NULL DEFAULT '0',
  "createdAt" timestamptz NOT NULL DEFAULT (NOW() at time zone 'utc'),
  "updatedAt" timestamptz NOT NULL DEFAULT (NOW() at time zone 'utc'),
  "lastLogin" timestamp DEFAULT NULL,
  "userId" uuid,
  "role" uuid,
  "profileImage" uuid,
  "isDelete" smallint NOT NULL DEFAULT '0',
  PRIMARY KEY ("id"),
  CONSTRAINT "fk_account_role" FOREIGN KEY ("role") REFERENCES "role" ("id"),
  CONSTRAINT "fk_account_user" FOREIGN KEY ("userId") REFERENCES "user" ("id"),
  CONSTRAINT "fk_account_profile_image" FOREIGN KEY ("profileImage") REFERENCES "image" ("id")
);




DROP TABLE IF EXISTS "cart";
CREATE TABLE "cart" (
  "id" uuid,
  "userId" uuid DEFAULT NULL,
  "content" text,
  "createdAt" timestamptz NOT NULL DEFAULT (NOW() at time zone 'utc'),
  "updatedAt" timestamptz NOT NULL DEFAULT (NOW() at time zone 'utc'),
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
  "createdAt" timestamptz NOT NULL DEFAULT (NOW() at time zone 'utc'),
  "updatedAt" timestamptz NOT NULL DEFAULT (NOW() at time zone 'utc'),
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
  "createdAt" timestamptz NOT NULL DEFAULT (NOW() at time zone 'utc'),
  "updatedAt" timestamptz NOT NULL DEFAULT (NOW() at time zone 'utc'),
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
  "createdAt" timestamptz NOT NULL DEFAULT (NOW() at time zone 'utc'),
  "updatedAt" timestamptz NOT NULL DEFAULT (NOW() at time zone 'utc'),
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
  "createdAt" timestamptz NOT NULL DEFAULT (NOW() at time zone 'utc'),
  "updatedAt" timestamptz NOT NULL DEFAULT (NOW() at time zone 'utc'),
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
  "createdAt" timestamptz NOT NULL DEFAULT (NOW() at time zone 'utc'),
  "updatedAt" timestamptz NOT NULL DEFAULT (NOW() at time zone 'utc'),
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
  "createdAt" timestamptz NOT NULL DEFAULT (NOW() at time zone 'utc'),
  "updatedAt" timestamptz NOT NULL DEFAULT (NOW() at time zone 'utc'),
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
  "createdAt" timestamptz NOT NULL DEFAULT (NOW() at time zone 'utc'),
  "updatedAt" timestamptz NOT NULL DEFAULT (NOW() at time zone 'utc'),
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
  "createdAt" timestamptz NOT NULL DEFAULT (NOW() at time zone 'utc'),
  "updatedAt" timestamptz NOT NULL DEFAULT (NOW() at time zone 'utc'),
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
  "createdAt" timestamptz NOT NULL DEFAULT (NOW() at time zone 'utc'),
  "updatedAt" timestamptz NOT NULL DEFAULT (NOW() at time zone 'utc'),
  PRIMARY KEY ("id")
);


DROP TABLE IF EXISTS "product_tag";
CREATE TABLE "product_tag" (
  "productId" uuid NOT NULL,
  "tagId" uuid NOT NULL,
  "isDelete" smallint NOT NULL DEFAULT '0',
  "createdAt" timestamptz NOT NULL DEFAULT (NOW() at time zone 'utc'),
  "updatedAt" timestamptz NOT NULL DEFAULT (NOW() at time zone 'utc'),
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
  "createdAt" timestamptz NOT NULL DEFAULT (NOW() at time zone 'utc'),
  "updatedAt" timestamptz NOT NULL DEFAULT (NOW() at time zone 'utc'),
  "content" text,
  "isDelete" smallint NOT NULL DEFAULT '0',
  PRIMARY KEY ("id"),
  CONSTRAINT "fk_transaction_order" FOREIGN KEY ("orderId") REFERENCES "order" ("id"),
  CONSTRAINT "fk_transaction_user" FOREIGN KEY ("userId") REFERENCES "user" ("id")
);

CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW."updatedAt" = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_timestamp_account BEFORE UPDATE ON "account" FOR EACH ROW EXECUTE PROCEDURE trigger_set_timestamp();
CREATE TRIGGER set_timestamp_cart BEFORE UPDATE ON "cart" FOR EACH ROW EXECUTE PROCEDURE trigger_set_timestamp();
CREATE TRIGGER set_timestamp_cart_item BEFORE UPDATE ON "cart_item" FOR EACH ROW EXECUTE PROCEDURE trigger_set_timestamp();
CREATE TRIGGER set_timestamp_category BEFORE UPDATE ON "category" FOR EACH ROW EXECUTE PROCEDURE trigger_set_timestamp();
CREATE TRIGGER set_timestamp_image BEFORE UPDATE ON "image" FOR EACH ROW EXECUTE PROCEDURE trigger_set_timestamp();
CREATE TRIGGER set_timestamp_order BEFORE UPDATE ON "order" FOR EACH ROW EXECUTE PROCEDURE trigger_set_timestamp();
CREATE TRIGGER set_timestamp_order_item BEFORE UPDATE ON "order_item" FOR EACH ROW EXECUTE PROCEDURE trigger_set_timestamp();
CREATE TRIGGER set_timestamp_permission BEFORE UPDATE ON "permission" FOR EACH ROW EXECUTE PROCEDURE trigger_set_timestamp();
CREATE TRIGGER set_timestamp_product BEFORE UPDATE ON "product" FOR EACH ROW EXECUTE PROCEDURE trigger_set_timestamp();
CREATE TRIGGER set_timestamp_product_category BEFORE UPDATE ON "product_category" FOR EACH ROW EXECUTE PROCEDURE trigger_set_timestamp();
CREATE TRIGGER set_timestamp_product_meta BEFORE UPDATE ON "product_meta" FOR EACH ROW EXECUTE PROCEDURE trigger_set_timestamp();
CREATE TRIGGER set_timestamp_product_review BEFORE UPDATE ON "product_review" FOR EACH ROW EXECUTE PROCEDURE trigger_set_timestamp();
CREATE TRIGGER set_timestamp_product_tag BEFORE UPDATE ON "product_tag" FOR EACH ROW EXECUTE PROCEDURE trigger_set_timestamp();
CREATE TRIGGER set_timestamp_role BEFORE UPDATE ON "role" FOR EACH ROW EXECUTE PROCEDURE trigger_set_timestamp();
CREATE TRIGGER set_timestamp_role_permission BEFORE UPDATE ON "role_permission" FOR EACH ROW EXECUTE PROCEDURE trigger_set_timestamp();
CREATE TRIGGER set_timestamp_tag BEFORE UPDATE ON "tag" FOR EACH ROW EXECUTE PROCEDURE trigger_set_timestamp();
CREATE TRIGGER set_timestamp_transaction BEFORE UPDATE ON "transaction" FOR EACH ROW EXECUTE PROCEDURE trigger_set_timestamp();
CREATE TRIGGER set_timestamp_user BEFORE UPDATE ON "user" FOR EACH ROW EXECUTE PROCEDURE trigger_set_timestamp();

INSERT INTO role("id", "title", "description") VALUES ('1af5c2e2-08af-11eb-adc1-0242ac120002', 'super_admin', 'all permission');
INSERT INTO role("id", "title", "description") VALUES ('70cde58c-08af-11eb-adc1-0242ac120002', 'guess', 'no permission on admin page');

INSERT INTO "user"("id", "firstName", "middleName", "lastName", "fullName", "intro", "profile")
  VALUES ('18ff8242-08b0-11eb-adc1-0242ac120002', 'Tran', 'Thanh', 'Tai', 'Tran Thanh Tai', 'supper admin user', 'developer owner');

INSERT INTO account("id", "mobile", "email", "userName", "passwordHash", "admin", "userId", "role")
  VALUES ('70cde58c-08af-11eb-adc1-0242ac120002', '0972828264', 'thanhtai.tttgalaxy@gmail.com', 'super_admin', 'TinTin56', 1, '18ff8242-08b0-11eb-adc1-0242ac120002', '1af5c2e2-08af-11eb-adc1-0242ac120002');


