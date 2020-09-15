SET NAMES 'utf8';


CREATE TABLE "user" (
  "id" uuid,
  "firstName" varchar(50) DEFAULT NULL,
  "middleName" varchar(50) DEFAULT NULL,
  "lastName" varchar(50) DEFAULT NULL,
  "mobile" varchar(15) UNIQUE DEFAULT NULL,
  "email" varchar(50) UNIQUE DEFAULT NULL,
  "passwordHash" varchar(32) NOT NULL,
  "admin" smallint NOT NULL DEFAULT '0',
  "vendor" smallint NOT NULL DEFAULT '0',
  "registeredAt" timestamp NOT NULL,
  "lastLogin" timestamp DEFAULT NULL,
  "intro" text,
  "profile" text,
  PRIMARY KEY ("id")
);


CREATE TABLE "cart" (
  "id" uuid,
  "userId" uuid DEFAULT NULL,
  "sessionId" varchar(100) NOT NULL,
  "token" varchar(100) NOT NULL,
  "status" smallint NOT NULL DEFAULT '0',
  "firstName" varchar(50) DEFAULT NULL,
  "middleName" varchar(50) DEFAULT NULL,
  "lastName" varchar(50) DEFAULT NULL,
  "mobile" varchar(15) DEFAULT NULL,
  "email" varchar(50) DEFAULT NULL,
  "line1" varchar(50) DEFAULT NULL,
  "line2" varchar(50) DEFAULT NULL,
  "city" varchar(50) DEFAULT NULL,
  "province" varchar(50) DEFAULT NULL,
  "country" varchar(50) DEFAULT NULL,
  "createdAt" timestamp NOT NULL,
  "updatedAt" timestamp DEFAULT NULL,
  "content" text,
  PRIMARY KEY ("id"),
  CONSTRAINT "fk_cart_user" FOREIGN KEY ("userId") REFERENCES "user" ("id")
);


CREATE TABLE "product" (
  "id" uuid,
  "userId" uuid NOT NULL,
  "title" varchar(75) NOT NULL,
  "metaTitle" varchar(100) DEFAULT NULL,
  "slug" varchar(100) UNIQUE NOT NULL,
  "summary" text,
  "type" smallint NOT NULL DEFAULT '0',
  "sku" varchar(100) NOT NULL,
  "price" float NOT NULL DEFAULT '0',
  "discount" float NOT NULL DEFAULT '0',
  "quantity" smallint NOT NULL DEFAULT '0',
  "shop" smallint NOT NULL DEFAULT '0',
  "createdAt" timestamp NOT NULL,
  "updatedAt" timestamp DEFAULT NULL,
  "publishedAt" timestamp DEFAULT NULL,
  "startsAt" timestamp DEFAULT NULL,
  "endsAt" timestamp DEFAULT NULL,
  "content" text,
  PRIMARY KEY ("id"),
  CONSTRAINT "fk_product_user" FOREIGN KEY ("userId") REFERENCES "user" ("id")
);


CREATE TABLE "cart_item" (
  "id" uuid,
  "productId" uuid NOT NULL,
  "cartId" uuid NOT NULL,
  "sku" varchar(100) NOT NULL,
  "price" float NOT NULL DEFAULT '0',
  "discount" float NOT NULL DEFAULT '0',
  "quantity" smallint NOT NULL DEFAULT '0',
  "active" smallint NOT NULL DEFAULT '0',
  "createdAt" timestamp NOT NULL,
  "updatedAt" timestamp DEFAULT NULL,
  "content" text,
  PRIMARY KEY ("id"),
  CONSTRAINT "fk_cart_item_cart" FOREIGN KEY ("cartId") REFERENCES "cart" ("id"),
  CONSTRAINT "fk_cart_item_product" FOREIGN KEY ("productId") REFERENCES "product" ("id")
);


CREATE TABLE "category" (
  "id" uuid,
  "parentId" uuid DEFAULT NULL,
  "title" varchar(75) NOT NULL,
  "metaTitle" varchar(100) DEFAULT NULL,
  "slug" varchar(100) NOT NULL,
  "content" text,
  PRIMARY KEY ("id"),
  CONSTRAINT "fk_category_parent" FOREIGN KEY ("parentId") REFERENCES "category" ("id")
);


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
  "firstName" varchar(50) DEFAULT NULL,
  "middleName" varchar(50) DEFAULT NULL,
  "lastName" varchar(50) DEFAULT NULL,
  "mobile" varchar(15) DEFAULT NULL,
  "email" varchar(50) DEFAULT NULL,
  "line1" varchar(50) DEFAULT NULL,
  "line2" varchar(50) DEFAULT NULL,
  "city" varchar(50) DEFAULT NULL,
  "province" varchar(50) DEFAULT NULL,
  "country" varchar(50) DEFAULT NULL,
  "createdAt" timestamp NOT NULL,
  "updatedAt" timestamp DEFAULT NULL,
  "content" text,
  PRIMARY KEY ("id"),
  CONSTRAINT "fk_order_user" FOREIGN KEY ("userId") REFERENCES "user" ("id")
);


CREATE TABLE "order_item" (
  "id" uuid,
  "productId" uuid NOT NULL,
  "orderId" uuid NOT NULL,
  "sku" varchar(100) NOT NULL,
  "price" float NOT NULL DEFAULT '0',
  "discount" float NOT NULL DEFAULT '0',
  "quantity" smallint NOT NULL DEFAULT '0',
  "createdAt" timestamp NOT NULL,
  "updatedAt" timestamp DEFAULT NULL,
  "content" text,
  PRIMARY KEY ("id"),
  CONSTRAINT "fk_order_item_order" FOREIGN KEY ("orderId") REFERENCES "order" ("id"),
  CONSTRAINT "fk_order_item_product" FOREIGN KEY ("productId") REFERENCES "product" ("id")
);


CREATE TABLE "product_category" (
  "productId" uuid NOT NULL,
  "categoryId" uuid NOT NULL,
  PRIMARY KEY ("productId","categoryId"),
  CONSTRAINT "fk_pc_category" FOREIGN KEY ("categoryId") REFERENCES "category" ("id"),
  CONSTRAINT "fk_pc_product" FOREIGN KEY ("productId") REFERENCES "product" ("id")
);


CREATE TABLE "product_meta" (
  "id" uuid,
  "productId" uuid NOT NULL,
  "key" varchar(50) NOT NULL,
  "content" text,
  PRIMARY KEY ("id"),
  CONSTRAINT "fk_meta_product" FOREIGN KEY ("productId") REFERENCES "product" ("id")
);


CREATE TABLE "product_review" (
  "id" uuid,
  "productId" uuid NOT NULL,
  "parentId" uuid DEFAULT NULL,
  "title" varchar(100) NOT NULL,
  "rating" smallint NOT NULL DEFAULT '0',
  "published" smallint NOT NULL DEFAULT '0',
  "createdAt" timestamp NOT NULL,
  "publishedAt" timestamp DEFAULT NULL,
  "content" text,
  PRIMARY KEY ("id"),
  CONSTRAINT "fk_review_parent" FOREIGN KEY ("parentId") REFERENCES "product_review" ("id"),
  CONSTRAINT "fk_review_product" FOREIGN KEY ("productId") REFERENCES "product" ("id")
);



CREATE TABLE "tag" (
  "id" uuid,
  "title" varchar(75) NOT NULL,
  "metaTitle" varchar(100) DEFAULT NULL,
  "slug" varchar(100) NOT NULL,
  "content" text,
  PRIMARY KEY ("id")
);


CREATE TABLE "product_tag" (
  "productId" uuid NOT NULL,
  "tagId" uuid NOT NULL,
  PRIMARY KEY ("productId","tagId"),
  CONSTRAINT "fk_pt_product" FOREIGN KEY ("productId") REFERENCES "product" ("id"),
  CONSTRAINT "fk_pt_tag" FOREIGN KEY ("tagId") REFERENCES "tag" ("id")
);


CREATE TABLE "transaction" (
  "id" uuid,
  "userId" uuid NOT NULL,
  "orderId" uuid NOT NULL,
  "code" varchar(100) NOT NULL,
  "type" smallint NOT NULL DEFAULT '0',
  "mode" smallint NOT NULL DEFAULT '0',
  "status" smallint NOT NULL DEFAULT '0',
  "createdAt" timestamp NOT NULL,
  "updatedAt" timestamp DEFAULT NULL,
  "content" text,
  PRIMARY KEY ("id"),
  CONSTRAINT "fk_transaction_order" FOREIGN KEY ("orderId") REFERENCES "order" ("id"),
  CONSTRAINT "fk_transaction_user" FOREIGN KEY ("userId") REFERENCES "user" ("id")
);

--from https://github.com/tutorials24x7/shopping-cart-database-mysql/blob/master/shop.sql