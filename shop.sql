-- MySQL dump 10.13  Distrib 8.0.14, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: shop
-- ------------------------------------------------------
-- Server version	8.0.14

--!40101 SET @OLD_CHARACTER_SET_CLIENT= */;
--!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
--!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES 'utf8';
--!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
--!40103 SET TIME_ZONE='+00:00' */;
--!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
--!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
--!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
--!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


--
-- Table structure for table "user"
--

--DROP TABLE IF EXISTS "user";
--!40101 SET @saved_cs_client     =  */;
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
--!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table "user"
--

--BEGIN WORK;
--LOCK TABLE user IN SHARE ROW EXCLUSIVE MODE;
--!40000 ALTER TABLE "user" DISABLE KEYS */;
--!40000 ALTER TABLE "user" ENABLE KEYS */;
--COMMIT WORK;
--!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

--!40101 SET SQL_MODE=@OLD_SQL_MODE */;
--!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
--!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
--!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
--!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
--!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
--!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-04-27  6:46:35


--
-- Table structure for table "cart"
--

--DROP TABLE IF EXISTS "cart";
--!40101 SET @saved_cs_client     =  */;
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
--!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table "cart"
--

--BEGIN WORK;
--LOCK TABLE cart IN SHARE ROW EXCLUSIVE MODE;
--!40000 ALTER TABLE "cart" DISABLE KEYS */;
--!40000 ALTER TABLE "cart" ENABLE KEYS */;
--COMMIT WORK;


--DROP TABLE IF EXISTS "product";
--!40101 SET @saved_cs_client     =  */;
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
--!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table "product"
--

--BEGIN WORK;
--LOCK TABLE product IN SHARE ROW EXCLUSIVE MODE;
--!40000 ALTER TABLE "product" DISABLE KEYS */;
--!40000 ALTER TABLE "product" ENABLE KEYS */;
--COMMIT WORK;


--
-- Table structure for table "cart_item"
--

--DROP TABLE IF EXISTS "cart_item";
--!40101 SET @saved_cs_client     =  */;
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
--!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table "cart_item"
--

--BEGIN WORK;
--LOCK TABLE cart_item IN SHARE ROW EXCLUSIVE MODE;
--!40000 ALTER TABLE "cart_item" DISABLE KEYS */;
--!40000 ALTER TABLE "cart_item" ENABLE KEYS */;
--COMMIT WORK;

--
-- Table structure for table "category"
--

--DROP TABLE IF EXISTS "category";
--!40101 SET @saved_cs_client     =  */;
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
--!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table "category"
--

--BEGIN WORK;
--LOCK TABLE category IN SHARE ROW EXCLUSIVE MODE;
--!40000 ALTER TABLE "category" DISABLE KEYS */;
--!40000 ALTER TABLE "category" ENABLE KEYS */;
--COMMIT WORK;

--
-- Table structure for table "order"
--

--DROP TABLE IF EXISTS "order";
--!40101 SET @saved_cs_client     =  */;
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
--!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table "order"
--

--BEGIN WORK;
--LOCK TABLE order IN SHARE ROW EXCLUSIVE MODE;
--!40000 ALTER TABLE "order" DISABLE KEYS */;
--!40000 ALTER TABLE "order" ENABLE KEYS */;
--COMMIT WORK;

--
-- Table structure for table "order_item"
--

--DROP TABLE IF EXISTS "order_item";
--!40101 SET @saved_cs_client     =  */;
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
--!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table "order_item"
--

--BEGIN WORK;
--LOCK TABLE order_item IN SHARE ROW EXCLUSIVE MODE;
--!40000 ALTER TABLE "order_item" DISABLE KEYS */;
--!40000 ALTER TABLE "order_item" ENABLE KEYS */;
--COMMIT WORK;

--
-- Table structure for table "product"
--

--
-- Table structure for table "product_category"
--

--DROP TABLE IF EXISTS "product_category";
--!40101 SET @saved_cs_client     =  */;
CREATE TABLE "product_category" (
  "productId" uuid NOT NULL,
  "categoryId" uuid NOT NULL,
  PRIMARY KEY ("productId","categoryId"),
  CONSTRAINT "fk_pc_category" FOREIGN KEY ("categoryId") REFERENCES "category" ("id"),
  CONSTRAINT "fk_pc_product" FOREIGN KEY ("productId") REFERENCES "product" ("id")
);
--!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table "product_category"
--

--BEGIN WORK;
--LOCK TABLE product_category IN SHARE ROW EXCLUSIVE MODE;
--!40000 ALTER TABLE "product_category" DISABLE KEYS */;
--!40000 ALTER TABLE "product_category" ENABLE KEYS */;
--COMMIT WORK;

--
-- Table structure for table "product_meta"
--

--DROP TABLE IF EXISTS "product_meta";
--!40101 SET @saved_cs_client     =  */;
CREATE TABLE "product_meta" (
  "id" uuid,
  "productId" uuid NOT NULL,
  "key" varchar(50) NOT NULL,
  "content" text,
  PRIMARY KEY ("id"),
  CONSTRAINT "fk_meta_product" FOREIGN KEY ("productId") REFERENCES "product" ("id")
);
--!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table "product_meta"
--

--BEGIN WORK;
--LOCK TABLE product_meta IN SHARE ROW EXCLUSIVE MODE;
--!40000 ALTER TABLE "product_meta" DISABLE KEYS */;
--!40000 ALTER TABLE "product_meta" ENABLE KEYS */;
--COMMIT WORK;

--
-- Table structure for table "product_review"
--

--DROP TABLE IF EXISTS "product_review";
--!40101 SET @saved_cs_client     =  */;
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
--!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table "product_review"
--

--BEGIN WORK;
--LOCK TABLE product_review IN SHARE ROW EXCLUSIVE MODE;
--!40000 ALTER TABLE "product_review" DISABLE KEYS */;
--!40000 ALTER TABLE "product_review" ENABLE KEYS */;
--COMMIT WORK;

--
-- Table structure for table "product_tag"
--

CREATE TABLE "tag" (
  "id" uuid,
  "title" varchar(75) NOT NULL,
  "metaTitle" varchar(100) DEFAULT NULL,
  "slug" varchar(100) NOT NULL,
  "content" text,
  PRIMARY KEY ("id")
);
--!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table "tag"
--

--BEGIN WORK;
--LOCK TABLE tag IN SHARE ROW EXCLUSIVE MODE;
--!40000 ALTER TABLE "tag" DISABLE KEYS */;
--!40000 ALTER TABLE "tag" ENABLE KEYS */;
--COMMIT WORK;

--DROP TABLE IF EXISTS "product_tag";
--!40101 SET @saved_cs_client     =  */;
CREATE TABLE "product_tag" (
  "productId" uuid NOT NULL,
  "tagId" uuid NOT NULL,
  PRIMARY KEY ("productId","tagId"),
  CONSTRAINT "fk_pt_product" FOREIGN KEY ("productId") REFERENCES "product" ("id"),
  CONSTRAINT "fk_pt_tag" FOREIGN KEY ("tagId") REFERENCES "tag" ("id")
);
--!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table "product_tag"
--

--BEGIN WORK;
--LOCK TABLE product_tag IN SHARE ROW EXCLUSIVE MODE;
--!40000 ALTER TABLE "product_tag" DISABLE KEYS */;
--!40000 ALTER TABLE "product_tag" ENABLE KEYS */;
--COMMIT WORK;

--
-- Table structure for table "tag"
--

--DROP TABLE IF EXISTS "tag";
--!40101 SET @saved_cs_client     =  */;

--
-- Table structure for table "transaction"
--

--DROP TABLE IF EXISTS "transaction";
--!40101 SET @saved_cs_client     =  */;
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
--!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table "transaction"
--

--BEGIN WORK;
--LOCK TABLE transaction IN SHARE ROW EXCLUSIVE MODE;
--!40000 ALTER TABLE "transaction" DISABLE KEYS */;
--!40000 ALTER TABLE "transaction" ENABLE KEYS */;
--COMMIT WORK;

--from https://github.com/tutorials24x7/shopping-cart-database-mysql/blob/master/shop.sql