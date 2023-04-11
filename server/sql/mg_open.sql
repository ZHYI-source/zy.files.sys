/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 50736
 Source Host           : localhost:3306
 Source Schema         : mg_open

 Target Server Type    : MySQL
 Target Server Version : 50736
 File Encoding         : 65001

 Date: 08/02/2023 15:42:18
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for mg_article
-- ----------------------------
DROP TABLE IF EXISTS `mg_article`;
CREATE TABLE `mg_article`  (
  `id` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `url` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT 'https://www.bidushe.com/sanwen/81058.html' COMMENT '地址',
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '竹叶青茶洗心尘' COMMENT '文章名称',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of mg_article
-- ----------------------------
INSERT INTO `mg_article` VALUES ('0a2a19c5-3e85-4108-865e-6d4992ae202c', 'https://www.bidushe.com/sanwen/80340.html', '回到故乡', '2023-02-08 15:33:18', '2023-02-08 15:33:18');
INSERT INTO `mg_article` VALUES ('e5536fd5-f6bc-4a2d-9e25-1d33daeb8424', 'https://www.bidushe.com/sanwen/80970.html', '行走在季节变幻的时光里', '2023-02-08 15:34:17', '2023-02-08 15:34:17');

SET FOREIGN_KEY_CHECKS = 1;
