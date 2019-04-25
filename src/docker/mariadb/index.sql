SET @OLD_UNIQUE_CHECKS = @@UNIQUE_CHECKS, UNIQUE_CHECKS = 0;
SET @OLD_FOREIGN_KEY_CHECKS = @@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS = 0;
SET @OLD_SQL_MODE = @@SQL_MODE, SQL_MODE = 'TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema tilmais
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS tilmais;

-- -----------------------------------------------------
-- Schema tilmais
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS tilmais DEFAULT CHARACTER SET utf8mb4;
USE tilmais;

-- -----------------------------------------------------
-- Table `tilmais`.`tipos`
-- -----------------------------------------------------
DROP TABLE IF EXISTS tilmais.tipos;

CREATE TABLE IF NOT EXISTS tilmais.tipos (
    id                  INT         NOT NULL AUTO_INCREMENT,
    nome                VARCHAR(60) NOT NULL,
    data_hora_criacao   TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    data_hora_alteracao TIMESTAMP   NULL     DEFAULT NULL,
    data_hora_exclusao  TIMESTAMP   NULL     DEFAULT NULL,
    PRIMARY KEY (id)
)
    ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `tilmais`.`usuarios`
-- -----------------------------------------------------
DROP TABLE IF EXISTS tilmais.usuarios;

CREATE TABLE IF NOT EXISTS tilmais.usuarios (
    id                  INT          NOT NULL AUTO_INCREMENT COMMENT 'Tabela de usuários',
    situacao            TINYINT(1)   NOT NULL,
    nome                VARCHAR(45)  NOT NULL,
    email               VARCHAR(60)  NOT NULL,
    senha               VARCHAR(100) NULL,
    tipo                INT          NOT NULL,
    data_hora_criacao   TIMESTAMP    NOT NULL DEFAULT current_timestamp(),
    data_hora_alteracao TIMESTAMP    NULL     DEFAULT NULL,
    data_hora_exclusao  TIMESTAMP    NULL     DEFAULT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_usuarios_perfil
        FOREIGN KEY (tipo)
            REFERENCES tilmais.tipos(id)
            ON DELETE NO ACTION
            ON UPDATE NO ACTION
)
    ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `tilmais`.`regras`
-- -----------------------------------------------------
DROP TABLE IF EXISTS tilmais.regras;

CREATE TABLE IF NOT EXISTS tilmais.regras (
    id                  INT          NOT NULL AUTO_INCREMENT,
    nome                VARCHAR(100) NOT NULL,
    descricao           VARCHAR(280) NOT NULL,
    data_hora_criacao   TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    data_hora_alteracao TIMESTAMP    NULL     DEFAULT NULL,
    data_hora_exclusao  TIMESTAMP    NULL     DEFAULT NULL,
    PRIMARY KEY (id)
)
    ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `tilmais`.`regras_tipos`
-- -----------------------------------------------------
DROP TABLE IF EXISTS tilmais.regras_tipos;

CREATE TABLE IF NOT EXISTS tilmais.regras_tipos (
    regra            INT       NOT NULL,
    tipo             INT       NOT NULL,
    usuario_cadastro INT       NOT NULL COMMENT 'Pessoa que vinculou/cadastrou a regra ao tipo de pessoa',
    data_vinculo     TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP() COMMENT 'Data em que o vínculo entre regra e o tipo foi cadastrado',
    PRIMARY KEY (regra,tipo,usuario_cadastro),
    CONSTRAINT fk_id_regras_tipos
        FOREIGN KEY (regra)
            REFERENCES tilmais.regras(id) ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT fk_id_tipos_regras
        FOREIGN KEY (tipo)
            REFERENCES tilmais.tipos(id) ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT fk_id_usuario_cadastro_regras_tipos
        FOREIGN KEY (usuario_cadastro)
            REFERENCES tilmais.usuarios(id) ON DELETE NO ACTION ON UPDATE NO ACTION
)
    ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `tilmais`.`regras_usuarios`
-- -----------------------------------------------------
DROP TABLE IF EXISTS tilmais.regras_usuarios;

CREATE TABLE IF NOT EXISTS tilmais.regras_usuarios (
    regra            INT       NOT NULL,
    usuario          INT       NOT NULL,
    usuario_cadastro INT       NOT NULL COMMENT 'Pessoa que vinculou/cadastrou a regra ao tipo de pessoa',
    data_vinculo     TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP() COMMENT 'Data em que o vínculo entre regra e o tipo foi cadastrado',
    PRIMARY KEY (regra,usuario,usuario_cadastro),
    CONSTRAINT fk_id_regras_usuarios
        FOREIGN KEY (regra)
            REFERENCES tilmais.regras(id) ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT fk_id_usuarios_regras
        FOREIGN KEY (usuario)
            REFERENCES tilmais.usuarios(id) ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT fk_id_usuario_cadastro_regras_usuarios
        FOREIGN KEY (usuario_cadastro)
            REFERENCES tilmais.usuarios(id) ON DELETE NO ACTION ON UPDATE NO ACTION
)
    ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `tilmais`.`categorias`
-- -----------------------------------------------------
DROP TABLE IF EXISTS tilmais.categorias;

CREATE TABLE IF NOT EXISTS tilmais.categorias (
    id                  INT          NOT NULL AUTO_INCREMENT,
    situacao            TINYINT(1)   NOT NULL,
    data_hora_criacao   TIMESTAMP    NOT NULL DEFAULT current_timestamp(),
    data_hora_alteracao TIMESTAMP    NULL     DEFAULT NULL,
    data_hora_exclusao  TIMESTAMP    NULL     DEFAULT NULL,
    nome                VARCHAR(200) NOT NULL,
    slug                VARCHAR(200) NOT NULL,
    categoria_pai       INT          NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_categoria_categoria1
        FOREIGN KEY (categoria_pai)
            REFERENCES tilmais.categorias(id)
            ON DELETE NO ACTION
            ON UPDATE NO ACTION
)
    ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tilmais`.`artigos`
-- -----------------------------------------------------
DROP TABLE IF EXISTS tilmais.artigos;

CREATE TABLE IF NOT EXISTS tilmais.artigos (
    id                  INT        NOT NULL AUTO_INCREMENT,
    situacao            TINYINT(1) NOT NULL,
    data_hora_criacao   TIMESTAMP  NOT NULL DEFAULT current_timestamp(),
    data_hora_alteracao TIMESTAMP  NULL     DEFAULT NULL,
    data_hora_exclusao  TIMESTAMP  NULL     DEFAULT NULL,
    titulo              TEXT       NOT NULL,
    descricao           TEXT       NOT NULL,
    conteudo            LONGTEXT   NOT NULL,
    categoria_id        INT        NOT NULL,
    usuario_id          INT        NOT NULL,
    proximo_artigo      INT        NULL COMMENT 'Atributo utilizado para \'lincar\' um artigo com outro artigo. Isso significa que um artigo é continuidade do outro.',
    PRIMARY KEY (id),
    CONSTRAINT fk_artigo_categoria
        FOREIGN KEY (categoria_id)
            REFERENCES tilmais.categorias(id)
            ON DELETE NO ACTION
            ON UPDATE NO ACTION,
    CONSTRAINT fk_artigo_usuario1
        FOREIGN KEY (usuario_id)
            REFERENCES tilmais.usuarios(id)
            ON DELETE NO ACTION
            ON UPDATE NO ACTION,
    CONSTRAINT fk_artigo_artigo1
        FOREIGN KEY (proximo_artigo)
            REFERENCES tilmais.artigos(id)
            ON DELETE NO ACTION
            ON UPDATE NO ACTION
)
    ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `tilmais`.`comentarios`
-- -----------------------------------------------------
DROP TABLE IF EXISTS tilmais.comentarios;

CREATE TABLE IF NOT EXISTS tilmais.comentarios (
    id                  INT        NOT NULL AUTO_INCREMENT,
    situacao            TINYINT(1) NOT NULL,
    data_hora_criacao   TIMESTAMP  NOT NULL DEFAULT current_timestamp(),
    data_hora_alteracao TIMESTAMP  NULL     DEFAULT NULL,
    data_hora_exclusao  TIMESTAMP  NULL     DEFAULT NULL,
    usuario_id          INT        NOT NULL,
    artigo_id           INT        NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_comentario_usuario1
        FOREIGN KEY (usuario_id)
            REFERENCES tilmais.usuarios(id)
            ON DELETE NO ACTION
            ON UPDATE NO ACTION,
    CONSTRAINT fk_comentario_artigo1
        FOREIGN KEY (artigo_id)
            REFERENCES tilmais.artigos(id)
            ON DELETE NO ACTION
            ON UPDATE NO ACTION
)
    ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tilmais`.`anexos`
-- -----------------------------------------------------
DROP TABLE IF EXISTS tilmais.anexos;

CREATE TABLE IF NOT EXISTS tilmais.anexos (
    id                  INT          NOT NULL AUTO_INCREMENT,
    situacao            TINYINT(1)   NOT NULL,
    data_hora_criacao   TIMESTAMP    NOT NULL DEFAULT current_timestamp(),
    data_hora_alteracao TIMESTAMP    NULL     DEFAULT NULL,
    data_hora_exclusao  TIMESTAMP    NULL     DEFAULT NULL,
    nome                VARCHAR(60)  NOT NULL,
    diretorio           VARCHAR(250) NOT NULL,
    usuario_id          INT          NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_anexo_usuario1
        FOREIGN KEY (usuario_id)
            REFERENCES tilmais.usuarios(id)
            ON DELETE NO ACTION
            ON UPDATE NO ACTION
)
    ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tilmais`.`anexos_artigos`
-- -----------------------------------------------------
DROP TABLE IF EXISTS tilmais.anexos_artigos;

CREATE TABLE IF NOT EXISTS tilmais.anexos_artigos (
    anexo_id  INT          NOT NULL,
    artigo_id INT          NOT NULL,
    hash      VARCHAR(100) NOT NULL,
    PRIMARY KEY (anexo_id,artigo_id),
    UNIQUE INDEX hash_UNIQUE(hash ASC),
    CONSTRAINT fk_anexo_has_artigo_anexo1
        FOREIGN KEY (anexo_id)
            REFERENCES tilmais.anexos(id)
            ON DELETE NO ACTION
            ON UPDATE NO ACTION,
    CONSTRAINT fk_anexo_has_artigo_artigo1
        FOREIGN KEY (artigo_id)
            REFERENCES tilmais.artigos(id)
            ON DELETE NO ACTION
            ON UPDATE NO ACTION
)
    ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tilmais`.`tags`
-- -----------------------------------------------------
DROP TABLE IF EXISTS tilmais.tags;

CREATE TABLE IF NOT EXISTS tilmais.tags (
    id                  INT          NOT NULL AUTO_INCREMENT,
    situacao            TINYINT(1)   NOT NULL,
    data_hora_criacao   TIMESTAMP    NOT NULL DEFAULT current_timestamp(),
    data_hora_alteracao TIMESTAMP    NULL     DEFAULT NULL,
    data_hora_exclusao  TIMESTAMP    NULL     DEFAULT NULL,
    nome                VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
)
    ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tilmais`.`tags_artigos`
-- -----------------------------------------------------
DROP TABLE IF EXISTS tilmais.tags_artigos;

CREATE TABLE IF NOT EXISTS tilmais.tags_artigos (
    artigo_id INT NOT NULL,
    tag_id    INT NOT NULL,
    PRIMARY KEY (artigo_id,tag_id),
    CONSTRAINT fk_artigo_has_tag_artigo1
        FOREIGN KEY (artigo_id)
            REFERENCES tilmais.artigos(id)
            ON DELETE NO ACTION
            ON UPDATE NO ACTION,
    CONSTRAINT fk_artigo_has_tag_tag1
        FOREIGN KEY (tag_id)
            REFERENCES tilmais.tags(id)
            ON DELETE NO ACTION
            ON UPDATE NO ACTION
)
    ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tilmais`.`imagens`
-- -----------------------------------------------------
DROP TABLE IF EXISTS tilmais.imagens;

CREATE TABLE IF NOT EXISTS tilmais.imagens (
    id                  INT          NOT NULL AUTO_INCREMENT,
    situacao            TINYINT(1)   NOT NULL,
    data_hora_criacao   TIMESTAMP    NOT NULL DEFAULT current_timestamp(),
    data_hora_alteracao TIMESTAMP    NULL,
    data_hora_exclusao  TIMESTAMP    NULL,
    nome                VARCHAR(100) NOT NULL COMMENT 'nome do arquivo que fica vísivel para usuários e para a página',
    hash                VARCHAR(100) NOT NULL COMMENT 'arquivo criptografado em SHA1, essa hash irá contextualizar o nome do arquivo físicamente: <hash>.png',
    alt                 VARCHAR(100) NOT NULL COMMENT 'texto que será escrito no atributo \'alt\' na tag HTML',
    title               VARCHAR(100) NOT NULL COMMENT 'texto que será escrito no atributo \'title\' da tag HTML',
    altura              INT          NULL,
    largura             INT          NULL,
    usuario_id          INT          NOT NULL,
    artigo_id           INT          NOT NULL,
    PRIMARY KEY (id),
    UNIQUE INDEX hash_UNIQUE(hash ASC),
    CONSTRAINT fk_imagem_usuario1
        FOREIGN KEY (usuario_id)
            REFERENCES tilmais.usuarios(id)
            ON DELETE NO ACTION
            ON UPDATE NO ACTION,
    CONSTRAINT fk_imagem_artigo1
        FOREIGN KEY (artigo_id)
            REFERENCES tilmais.artigos(id)
            ON DELETE NO ACTION
            ON UPDATE NO ACTION
)
    ENGINE = InnoDB;


SET SQL_MODE = @OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS = @OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS = @OLD_UNIQUE_CHECKS;
