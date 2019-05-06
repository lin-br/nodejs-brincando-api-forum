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
    id_tipo             INT          NOT NULL,
    data_hora_criacao   TIMESTAMP    NOT NULL DEFAULT current_timestamp(),
    data_hora_alteracao TIMESTAMP    NULL     DEFAULT NULL,
    data_hora_exclusao  TIMESTAMP    NULL     DEFAULT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_usuarios_perfil
        FOREIGN KEY (id_tipo)
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
    url VARCHAR(100) NOT NULL,
    method ENUM('GET','POST','PUT','DELETE','PATCH') NOT NULL,
    descricao           VARCHAR(140) NOT NULL,
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
    id_regra            INT        NOT NULL,
    id_tipo             INT        NOT NULL,
    id_usuario_cadastro INT        NOT NULL COMMENT 'Pessoa que vinculou/cadastrou a regra ao tipo de pessoa',
    situacao_vinculo    TINYINT(1) NOT NULL DEFAULT 1 COMMENT '1 - ATIVADO / 0 - DESATIVADO',
    data_vinculo        TIMESTAMP  NOT NULL DEFAULT CURRENT_TIMESTAMP() COMMENT 'Data em que o vínculo entre regra e o tipo foi cadastrado',
    PRIMARY KEY (id_regra,id_tipo,id_usuario_cadastro),
    CONSTRAINT fk_id_regras_tipos
        FOREIGN KEY (id_regra)
            REFERENCES tilmais.regras(id) ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT fk_id_tipos_regras
        FOREIGN KEY (id_tipo)
            REFERENCES tilmais.tipos(id) ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT fk_id_usuario_cadastro_regras_tipos
        FOREIGN KEY (id_usuario_cadastro)
            REFERENCES tilmais.usuarios(id) ON DELETE NO ACTION ON UPDATE NO ACTION
)
    ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `tilmais`.`regras_usuarios`
-- -----------------------------------------------------
DROP TABLE IF EXISTS tilmais.regras_usuarios;

CREATE TABLE IF NOT EXISTS tilmais.regras_usuarios (
    id_regra            INT        NOT NULL,
    id_usuario          INT        NOT NULL,
    id_usuario_cadastro INT        NOT NULL COMMENT 'Pessoa que vinculou/cadastrou a regra ao tipo de pessoa',
    situacao_vinculo    TINYINT(1) NOT NULL DEFAULT 1 COMMENT '1 - ATIVADO / 0 - DESATIVADO',
    data_vinculo        TIMESTAMP  NOT NULL DEFAULT CURRENT_TIMESTAMP() COMMENT 'Data em que o vínculo entre regra e o tipo foi cadastrado',
    PRIMARY KEY (id_regra,id_usuario,id_usuario_cadastro),
    CONSTRAINT fk_id_regras_usuarios
        FOREIGN KEY (id_regra)
            REFERENCES tilmais.regras(id) ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT fk_id_usuarios_regras
        FOREIGN KEY (id_usuario)
            REFERENCES tilmais.usuarios(id) ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT fk_id_usuario_cadastro_regras_usuarios
        FOREIGN KEY (id_usuario_cadastro)
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
    id_categoria_pai    INT          NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_id_categoria_categoria_pai
        FOREIGN KEY (id_categoria_pai)
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
    id_categoria        INT        NOT NULL,
    id_usuario          INT        NOT NULL,
    proximo_artigo      INT        NULL COMMENT 'Atributo utilizado para \'lincar\' um artigo com outro artigo. Isso significa que um artigo é continuidade do outro.',
    PRIMARY KEY (id),
    CONSTRAINT fk_artigo_categoria
        FOREIGN KEY (id_categoria)
            REFERENCES tilmais.categorias(id)
            ON DELETE NO ACTION
            ON UPDATE NO ACTION,
    CONSTRAINT fk_artigo_usuario1
        FOREIGN KEY (id_usuario)
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
    id_usuario          INT        NOT NULL,
    id_artigo           INT        NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_comentario_usuario1
        FOREIGN KEY (id_usuario)
            REFERENCES tilmais.usuarios(id)
            ON DELETE NO ACTION
            ON UPDATE NO ACTION,
    CONSTRAINT fk_comentario_artigo1
        FOREIGN KEY (id_artigo)
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
    id_usuario          INT          NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_anexo_usuario1
        FOREIGN KEY (id_usuario)
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
    id_anexo  INT          NOT NULL,
    id_artigo INT          NOT NULL,
    hash      VARCHAR(100) NOT NULL,
    PRIMARY KEY (id_anexo,id_artigo),
    UNIQUE INDEX hash_UNIQUE(hash ASC),
    CONSTRAINT fk_anexo_has_artigo_anexo1
        FOREIGN KEY (id_anexo)
            REFERENCES tilmais.anexos(id)
            ON DELETE NO ACTION
            ON UPDATE NO ACTION,
    CONSTRAINT fk_anexo_has_artigo_artigo1
        FOREIGN KEY (id_artigo)
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
    id_artigo INT NOT NULL,
    id_tag    INT NOT NULL,
    PRIMARY KEY (id_artigo,id_tag),
    CONSTRAINT fk_artigo_has_tag_artigo1
        FOREIGN KEY (id_artigo)
            REFERENCES tilmais.artigos(id)
            ON DELETE NO ACTION
            ON UPDATE NO ACTION,
    CONSTRAINT fk_artigo_has_tag_tag1
        FOREIGN KEY (id_tag)
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
    id_usuario          INT          NOT NULL,
    id_artigo           INT          NOT NULL,
    PRIMARY KEY (id),
    UNIQUE INDEX hash_UNIQUE(hash ASC),
    CONSTRAINT fk_imagem_usuario1
        FOREIGN KEY (id_usuario)
            REFERENCES tilmais.usuarios(id)
            ON DELETE NO ACTION
            ON UPDATE NO ACTION,
    CONSTRAINT fk_imagem_artigo1
        FOREIGN KEY (id_artigo)
            REFERENCES tilmais.artigos(id)
            ON DELETE NO ACTION
            ON UPDATE NO ACTION
)
    ENGINE = InnoDB;


SET SQL_MODE = @OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS = @OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS = @OLD_UNIQUE_CHECKS;
