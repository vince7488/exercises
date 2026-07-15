--
-- Database: `treehouse_sample`
--
CREATE DATABASE IF NOT EXISTS `treehouse_sample` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `treehouse_sample`;

-- --------------------------------------------------------

--
-- Table structure for table `associations`
--

DROP TABLE IF EXISTS `associations`;
CREATE TABLE IF NOT EXISTS `associations` (
    `id` mediumint(8) NOT NULL auto_increment,
    `name` varchar(255) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB;

--
-- Dumping data for table `associations`
--

INSERT INTO `associations` (`name`) VALUES
('Basement Systems, Inc.'),
('CleanSpace'),
('Dr. Energy Saver, LLC'),
('Foundation Supportworks, Inc.'),
('Total Basement Finishing, Inc.');

-- --------------------------------------------------------

--
-- Table structure for table `companies`
--

DROP TABLE IF EXISTS `companies`;
CREATE TABLE IF NOT EXISTS `companies` (
    `id` mediumint(8) NOT NULL auto_increment,
    `name` varchar(255) NOT NULL,
    `is_on_hold` tinyint(1) NOT NULL,
    `is_deleted` tinyint(1) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB;

--
-- Dumping data for table `companies`
--

INSERT INTO `companies` (`name`, `is_on_hold`, `is_deleted`) VALUES
('Lacus Incorporated', 1, 0),
('Odio Phasellus Ltd', 0, 0),
('Ac Company', 0, 1),
('Vel Company', 0, 0),
('Pellentesque Habitant PC', 0, 1),
('Quisque Tincidunt Pede Incorporated', 0, 1),
('Semper Nam Ltd', 0, 0),
('Purus Nullam Scelerisque Incorporated', 0, 0),
('Egestas Aliquam Fringilla Institute', 0, 1),
('Phasellus Ornare Fusce Consulting', 0, 0),
('Enim Mi Limited', 0, 0),
('Porttitor Eros PC', 0, 1),
('Arcu Ltd', 0, 0),
('Nulla Corporation', 1, 0),
('Eu Placerat Eget Industries', 1, 1),
('Aliquam Adipiscing Lobortis Company', 1, 0),
('Eu Ltd', 1, 0),
('Lacinia Sed Consulting', 1, 1),
('Orci Lacus Limited', 1, 1),
('Nascetur Ridiculus Associates', 1, 0),
('Nam Institute', 0, 1),
('Cras Interdum Inc.', 0, 0),
('Blandit At Nisi Industries', 0, 0),
('Vitae Sodales At Industries', 0, 0),
('Accumsan Ltd', 0, 0),
('Lorem Incorporated', 0, 0),
('Nibh Enim Gravida Limited', 1, 1),
('Sed Consulting', 1, 0),
('Pede Nec Ante Company', 1, 1),
('Vulputate Industries', 0, 1),
('Sem Molestie Sodales Company', 0, 1),
('Blandit Nam Inc.', 1, 1),
('Pede Nonummy Associates', 0, 0),
('Natoque Penatibus Consulting', 1, 1),
('In Associates', 1, 1),
('Congue A Aliquet Inc.', 1, 0),
('Adipiscing Ltd', 1, 1),
('Lacinia Institute', 0, 1),
('Lacus Varius Associates', 1, 0),
('Lacinia At Iaculis Associates', 1, 0),
('Enim Suspendisse Aliquet Foundation', 1, 1),
('Nascetur Ridiculus Incorporated', 1, 1),
('Luctus Associates', 0, 1),
('Nibh Enim PC', 1, 0),
('Nisl Nulla Institute', 0, 1),
('Amet LLP', 1, 0),
('Vulputate Ullamcorper Company', 0, 1),
('Lorem Ipsum Company', 0, 0),
('Urna Et LLC', 0, 1),
('Sem Magna Nec Company', 0, 1),
('A Malesuada Id Company', 0, 0),
('Odio LLC', 0, 0),
('Natoque Penatibus Et Incorporated', 0, 1),
('Dolor Sit Foundation', 0, 0),
('In LLP', 1, 1),
('Magna Nec Institute', 1, 0),
('Etiam Laoreet Libero Foundation', 0, 1),
('Interdum Libero LLP', 1, 0),
('Eget Incorporated', 1, 0),
('Massa Lobortis Ultrices LLC', 1, 1),
('Et Netus Et Institute', 1, 1),
('Sem Magna Nec Industries', 0, 1),
('In PC', 1, 1),
('Sem Egestas Foundation', 0, 1),
('Nulla Eu Institute', 1, 1),
('Scelerisque Lorem Ipsum Incorporated', 0, 0),
('Mi Lacinia Mattis Company', 0, 1),
('Molestie Inc.', 0, 1),
('Diam Corporation', 1, 0),
('Dolor Elit Pellentesque Inc.', 0, 0),
('Vitae Risus PC', 0, 0),
('Donec Sollicitudin Adipiscing LLC', 1, 1),
('Vehicula Pellentesque Industries', 0, 0),
('Habitant Morbi Inc.', 0, 1),
('Et Nunc Quisque Consulting', 1, 1),
('Magna PC', 1, 1),
('Fusce Aliquet Magna Incorporated', 0, 0),
('Eleifend Associates', 0, 1),
('Amet Consectetuer Associates', 0, 1),
('Vulputate Lacus Industries', 0, 0),
('Lorem Company', 1, 0),
('Diam Inc.', 0, 0),
('Et Ultrices Industries', 1, 0),
('Ornare PC', 1, 0),
('Est Corporation', 1, 1),
('Egestas Associates', 0, 1),
('Nunc PC', 0, 1),
('Dui Cum LLC', 1, 1),
('Tristique Industries', 0, 1),
('Ultrices Iaculis Ltd', 1, 0),
('Ipsum Dolor Incorporated', 1, 1),
('Felis Incorporated', 1, 0),
('Accumsan Neque PC', 1, 0),
('Donec Nibh Quisque Limited', 1, 1),
('Luctus Aliquet Corp.', 1, 1),
('Eu Neque Pellentesque PC', 1, 0),
('Nam Nulla Magna Company', 1, 0),
('Pede Sagittis Augue Institute', 0, 0),
('Feugiat Non Lobortis Associates', 1, 0),
('Velit Sed Malesuada Institute', 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `domains`
--

DROP TABLE IF EXISTS `domains`;
CREATE TABLE IF NOT EXISTS `domains` (
    `id` mediumint(8) NOT NULL auto_increment,
    `domain` varchar(255) NOT NULL,
    `site` mediumint(8) NOT NULL,
    `is_primary` tinyint(1) NOT NULL,
    `is_deleted` tinyint(1) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB;

--
-- Dumping data for table `domains`
--

INSERT INTO `domains` (`domain`, `site`, `is_primary`, `is_deleted`) VALUES
('tortor.net', 7, 1, 1),
('egestasnunc.com', 19, 1, 1),
('tellusaeneanegestas.com', 53, 1, 1),
('ut.edu', 34, 1, 1),
('fringillaeuismod.com', 77, 1, 0),
('aliquet.com', 75, 1, 0),
('in.org', 55, 1, 0),
('amet.edu', 18, 1, 0),
('mattissemper.net', 19, 0, 1),
('augue.com', 68, 1, 1),
('mauris.org', 29, 1, 1),
('molestie.edu', 7, 0, 0),
('mollisphasellus.ca', 54, 1, 0),
('donecnonjusto.edu', 41, 1, 1),
('ligulaconsectetuerrhoncus.org', 33, 1, 1),
('maurisnondui.com', 14, 1, 0),
('integervitaenibh.org', 21, 1, 1),
('nuncut.ca', 45, 1, 0),
('nonsollicitudina.com', 25, 1, 1),
('quisqueporttitoreros.org', 10, 1, 0),
('utpellentesqueeget.ca', 52, 1, 1),
('euismodacfermentum.co.uk', 93, 1, 0),
('nulladonec.net', 16, 1, 1),
('quisque.co.uk', 4, 1, 0),
('namligulaelit.ca', 91, 1, 0),
('ligulaaenean.edu', 3, 1, 1),
('liberodui.ca', 83, 1, 1),
('risusdonec.com', 21, 0, 1),
('sitametluctus.com', 44, 1, 1),
('aliquam.ca', 30, 1, 0),
('risusquisque.com', 11, 1, 1),
('nuncmauris.edu', 66, 1, 1),
('curabiturmassa.ca', 73, 1, 1),
('et.co.uk', 31, 1, 1),
('nunc.edu', 54, 0, 1),
('felisnullatempor.ca', 38, 1, 1),
('inceptoshymenaeosmauris.edu', 12, 1, 0),
('tristiquepharetra.net', 23, 1, 0),
('vestibulumaccumsanneque.ca', 32, 1, 1),
('odio.net', 16, 0, 0),
('sagittis.org', 63, 1, 1),
('sapienaenean.edu', 60, 1, 0),
('volutpatnulladignissim.org', 23, 0, 0),
('nonenim.ca', 74, 1, 0),
('gravidasit.ca', 95, 1, 1),
('sitamet.ca', 51, 1, 0),
('magnaseddui.ca', 59, 1, 1),
('a.ca', 59, 0, 1),
('aeneangravida.edu', 77, 0, 0),
('porttitoreros.net', 80, 1, 1),
('integervitaenibh.co.uk', 48, 1, 1),
('nulla.edu', 22, 1, 0),
('elitetiamlaoreet.ca', 52, 0, 0),
('noncursusnon.com', 49, 1, 1),
('utdolor.ca', 72, 1, 0),
('blandit.ca', 7, 0, 1),
('inlorem.co.uk', 31, 0, 1),
('cras.org', 41, 0, 0),
('felisorciadipiscing.co.uk', 62, 1, 1),
('id.org', 34, 0, 1),
('etnunc.net', 7, 0, 0),
('loremvehiculaet.co.uk', 96, 1, 1),
('egestasblanditnam.org', 69, 1, 0),
('ipsum.edu', 97, 1, 0),
('sapienimperdiet.com', 99, 1, 1),
('vitaeodiosagittis.co.uk', 30, 0, 0),
('orci.com', 14, 0, 1),
('auctor.com', 91, 0, 1),
('dignissimmagnaa.com', 35, 1, 1),
('diamsed.org', 68, 0, 0),
('innec.co.uk', 100, 1, 1),
('sempertellus.co.uk', 52, 0, 1),
('vulputatelacuscras.net', 2, 1, 0),
('ligulanullamfeugiat.ca', 47, 1, 1),
('pedesuspendissedui.org', 60, 0, 0),
('nec.edu', 36, 1, 1),
('velit.co.uk', 85, 1, 1),
('phasellusat.net', 57, 1, 0),
('duiselementumdui.ca', 10, 0, 0),
('magna.com', 37, 1, 0),
('nisl.ca', 80, 0, 1),
('erat.ca', 54, 0, 1),
('loremsemper.net', 62, 0, 1),
('euturpis.edu', 54, 0, 1),
('pharetraquisque.org', 94, 1, 1),
('vulputatelacus.net', 48, 0, 0),
('magnamalesuadavel.org', 64, 1, 0),
('aodiosemper.edu', 69, 0, 0),
('vitae.edu', 72, 0, 1),
('egestasa.org', 4, 0, 1),
('aliquam.co.uk', 13, 1, 1),
('laoreetlibero.com', 48, 0, 0),
('nunc.org', 87, 1, 1),
('vulputatedui.org', 16, 0, 0),
('porttitoreros.co.uk', 99, 0, 1),
('etiam.co.uk', 75, 0, 1),
('nullafacilisised.net', 74, 0, 1),
('ullamcorper.com', 58, 1, 0),
('morbi.org', 21, 0, 1),
('maurismolestiepharetra.org', 35, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `sites`
--

DROP TABLE IF EXISTS `sites`;
CREATE TABLE IF NOT EXISTS `sites` (
    `id` mediumint(8) NOT NULL auto_increment,
    `name` varchar(50) NOT NULL,
    `company` mediumint(9) NOT NULL,
    `association` mediumint(9) NOT NULL,
    `is_supercharged` tinyint(1) NOT NULL,
    `is_deleted` tinyint(1) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB;

--
-- Dumping data for table `sites`
--

INSERT INTO `sites` (`name`, `company`, `association`, `is_supercharged`, `is_deleted`) VALUES
('Nebraska', 82, 1, 1, 0),
('Pennsylvania', 38, 1, 1, 0),
('Kentucky', 64, 1, 1, 0),
('Ohio', 38, 2, 1, 1),
('Florida', 86, 3, 0, 0),
('Alabama', 8, 2, 0, 0),
('Louisiana', 81, 2, 1, 0),
('Ohio', 27, 2, 1, 1),
('Vermont', 27, 2, 1, 0),
('Illinois', 37, 1, 0, 0),
('California', 99, 1, 1, 1),
('Arkansas', 29, 2, 0, 0),
('Oklahoma', 58, 2, 0, 1),
('Pennsylvania', 52, 1, 1, 1),
('Nebraska', 46, 5, 1, 0),
('Vermont', 97, 2, 1, 1),
('Vermont', 54, 4, 0, 0),
('Idaho', 20, 3, 0, 0),
('Iowa', 90, 1, 0, 0),
('Montana', 14, 4, 1, 1),
('Iowa', 80, 4, 1, 1),
('Kentucky', 29, 1, 1, 1),
('California', 59, 5, 1, 1),
('Pennsylvania', 81, 1, 1, 1),
('Georgia', 74, 5, 1, 0),
('Wisconsin', 18, 5, 1, 1),
('Pennsylvania', 38, 5, 1, 1),
('Wisconsin', 21, 4, 1, 1),
('Tennessee', 81, 5, 0, 1),
('Georgia', 66, 1, 1, 0),
('Wisconsin', 23, 5, 0, 0),
('Arkansas', 91, 3, 0, 1),
('Connecticut', 99, 4, 0, 0),
('Wyoming', 22, 2, 0, 1),
('Oklahoma', 47, 5, 0, 1),
('Arkansas', 10, 1, 0, 1),
('Louisiana', 66, 5, 0, 1),
('Vermont', 92, 4, 0, 0),
('Vermont', 81, 3, 0, 1),
('Massachusetts', 22, 4, 0, 1),
('Arkansas', 73, 2, 1, 0),
('Tennessee', 52, 4, 0, 0),
('Maine', 27, 5, 1, 0),
('California', 20, 5, 0, 0),
('Arizona', 91, 1, 1, 0),
('Indiana', 34, 2, 1, 0),
('Montana', 94, 5, 0, 0),
('Oklahoma', 81, 4, 1, 1),
('Oregon', 48, 1, 1, 1),
('Utah', 11, 1, 0, 1),
('Tennessee', 12, 3, 1, 1),
('Kentucky', 22, 5, 1, 0),
('Washington', 22, 3, 1, 0),
('Tennessee', 67, 4, 0, 0),
('Utah', 86, 3, 1, 0),
('Maryland', 24, 3, 0, 1),
('Florida', 74, 1, 1, 0),
('Arkansas', 78, 1, 1, 1),
('Georgia', 45, 2, 1, 0),
('Colorado', 97, 2, 0, 1),
('Wisconsin', 25, 5, 1, 0),
('Wyoming', 2, 3, 1, 0),
('Oregon', 40, 1, 0, 0),
('Maryland', 24, 5, 0, 1),
('Kentucky', 52, 2, 1, 0),
('Kentucky', 95, 4, 0, 0),
('Alaska', 30, 3, 1, 1),
('Oregon', 18, 3, 0, 0),
('Utah', 59, 4, 0, 0),
('Massachusetts', 56, 2, 1, 1),
('Missouri', 22, 5, 1, 0),
('Virginia', 71, 5, 0, 0),
('Vermont', 75, 4, 0, 1),
('Pennsylvania', 63, 2, 1, 0),
('Montana', 75, 4, 0, 0),
('Oregon', 2, 5, 0, 0),
('Indiana', 73, 2, 0, 1),
('Washington', 7, 3, 1, 0),
('Montana', 33, 1, 0, 0),
('Nevada', 17, 2, 1, 0),
('Texas', 90, 5, 0, 1),
('Washington', 4, 1, 1, 0),
('Nevada', 10, 3, 0, 0),
('Alaska', 47, 3, 0, 1),
('Arkansas', 46, 4, 0, 1),
('Oregon', 72, 4, 1, 1),
('Florida', 51, 3, 1, 0),
('Nebraska', 86, 4, 0, 1),
('Minnesota', 25, 4, 0, 0),
('Tennessee', 19, 3, 1, 1),
('Arizona', 25, 2, 1, 1),
('Wyoming', 17, 3, 1, 1),
('Missouri', 92, 2, 0, 1),
('Wyoming', 9, 4, 0, 0),
('Wyoming', 93, 1, 1, 1),
('Indiana', 71, 3, 1, 0),
('Arkansas', 24, 3, 0, 1),
('Texas', 51, 2, 0, 1),
('Missouri', 66, 3, 1, 1),
('Virginia', 100, 5, 0, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `associations`
--
ALTER TABLE `associations`
    ADD KEY `name` (`name`);

--
-- Indexes for table `companies`
--
ALTER TABLE `companies`
    ADD KEY `name` (`name`),
    ADD KEY `is_on_hold` (`is_on_hold`),
    ADD KEY `is_deleted` (`is_deleted`);

--
-- Indexes for table `domains`
--
ALTER TABLE `domains`
    ADD KEY `domain` (`domain`),
    ADD KEY `site` (`site`),
    ADD KEY `is_primary` (`is_primary`),
    ADD KEY `is_deleted` (`is_deleted`);

--
-- Indexes for table `sites`
--
ALTER TABLE `sites`
    ADD KEY `name` (`name`),
    ADD KEY `company` (`company`),
    ADD KEY `association` (`association`),
    ADD KEY `is_supercharged` (`is_supercharged`),
    ADD KEY `is_deleted` (`is_deleted`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `domains`
--
ALTER TABLE `domains`
    ADD CONSTRAINT `domains_ibfk_1` FOREIGN KEY (`site`) REFERENCES `sites` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `sites`
--
ALTER TABLE `sites`
    ADD CONSTRAINT `sites_ibfk_1` FOREIGN KEY (`association`) REFERENCES `associations` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
    ADD CONSTRAINT `sites_ibfk_2` FOREIGN KEY (`company`) REFERENCES `companies` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;