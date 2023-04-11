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

 Date: 11/04/2023 12:37:20
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

-- ----------------------------
-- Table structure for mg_files
-- ----------------------------
DROP TABLE IF EXISTS `mg_files`;
CREATE TABLE `mg_files`  (
  `id` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `pid` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '父id',
  `icon` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT 'https://s1.ax1x.com/2023/01/11/pSnKiH1.png' COMMENT 'icon',
  `ext` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '文件后缀',
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '文件名称',
  `size` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '文件大小',
  `type` int(11) NULL DEFAULT 1 COMMENT '文件类型',
  `status` tinyint(1) NULL DEFAULT 1 COMMENT '状态',
  `content` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '备注',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `mimetype` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '文档类别',
  `downUrl` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '文件下载链接',
  `preUrl` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '文件预览链接',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of mg_files
-- ----------------------------
INSERT INTO `mg_files` VALUES ('4c067c2d-b725-45b2-aa61-886aa96b37e2', '', '', 'jpg', 'country-flag.jpg', '2.13M', 1, 1, '各国国旗', '2023-04-11 12:32:48', '2023-04-11 12:33:42', 'image/jpeg', 'http://localhost:3001/api/v1/files/findOne?id=country-flag.jpg', 'http://localhost:3001/api/v1/files/preview?p=country-flag.jpg&&mimetype=image/jpeg');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT 'admin' COMMENT '用户名',
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT 'Vchs0bbdk2pr/Ac6DsHruw==' COMMENT '密码',
  `nickName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT 'John Doe',
  `verificationCode` int(11) NULL DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('26aefc0d-ff1f-4b4e-9a79-1bfdf28d4a30', '范德萨范德萨', 'Vchs0bbdk2pr/Ac6DsHruw==', '', 1, '2023-02-14 14:02:52', '2023-02-14 14:02:52');
INSERT INTO `users` VALUES ('367b19b0-b4c7-4e33-bdba-34a62cb1e48f', 'dsd2', 'Vchs0bbdk2pr/Ac6DsHruw==', '王小明4', 1, '2023-02-14 13:06:50', '2023-02-14 13:06:50');
INSERT INTO `users` VALUES ('3aabba6f-5912-4030-8df0-e73b8b8f012e', 'dsd2', 'Vchs0bbdk2pr/Ac6DsHruw==', '王小明4', 1, '2023-02-14 13:05:59', '2023-02-14 13:05:59');
INSERT INTO `users` VALUES ('3cd65bea-866d-4182-9f76-5f3d4b805a75', 'dsd2', 'Vchs0bbdk2pr/Ac6DsHruw==', '王小明4', 1, '2023-02-14 13:00:45', '2023-02-14 13:00:45');
INSERT INTO `users` VALUES ('59605511-cfeb-4124-a78e-433f9f6f167c', 'dsd2', 'Vchs0bbdk2pr/Ac6DsHruw==', '王小明4', 1, '2023-02-14 13:01:36', '2023-02-14 13:01:36');
INSERT INTO `users` VALUES ('5e4b5bf9-8093-4578-b4e5-233114bf5eaf', 'dsd2', 'Vchs0bbdk2pr/Ac6DsHruw==', '', 1, '2023-02-14 14:02:37', '2023-02-14 14:02:37');
INSERT INTO `users` VALUES ('60d076ae-7c0e-4e10-af91-6ad27ba49afa', 'dsd2', 'Vchs0bbdk2pr/Ac6DsHruw==', '', 1, '2023-02-14 13:08:13', '2023-02-14 13:08:13');
INSERT INTO `users` VALUES ('7cb94f70-20f0-47af-b811-2ad1b358ebae', 'dsd2', 'Vchs0bbdk2pr/Ac6DsHruw==', '王小明4', 1, '2023-02-14 13:01:45', '2023-02-14 13:01:45');
INSERT INTO `users` VALUES ('81482331-01a6-4e34-8617-dea68603ea2a', 'dsd2', 'Vchs0bbdk2pr/Ac6DsHruw==', '王小明4', 1, '2023-02-14 13:03:14', '2023-02-14 13:03:14');
INSERT INTO `users` VALUES ('869d21d2-2ca8-44d0-b054-3e11ec07c2ee', '范德萨范德萨', 'Vchs0bbdk2pr/Ac6DsHruw==', '', 1, '2023-02-14 14:02:46', '2023-02-14 14:02:46');
INSERT INTO `users` VALUES ('b79710d1-d6a3-4ffb-9e08-dd914d912853', 'dsd2', 'Vchs0bbdk2pr/Ac6DsHruw==', '王小明4', 1, '2023-02-14 13:06:55', '2023-02-14 13:06:55');
INSERT INTO `users` VALUES ('c4a1356d-a383-43e0-9f1b-2bbdc644d00b', 'dsd2', 'Vchs0bbdk2pr/Ac6DsHruw==', '王小明4', 1, '2023-02-14 13:03:36', '2023-02-14 13:03:36');
INSERT INTO `users` VALUES ('cce5067c-7fc2-470d-a59f-7126cdea842a', '范德萨范德萨', 'Vchs0bbdk2pr/Ac6DsHruw==', '', 1, '2023-02-14 14:02:55', '2023-02-14 14:02:55');
INSERT INTO `users` VALUES ('e1765af2-2b32-4c0e-b54d-a3950e0821a4', 'dsd2', 'Vchs0bbdk2pr/Ac6DsHruw==', '王小明4', 1, '2023-02-14 13:00:38', '2023-02-14 13:00:38');

SET FOREIGN_KEY_CHECKS = 1;
