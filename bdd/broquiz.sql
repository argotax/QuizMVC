-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  Dim 28 avr. 2019 à 10:51
-- Version du serveur :  5.7.19
-- Version de PHP :  7.1.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `broquiz`
--

-- --------------------------------------------------------

--
-- Structure de la table `broquiz_answer`
--

DROP TABLE IF EXISTS `broquiz_answer`;
CREATE TABLE IF NOT EXISTS `broquiz_answer` (
  `answer_id` int(11) NOT NULL AUTO_INCREMENT,
  `answer_question` int(11) NOT NULL,
  `answer_label` varchar(1500) NOT NULL,
  `answer_image` varchar(1000) NOT NULL,
  `answer_status` int(11) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`answer_id`),
  KEY `answer_question` (`answer_question`),
  KEY `answer_status` (`answer_status`)
) ENGINE=InnoDB AUTO_INCREMENT=161 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `broquiz_answer`
--

INSERT INTO `broquiz_answer` (`answer_id`, `answer_question`, `answer_label`, `answer_image`, `answer_status`, `createdAt`, `updatedAt`) VALUES
(1, 1, 'Blanc', '', 7, '2019-03-18 12:38:12', '2019-03-18 12:38:12'),
(2, 1, 'Noir', '', 8, '2019-03-18 12:38:12', '2019-03-18 12:38:12'),
(3, 1, 'Bleu', '', 8, '2019-03-18 12:38:34', '2019-03-18 12:38:34'),
(4, 1, 'Vert', '', 8, '2019-03-18 12:38:34', '2019-03-18 12:38:34'),
(5, 2, '2', '', 8, '2019-03-18 12:39:03', '2019-03-18 12:39:03'),
(6, 2, '4', '', 8, '2019-03-18 12:39:03', '2019-03-18 12:39:03'),
(7, 2, '8', '', 7, '2019-03-18 12:39:24', '2019-03-18 12:39:24'),
(8, 2, '1000', '', 8, '2019-03-18 12:39:24', '2019-03-18 12:39:24'),
(9, 3, 'Le Lion', '', 8, '2019-03-18 12:39:48', '2019-03-18 12:39:48'),
(10, 3, 'Le Gorille', '', 8, '2019-03-18 12:39:48', '2019-03-18 12:39:48'),
(11, 3, 'La Crevette', '', 8, '2019-03-18 12:40:08', '2019-03-18 12:40:08'),
(12, 3, 'La Baleine', '', 7, '2019-03-18 12:40:08', '2019-03-18 12:40:08'),
(37, 24, 'Ragnar Lodbrok', '', 7, '2019-04-16 11:51:37', '2019-04-16 11:51:37'),
(38, 24, 'Björn Côtes-de-Fer', '', 8, '2019-04-16 11:51:37', '2019-04-16 11:51:37'),
(39, 24, 'Floki Vilgerðarson', '', 8, '2019-04-16 11:51:37', '2019-04-16 11:51:37'),
(40, 24, 'Le Roi Egbert', '', 8, '2019-04-16 11:51:37', '2019-04-16 11:51:37'),
(41, 25, 'Edith Piaf', '', 7, '2019-04-16 11:53:41', '2019-04-16 11:53:41'),
(42, 25, 'France Gall', '', 8, '2019-04-16 11:53:41', '2019-04-16 11:53:41'),
(43, 25, 'Véronique Sanson', '', 8, '2019-04-16 11:53:41', '2019-04-16 11:53:41'),
(44, 25, 'Madonna', '', 8, '2019-04-16 11:53:41', '2019-04-16 11:53:41'),
(45, 26, 'Aya Nakamura', '', 7, '2019-04-16 11:55:26', '2019-04-16 11:55:26'),
(46, 26, 'Kaya Nakamura', '', 8, '2019-04-16 11:55:26', '2019-04-16 11:55:26'),
(47, 26, 'Aya Nakkamura', '', 8, '2019-04-16 11:55:26', '2019-04-16 11:55:26'),
(48, 26, 'Aya Nakanura', '', 8, '2019-04-16 11:55:26', '2019-04-16 11:55:26'),
(49, 27, 'Caen', '', 7, '2019-04-16 11:56:43', '2019-04-16 11:56:43'),
(50, 27, 'Toulouse', '', 8, '2019-04-16 11:56:43', '2019-04-16 11:56:43'),
(51, 27, 'Paris', '', 8, '2019-04-16 11:56:43', '2019-04-16 11:56:43'),
(52, 27, 'Clichy', '', 8, '2019-04-16 11:56:43', '2019-04-16 11:56:43'),
(53, 28, 'Los Pollos Hermanos', '', 7, '2019-04-16 13:06:27', '2019-04-16 13:06:27'),
(54, 28, 'Five Guys', '', 8, '2019-04-16 13:06:27', '2019-04-16 13:06:27'),
(55, 28, 'Mac Donald', '', 8, '2019-04-16 13:06:27', '2019-04-16 13:06:27'),
(56, 28, 'O Tacos', '', 8, '2019-04-16 13:06:27', '2019-04-16 13:06:27'),
(57, 29, 'Popeye', '', 7, '2019-04-16 13:07:11', '2019-04-16 13:07:11'),
(58, 29, 'Hulk', '', 8, '2019-04-16 13:07:11', '2019-04-16 13:07:11'),
(59, 29, 'Superman', '', 8, '2019-04-16 13:07:11', '2019-04-16 13:07:11'),
(60, 29, 'Zorro', '', 8, '2019-04-16 13:07:11', '2019-04-16 13:07:11'),
(61, 30, 'Réal Madrid', '', 7, '2019-04-16 13:08:04', '2019-04-16 13:08:04'),
(62, 30, 'Ajax', '', 8, '2019-04-16 13:08:04', '2019-04-16 13:08:04'),
(63, 30, 'Juventus', '', 8, '2019-04-16 13:08:04', '2019-04-16 13:08:04'),
(64, 30, 'Yvré l Évèque', '', 8, '2019-04-16 13:08:04', '2019-04-16 13:08:04'),
(65, 31, 'OM', '', 7, '2019-04-16 13:09:07', '2019-04-16 13:09:07'),
(66, 31, 'PSG', '', 8, '2019-04-16 13:09:07', '2019-04-16 13:09:07'),
(67, 31, 'OL', '', 8, '2019-04-16 13:09:07', '2019-04-16 13:09:07'),
(68, 31, 'MUC', '', 8, '2019-04-16 13:09:07', '2019-04-16 13:09:07'),
(69, 32, 'La cathédrale Notre Dame de Paris', '', 7, '2019-04-16 13:09:52', '2019-04-16 13:09:52'),
(70, 32, 'La statue de la liberté', '', 8, '2019-04-16 13:09:52', '2019-04-16 13:09:52'),
(71, 32, 'La Sagrada Familia', '', 8, '2019-04-16 13:09:52', '2019-04-16 13:09:52'),
(72, 32, 'La tour de Pise', '', 8, '2019-04-16 13:09:52', '2019-04-16 13:09:52'),
(73, 33, '1998', '', 7, '2019-04-16 13:10:02', '2019-04-16 13:10:02'),
(74, 33, '2002', '', 8, '2019-04-16 13:10:02', '2019-04-16 13:10:02'),
(75, 33, '2001', '', 8, '2019-04-16 13:10:02', '2019-04-16 13:10:02'),
(76, 33, '2006', '', 8, '2019-04-16 13:10:02', '2019-04-16 13:10:02'),
(77, 34, '1789', '', 7, '2019-04-16 13:11:29', '2019-04-16 13:11:29'),
(78, 34, '2001', '', 8, '2019-04-16 13:11:29', '2019-04-16 13:11:29'),
(79, 34, '1889', '', 8, '2019-04-16 13:11:29', '2019-04-16 13:11:29'),
(80, 34, '1998', '', 8, '2019-04-16 13:11:29', '2019-04-16 13:11:29'),
(81, 35, 'Louis XIV', '', 7, '2019-04-16 13:12:29', '2019-04-16 13:12:29'),
(82, 35, 'Henri IV', '', 8, '2019-04-16 13:12:29', '2019-04-16 13:12:29'),
(83, 35, 'Clovis XVIII', '', 8, '2019-04-16 13:12:29', '2019-04-16 13:12:29'),
(84, 35, 'Jean-Pacome II', '', 8, '2019-04-16 13:12:29', '2019-04-16 13:12:29'),
(85, 36, 'Radiant', '', 7, '2019-04-16 13:13:30', '2019-04-16 13:13:30'),
(86, 36, 'Dreamland', '', 8, '2019-04-16 13:13:30', '2019-04-16 13:13:30'),
(87, 36, 'Naruto', '', 8, '2019-04-16 13:13:30', '2019-04-16 13:13:30'),
(88, 36, 'One Piece', '', 8, '2019-04-16 13:13:30', '2019-04-16 13:13:30'),
(89, 37, 'C est pas sorcier', '', 7, '2019-04-16 13:14:26', '2019-04-16 13:14:26'),
(90, 37, 'In ze boite', '', 8, '2019-04-16 13:14:26', '2019-04-16 13:14:26'),
(91, 37, 'Fort Boyard', '', 8, '2019-04-16 13:14:26', '2019-04-16 13:14:26'),
(92, 37, 'Qui veut gagner des millions', '', 8, '2019-04-16 13:14:26', '2019-04-16 13:14:26'),
(93, 38, 'Dioxygène', '', 7, '2019-04-16 13:15:38', '2019-04-16 13:15:38'),
(94, 38, 'Oxygène', '', 8, '2019-04-16 13:15:38', '2019-04-16 13:15:38'),
(95, 38, 'Dioxyde de carbone', '', 8, '2019-04-16 13:15:38', '2019-04-16 13:15:38'),
(96, 38, 'La réponse 4', '', 8, '2019-04-16 13:15:38', '2019-04-16 13:15:38'),
(97, 39, 'L eau...', '', 7, '2019-04-16 13:15:42', '2019-04-16 13:15:42'),
(98, 39, 'La lave', '', 8, '2019-04-16 13:15:42', '2019-04-16 13:15:42'),
(99, 39, 'L oxygène', '', 8, '2019-04-16 13:15:42', '2019-04-16 13:15:42'),
(100, 39, 'HOO', '', 8, '2019-04-16 13:15:42', '2019-04-16 13:15:42'),
(101, 40, 'Pablo Emilio Escobar Gaviria', '', 7, '2019-04-16 13:17:09', '2019-04-16 13:17:09'),
(102, 40, 'Jean Heude de la Vega', '', 8, '2019-04-16 13:17:09', '2019-04-16 13:17:09'),
(103, 40, 'Pablito Elcorro Monitas', '', 8, '2019-04-16 13:17:09', '2019-04-16 13:17:09'),
(104, 40, 'Walterito Whitas Pablito Emilio de la Vega Salah', '', 8, '2019-04-16 13:17:09', '2019-04-16 13:17:09'),
(105, 41, 'L héritier du Trône de Fer', '', 7, '2019-04-16 13:17:57', '2019-04-16 13:17:57'),
(106, 41, 'Le fils de Ned Stark', '', 8, '2019-04-16 13:17:57', '2019-04-16 13:17:57'),
(107, 41, 'Le roi de la nuit', '', 8, '2019-04-16 13:17:57', '2019-04-16 13:17:57'),
(108, 41, 'Kit Harington', '', 8, '2019-04-16 13:17:57', '2019-04-16 13:17:57'),
(109, 42, 'Harrison Ford', '', 7, '2019-04-16 13:18:22', '2019-04-16 13:18:22'),
(110, 42, 'Mark Hammil', '', 8, '2019-04-16 13:18:22', '2019-04-16 13:18:22'),
(111, 42, 'Jason Statham', '', 8, '2019-04-16 13:18:22', '2019-04-16 13:18:22'),
(112, 42, 'Jules Mickael', '', 8, '2019-04-16 13:18:22', '2019-04-16 13:18:22'),
(113, 43, 'Un porc', '', 7, '2019-04-16 13:19:02', '2019-04-16 13:19:02'),
(114, 43, 'Un mouton', '', 8, '2019-04-16 13:19:02', '2019-04-16 13:19:02'),
(115, 43, 'Un dauphin', '', 8, '2019-04-16 13:19:02', '2019-04-16 13:19:02'),
(116, 43, 'Un chien', '', 8, '2019-04-16 13:19:02', '2019-04-16 13:19:02'),
(117, 44, 'Shinichi Kudo', '', 7, '2019-04-16 13:19:48', '2019-04-16 13:19:48'),
(118, 44, 'Kogoro Mourri', '', 8, '2019-04-16 13:19:48', '2019-04-16 13:19:48'),
(119, 44, 'Heiji Hattori', '', 8, '2019-04-16 13:19:48', '2019-04-16 13:19:48'),
(120, 44, 'Inspecteur Gadget', '', 8, '2019-04-16 13:19:48', '2019-04-16 13:19:48'),
(121, 45, 'Le grand capitaine Ussop', '', 7, '2019-04-16 13:20:54', '2019-04-16 13:20:54'),
(122, 45, 'La navigatrice Nami', '', 8, '2019-04-16 13:20:54', '2019-04-16 13:20:54'),
(123, 45, 'Francky le magnifique', '', 8, '2019-04-16 13:20:54', '2019-04-16 13:20:54'),
(124, 45, 'Luffy lui même', '', 8, '2019-04-16 13:20:54', '2019-04-16 13:20:54'),
(125, 46, 'Severus Rogue', '', 7, '2019-04-16 13:21:40', '2019-04-16 13:21:40'),
(126, 46, 'Drago Malefoy', '', 8, '2019-04-16 13:21:40', '2019-04-16 13:21:40'),
(127, 46, 'Dobby', '', 8, '2019-04-16 13:21:40', '2019-04-16 13:21:40'),
(128, 46, 'Bellatrix Lestrange', '', 8, '2019-04-16 13:21:40', '2019-04-16 13:21:40'),
(129, 47, 'Le Seigneur des anneaux', '', 7, '2019-04-16 13:22:51', '2019-04-16 13:22:51'),
(130, 47, 'Harry Potter', '', 8, '2019-04-16 13:22:51', '2019-04-16 13:22:51'),
(131, 47, 'Les barbapapa', '', 8, '2019-04-16 13:22:51', '2019-04-16 13:22:51'),
(132, 47, 'Star Wars', '', 8, '2019-04-16 13:22:51', '2019-04-16 13:22:51'),
(133, 48, 'Mithril', '', 7, '2019-04-16 13:24:10', '2019-04-16 13:24:10'),
(134, 48, 'Fer', '', 8, '2019-04-16 13:24:10', '2019-04-16 13:24:10'),
(135, 48, 'Argent', '', 8, '2019-04-16 13:24:10', '2019-04-16 13:24:10'),
(136, 48, 'Or', '', 8, '2019-04-16 13:24:10', '2019-04-16 13:24:10'),
(137, 49, 'Cercei et Jaime', '', 7, '2019-04-16 21:24:12', '2019-04-16 21:24:12'),
(138, 49, 'Cercei et Tyrion', '', 8, '2019-04-16 21:24:12', '2019-04-16 21:24:12'),
(139, 49, 'Jaime et Tyrion', '', 8, '2019-04-16 21:24:12', '2019-04-16 21:24:12'),
(140, 49, 'Jaime et Oberin', '', 8, '2019-04-16 21:24:12', '2019-04-16 21:24:12'),
(141, 50, 'La hase', '', 7, '2019-04-16 21:27:38', '2019-04-16 21:27:38'),
(142, 50, 'La levrette', '', 8, '2019-04-16 21:27:38', '2019-04-16 21:27:38'),
(143, 50, 'La lapine', '', 8, '2019-04-16 21:27:38', '2019-04-16 21:27:38'),
(144, 50, 'La lévrière', '', 8, '2019-04-16 21:27:38', '2019-04-16 21:27:38'),
(145, 51, 'Le colibri', '', 7, '2019-04-16 21:29:55', '2019-04-16 21:29:55'),
(146, 51, 'Le corbeau', '', 8, '2019-04-16 21:29:55', '2019-04-16 21:29:55'),
(147, 51, 'Le martin-pêcheur', '', 8, '2019-04-16 21:29:55', '2019-04-16 21:29:55'),
(148, 51, 'La mésange', '', 8, '2019-04-16 21:29:55', '2019-04-16 21:29:55'),
(149, 52, 'Son anémone', '', 7, '2019-04-16 21:32:15', '2019-04-16 21:32:15'),
(150, 52, 'Son coquillage', '', 8, '2019-04-16 21:32:15', '2019-04-16 21:32:15'),
(151, 52, 'Son cirque', '', 8, '2019-04-16 21:32:15', '2019-04-16 21:32:15'),
(152, 52, 'Sa compagne', '', 8, '2019-04-16 21:32:15', '2019-04-16 21:32:15'),
(153, 53, 'Le brochet', '', 7, '2019-04-16 21:35:25', '2019-04-16 21:35:25'),
(154, 53, 'La truite', '', 8, '2019-04-16 21:35:25', '2019-04-16 21:35:25'),
(155, 53, 'La carpe', '', 8, '2019-04-16 21:35:25', '2019-04-16 21:35:25'),
(156, 53, 'Le goujon', '', 8, '2019-04-16 21:35:25', '2019-04-16 21:35:25'),
(157, 54, 'Chien', '', 7, '2019-04-16 21:52:21', '2019-04-16 21:52:21'),
(158, 54, 'Chat', '', 8, '2019-04-16 21:52:21', '2019-04-16 21:52:21'),
(159, 54, 'Canard', '', 8, '2019-04-16 21:52:21', '2019-04-16 21:52:21'),
(160, 54, 'Canari', '', 8, '2019-04-16 21:52:21', '2019-04-16 21:52:21');

-- --------------------------------------------------------

--
-- Structure de la table `broquiz_category`
--

DROP TABLE IF EXISTS `broquiz_category`;
CREATE TABLE IF NOT EXISTS `broquiz_category` (
  `category_id` int(11) NOT NULL AUTO_INCREMENT,
  `category_label` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `broquiz_category`
--

INSERT INTO `broquiz_category` (`category_id`, `category_label`, `createdAt`, `updatedAt`) VALUES
(1, 'Animaux', '2019-03-11 10:05:19', '2019-03-11 10:05:19'),
(2, 'Films', '2019-03-11 10:05:19', '2019-03-11 10:05:19'),
(3, 'Série', '2019-03-11 10:05:32', '2019-03-11 10:05:32'),
(4, 'Musique', '2019-03-11 10:05:32', '2019-03-11 10:05:32'),
(5, 'Science', '2019-04-16 11:34:11', '2019-04-16 11:34:11'),
(6, 'Histoire', '2019-04-16 11:34:11', '2019-04-16 11:34:11'),
(7, 'Anime', '2019-04-16 15:05:46', '2019-04-16 15:05:46'),
(8, 'Sport', '2019-04-16 15:06:42', '2019-04-16 15:06:42');

-- --------------------------------------------------------

--
-- Structure de la table `broquiz_friend`
--

DROP TABLE IF EXISTS `broquiz_friend`;
CREATE TABLE IF NOT EXISTS `broquiz_friend` (
  `friend_id` int(11) NOT NULL AUTO_INCREMENT,
  `friend_p1` int(11) NOT NULL,
  `friend_p2` int(11) NOT NULL,
  `friend_status` int(11) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`friend_id`),
  KEY `friend_p1` (`friend_p1`),
  KEY `friend_p2` (`friend_p2`),
  KEY `friend_status` (`friend_status`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `broquiz_friend`
--

INSERT INTO `broquiz_friend` (`friend_id`, `friend_p1`, `friend_p2`, `friend_status`, `createdAt`, `updatedAt`) VALUES
(1, 1, 2, 5, '2019-03-11 08:54:32', '2019-03-11 08:55:07'),
(2, 4, 1, 5, '2019-03-24 20:07:25', '2019-03-24 20:07:41'),
(4, 6, 1, 5, '2019-04-16 09:12:04', '2019-04-16 09:12:10'),
(5, 1, 7, 5, '2019-04-16 13:24:29', '2019-04-16 13:24:36'),
(6, 1, 8, 5, '2019-04-18 21:22:00', '2019-04-18 21:22:07');

-- --------------------------------------------------------

--
-- Structure de la table `broquiz_game`
--

DROP TABLE IF EXISTS `broquiz_game`;
CREATE TABLE IF NOT EXISTS `broquiz_game` (
  `game_id` int(11) NOT NULL AUTO_INCREMENT,
  `game_p1` int(11) NOT NULL,
  `game_p2` int(11) NOT NULL,
  `game_p1_score` int(11) NOT NULL,
  `game_p2_score` int(11) NOT NULL,
  `game_p1_points` int(11) NOT NULL,
  `game_p2_points` int(11) NOT NULL,
  `game_status` int(11) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`game_id`),
  KEY `game_p1` (`game_p1`),
  KEY `game_p2` (`game_p2`),
  KEY `game_status` (`game_status`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `broquiz_game`
--

INSERT INTO `broquiz_game` (`game_id`, `game_p1`, `game_p2`, `game_p1_score`, `game_p2_score`, `game_p1_points`, `game_p2_points`, `game_status`, `createdAt`, `updatedAt`) VALUES
(7, 1, 2, 0, 0, 0, 0, 12, '2019-04-16 08:58:12', '2019-04-16 08:58:12'),
(8, 6, 1, 0, 0, 0, 0, 12, '2019-04-16 09:11:43', '2019-04-16 09:11:43'),
(9, 7, 1, 0, 0, 0, 0, 12, '2019-04-16 13:23:38', '2019-04-16 13:23:38'),
(10, 1, 7, 0, 0, 0, 0, 12, '2019-04-16 13:25:01', '2019-04-16 13:25:01'),
(11, 1, 8, 0, 0, 0, 0, 12, '2019-04-18 21:22:40', '2019-04-18 21:22:40');

-- --------------------------------------------------------

--
-- Structure de la table `broquiz_question`
--

DROP TABLE IF EXISTS `broquiz_question`;
CREATE TABLE IF NOT EXISTS `broquiz_question` (
  `question_id` int(11) NOT NULL AUTO_INCREMENT,
  `question_creator` int(11) NOT NULL,
  `question_validator` int(11) NOT NULL,
  `question_category` int(11) NOT NULL,
  `question_label` varchar(2500) NOT NULL,
  `question_image` varchar(1000) NOT NULL,
  `question_status` int(11) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`question_id`),
  KEY `question_creator` (`question_creator`),
  KEY `question_validator` (`question_validator`),
  KEY `question_category` (`question_category`),
  KEY `question_status` (`question_status`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `broquiz_question`
--

INSERT INTO `broquiz_question` (`question_id`, `question_creator`, `question_validator`, `question_category`, `question_label`, `question_image`, `question_status`, `createdAt`, `updatedAt`) VALUES
(1, 1, 2, 1, 'Quel est la couleur du cheval blanc d\'Henry IV ?', '', 1, '2019-03-11 10:05:51', '2019-03-11 10:05:51'),
(2, 1, 2, 1, 'Combien de pattes ont les araignées ?', '', 1, '2019-03-18 12:36:55', '2019-03-18 12:36:55'),
(3, 1, 2, 1, 'Quel est le plus grand mammifère marin de la planète ?', '', 1, '2019-03-18 12:37:38', '2019-03-18 12:37:38'),
(24, 1, 2, 6, 'De qui Lagertha et Aslaug ont elle été l\'épouse ?', '', 1, '2019-04-16 11:51:37', '2019-04-16 11:51:37'),
(25, 1, 2, 4, 'Qui interprète \"La vie en rose\" ?', '', 1, '2019-04-16 11:53:41', '2019-04-16 11:53:41'),
(26, 1, 2, 4, 'Qui interprète \"Djadja\" ?', '', 1, '2019-04-16 11:55:26', '2019-04-16 11:55:26'),
(27, 1, 2, 4, 'De quelle ville est originaire Orelsan ?', '', 1, '2019-04-16 11:56:43', '2019-04-16 11:56:43'),
(28, 1, 2, 3, 'Quelle chaine de fast food tiens Gustavo Fring ?', '', 1, '2019-04-16 13:06:27', '2019-04-16 13:06:27'),
(29, 1, 2, 7, 'Quel héros mange des épinards ?', '', 1, '2019-04-16 13:07:11', '2019-04-16 13:07:11'),
(30, 1, 2, 8, 'Quelle équipe de football a gagné 13 fois la Ligue des Champions ?', '', 1, '2019-04-16 13:08:04', '2019-04-16 13:08:04'),
(31, 1, 2, 8, 'Quelle est la seule équipe française à avoir gagné la Ligue des Champions ?', '', 1, '2019-04-16 13:09:07', '2019-04-16 13:09:07'),
(32, 1, 2, 6, 'Quel monument historique a brûlé en avril 2019 ?', '', 1, '2019-04-16 13:09:52', '2019-04-16 13:09:52'),
(33, 1, 2, 8, 'En quelle année la France a t-elle été championne du monde ?', '', 1, '2019-04-16 13:10:02', '2019-04-16 13:10:02'),
(34, 1, 2, 6, 'Quelle est la date de la révolution française ?', '', 1, '2019-04-16 13:11:29', '2019-04-16 13:11:29'),
(35, 1, 2, 6, 'Quel roi de France est surnommé \"Le Roi Soleil\" ?', '', 1, '2019-04-16 13:12:29', '2019-04-16 13:12:29'),
(36, 1, 2, 7, 'Quel manga Français a été adapté en animé ?', '', 1, '2019-04-16 13:13:30', '2019-04-16 13:13:30'),
(37, 1, 2, 5, 'Quelle est le nom de la célèbre émission scientifique de télé présentée par Fred et Jamy ?', '', 1, '2019-04-16 13:14:26', '2019-04-16 13:14:26'),
(38, 1, 2, 5, 'Comment s\'appelle la molécule O² ?', '', 1, '2019-04-16 13:15:38', '2019-04-16 13:15:38'),
(39, 1, 2, 5, 'Qu\'est ce que le H2O ?', '', 1, '2019-04-16 13:15:42', '2019-04-16 13:15:42'),
(40, 1, 2, 3, 'Quel est le nom complet du baron de la drogue Pablo Escobar ?', '', 1, '2019-04-16 13:17:09', '2019-04-16 13:17:09'),
(41, 1, 2, 3, 'Qui est en réalité Jon Snow?', '', 1, '2019-04-16 13:17:57', '2019-04-16 13:17:57'),
(42, 1, 2, 2, 'Quel acteur interprète l\'aventurier Indiana Jones ?', '', 1, '2019-04-16 13:18:22', '2019-04-16 13:18:22'),
(43, 1, 2, 1, 'Qu\'est ce qu\'un \"Ralouf\" en musulman ?', '', 1, '2019-04-16 13:19:02', '2019-04-16 13:19:02'),
(44, 1, 2, 7, 'Quel célèbre détective à rajeuni après avoir bu du poison ?', '', 1, '2019-04-16 13:19:48', '2019-04-16 13:19:48'),
(45, 1, 2, 7, 'Quel membre de l\'équipage de Luffi était détesté pour ses mensonges ?', '', 1, '2019-04-16 13:20:54', '2019-04-16 13:20:54'),
(46, 1, 2, 2, 'Qui tue Dumbledore dans Harry Potter?', '', 1, '2019-04-16 13:21:40', '2019-04-16 13:21:40'),
(47, 1, 2, 2, 'Dans quel film suit on le parcours du \"précieux\" ?', '', 1, '2019-04-16 13:22:51', '2019-04-16 13:22:51'),
(48, 1, 2, 2, 'En quelle matière la cuirasse que Frodon trouve dans la Moria est elle faite ?', '', 1, '2019-04-16 13:24:10', '2019-04-16 13:24:10'),
(49, 1, 2, 3, 'Comment se nomment les jumeaux Lannister dans Game of Thrones ?', '', 1, '2019-04-16 21:24:12', '2019-04-16 21:24:12'),
(50, 1, 2, 1, 'Quelle est la femelle du lièvre ?', '', 1, '2019-04-16 21:27:38', '2019-04-16 21:27:38'),
(51, 1, 2, 1, 'Quel est le seul oiseau au monde qui puisse voler à reculons ?', '', 1, '2019-04-16 21:29:55', '2019-04-16 21:29:55'),
(52, 1, 2, 1, 'De quoi le poisson clown ne peut-il se passer ?', '', 1, '2019-04-16 21:32:15', '2019-04-16 21:32:15'),
(53, 1, 2, 1, 'Quel poisson possède environ 700 dents ?', '', 1, '2019-04-16 21:35:25', '2019-04-16 21:35:25'),
(54, 1, 2, 1, 'À quel animal les îles Canaries doivent-elles leur nom ?', '', 1, '2019-04-16 21:52:21', '2019-04-16 21:52:21');

-- --------------------------------------------------------

--
-- Structure de la table `broquiz_round`
--

DROP TABLE IF EXISTS `broquiz_round`;
CREATE TABLE IF NOT EXISTS `broquiz_round` (
  `round_id` int(11) NOT NULL AUTO_INCREMENT,
  `round_game` int(11) NOT NULL,
  `round_category` int(11) DEFAULT NULL,
  `round_p1_score` int(11) NOT NULL,
  `round_p2_score` int(11) NOT NULL,
  `round_q1` int(11) DEFAULT NULL,
  `round_q2` int(11) DEFAULT NULL,
  `round_q3` int(11) DEFAULT NULL,
  `round_q1_p1` int(11) DEFAULT NULL,
  `round_q1_p2` int(11) DEFAULT NULL,
  `round_q2_p1` int(11) DEFAULT NULL,
  `round_q2_p2` int(11) DEFAULT NULL,
  `round_q3_p1` int(11) DEFAULT NULL,
  `round_q3_p2` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`round_id`),
  KEY `round_game` (`round_game`),
  KEY `round_category` (`round_category`),
  KEY `round_q1` (`round_q1`),
  KEY `round_q2` (`round_q2`),
  KEY `round_q3` (`round_q3`),
  KEY `round_q1_p1` (`round_q1_p1`),
  KEY `round_q1_p2` (`round_q1_p2`),
  KEY `round_q2_p1` (`round_q2_p1`),
  KEY `round_q2_p2` (`round_q2_p2`),
  KEY `round_q3_p1` (`round_q3_p1`),
  KEY `round_q3_p2` (`round_q3_p2`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `broquiz_round`
--

INSERT INTO `broquiz_round` (`round_id`, `round_game`, `round_category`, `round_p1_score`, `round_p2_score`, `round_q1`, `round_q2`, `round_q3`, `round_q1_p1`, `round_q1_p2`, `round_q2_p1`, `round_q2_p2`, `round_q3_p1`, `round_q3_p2`, `createdAt`, `updatedAt`) VALUES
(21, 7, 1, 0, 0, 1, 2, 3, 7, 8, 7, 8, 8, 7, '2019-04-16 08:58:20', '2019-04-16 08:59:11'),
(22, 7, 1, 0, 0, 1, 2, 3, 8, 8, 8, 8, 8, 8, '2019-04-16 08:59:18', '2019-04-16 09:02:48'),
(32, 7, 1, 0, 0, 1, 2, 3, 7, 14, 8, 14, 8, 14, '2019-04-16 12:52:45', '2019-04-16 12:54:18'),
(33, 7, 1, 0, 0, 1, 2, 3, 14, 7, 14, 7, 14, 8, '2019-04-16 12:55:24', '2019-04-16 12:57:50'),
(34, 7, 1, 0, 0, 1, 2, 3, 7, 8, 8, 8, 7, 8, '2019-04-16 12:58:29', '2019-04-16 13:02:39'),
(35, 9, 5, 0, 0, 37, 38, 39, NULL, NULL, NULL, NULL, NULL, NULL, '2019-04-16 13:25:13', '2019-04-16 13:25:18'),
(36, 10, 4, 0, 0, 25, 26, 27, 8, 7, 7, 7, 7, 7, '2019-04-16 13:25:51', '2019-04-16 13:26:33'),
(37, 10, 5, 0, 0, 37, 38, 39, 14, 14, 14, 14, 14, 14, '2019-04-16 13:26:41', '2019-04-16 13:29:44'),
(38, 10, 2, 0, 0, 42, 46, 47, 7, 7, 8, 7, 7, 7, '2019-04-16 13:30:24', '2019-04-16 13:31:35'),
(39, 10, 6, 0, 0, 24, 32, 34, 7, 7, 7, 7, 8, 7, '2019-04-16 13:31:43', '2019-04-16 13:32:36'),
(40, 10, 2, 0, 0, 42, 46, 47, 8, 7, 7, 7, 8, 7, '2019-04-16 13:32:38', '2019-04-16 13:33:30'),
(41, 10, 8, 0, 0, 30, 31, 33, 7, 7, 7, 7, 14, 7, '2019-04-16 13:33:32', '2019-04-16 13:35:14'),
(42, 11, 4, 0, 0, 25, 26, 27, 7, 7, 7, 7, 7, 8, '2019-04-18 21:22:52', '2019-04-18 21:23:36'),
(43, 11, 2, 0, 0, 42, 46, 47, 7, 7, 7, 7, 8, 7, '2019-04-18 21:23:40', '2019-04-25 17:05:19'),
(44, 7, 5, 0, 0, 37, 38, 39, 7, 14, 8, 14, 8, 14, '2019-04-23 09:38:34', '2019-04-28 10:50:48'),
(45, 11, 5, 0, 0, 37, 38, 39, 14, NULL, 14, NULL, 14, NULL, '2019-04-25 17:05:21', '2019-04-28 10:47:02');

-- --------------------------------------------------------

--
-- Structure de la table `broquiz_status`
--

DROP TABLE IF EXISTS `broquiz_status`;
CREATE TABLE IF NOT EXISTS `broquiz_status` (
  `status_id` int(11) NOT NULL AUTO_INCREMENT,
  `status_type` int(11) NOT NULL,
  `status_label` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`status_id`),
  KEY `status_type` (`status_type`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `broquiz_status`
--

INSERT INTO `broquiz_status` (`status_id`, `status_type`, `status_label`, `createdAt`, `updatedAt`) VALUES
(1, 1, 'Validé', '2019-03-11 08:51:11', '2019-03-11 08:51:11'),
(2, 1, 'En cours de validation', '2019-03-11 08:51:11', '2019-03-11 08:51:11'),
(3, 2, 'Administrateur', '2019-03-11 08:51:11', '2019-03-11 08:51:11'),
(4, 2, 'Joueur', '2019-03-11 08:51:11', '2019-03-11 08:51:11'),
(5, 3, 'Ami', '2019-03-11 08:51:11', '2019-03-11 08:51:11'),
(6, 3, 'Demande envoyée', '2019-03-11 08:51:11', '2019-03-11 08:51:11'),
(7, 4, 'Vraie', '2019-03-11 08:51:11', '2019-03-11 08:51:11'),
(8, 4, 'Fausse', '2019-03-11 08:51:11', '2019-03-11 08:51:11'),
(9, 5, 'Connecté', '2019-03-11 08:51:11', '2019-03-11 08:51:11'),
(10, 5, 'Déconnecté', '2019-03-11 08:51:11', '2019-03-11 08:51:11'),
(11, 5, 'Absent', '2019-03-11 08:51:11', '2019-03-11 08:51:11'),
(12, 6, 'En cours', '2019-03-11 08:51:11', '2019-03-11 08:51:11'),
(13, 6, 'Terminée', '2019-03-11 08:51:11', '2019-03-11 08:51:11'),
(14, 4, 'None', '2019-03-18 09:15:41', '2019-03-18 09:15:41');

-- --------------------------------------------------------

--
-- Structure de la table `broquiz_status_type`
--

DROP TABLE IF EXISTS `broquiz_status_type`;
CREATE TABLE IF NOT EXISTS `broquiz_status_type` (
  `status_type_id` int(11) NOT NULL AUTO_INCREMENT,
  `status_type_label` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`status_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `broquiz_status_type`
--

INSERT INTO `broquiz_status_type` (`status_type_id`, `status_type_label`, `createdAt`, `updatedAt`) VALUES
(1, 'Question', '2019-03-11 08:51:11', '2019-03-11 08:51:11'),
(2, 'Role', '2019-03-11 08:51:11', '2019-03-11 08:51:11'),
(3, 'Ami', '2019-03-11 08:51:11', '2019-03-11 08:51:11'),
(4, 'Réponse', '2019-03-11 08:51:11', '2019-03-11 08:51:11'),
(5, 'Utilisateur', '2019-03-11 08:51:11', '2019-03-11 08:51:11'),
(6, 'Game', '2019-03-11 08:51:11', '2019-03-11 08:51:11');

-- --------------------------------------------------------

--
-- Structure de la table `broquiz_user`
--

DROP TABLE IF EXISTS `broquiz_user`;
CREATE TABLE IF NOT EXISTS `broquiz_user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_login` varchar(255) NOT NULL,
  `user_email` varchar(255) NOT NULL,
  `user_password` varchar(255) NOT NULL,
  `user_salt` varchar(255) NOT NULL,
  `user_country` varchar(255) NOT NULL,
  `user_points` int(11) NOT NULL,
  `user_role` int(11) NOT NULL,
  `user_status` int(11) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `connectedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`),
  KEY `user_role` (`user_role`),
  KEY `user_status` (`user_status`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `broquiz_user`
--

INSERT INTO `broquiz_user` (`user_id`, `user_login`, `user_email`, `user_password`, `user_salt`, `user_country`, `user_points`, `user_role`, `user_status`, `createdAt`, `updatedAt`, `connectedAt`) VALUES
(1, 'skyshufeu', 'mouchelp72531@gmail.com', '$2b$10$EJYKtCmzlexscrRpaYJzp.qsGdkDXcI8WI02zwDrz42/K6SjO0fma', '$2b$10$EJYKtCmzlexscrRpaYJzp.', 'France', 0, 4, 9, '2019-03-11 08:53:38', '2019-04-28 10:50:32', '2019-03-11 08:53:38'),
(2, 'goldfinger', 'pierre.mouchel@imie.fr', '$2b$10$NHky9yUD/THILkOH9CX.i.wnsfUCh0ACsGP8G.bldnXQ6U5gNRkhK', '$2b$10$NHky9yUD/THILkOH9CX.i.', 'France', 0, 4, 9, '2019-03-11 08:54:16', '2019-04-23 09:38:01', '2019-03-11 08:54:16'),
(3, 'argotax', 'argotax@gmail.com', '$2b$10$maafdg84jAjeZzjygWgKW.9yZCmD51y3PH7DQ5T3pa2RQasbzpfF2', '$2b$10$maafdg84jAjeZzjygWgKW.', 'France', 0, 4, 10, '2019-03-18 07:45:24', '2019-03-18 11:11:25', '2019-03-18 07:45:24'),
(4, 'simon', 'pierre@pierre.fr', '$2b$10$XO/VNnpXJm5rujFIDkWdsu3BNRLwX8DokPGioCAGQhP4fIe/o8pfC', '$2b$10$XO/VNnpXJm5rujFIDkWdsu', 'France', 0, 4, 10, '2019-03-24 20:07:12', '2019-03-24 20:07:33', '2019-03-24 20:07:12'),
(6, 'chasuuble72', 'mouchell09@gmail.com', '$2b$10$lOfqKR26RQ.oJC65262l.OtjcftigqBE6jYL3OcBA1K8UytgyES52', '$2b$10$lOfqKR26RQ.oJC65262l.O', 'Azerbaijan ', 0, 4, 10, '2019-04-16 09:11:34', '2019-04-16 09:11:39', '2019-04-16 09:11:34'),
(7, 'popeye', 'noe.mouchel@gmail.com', '$2b$10$DWuzeoSn8oVmrMVDEFrrTOKaiwg8BAS.tKg6PPsdky67VU1nY8L0O', '$2b$10$DWuzeoSn8oVmrMVDEFrrTO', 'France', 0, 4, 10, '2019-04-16 13:04:36', '2019-04-16 13:25:46', '2019-04-16 13:04:36'),
(8, 'Francois', 'frmouchel@gmail.com', '$2b$10$tQR/y/T5ecuosbOFT7nJFOK8/5IYenFnoWCTFImIFHdriQbxmOL8S', '$2b$10$tQR/y/T5ecuosbOFT7nJFO', 'France', 0, 4, 9, '2019-04-18 21:21:17', '2019-04-18 21:21:33', '2019-04-18 21:21:17');

-- --------------------------------------------------------

--
-- Structure de la table `sequelizemeta`
--

DROP TABLE IF EXISTS `sequelizemeta`;
CREATE TABLE IF NOT EXISTS `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20190310195851-broquiz_answer.js'),
('20190310195851-broquiz_category.js'),
('20190310195851-broquiz_friend.js'),
('20190310195851-broquiz_game.js'),
('20190310195851-broquiz_question.js'),
('20190310195851-broquiz_round.js'),
('20190310195851-broquiz_status_type.js'),
('20190310195851-broquiz_status.js'),
('20190310195851-broquiz_user.js'),
('20190310195851-sequelizemeta.js');

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `broquiz_answer`
--
ALTER TABLE `broquiz_answer`
  ADD CONSTRAINT `broquiz_answer_ibfk_1` FOREIGN KEY (`answer_question`) REFERENCES `broquiz_question` (`question_id`),
  ADD CONSTRAINT `broquiz_answer_ibfk_2` FOREIGN KEY (`answer_status`) REFERENCES `broquiz_status` (`status_id`);

--
-- Contraintes pour la table `broquiz_friend`
--
ALTER TABLE `broquiz_friend`
  ADD CONSTRAINT `broquiz_friend_ibfk_1` FOREIGN KEY (`friend_p1`) REFERENCES `broquiz_user` (`user_id`),
  ADD CONSTRAINT `broquiz_friend_ibfk_2` FOREIGN KEY (`friend_p2`) REFERENCES `broquiz_user` (`user_id`),
  ADD CONSTRAINT `broquiz_friend_ibfk_3` FOREIGN KEY (`friend_status`) REFERENCES `broquiz_status` (`status_id`);

--
-- Contraintes pour la table `broquiz_game`
--
ALTER TABLE `broquiz_game`
  ADD CONSTRAINT `broquiz_game_ibfk_1` FOREIGN KEY (`game_p1`) REFERENCES `broquiz_user` (`user_id`),
  ADD CONSTRAINT `broquiz_game_ibfk_2` FOREIGN KEY (`game_p2`) REFERENCES `broquiz_user` (`user_id`),
  ADD CONSTRAINT `broquiz_game_ibfk_3` FOREIGN KEY (`game_status`) REFERENCES `broquiz_status` (`status_id`);

--
-- Contraintes pour la table `broquiz_question`
--
ALTER TABLE `broquiz_question`
  ADD CONSTRAINT `broquiz_question_ibfk_1` FOREIGN KEY (`question_creator`) REFERENCES `broquiz_user` (`user_id`),
  ADD CONSTRAINT `broquiz_question_ibfk_2` FOREIGN KEY (`question_validator`) REFERENCES `broquiz_user` (`user_id`),
  ADD CONSTRAINT `broquiz_question_ibfk_3` FOREIGN KEY (`question_category`) REFERENCES `broquiz_category` (`category_id`),
  ADD CONSTRAINT `broquiz_question_ibfk_4` FOREIGN KEY (`question_status`) REFERENCES `broquiz_status` (`status_id`);

--
-- Contraintes pour la table `broquiz_round`
--
ALTER TABLE `broquiz_round`
  ADD CONSTRAINT `broquiz_round_ibfk_1` FOREIGN KEY (`round_game`) REFERENCES `broquiz_game` (`game_id`),
  ADD CONSTRAINT `broquiz_round_ibfk_10` FOREIGN KEY (`round_q3_p1`) REFERENCES `broquiz_status` (`status_id`),
  ADD CONSTRAINT `broquiz_round_ibfk_11` FOREIGN KEY (`round_q3_p2`) REFERENCES `broquiz_status` (`status_id`),
  ADD CONSTRAINT `broquiz_round_ibfk_2` FOREIGN KEY (`round_category`) REFERENCES `broquiz_category` (`category_id`),
  ADD CONSTRAINT `broquiz_round_ibfk_3` FOREIGN KEY (`round_q1`) REFERENCES `broquiz_question` (`question_id`),
  ADD CONSTRAINT `broquiz_round_ibfk_4` FOREIGN KEY (`round_q2`) REFERENCES `broquiz_question` (`question_id`),
  ADD CONSTRAINT `broquiz_round_ibfk_5` FOREIGN KEY (`round_q3`) REFERENCES `broquiz_question` (`question_id`),
  ADD CONSTRAINT `broquiz_round_ibfk_6` FOREIGN KEY (`round_q1_p1`) REFERENCES `broquiz_status` (`status_id`),
  ADD CONSTRAINT `broquiz_round_ibfk_7` FOREIGN KEY (`round_q1_p2`) REFERENCES `broquiz_status` (`status_id`),
  ADD CONSTRAINT `broquiz_round_ibfk_8` FOREIGN KEY (`round_q2_p1`) REFERENCES `broquiz_status` (`status_id`),
  ADD CONSTRAINT `broquiz_round_ibfk_9` FOREIGN KEY (`round_q2_p2`) REFERENCES `broquiz_status` (`status_id`);

--
-- Contraintes pour la table `broquiz_status`
--
ALTER TABLE `broquiz_status`
  ADD CONSTRAINT `broquiz_status_ibfk_1` FOREIGN KEY (`status_type`) REFERENCES `broquiz_status_type` (`status_type_id`);

--
-- Contraintes pour la table `broquiz_user`
--
ALTER TABLE `broquiz_user`
  ADD CONSTRAINT `broquiz_user_ibfk_1` FOREIGN KEY (`user_role`) REFERENCES `broquiz_status` (`status_id`),
  ADD CONSTRAINT `broquiz_user_ibfk_2` FOREIGN KEY (`user_status`) REFERENCES `broquiz_status` (`status_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
