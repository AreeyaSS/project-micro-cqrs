"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeDatabaseType1615992183565 = void 0;
class removeDatabaseType1615992183565 {
    constructor() {
        this.name = 'removeDatabaseType1615992183565';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "temporary_database_instance" ("id" varchar PRIMARY KEY NOT NULL, "host" varchar NOT NULL, "port" integer NOT NULL, "name" varchar NOT NULL, "username" varchar, "password" varchar, "tls" boolean NOT NULL, "verifyServerCert" boolean NOT NULL, "lastConnection" datetime, "caCertId" varchar, "clientCertId" varchar, "connectionType" varchar NOT NULL DEFAULT ('STANDALONE'), "nodes" varchar, "nameFromProvider" varchar, CONSTRAINT "FK_3b9b625266c00feb2d66a9f36e4" FOREIGN KEY ("clientCertId") REFERENCES "client_certificate" ("id") ON DELETE SET NULL ON UPDATE NO ACTION, CONSTRAINT "FK_d1bc747b5938e22b4b708d8e9a5" FOREIGN KEY ("caCertId") REFERENCES "ca_certificate" ("id") ON DELETE SET NULL ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_database_instance"("id", "host", "port", "name", "username", "password", "tls", "verifyServerCert", "lastConnection", "caCertId", "clientCertId", "connectionType", "nodes", "nameFromProvider") SELECT "id", "host", "port", "name", "username", "password", "tls", "verifyServerCert", "lastConnection", "caCertId", "clientCertId", "connectionType", "nodes", "nameFromProvider" FROM "database_instance"`);
        await queryRunner.query(`DROP TABLE "database_instance"`);
        await queryRunner.query(`ALTER TABLE "temporary_database_instance" RENAME TO "database_instance"`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "database_instance" RENAME TO "temporary_database_instance"`);
        await queryRunner.query(`CREATE TABLE "database_instance" ("id" varchar PRIMARY KEY NOT NULL, "host" varchar NOT NULL, "port" integer NOT NULL, "name" varchar NOT NULL, "username" varchar, "password" varchar, "tls" boolean NOT NULL, "verifyServerCert" boolean NOT NULL, "type" varchar NOT NULL DEFAULT ('Redis Database'), "lastConnection" datetime, "caCertId" varchar, "clientCertId" varchar, "connectionType" varchar NOT NULL DEFAULT ('STANDALONE'), "nodes" varchar, "nameFromProvider" varchar, CONSTRAINT "FK_3b9b625266c00feb2d66a9f36e4" FOREIGN KEY ("clientCertId") REFERENCES "client_certificate" ("id") ON DELETE SET NULL ON UPDATE NO ACTION, CONSTRAINT "FK_d1bc747b5938e22b4b708d8e9a5" FOREIGN KEY ("caCertId") REFERENCES "ca_certificate" ("id") ON DELETE SET NULL ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "database_instance"("id", "host", "port", "name", "username", "password", "tls", "verifyServerCert", "lastConnection", "caCertId", "clientCertId", "connectionType", "nodes", "nameFromProvider") SELECT "id", "host", "port", "name", "username", "password", "tls", "verifyServerCert", "lastConnection", "caCertId", "clientCertId", "connectionType", "nodes", "nameFromProvider" FROM "temporary_database_instance"`);
        await queryRunner.query(`DROP TABLE "temporary_database_instance"`);
    }
}
exports.removeDatabaseType1615992183565 = removeDatabaseType1615992183565;
