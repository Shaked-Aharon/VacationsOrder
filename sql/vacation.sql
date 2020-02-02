-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: אוקטובר 15, 2019 בזמן 04:27 PM
-- גרסת שרת: 10.1.38-MariaDB
-- PHP Version: 7.3.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vacation`
--
CREATE DATABASE IF NOT EXISTS `vacation` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `vacation`;

-- --------------------------------------------------------

--
-- מבנה טבלה עבור טבלה `follows`
--

CREATE TABLE `follows` (
  `userID` int(11) NOT NULL,
  `vacationID` int(11) NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- הוצאת מידע עבור טבלה `follows`
--

INSERT INTO `follows` (`userID`, `vacationID`, `date`) VALUES
(12, 4, '2019-09-18 12:28:44'),
(12, 2, '2019-09-18 17:57:24'),
(9, 4, '2019-09-22 14:35:57'),
(9, 2, '2019-09-22 14:35:59'),
(17, 2, '2019-10-02 16:55:35'),
(17, 1, '2019-10-02 16:55:36'),
(17, 7, '2019-10-02 16:55:39'),
(14, 2, '2019-10-03 10:11:12'),
(14, 7, '2019-10-11 15:59:12'),
(14, 5, '2019-10-11 15:59:22');

-- --------------------------------------------------------

--
-- מבנה טבלה עבור טבלה `users`
--

CREATE TABLE `users` (
  `userID` int(11) NOT NULL,
  `firstName` varchar(16) NOT NULL,
  `lastName` varchar(16) NOT NULL,
  `userName` varchar(32) NOT NULL,
  `userPass` varchar(32) NOT NULL,
  `isAdmin` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- הוצאת מידע עבור טבלה `users`
--

INSERT INTO `users` (`userID`, `firstName`, `lastName`, `userName`, `userPass`, `isAdmin`) VALUES
(5, 'this', 'isa', 'test', 'for', 0),
(6, 'undefined', 'undefined', 'test', 'for1', 0),
(7, 'undefined', 'undefined', 'test1', 'for', 0),
(8, 'This', 'Is', 'Myfirst', 'User', 0),
(9, '12312312', '123123123', '123123123', '123123123', 0),
(10, '111', '111', '111', '111', 0),
(11, '1111', '111111', '2222', '2222', 0),
(12, '', '', 'admin', 'admin', 1),
(14, 'asda', 'asdasd', '1234', '1234', 0),
(15, 'asdasdasd', 'asdasdasd', 'asdasdasd', 'asdasdasd', 0),
(16, 'register', 'register', 'register', 'register', 0),
(17, 'shay', 'goel', 'shay', '123456', 0);

-- --------------------------------------------------------

--
-- מבנה טבלה עבור טבלה `vacations`
--

CREATE TABLE `vacations` (
  `vacationID` int(11) NOT NULL,
  `vacationDescription` text NOT NULL,
  `vacationDestination` text NOT NULL,
  `vacationImg` text NOT NULL,
  `vacationStart` date NOT NULL,
  `vacationEnd` date NOT NULL,
  `vacationPrice` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- הוצאת מידע עבור טבלה `vacations`
--

INSERT INTO `vacations` (`vacationID`, `vacationDescription`, `vacationDestination`, `vacationImg`, `vacationStart`, `vacationEnd`, `vacationPrice`) VALUES
(1, 'Amazing holiday in Amsterdam, amazing views and places of entertainment for all ages', 'Amsterdam, Holand', '1.jpg', '2019-09-18', '2019-09-22', 350),
(2, 'Get to know the amazing views of Tbilisi Georgia, breathtaking views at the cheapest prices', 'Tbilisi, Georgia', '2.jpg', '2019-09-26', '2019-10-01', 2502),
(3, 'I just typing here because I have no power to think of anything to write down', 'Tel Aviv, Israel', '3.jpg', '2019-09-25', '2019-09-25', 1000),
(4, 'another greate vacation added', 'Barcelona, ​​Spain', '4.jpg', '2019-09-20', '2019-09-28', 22222),
(5, 'just some description', 'Rome, Italy', '9331959ea4d9783f1921698337fda4f2.jpg', '2019-10-16', '2019-10-20', 450),
(7, 'most peacful place in the world', 'Colombo, Sri Lanka', '8c48ee8bde7f8178a4c4e6423b65ec25.jpg', '2019-10-15', '2019-10-22', 450);

--
-- Indexes for dumped tables
--

--
-- אינדקסים לטבלה `follows`
--
ALTER TABLE `follows`
  ADD KEY `userID` (`userID`,`vacationID`),
  ADD KEY `userID_2` (`userID`,`vacationID`),
  ADD KEY `vacationID` (`vacationID`);

--
-- אינדקסים לטבלה `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userID`);

--
-- אינדקסים לטבלה `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`vacationID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `vacationID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- הגבלות לטבלאות שהוצאו
--

--
-- הגבלות לטבלה `follows`
--
ALTER TABLE `follows`
  ADD CONSTRAINT `follows_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`),
  ADD CONSTRAINT `follows_ibfk_2` FOREIGN KEY (`vacationID`) REFERENCES `vacations` (`vacationID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
