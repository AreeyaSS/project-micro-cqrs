"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseModules1629729923740 = void 0;
class databaseModules1629729923740 {
    constructor() {
        this.name = 'databaseModules1629729923740';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "temporary_database_instance" ("id" varchar PRIMARY KEY NOT NULL, "host" varchar NOT NULL, "port" integer NOT NULL, "name" varchar NOT NULL, "username" varchar, "password" varchar, "tls" boolean NOT NULL, "verifyServerCert" boolean NOT NULL, "lastConnection" datetime, "caCertId" varchar, "clientCertId" varchar, "connectionType" varchar NOT NULL DEFAULT ('STANDALONE'), "nodes" varchar, "nameFromProvider" varchar, "sentinelMasterName" varchar, "sentinelMasterUsername" varchar, "sentinelMasterPassword" varchar, "provider" varchar DEFAULT ('UNKNOWN'), "modules" varchar NOT NULL DEFAULT ('[]'), CONSTRAINT "FK_d1bc747b5938e22b4b708d8e9a5" FOREIGN KEY ("caCertId") REFERENCES "ca_certificate" ("id") ON DELETE SET NULL ON UPDATE NO ACTION, CONSTRAINT "FK_3b9b625266c00feb2d66a9f36e4" FOREIGN KEY ("clientCertId") REFERENCES "client_certificate" ("id") ON DELETE SET NULL ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_database_instance"("id", "host", "port", "name", "username", "password", "tls", "verifyServerCert", "lastConnection", "caCertId", "clientCertId", "connectionType", "nodes", "nameFromProvider", "sentinelMasterName", "sentinelMasterUsername", "sentinelMasterPassword", "provider") SELECT "id", "host", "port", "name", "username", "password", "tls", "verifyServerCert", "lastConnection", "caCertId", "clientCertId", "connectionType", "nodes", "nameFromProvider", "sentinelMasterName", "sentinelMasterUsername", "sentinelMasterPassword", "provider" FROM "database_instance"`);
        await queryRunner.query(`DROP TABLE "database_instance"`);
        await queryRunner.query(`ALTER TABLE "temporary_database_instance" RENAME TO "database_instance"`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "database_instance" RENAME TO "temporary_database_instance"`);
        await queryRunner.query(`CREATE TABLE "database_instance" ("id" varchar PRIMARY KEY NOT NULL, "host" varchar NOT NULL, "port" integer NOT NULL, "name" varchar NOT NULL, "username" varchar, "password" varchar, "tls" boolean NOT NULL, "verifyServerCert" boolean NOT NULL, "lastConnection" datetime, "caCertId" varchar, "clientCertId" varchar, "connectionType" varchar NOT NULL DEFAULT ('STANDALONE'), "nodes" varchar, "nameFromProvider" varchar, "sentinelMasterName" varchar, "sentinelMasterUsername" varchar, "sentinelMasterPassword" varchar, "provider" varchar DEFAULT ('UNKNOWN'), CONSTRAINT "FK_d1bc747b5938e22b4b708d8e9a5" FOREIGN KEY ("caCertId") REFERENCES "ca_certificate" ("id") ON DELETE SET NULL ON UPDATE NO ACTION, CONSTRAINT "FK_3b9b625266c00feb2d66a9f36e4" FOREIGN KEY ("clientCertId") REFERENCES "client_certificate" ("id") ON DELETE SET NULL ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "database_instance"("id", "host", "port", "name", "username", "password", "tls", "verifyServerCert", "lastConnection", "caCertId", "clientCertId", "connectionType", "nodes", "nameFromProvider", "sentinelMasterName", "sentinelMasterUsername", "sentinelMasterPassword", "provider") SELECT "id", "host", "port", "name", "username", "password", "tls", "verifyServerCert", "lastConnection", "caCertId", "clientCertId", "connectionType", "nodes", "nameFromProvider", "sentinelMasterName", "sentinelMasterUsername", "sentinelMasterPassword", "provider" FROM "temporary_database_instance"`);
        await queryRunner.query(`DROP TABLE "temporary_database_instance"`);
    }
}
exports.databaseModules1629729923740 = databaseModules1629729923740;
