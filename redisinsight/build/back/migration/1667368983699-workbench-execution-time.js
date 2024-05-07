"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.workbenchExecutionTime1667368983699 = void 0;
class workbenchExecutionTime1667368983699 {
    constructor() {
        this.name = 'workbenchExecutionTime1667368983699';
    }
    async up(queryRunner) {
        await queryRunner.query(`DROP INDEX "IDX_5cd90dd6def1fd7c521e53fb2c"`);
        await queryRunner.query(`CREATE TABLE "temporary_command_execution" ("id" varchar PRIMARY KEY NOT NULL, "databaseId" varchar NOT NULL, "command" text NOT NULL, "result" text NOT NULL, "role" varchar, "nodeOptions" varchar, "encryption" varchar, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "mode" varchar, "resultsMode" varchar, "summary" varchar, "executionTime" integer, CONSTRAINT "FK_ea8adfe9aceceb79212142206b8" FOREIGN KEY ("databaseId") REFERENCES "database_instance" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_command_execution"("id", "databaseId", "command", "result", "role", "nodeOptions", "encryption", "createdAt", "mode", "resultsMode", "summary") SELECT "id", "databaseId", "command", "result", "role", "nodeOptions", "encryption", "createdAt", "mode", "resultsMode", "summary" FROM "command_execution"`);
        await queryRunner.query(`DROP TABLE "command_execution"`);
        await queryRunner.query(`ALTER TABLE "temporary_command_execution" RENAME TO "command_execution"`);
        await queryRunner.query(`CREATE INDEX "IDX_5cd90dd6def1fd7c521e53fb2c" ON "command_execution" ("createdAt") `);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX "IDX_5cd90dd6def1fd7c521e53fb2c"`);
        await queryRunner.query(`ALTER TABLE "command_execution" RENAME TO "temporary_command_execution"`);
        await queryRunner.query(`CREATE TABLE "command_execution" ("id" varchar PRIMARY KEY NOT NULL, "databaseId" varchar NOT NULL, "command" text NOT NULL, "result" text NOT NULL, "role" varchar, "nodeOptions" varchar, "encryption" varchar, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "mode" varchar, "resultsMode" varchar, "summary" varchar, CONSTRAINT "FK_ea8adfe9aceceb79212142206b8" FOREIGN KEY ("databaseId") REFERENCES "database_instance" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "command_execution"("id", "databaseId", "command", "result", "role", "nodeOptions", "encryption", "createdAt", "mode", "resultsMode", "summary") SELECT "id", "databaseId", "command", "result", "role", "nodeOptions", "encryption", "createdAt", "mode", "resultsMode", "summary" FROM "temporary_command_execution"`);
        await queryRunner.query(`DROP TABLE "temporary_command_execution"`);
        await queryRunner.query(`CREATE INDEX "IDX_5cd90dd6def1fd7c521e53fb2c" ON "command_execution" ("createdAt") `);
    }
}
exports.workbenchExecutionTime1667368983699 = workbenchExecutionTime1667368983699;
