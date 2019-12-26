-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 20-Dez-2019 às 17:58
-- Versão do servidor: 10.1.37-MariaDB
-- versão do PHP: 5.6.40

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mercado`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `fabricante`
--

CREATE TABLE `fabricante` (
  `ID_FABRICANTE` int(11) NOT NULL,
  `NOME` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=ascii;

--
-- Extraindo dados da tabela `fabricante`
--

INSERT INTO `fabricante` (`ID_FABRICANTE`, `NOME`) VALUES
(1, 'Mabel');

-- --------------------------------------------------------

--
-- Estrutura da tabela `produto`
--

CREATE TABLE `produto` (
  `ID_PRODUTO` int(11) NOT NULL,
  `NOME` varchar(40) NOT NULL,
  `ID_FABRICANTE` int(11) NOT NULL,
  `VOLUME` int(11) NOT NULL,
  `UNIDADE` varchar(40) NOT NULL,
  `ESTOQUE` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=ascii;

--
-- Extraindo dados da tabela `produto`
--

INSERT INTO `produto` (`ID_PRODUTO`, `NOME`, `ID_FABRICANTE`, `VOLUME`, `UNIDADE`, `ESTOQUE`) VALUES
(1, 'Biscoito', 1, 10, '10', 20);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `fabricante`
--
ALTER TABLE `fabricante`
  ADD PRIMARY KEY (`ID_FABRICANTE`);

--
-- Indexes for table `produto`
--
ALTER TABLE `produto`
  ADD PRIMARY KEY (`ID_PRODUTO`),
  ADD KEY `FK7koft9cg8g9hp9qm88xis1ewq` (`ID_FABRICANTE`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `fabricante`
--
ALTER TABLE `fabricante`
  MODIFY `ID_FABRICANTE` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `produto`
--
ALTER TABLE `produto`
  MODIFY `ID_PRODUTO` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Limitadores para a tabela `produto`
--
ALTER TABLE `produto`
  ADD CONSTRAINT `FK7koft9cg8g9hp9qm88xis1ewq` FOREIGN KEY (`ID_FABRICANTE`) REFERENCES `fabricante` (`ID_FABRICANTE`),
  ADD CONSTRAINT `fk_fabricante` FOREIGN KEY (`ID_FABRICANTE`) REFERENCES `fabricante` (`ID_FABRICANTE`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
